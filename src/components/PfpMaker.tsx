import { useRef, useState, useCallback } from "react";

const PfpMaker = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hasImage, setHasImage] = useState(false);
  const [pixelSize, setPixelSize] = useState(8);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);

  const pixelate = useCallback((img: HTMLImageElement, size: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const outputSize = 512;
    canvas.width = outputSize;
    canvas.height = outputSize;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw image scaled down
    const smallW = Math.ceil(outputSize / size);
    const smallH = Math.ceil(outputSize / size);

    // Create offscreen canvas for downscale
    const offscreen = document.createElement("canvas");
    offscreen.width = smallW;
    offscreen.height = smallH;
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return;

    // Crop to square from center
    const cropSize = Math.min(img.width, img.height);
    const sx = (img.width - cropSize) / 2;
    const sy = (img.height - cropSize) / 2;

    offCtx.imageSmoothingEnabled = false;
    offCtx.drawImage(img, sx, sy, cropSize, cropSize, 0, 0, smallW, smallH);

    // Draw scaled up with no smoothing
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(offscreen, 0, 0, smallW, smallH, 0, 0, outputSize, outputSize);
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    img.onload = () => {
      setOriginalImage(img);
      setHasImage(true);
      pixelate(img, pixelSize);
    };
    img.src = URL.createObjectURL(file);
  };

  const handlePixelSizeChange = (newSize: number) => {
    setPixelSize(newSize);
    if (originalImage) {
      pixelate(originalImage, newSize);
    }
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "pixelized-pfp.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <section id="pfp" className="py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-screen text-3xl md:text-4xl text-primary mb-3">
          PFP MAKER
        </h2>
        <p className="font-pixel text-muted-foreground text-sm mb-8">
          Upload your image. Get pixelized. Join the movement.
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

          {/* Canvas preview */}
          {hasImage && (
            <div className="space-y-6">
              <canvas
                ref={canvasRef}
                className="mx-auto pixel-border max-w-full"
                style={{ width: "320px", height: "320px" }}
              />

              {/* Pixel size control */}
              <div className="flex items-center justify-center gap-4">
                <span className="font-pixel text-xs text-muted-foreground">PIXEL SIZE</span>
                <div className="flex gap-2">
                  {[4, 8, 12, 16, 24].map((s) => (
                    <button
                      key={s}
                      onClick={() => handlePixelSizeChange(s)}
                      className={`font-pixel text-xs px-3 py-1.5 pixel-btn ${
                        pixelSize === s
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {s}px
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
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
                    setOriginalImage(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="font-pixel bg-muted text-muted-foreground px-6 py-3 pixel-btn text-sm"
                >
                  ↻ NEW IMAGE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PfpMaker;
