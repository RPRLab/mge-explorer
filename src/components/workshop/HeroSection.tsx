import { Calendar, MapPin, Clock } from "lucide-react";
import MatrixBackground from "./MatrixBackground";
import BioDecorations from "./BioDecorations";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 min-h-[70vh] flex items-center">
      {/* Matrix-style falling characters */}
      <MatrixBackground />
      
      {/* Bacteria and Bacteriophage decorations */}
      <BioDecorations />
      
      {/* Subtle floating orbs */}
      <div className="absolute top-20 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-primary/8 to-transparent blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-accent/8 to-transparent blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-genome-green/5 to-transparent blur-3xl" />
      
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-sm shadow-lg shadow-primary/5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-semibold tracking-wide text-primary uppercase">Computational Biology Workshop</span>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight">
            <span className="text-gradient-science">Mobile Genetic Elements</span>
            <br />
            <span className="text-foreground">Computational Workshop</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            A three-day intensive workshop on computational methods for the detection, 
            analysis, and annotation of MGEs across different stages of genomic data processing.
          </p>
          
          {/* Event details - more polished cards */}
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg shadow-black/5 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="p-2 rounded-xl bg-primary/10">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold">March 18–20, 2026</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg shadow-black/5 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="p-2 rounded-xl bg-primary/10">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold">8:00 AM – 5:00 PM</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg shadow-black/5 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="p-2 rounded-xl bg-primary/10">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold">Copenhagen, Denmark</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave - smoother curve */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 100L48 95C96 90 192 80 288 72C384 64 480 58 576 58C672 58 768 64 864 68C960 72 1056 74 1152 74C1248 74 1344 72 1392 71L1440 70V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
