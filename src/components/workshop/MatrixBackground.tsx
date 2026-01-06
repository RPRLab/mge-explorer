import { useEffect, useRef } from "react";

interface FallingItem {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  rotation?: number;
  rotationSpeed?: number;
  scale?: number;
  char?: string;
  type?: "bacillus" | "coccus";
  trail?: string[];
}

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Recalculate height when content changes
    const resizeObserver = new ResizeObserver(() => {
      canvas.height = document.documentElement.scrollHeight;
    });
    resizeObserver.observe(document.body);

    const binaryChars = ["0", "1"];
    const dnaChars = ["A", "T", "C", "G"];

    const createItems = () => {
      const sectionWidth = canvas.width / 4;
      const pageHeight = canvas.height;

      // Section 1: Binary (0s and 1s) - Matrix style with trails
      const binaryItems: FallingItem[] = [];
      const binaryCount = Math.floor(sectionWidth / 25);
      for (let i = 0; i < binaryCount; i++) {
        const trail: string[] = [];
        for (let j = 0; j < 15; j++) {
          trail.push(binaryChars[Math.floor(Math.random() * binaryChars.length)]);
        }
        binaryItems.push({
          x: Math.random() * sectionWidth,
          y: Math.random() * pageHeight - pageHeight,
          speed: 2 + Math.random() * 4,
          opacity: 0.6 + Math.random() * 0.4,
          trail,
        });
      }

      // Section 2: Bacteriophages (smaller)
      const phageItems: FallingItem[] = [];
      for (let i = 0; i < 10; i++) {
        phageItems.push({
          x: sectionWidth + Math.random() * sectionWidth,
          y: Math.random() * pageHeight,
          speed: 0.4 + Math.random() * 0.6,
          opacity: 0.12 + Math.random() * 0.18,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          scale: 0.25 + Math.random() * 0.2, // Much smaller
        });
      }

      // Section 3: Bacteria (bacillus and coccus)
      const bacteriaItems: FallingItem[] = [];
      for (let i = 0; i < 12; i++) {
        bacteriaItems.push({
          x: sectionWidth * 2 + Math.random() * sectionWidth,
          y: Math.random() * pageHeight,
          speed: 0.3 + Math.random() * 0.5,
          opacity: 0.1 + Math.random() * 0.15,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.008,
          scale: 0.4 + Math.random() * 0.4,
          type: Math.random() > 0.5 ? "bacillus" : "coccus",
        });
      }

      // Section 4: ATCG - Matrix style with trails
      const dnaItems: FallingItem[] = [];
      const dnaCount = Math.floor(sectionWidth / 25);
      for (let i = 0; i < dnaCount; i++) {
        const trail: string[] = [];
        for (let j = 0; j < 15; j++) {
          trail.push(dnaChars[Math.floor(Math.random() * dnaChars.length)]);
        }
        dnaItems.push({
          x: sectionWidth * 3 + Math.random() * sectionWidth,
          y: Math.random() * pageHeight - pageHeight,
          speed: 2 + Math.random() * 4,
          opacity: 0.6 + Math.random() * 0.4,
          trail,
        });
      }

      return { binaryItems, phageItems, bacteriaItems, dnaItems };
    };

    let { binaryItems, phageItems, bacteriaItems, dnaItems } = createItems();

    const drawPhage = (x: number, y: number, scale: number, opacity: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);
      
      // Head (icosahedral) - smaller proportions
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(12, -12);
      ctx.lineTo(12, 4);
      ctx.lineTo(0, 12);
      ctx.lineTo(-12, 4);
      ctx.lineTo(-12, -12);
      ctx.closePath();
      ctx.fillStyle = `hsla(200, 80%, 50%, ${opacity})`;
      ctx.fill();
      
      // Tail
      ctx.fillStyle = `hsla(200, 70%, 45%, ${opacity * 0.8})`;
      ctx.fillRect(-2, 12, 4, 25);
      
      // Baseplate
      ctx.beginPath();
      ctx.moveTo(-8, 37);
      ctx.lineTo(8, 37);
      ctx.lineTo(10, 42);
      ctx.lineTo(-10, 42);
      ctx.closePath();
      ctx.fill();
      
      // Tail fibers
      ctx.strokeStyle = `hsla(200, 60%, 55%, ${opacity * 0.5})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-6, 42);
      ctx.quadraticCurveTo(-12, 50, -16, 58);
      ctx.moveTo(-3, 42);
      ctx.quadraticCurveTo(-6, 50, -8, 58);
      ctx.moveTo(3, 42);
      ctx.quadraticCurveTo(6, 50, 8, 58);
      ctx.moveTo(6, 42);
      ctx.quadraticCurveTo(12, 50, 16, 58);
      ctx.stroke();
      
      ctx.restore();
    };

    // Pill-shaped bacillus (rounded rectangle like a search bar)
    const drawBacillus = (x: number, y: number, scale: number, opacity: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);
      
      const width = 60;
      const height = 20;
      const radius = height / 2; // Fully rounded ends
      
      ctx.beginPath();
      ctx.roundRect(-width / 2, -height / 2, width, height, radius);
      ctx.fillStyle = `hsla(155, 60%, 45%, ${opacity})`;
      ctx.fill();
      
      // Subtle inner highlight
      ctx.beginPath();
      ctx.roundRect(-width / 2 + 4, -height / 2 + 3, width - 8, height / 3, radius / 2);
      ctx.fillStyle = `hsla(155, 60%, 60%, ${opacity * 0.3})`;
      ctx.fill();
      
      // Flagella
      ctx.strokeStyle = `hsla(155, 50%, 50%, ${opacity * 0.4})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-width / 2, 0);
      ctx.bezierCurveTo(-width / 2 - 15, -8, -width / 2 - 25, 8, -width / 2 - 35, 0);
      ctx.stroke();
      
      ctx.restore();
    };

    const drawCoccus = (x: number, y: number, scale: number, opacity: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);
      
      // Diplococci - two connected spheres
      ctx.beginPath();
      ctx.arc(-8, 0, 12, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(168, 76%, 40%, ${opacity})`;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(8, 0, 12, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(168, 70%, 45%, ${opacity * 0.9})`;
      ctx.fill();
      
      // Highlights
      ctx.beginPath();
      ctx.arc(-10, -4, 4, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(168, 76%, 60%, ${opacity * 0.3})`;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(6, -4, 4, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(168, 70%, 60%, ${opacity * 0.25})`;
      ctx.fill();
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const currentSectionWidth = canvas.width / 4;
      const pageHeight = canvas.height;

      // Draw binary with Matrix-style trails (Section 1)
      ctx.font = "bold 16px 'Space Grotesk', monospace";
      binaryItems.forEach((item) => {
        const charSpacing = 20;
        
        // Draw trail (fading out)
        item.trail?.forEach((char, i) => {
          const trailY = item.y - (i + 1) * charSpacing;
          const trailOpacity = item.opacity * Math.pow(0.75, i);
          
          if (trailOpacity > 0.02) {
            ctx.fillStyle = `hsla(168, 76%, ${50 - i * 2}%, ${trailOpacity})`;
            ctx.fillText(char, item.x, trailY);
          }
        });
        
        // Draw leading character (brightest)
        ctx.fillStyle = `hsla(168, 76%, 70%, ${item.opacity})`;
        ctx.shadowColor = `hsla(168, 76%, 50%, 0.8)`;
        ctx.shadowBlur = 8;
        ctx.fillText(item.char || item.trail?.[0] || "1", item.x, item.y);
        ctx.shadowBlur = 0;

        item.y += item.speed;
        
        // Update trail characters randomly
        if (Math.random() < 0.03 && item.trail) {
          const idx = Math.floor(Math.random() * item.trail.length);
          item.trail[idx] = binaryChars[Math.floor(Math.random() * binaryChars.length)];
        }
        
        if (item.y > pageHeight + 300) {
          item.y = -300;
          item.x = Math.random() * currentSectionWidth;
        }
      });

      // Draw phages (Section 2)
      phageItems.forEach((item) => {
        drawPhage(item.x, item.y, item.scale!, item.opacity, item.rotation!);
        item.y += item.speed;
        item.rotation! += item.rotationSpeed!;
        if (item.y > pageHeight + 80) {
          item.y = -80;
          item.x = currentSectionWidth + Math.random() * currentSectionWidth;
        }
      });

      // Draw bacteria (Section 3)
      bacteriaItems.forEach((item) => {
        if (item.type === "bacillus") {
          drawBacillus(item.x, item.y, item.scale!, item.opacity, item.rotation!);
        } else {
          drawCoccus(item.x, item.y, item.scale!, item.opacity, item.rotation!);
        }
        item.y += item.speed;
        item.rotation! += item.rotationSpeed!;
        if (item.y > pageHeight + 60) {
          item.y = -60;
          item.x = currentSectionWidth * 2 + Math.random() * currentSectionWidth;
          item.type = Math.random() > 0.5 ? "bacillus" : "coccus";
        }
      });

      // Draw ATCG with Matrix-style trails (Section 4)
      ctx.font = "bold 16px 'Space Grotesk', monospace";
      dnaItems.forEach((item) => {
        const charSpacing = 20;
        const leadChar = item.char || item.trail?.[0] || "A";
        
        // Get color based on nucleotide
        const getColor = (char: string, lightness: number, opacity: number) => {
          let hue = 168;
          if (char === "A") hue = 0; // Red
          else if (char === "T") hue = 35; // Orange
          else if (char === "C") hue = 200; // Blue
          else if (char === "G") hue = 140; // Green
          return `hsla(${hue}, 70%, ${lightness}%, ${opacity})`;
        };
        
        // Draw trail
        item.trail?.forEach((char, i) => {
          const trailY = item.y - (i + 1) * charSpacing;
          const trailOpacity = item.opacity * Math.pow(0.75, i);
          
          if (trailOpacity > 0.02) {
            ctx.fillStyle = getColor(char, 45 - i * 2, trailOpacity);
            ctx.fillText(char, item.x, trailY);
          }
        });
        
        // Draw leading character
        ctx.fillStyle = getColor(leadChar, 65, item.opacity);
        ctx.shadowColor = getColor(leadChar, 50, 0.8);
        ctx.shadowBlur = 8;
        ctx.fillText(leadChar, item.x, item.y);
        ctx.shadowBlur = 0;

        item.y += item.speed;
        
        // Update trail characters randomly
        if (Math.random() < 0.03 && item.trail) {
          const idx = Math.floor(Math.random() * item.trail.length);
          item.trail[idx] = dnaChars[Math.floor(Math.random() * dnaChars.length)];
        }
        
        if (item.y > pageHeight + 300) {
          item.y = -300;
          item.x = currentSectionWidth * 3 + Math.random() * currentSectionWidth;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full pointer-events-none z-0"
      style={{ height: '100%', minHeight: '100vh' }}
      aria-hidden="true"
    />
  );
};

export default MatrixBackground;
