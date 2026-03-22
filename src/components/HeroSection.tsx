import bannerImg from "@/assets/pixelization-banner.png";
import pfpImg from "@/assets/pixelization-pfp.png";
import { useState } from "react";
import { toast } from "sonner";

const CONTRACT = "H43xqMLiFLNLLGRhXKxJUVXdEe8uVdXs93Emo5Wzpump";

const HeroSection = () => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(CONTRACT);
    setCopied(true);
    toast.success("Contract address copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-12 px-4 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `repeating-linear-gradient(0deg, hsl(42 100% 50%) 0px, transparent 1px, transparent 32px),
                          repeating-linear-gradient(90deg, hsl(42 100% 50%) 0px, transparent 1px, transparent 32px)`
      }} />

      {/* PFP floating */}
      <div className="pixel-float mb-6">
        <img
          src={pfpImg}
          alt="Pixelization character"
          className="w-40 h-40 md:w-56 md:h-56 pixel-border"
        />
      </div>

      {/* Title */}
      <h1 className="font-screen text-4xl md:text-6xl lg:text-7xl text-primary mb-2 tracking-wider text-center">
        PIXELIZATION
      </h1>
      <p className="font-pixel text-xl md:text-2xl text-pixel-sky mb-6">$PIXEL</p>

      {/* Tagline */}
      <p className="font-pixel text-muted-foreground text-center max-w-md mb-8 text-sm md:text-base">
        The origin token. Before the hype — this was the beginning.
      </p>

      {/* Contract address */}
      <button
        onClick={copy}
        className="bg-muted px-4 py-3 pixel-border cursor-pointer hover:bg-muted/80 transition-colors max-w-full"
      >
        <span className="font-pixel text-xs text-muted-foreground block mb-1">CONTRACT ADDRESS</span>
        <span className="contract-text text-primary">
          {copied ? "✓ COPIED!" : CONTRACT}
        </span>
      </button>

      {/* CTA buttons */}
      <div className="flex flex-wrap gap-4 mt-8 justify-center">
        <a
          href="https://dexscreener.com/solana/7hbmx4h86gwamd8rronfcc6jmjtrrthdyszijbc1sbdb"
          target="_blank"
          rel="noopener noreferrer"
          className="font-pixel bg-primary text-primary-foreground px-6 py-3 pixel-btn text-sm md:text-base"
        >
          📊 VIEW CHART
        </a>
        <a
          href="#pfp"
          className="font-pixel bg-accent text-accent-foreground px-6 py-3 pixel-btn text-sm md:text-base"
        >
          🎨 MAKE PFP
        </a>
        <a
          href="https://x.com/i/communities/2035587750079156571"
          target="_blank"
          rel="noopener noreferrer"
          className="font-pixel bg-secondary text-secondary-foreground px-6 py-3 pixel-btn text-sm md:text-base"
        >
          🐦 COMMUNITY
        </a>
      </div>

      {/* Banner */}
      <div className="mt-12 w-full max-w-3xl">
        <img
          src={bannerImg}
          alt="Pixelization banner"
          className="w-full pixel-border"
        />
      </div>
    </section>
  );
};

export default HeroSection;
