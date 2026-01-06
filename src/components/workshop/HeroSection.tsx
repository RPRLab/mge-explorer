import { Calendar, MapPin, Clock } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 pattern-dna">
      {/* Decorative DNA elements */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary/10 animate-helix" />
      <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-accent/10 animate-helix" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-genome-green/10 animate-helix" style={{ animationDelay: '4s' }} />
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Computational Biology Workshop</span>
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient-science">Mobile Genetic Elements</span>
            <br />
            <span className="text-foreground">Computational Workshop</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A three-day intensive workshop on computational methods for the detection, 
            analysis, and annotation of MGEs across different stages of genomic data processing.
          </p>
          
          {/* Event details */}
          <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border shadow-sm">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-medium">March 18–20, 2026</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border shadow-sm">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-medium">8:00 AM – 5:00 PM</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border shadow-sm">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-medium">Copenhagen, Denmark</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
