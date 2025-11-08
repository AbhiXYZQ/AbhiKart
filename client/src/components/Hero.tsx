import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import heroImg from "@assets/generated_images/Hero_banner_background_64ea9cd3.png";

export function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="text-hero-title">
          Nainix Dev
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-medium" data-testid="text-hero-tagline">
          Smart Shopping with Smart Reviews
        </p>
        <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto text-white/90">
          Discover honest product reviews and expert recommendations across electronics, fashion, home essentials, and more.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/category/electronics">
            <Button size="lg" variant="default" className="gap-2" data-testid="button-explore-deals">
              Explore Deals
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/blog">
            <Button
              size="lg"
              variant="outline"
              className="gap-2 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              data-testid="button-read-reviews"
            >
              Read Reviews
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
