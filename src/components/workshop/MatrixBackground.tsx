import { useEffect, useRef } from "react";

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let columns: number[] = [];
    let columnChars: string[][] = [];
    
    const binaryChars = "01";
    const dnaChars = "ATCG";
    
    const fontSize = 18;
    const lineHeight = fontSize * 1.2;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
      initColumns();
    };

    const initColumns = () => {
      const totalColumns = Math.floor(window.innerWidth / fontSize);
      columns = [];
      columnChars = [];
      
      for (let i = 0; i < totalColumns; i++) {
        // Random starting position (negative = starts above screen)
        columns[i] = Math.random() * -100;
        // Pre-generate random chars for each column
        columnChars[i] = [];
        for (let j = 0; j < 50; j++) {
          columnChars[i][j] = getCharForColumn(i, totalColumns);
        }
      }
    };

    const getCharForColumn = (colIndex: number, totalColumns: number): string => {
      const sectionWidth = totalColumns / 4;
      const section = Math.floor(colIndex / sectionWidth);
      
      if (section === 0) {
        // Binary section
        return binaryChars[Math.floor(Math.random() * binaryChars.length)];
      } else if (section === 3) {
        // DNA section
        return dnaChars[Math.floor(Math.random() * dnaChars.length)];
      }
      return "";
    };

    const getColorForSection = (section: number, char: string, isHead: boolean, opacity: number): string => {
      if (section === 0) {
        // Binary - teal/green
        const lightness = isHead ? 75 : 45;
        return `hsla(168, 76%, ${lightness}%, ${opacity})`;
      } else if (section === 3) {
        // DNA - colored by nucleotide
        let hue = 168;
        if (char === "A") hue = 0;      // Red
        else if (char === "T") hue = 35; // Orange
        else if (char === "C") hue = 200; // Blue
        else if (char === "G") hue = 140; // Green
        
        const lightness = isHead ? 70 : 40;
        return `hsla(${hue}, 70%, ${lightness}%, ${opacity})`;
      }
      return "transparent";
    };

    // Bacteriophage and bacteria items
    interface FallingItem {
      x: number;
      y: number;
      speed: number;
      opacity: number;
      rotation: number;
      rotationSpeed: number;
      scale: number;
      type?: "bacillus" | "coccus";
    }

    const phageItems: FallingItem[] = [];
    const bacteriaItems: FallingItem[] = [];

    const initBioItems = () => {
      const sectionWidth = window.innerWidth / 4;
      
      // Bacteriophages (section 2)
      phageItems.length = 0;
      for (let i = 0; i < 8; i++) {
        phageItems.push({
          x: sectionWidth + Math.random() * sectionWidth,
          y: Math.random() * window.innerHeight,
          speed: 0.3 + Math.random() * 0.5,
          opacity: 0.08 + Math.random() * 0.12,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.008,
          scale: 0.18 + Math.random() * 0.12,
        });
      }
      
      // Bacteria (section 3)
      bacteriaItems.length = 0;
      for (let i = 0; i < 10; i++) {
        bacteriaItems.push({
          x: sectionWidth * 2 + Math.random() * sectionWidth,
          y: Math.random() * window.innerHeight,
          speed: 0.2 + Math.random() * 0.4,
          opacity: 0.08 + Math.random() * 0.12,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.006,
          scale: 0.3 + Math.random() * 0.3,
          type: Math.random() > 0.5 ? "bacillus" : "coccus",
        });
      }
    };

    const drawPhage = (item: FallingItem) => {
      ctx.save();
      ctx.translate(item.x, item.y);
      ctx.rotate(item.rotation);
      ctx.scale(item.scale, item.scale);
      
      // Icosahedral head
      ctx.beginPath();
      ctx.moveTo(0, -25);
      ctx.lineTo(15, -15);
      ctx.lineTo(15, 5);
      ctx.lineTo(0, 15);
      ctx.lineTo(-15, 5);
      ctx.lineTo(-15, -15);
      ctx.closePath();
      ctx.fillStyle = `hsla(200, 80%, 50%, ${item.opacity})`;
      ctx.fill();
      
      // Tail
      ctx.fillStyle = `hsla(200, 70%, 45%, ${item.opacity * 0.8})`;
      ctx.fillRect(-2.5, 15, 5, 30);
      
      // Baseplate
      ctx.beginPath();
      ctx.moveTo(-10, 45);
      ctx.lineTo(10, 45);
      ctx.lineTo(12, 52);
      ctx.lineTo(-12, 52);
      ctx.closePath();
      ctx.fill();
      
      // Tail fibers
      ctx.strokeStyle = `hsla(200, 60%, 55%, ${item.opacity * 0.5})`;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(-7, 52);
      ctx.quadraticCurveTo(-14, 62, -20, 72);
      ctx.moveTo(7, 52);
      ctx.quadraticCurveTo(14, 62, 20, 72);
      ctx.moveTo(-3, 52);
      ctx.quadraticCurveTo(-6, 62, -10, 72);
      ctx.moveTo(3, 52);
      ctx.quadraticCurveTo(6, 62, 10, 72);
      ctx.stroke();
      
      ctx.restore();
    };

    const drawBacillus = (item: FallingItem) => {
      ctx.save();
      ctx.translate(item.x, item.y);
      ctx.rotate(item.rotation);
      ctx.scale(item.scale, item.scale);
      
      // Pill shape (fully rounded rectangle)
      const width = 70;
      const height = 22;
      const radius = height / 2;
      
      ctx.beginPath();
      ctx.roundRect(-width / 2, -height / 2, width, height, radius);
      ctx.fillStyle = `hsla(155, 60%, 45%, ${item.opacity})`;
      ctx.fill();
      
      // Highlight
      ctx.beginPath();
      ctx.roundRect(-width / 2 + 5, -height / 2 + 4, width - 10, height / 3, radius / 2);
      ctx.fillStyle = `hsla(155, 60%, 60%, ${item.opacity * 0.3})`;
      ctx.fill();
      
      // Flagella
      ctx.strokeStyle = `hsla(155, 50%, 50%, ${item.opacity * 0.4})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-width / 2, 0);
      ctx.bezierCurveTo(-width / 2 - 18, -10, -width / 2 - 30, 10, -width / 2 - 42, 0);
      ctx.stroke();
      
      ctx.restore();
    };

    const drawCoccus = (item: FallingItem) => {
      ctx.save();
      ctx.translate(item.x, item.y);
      ctx.rotate(item.rotation);
      ctx.scale(item.scale, item.scale);
      
      // Diplococci
      ctx.beginPath();
      ctx.arc(-10, 0, 14, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(168, 76%, 40%, ${item.opacity})`;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(10, 0, 14, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(168, 70%, 45%, ${item.opacity * 0.9})`;
      ctx.fill();
      
      // Highlights
      ctx.beginPath();
      ctx.arc(-12, -5, 5, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(168, 76%, 60%, ${item.opacity * 0.3})`;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(8, -5, 5, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(168, 70%, 60%, ${item.opacity * 0.25})`;
      ctx.fill();
      
      ctx.restore();
    };

    resizeCanvas();
    initBioItems();
    window.addEventListener("resize", () => {
      resizeCanvas();
      initBioItems();
    });

    const speed = 1.8;
    const trailLength = 25;

    const animate = () => {
      // Semi-transparent overlay for trail effect
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      const totalColumns = columns.length;
      const sectionWidth = totalColumns / 4;

      ctx.font = `bold ${fontSize}px 'Space Grotesk', monospace`;
      ctx.textAlign = "center";

      // Draw falling characters for sections 1 (binary) and 4 (DNA)
      for (let i = 0; i < totalColumns; i++) {
        const section = Math.floor(i / sectionWidth);
        
        // Only draw text in sections 0 and 3
        if (section !== 0 && section !== 3) continue;

        const x = i * fontSize + fontSize / 2;
        const headY = columns[i] * lineHeight;

        // Draw trail
        for (let j = 0; j < trailLength; j++) {
          const y = headY - j * lineHeight;
          if (y < -lineHeight || y > window.innerHeight + lineHeight) continue;

          const charIndex = Math.abs(Math.floor(columns[i]) + j) % columnChars[i].length;
          const char = columnChars[i][charIndex];
          
          const fadeRatio = 1 - j / trailLength;
          const opacity = fadeRatio * 0.9;
          const isHead = j === 0;

          ctx.fillStyle = getColorForSection(section, char, isHead, opacity);
          
          if (isHead) {
            ctx.shadowColor = getColorForSection(section, char, true, 0.8);
            ctx.shadowBlur = 12;
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.fillText(char, x, y);
        }

        ctx.shadowBlur = 0;

        // Move column down
        columns[i] += speed * (0.5 + Math.random() * 0.5);

        // Reset when off screen
        if (columns[i] * lineHeight > window.innerHeight + trailLength * lineHeight) {
          columns[i] = Math.random() * -20;
          // Regenerate chars
          for (let j = 0; j < columnChars[i].length; j++) {
            columnChars[i][j] = getCharForColumn(i, totalColumns);
          }
        }
      }

      // Draw biological items
      const viewSectionWidth = window.innerWidth / 4;

      phageItems.forEach((item) => {
        drawPhage(item);
        item.y += item.speed;
        item.rotation += item.rotationSpeed;
        if (item.y > window.innerHeight + 100) {
          item.y = -100;
          item.x = viewSectionWidth + Math.random() * viewSectionWidth;
        }
      });

      bacteriaItems.forEach((item) => {
        if (item.type === "bacillus") {
          drawBacillus(item);
        } else {
          drawCoccus(item);
        }
        item.y += item.speed;
        item.rotation += item.rotationSpeed;
        if (item.y > window.innerHeight + 80) {
          item.y = -80;
          item.x = viewSectionWidth * 2 + Math.random() * viewSectionWidth;
          item.type = Math.random() > 0.5 ? "bacillus" : "coccus";
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default MatrixBackground;
