import PixelNav from "@/components/PixelNav";
import HeroSection from "@/components/HeroSection";
import LoreSection from "@/components/LoreSection";
import PfpMaker from "@/components/PfpMaker";
import ChartSection from "@/components/ChartSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <PixelNav />

      {/* Ticker marquee */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-primary py-1 overflow-hidden">
        <div className="pixel-marquee whitespace-nowrap font-screen text-primary-foreground text-xs">
          $PIXEL · PIXELIZATION · THE ORIGIN TOKEN · REDISCOVER THE BEGINNING · 
          $PIXEL · PIXELIZATION · THE ORIGIN TOKEN · REDISCOVER THE BEGINNING · 
          $PIXEL · PIXELIZATION · THE ORIGIN TOKEN · REDISCOVER THE BEGINNING
        </div>
      </div>

      <HeroSection />
      <LoreSection />
      <PfpMaker />
      <ChartSection />
      <Footer />

      {/* Bottom spacer for marquee */}
      <div className="h-8" />
    </div>
  );
};

export default Index;
