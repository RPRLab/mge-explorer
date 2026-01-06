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
}

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const sectionWidth = canvas.width / 4;
    const binaryChars = ["0", "1"];
    const dnaChars = ["A", "T", "C", "G"];

    // Section 1: Binary (0s and 1s)
    const binaryItems: FallingItem[] = [];
    for (let i = 0; i < 40; i++) {
      binaryItems.push({
        x: Math.random() * sectionWidth,
        y: Math.random() * canvas.height,
        speed: 1 + Math.random() * 2,
        opacity: 0.15 + Math.random() * 0.4,
        char: binaryChars[Math.floor(Math.random() * binaryChars.length)],
      });
    }

    // Section 2: Bacteriophages
    const phageItems: FallingItem[] = [];
    for (let i = 0; i < 12; i++) {
      phageItems.push({
        x: sectionWidth + Math.random() * sectionWidth,
        y: Math.random() * canvas.height,
        speed: 0.3 + Math.random() * 0.8,
        opacity: 0.15 + Math.random() * 0.25,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        scale: 0.6 + Math.random() * 0.5,
      });
    }

    // Section 3: Bacteria (bacillus and coccus)
    const bacteriaItems: FallingItem[] = [];
    for (let i = 0; i < 15; i++) {
      bacteriaItems.push({
        x: sectionWidth * 2 + Math.random() * sectionWidth,
        y: Math.random() * canvas.height,
        speed: 0.2 + Math.random() * 0.6,
        opacity: 0.12 + Math.random() * 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        scale: 0.5 + Math.random() * 0.6,
        type: Math.random() > 0.5 ? "bacillus" : "coccus",
      });
    }

    // Section 4: ATCG
    const dnaItems: FallingItem[] = [];
    for (let i = 0; i < 40; i++) {
      dnaItems.push({
        x: sectionWidth * 3 + Math.random() * sectionWidth,
        y: Math.random() * canvas.height,
        speed: 1 + Math.random() * 2,
        opacity: 0.15 + Math.random() * 0.4,
        char: dnaChars[Math.floor(Math.random() * dnaChars.length)],
      });
    }

    const drawPhage = (x: number, y: number, scale: number, opacity: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);
      
      // Head (icosahedral)
      ctx.beginPath();
      ctx.moveTo(0, -25);
      ctx.lineTo(15, -15);
      ctx.lineTo(15, 5);
      ctx.lineTo(0, 15);
      ctx.lineTo(-15, 5);
      ctx.lineTo(-15, -15);
      ctx.closePath();
      ctx.fillStyle = `hsla(200, 80%, 45%, ${opacity})`;
      ctx.fill();
      
      // Tail
      ctx.fillStyle = `hsla(200, 70%, 40%, ${opacity * 0.8})`;
      ctx.fillRect(-3, 15, 6, 30);
      
      // Baseplate
      ctx.beginPath();
      ctx.moveTo(-10, 45);
      ctx.lineTo(10, 45);
      ctx.lineTo(12, 50);
      ctx.lineTo(-12, 50);
      ctx.closePath();
      ctx.fill();
      
      // Tail fibers
      ctx.strokeStyle = `hsla(200, 60%, 50%, ${opacity * 0.6})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-8, 50);
      ctx.quadraticCurveTo(-15, 60, -20, 70);
      ctx.moveTo(-4, 50);
      ctx.quadraticCurveTo(-8, 60, -10, 70);
      ctx.moveTo(4, 50);
      ctx.quadraticCurveTo(8, 60, 10, 70);
      ctx.moveTo(8, 50);
      ctx.quadraticCurveTo(15, 60, 20, 70);
      ctx.stroke();
      
      ctx.restore();
    };

    const drawBacillus = (x: number, y: number, scale: number, opacity: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);
      
      // Rod-shaped body
      ctx.beginPath();
      ctx.ellipse(0, 0, 35, 12, 0, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(155, 60%, 40%, ${opacity})`;
      ctx.fill();
      
      // Flagella
      ctx.strokeStyle = `hsla(155, 50%, 45%, ${opacity * 0.5})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-35, 0);
      ctx.bezierCurveTo(-45, -8, -55, 8, -65, 0);
      ctx.bezierCurveTo(-75, -8, -85, 8, -90, 0);
      ctx.stroke();
      
      ctx.restore();
    };

    const drawCoccus = (x: number, y: number, scale: number, opacity: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);
      
      // Spherical body (diplococci - two connected)
      ctx.beginPath();
      ctx.arc(-10, 0, 14, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(168, 76%, 36%, ${opacity})`;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(10, 0, 14, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(168, 70%, 40%, ${opacity * 0.9})`;
      ctx.fill();
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update section width on each frame for responsiveness
      const currentSectionWidth = canvas.width / 4;

      // Draw binary (Section 1)
      ctx.font = "bold 18px 'Space Grotesk', monospace";
      binaryItems.forEach((item) => {
        // Glowing effect for leading characters
        const gradient = ctx.createLinearGradient(item.x, item.y - 20, item.x, item.y + 100);
        gradient.addColorStop(0, `hsla(200, 80%, 55%, ${item.opacity})`);
        gradient.addColorStop(0.3, `hsla(200, 80%, 45%, ${item.opacity * 0.7})`);
        gradient.addColorStop(1, `hsla(200, 80%, 45%, 0)`);
        
        ctx.fillStyle = `hsla(200, 80%, 55%, ${item.opacity})`;
        ctx.fillText(item.char!, item.x, item.y);
        
        // Trail
        for (let i = 1; i < 8; i++) {
          const trailOpacity = item.opacity * (1 - i / 8);
          ctx.fillStyle = `hsla(200, 80%, 45%, ${trailOpacity})`;
          const trailChar = binaryChars[Math.floor(Math.random() * binaryChars.length)];
          ctx.fillText(trailChar, item.x, item.y - i * 22);
        }

        item.y += item.speed;
        if (item.y > canvas.height + 200) {
          item.y = -200;
          item.x = Math.random() * currentSectionWidth;
          item.char = binaryChars[Math.floor(Math.random() * binaryChars.length)];
        }
      });

      // Draw phages (Section 2)
      phageItems.forEach((item) => {
        drawPhage(item.x, item.y, item.scale!, item.opacity, item.rotation!);
        item.y += item.speed;
        item.rotation! += item.rotationSpeed!;
        if (item.y > canvas.height + 100) {
          item.y = -100;
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
        if (item.y > canvas.height + 100) {
          item.y = -100;
          item.x = currentSectionWidth * 2 + Math.random() * currentSectionWidth;
          item.type = Math.random() > 0.5 ? "bacillus" : "coccus";
        }
      });

      // Draw ATCG (Section 4)
      ctx.font = "bold 18px 'Space Grotesk', monospace";
      dnaItems.forEach((item) => {
        // Color based on nucleotide
        let hue = 168;
        if (item.char === "A") hue = 0; // Red
        else if (item.char === "T") hue = 45; // Orange
        else if (item.char === "C") hue = 200; // Blue
        else if (item.char === "G") hue = 120; // Green
        
        ctx.fillStyle = `hsla(${hue}, 70%, 50%, ${item.opacity})`;
        ctx.fillText(item.char!, item.x, item.y);
        
        // Trail
        for (let i = 1; i < 8; i++) {
          const trailOpacity = item.opacity * (1 - i / 8);
          ctx.fillStyle = `hsla(${hue}, 60%, 45%, ${trailOpacity})`;
          const trailChar = dnaChars[Math.floor(Math.random() * dnaChars.length)];
          let trailHue = 168;
          if (trailChar === "A") trailHue = 0;
          else if (trailChar === "T") trailHue = 45;
          else if (trailChar === "C") trailHue = 200;
          else if (trailChar === "G") trailHue = 120;
          ctx.fillStyle = `hsla(${trailHue}, 60%, 45%, ${trailOpacity})`;
          ctx.fillText(trailChar, item.x, item.y - i * 22);
        }

        item.y += item.speed;
        if (item.y > canvas.height + 200) {
          item.y = -200;
          item.x = currentSectionWidth * 3 + Math.random() * currentSectionWidth;
          item.char = dnaChars[Math.floor(Math.random() * dnaChars.length)];
        }
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default MatrixBackground;
