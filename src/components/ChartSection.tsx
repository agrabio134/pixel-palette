const ChartSection = () => {
  return (
    <section id="chart" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-screen text-3xl md:text-4xl text-primary mb-8 text-center">
          LIVE CHART
        </h2>

        <div className="pixel-border overflow-hidden">
          <div style={{ position: "relative", width: "100%", paddingBottom: "65%" }}>
            <iframe
              src="https://dexscreener.com/solana/7hBMx4h86gwAMD8RRonFcc6jMJTrRThDYsZiJBc1sbDB?embed=1&loadChartSettings=0&trades=0&tabs=0&info=0&chartLeftToolbar=0&chartDefaultOnMobile=1&chartTheme=dark&theme=dark&chartStyle=1&chartType=usd&interval=5"
              style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0, border: 0 }}
              title="Dexscreener chart"
            />
          </div>
        </div>

        <div className="text-center mt-6">
          <a
            href="https://dexscreener.com/solana/7hbmx4h86gwamd8rronfcc6jmjtrrthdyszijbc1sbdb"
            target="_blank"
            rel="noopener noreferrer"
            className="font-pixel text-primary hover:text-accent text-sm underline underline-offset-4"
          >
            OPEN FULL CHART →
          </a>
        </div>
      </div>
    </section>
  );
};

export default ChartSection;
