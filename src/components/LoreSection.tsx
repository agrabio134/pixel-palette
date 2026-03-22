const LoreSection = () => {
  return (
    <section id="lore" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-screen text-3xl md:text-4xl text-primary mb-8 text-center">
          THE LORE
        </h2>

        <div className="bg-card pixel-border p-6 md:p-8 relative scanlines">
          <div className="relative z-10 space-y-6 font-pixel text-sm md:text-base leading-relaxed">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="bg-primary text-primary-foreground px-3 py-1 font-screen text-xs">PIXEL</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-accent">&lt;$0.01</span>
            </div>

            <p className="text-foreground">
              Pixelization is the <span className="text-primary">first token</span> deployed by the{" "}
              <span className="text-pixel-sky font-screen">CHIBI</span>{" "}
              <span className="text-muted-foreground">· $3.19</span> developer.
            </p>

            <p className="text-foreground">
              Before the hype, before the attention — <span className="text-primary">this was the origin.</span>
            </p>

            <p className="text-foreground">
              As the Chibi narrative expands, Pixelization is now being{" "}
              <span className="text-accent">rediscovered.</span>
            </p>

            <div className="border-t border-border pt-4 mt-4">
              <p className="text-muted-foreground text-xs font-screen">
                ▸ DEPLOYED ON SOLANA VIA PUMP.FUN
              </p>
            </div>
          </div>
        </div>

        {/* Pixel decorations */}
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-primary"
              style={{ opacity: 0.3 + (i * 0.1) }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoreSection;
