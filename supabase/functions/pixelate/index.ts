import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const REPLICATE_API_KEY = Deno.env.get("REPLICATE_API_KEY");
    if (!REPLICATE_API_KEY) {
      throw new Error("REPLICATE_API_KEY is not configured");
    }

    const { imageBase64 } = await req.json();
    if (!imageBase64) {
      return new Response(JSON.stringify({ error: "No image provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create prediction using rd-fast with image input
    const createRes = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REPLICATE_API_KEY}`,
        "Content-Type": "application/json",
        Prefer: "wait",
      },
      body: JSON.stringify({
        version: "3a12e487297b34b89a2f10705e56f41f4a18bd20bd38b04566381408e4e79e43",
        input: {
          image: imageBase64,
          style: "portrait",
          width: 128,
          height: 128,
          prompt: "pixel art portrait, retro game character, detailed pixel art",
          strength: 0.65,
          num_images: 1,
        },
      }),
    });

    if (!createRes.ok) {
      const errText = await createRes.text();
      console.error("Replicate create error:", createRes.status, errText);
      
      // If "wait" didn't work, poll instead
      if (createRes.status === 400 || createRes.status === 422) {
        // Try without Prefer: wait
        const createRes2 = await fetch("https://api.replicate.com/v1/predictions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${REPLICATE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            version: "3a12e487297b34b89a2f10705e56f41f4a18bd20bd38b04566381408e4e79e43",
            input: {
              image: imageBase64,
              style: "portrait",
              width: 128,
              height: 128,
              prompt: "pixel art portrait, retro game character, detailed pixel art",
              strength: 0.65,
              num_images: 1,
            },
          }),
        });

        if (!createRes2.ok) {
          const errText2 = await createRes2.text();
          throw new Error(`Replicate API error [${createRes2.status}]: ${errText2}`);
        }

        const prediction = await createRes2.json();
        
        // Poll for result
        let result = prediction;
        let attempts = 0;
        while (result.status !== "succeeded" && result.status !== "failed" && attempts < 60) {
          await new Promise((r) => setTimeout(r, 2000));
          const pollRes = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
            headers: { Authorization: `Bearer ${REPLICATE_API_KEY}` },
          });
          result = await pollRes.json();
          attempts++;
        }

        if (result.status === "failed") {
          throw new Error(`Prediction failed: ${result.error}`);
        }

        const outputUrl = Array.isArray(result.output) ? result.output[0] : result.output;
        return new Response(JSON.stringify({ imageUrl: outputUrl }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error(`Replicate API error [${createRes.status}]: ${errText}`);
    }

    const prediction = await createRes.json();

    // If prediction completed with Prefer: wait
    if (prediction.status === "succeeded") {
      const outputUrl = Array.isArray(prediction.output) ? prediction.output[0] : prediction.output;
      return new Response(JSON.stringify({ imageUrl: outputUrl }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Poll if not done yet
    let result = prediction;
    let attempts = 0;
    while (result.status !== "succeeded" && result.status !== "failed" && attempts < 60) {
      await new Promise((r) => setTimeout(r, 2000));
      const pollRes = await fetch(`https://api.replicate.com/v1/predictions/${result.id}`, {
        headers: { Authorization: `Bearer ${REPLICATE_API_KEY}` },
      });
      result = await pollRes.json();
      attempts++;
    }

    if (result.status === "failed") {
      throw new Error(`Prediction failed: ${result.error}`);
    }

    const outputUrl = Array.isArray(result.output) ? result.output[0] : result.output;
    return new Response(JSON.stringify({ imageUrl: outputUrl }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("pixelate error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
