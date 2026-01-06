import { Calendar, MapPin, Clock } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden min-h-[70vh] flex items-center">
      
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
            <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg shadow-black/5 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="p-2 rounded-full bg-primary/10">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold">March 18–20, 2026</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg shadow-black/5 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="p-2 rounded-full bg-primary/10">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold">8:00 AM – 5:00 PM</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg shadow-black/5 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="p-2 rounded-full bg-primary/10">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold">Copenhagen, Denmark</span>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default HeroSection;
