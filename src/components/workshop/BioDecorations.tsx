const BacteriaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    {/* Bacteria body - elongated oval */}
    <ellipse cx="50" cy="50" rx="35" ry="18" opacity="0.8" />
    {/* Flagella */}
    <path
      d="M15 50 Q5 45 0 55 Q-5 65 5 70 Q10 60 15 65"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.6"
    />
    <path
      d="M85 50 Q95 45 100 55 Q105 65 95 70 Q90 60 85 65"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.6"
    />
    {/* Pili */}
    <line x1="30" y1="35" x2="25" y2="25" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    <line x1="45" y1="33" x2="43" y2="22" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    <line x1="55" y1="33" x2="57" y2="22" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    <line x1="70" y1="35" x2="75" y2="25" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
  </svg>
);

const BacteriophageIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 80 120" className={className} fill="currentColor">
    {/* Capsid head - icosahedral shape */}
    <polygon
      points="40,5 55,15 55,35 40,45 25,35 25,15"
      opacity="0.85"
    />
    {/* Collar */}
    <rect x="35" y="45" width="10" height="6" opacity="0.7" />
    {/* Tail sheath */}
    <rect x="37" y="51" width="6" height="35" opacity="0.6" />
    {/* Baseplate */}
    <polygon points="32,86 48,86 50,92 30,92" opacity="0.7" />
    {/* Tail fibers */}
    <path d="M32 92 L20 110 L22 112" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    <path d="M36 92 L30 108 L32 110" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    <path d="M44 92 L50 108 L48 110" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    <path d="M48 92 L60 110 L58 112" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    {/* DNA inside head hint */}
    <path
      d="M35 18 Q40 22 35 26 Q40 30 35 34"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0.3"
    />
    <path
      d="M45 18 Q40 22 45 26 Q40 30 45 34"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0.3"
    />
  </svg>
);

const BioDecorations = () => {
  return (
    <>
      {/* Bacteria decorations */}
      <BacteriaIcon className="absolute top-24 left-16 w-16 h-10 text-primary/20 rotate-12 hidden lg:block" />
      <BacteriaIcon className="absolute bottom-32 left-8 w-12 h-8 text-genome-green/15 -rotate-20 hidden md:block" />
      <BacteriaIcon className="absolute top-1/3 right-12 w-14 h-9 text-accent/15 rotate-45 hidden lg:block" />
      
      {/* Bacteriophage decorations */}
      <BacteriophageIcon className="absolute top-16 right-24 w-10 h-16 text-primary/25 -rotate-12 hidden lg:block" />
      <BacteriophageIcon className="absolute bottom-24 right-16 w-8 h-12 text-accent/20 rotate-6 hidden md:block" />
      <BacteriophageIcon className="absolute top-1/2 left-20 w-9 h-14 text-bio-blue/15 rotate-15 hidden lg:block" />
      
      {/* Mobile decorations - smaller and fewer */}
      <BacteriophageIcon className="absolute top-8 right-4 w-6 h-10 text-primary/15 rotate-12 lg:hidden" />
      <BacteriaIcon className="absolute bottom-16 left-4 w-10 h-6 text-accent/10 -rotate-6 lg:hidden" />
    </>
  );
};

export default BioDecorations;
