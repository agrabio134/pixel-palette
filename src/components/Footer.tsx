const CONTRACT = "H43xqMLiFLNLLGRhXKxJUVXdEe8uVdXs93Emo5Wzpump";

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t-4 border-border">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <p className="font-screen text-primary text-xl">$PIXEL</p>

        <div className="flex justify-center gap-6 flex-wrap">
          <a
            href="https://dexscreener.com/solana/7hbmx4h86gwamd8rronfcc6jmjtrrthdyszijbc1sbdb"
            target="_blank"
            rel="noopener noreferrer"
            className="font-pixel text-muted-foreground hover:text-primary text-sm"
          >
            DEXSCREENER
          </a>
          <a
            href="https://x.com/i/communities/2035587750079156571"
            target="_blank"
            rel="noopener noreferrer"
            className="font-pixel text-muted-foreground hover:text-primary text-sm"
          >
            X COMMUNITY
          </a>
        </div>

        <p className="contract-text text-muted-foreground">{CONTRACT}</p>

        <p className="font-pixel text-muted-foreground text-xs">
          © 2025 PIXELIZATION. NOT FINANCIAL ADVICE. DYOR.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
