import { useRef, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PfpMaker = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hasImage, setHasImage] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);

  const processImage = useCallback(async (file: File) => {
    setIsProcessing(true);
    setResultUrl(null);

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setOriginalPreview(previewUrl);
    setHasImage(true);

    try {
      // Convert to base64 data URI
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      toast.info("🎨 AI is pixelating your image...");

      const { data, error } = await supabase.functions.invoke("pixelate", {
        body: { imageBase64: base64 },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      if (data?.imageUrl) {
        setResultUrl(data.imageUrl);

        // Draw result to canvas
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const canvas = canvasRef.current;
          if (!canvas) return;
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(img, 0, 0);
        };
        img.src = data.imageUrl;

        toast.success("✅ Pixelization complete!");
      }
    } catch (err: any) {
      console.error("Pixelate error:", err);
      toast.error(err.message || "Failed to pixelate image");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processImage(file);
  };

  const download = () => {
    if (resultUrl) {
      const link = document.createElement("a");
      link.download = "pixelized-pfp.png";
      link.href = resultUrl;
      link.target = "_blank";
      link.click();
    }
  };

  return (
    <section id="pfp" className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-screen text-3xl md:text-4xl text-primary mb-3">
          PFP MAKER
        </h2>
        <p className="font-pixel text-muted-foreground text-sm mb-8">
          Upload your image. AI will transform it into pixel art. Join the movement.
        </p>

        <div className="bg-card pixel-border p-6 md:p-8">
          {/* Upload area */}
          {!hasImage && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-16 border-4 border-dashed border-border hover:border-primary transition-colors cursor-pointer flex flex-col items-center gap-3"
            >
              <span className="text-4xl">📁</span>
              <span className="font-pixel text-muted-foreground text-sm">
                CLICK TO UPLOAD IMAGE
              </span>
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />

          {/* Processing state */}
          {hasImage && isProcessing && (
            <div className="space-y-6">
              {originalPreview && (
                <img
                  src={originalPreview}
                  alt="Original"
                  className="mx-auto pixel-border max-w-full"
                  style={{ width: "320px", height: "320px", objectFit: "cover" }}
                />
              )}
              <div className="flex flex-col items-center gap-3">
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 bg-primary pixel-blink"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
                <p className="font-pixel text-primary text-sm">AI IS PIXELATING...</p>
                <p className="font-pixel text-muted-foreground text-xs">THIS MAY TAKE 15-30 SECONDS</p>
              </div>
            </div>
          )}

          {/* Result */}
          {hasImage && !isProcessing && resultUrl && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {originalPreview && (
                  <div>
                    <p className="font-pixel text-muted-foreground text-xs mb-2">ORIGINAL</p>
                    <img
                      src={originalPreview}
                      alt="Original"
                      className="mx-auto pixel-border w-full"
                      style={{ maxWidth: "256px", aspectRatio: "1", objectFit: "cover" }}
                    />
                  </div>
                )}
                <div>
                  <p className="font-pixel text-primary text-xs mb-2">PIXELIZED ✨</p>
                  <canvas
                    ref={canvasRef}
                    className="mx-auto pixel-border w-full"
                    style={{ maxWidth: "256px", imageRendering: "pixelated" }}
                  />
                </div>
              </div>

              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={download}
                  className="font-pixel bg-primary text-primary-foreground px-6 py-3 pixel-btn text-sm"
                >
                  ⬇ DOWNLOAD PFP
                </button>
                <button
                  onClick={() => {
                    setHasImage(false);
                    setResultUrl(null);
                    setOriginalPreview(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="font-pixel bg-muted text-muted-foreground px-6 py-3 pixel-btn text-sm"
                >
                  ↻ NEW IMAGE
                </button>
              </div>
            </div>
          )}

          {/* Error state - has image but no result and not processing */}
          {hasImage && !isProcessing && !resultUrl && (
            <div className="space-y-4">
              <p className="font-pixel text-accent text-sm">SOMETHING WENT WRONG</p>
              <button
                onClick={() => {
                  setHasImage(false);
                  setOriginalPreview(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="font-pixel bg-muted text-muted-foreground px-6 py-3 pixel-btn text-sm"
              >
                ↻ TRY AGAIN
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PfpMaker;
