import { useState } from "react";

const PixelNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "LORE", href: "#lore" },
    { label: "PFP MAKER", href: "#pfp" },
    { label: "CHART", href: "#chart" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 pixel-border border-t-0 border-x-0">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <a href="#" className="font-screen text-primary text-lg tracking-wider">
          $PIXEL
        </a>
        
        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-pixel text-foreground hover:text-primary transition-colors text-sm tracking-wide"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://x.com/i/communities/2035587750079156571"
            target="_blank"
            rel="noopener noreferrer"
            className="font-pixel text-sm bg-primary text-primary-foreground px-4 py-1.5 pixel-btn"
          >
            JOIN X
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden font-pixel text-primary text-xl"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-card px-4 pb-4 flex flex-col gap-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="font-pixel text-foreground hover:text-primary text-sm py-1"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://x.com/i/communities/2035587750079156571"
            target="_blank"
            rel="noopener noreferrer"
            className="font-pixel text-sm bg-primary text-primary-foreground px-4 py-1.5 pixel-btn inline-block w-fit"
          >
            JOIN X
          </a>
        </div>
      )}
    </nav>
  );
};

export default PixelNav;
