import { useEffect, useRef } from "react";

const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    
    const binaryChars = "01";
    const dnaChars = "ATCG";
    
    const fontSize = 16;
    const lineHeight = fontSize * 1.4;
    const columnSpacing = 60; // Even more spacing to avoid overlap

    interface Column {
      x: number;
      y: number;
      speed: number;
      chars: string[];
      section: number;
    }

    let columns: Column[] = [];

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      initColumns();
    };

    const getCharForSection = (section: number): string => {
      if (section === 0) {
        return binaryChars[Math.floor(Math.random() * binaryChars.length)];
      } else if (section === 3) {
        return dnaChars[Math.floor(Math.random() * dnaChars.length)];
      }
      return "";
    };

    const initColumns = () => {
      columns = [];
      const screenWidth = window.innerWidth;
      const sectionWidth = screenWidth / 4;
      
      // Section 0: Binary (left quarter)
      const section0Start = 0;
      const section0End = sectionWidth;
      for (let x = section0Start + columnSpacing / 2; x < section0End; x += columnSpacing) {
        const chars: string[] = [];
        for (let j = 0; j < 30; j++) {
          chars.push(getCharForSection(0));
        }
        columns.push({
          x,
          y: Math.random() * -50 - 10,
          speed: 0.08 + Math.random() * 0.12, // Much slower speed
          chars,
          section: 0,
        });
      }
      
      // Section 3: DNA (right quarter)
      const section3Start = sectionWidth * 3;
      const section3End = screenWidth;
      for (let x = section3Start + columnSpacing / 2; x < section3End; x += columnSpacing) {
        const chars: string[] = [];
        for (let j = 0; j < 30; j++) {
          chars.push(getCharForSection(3));
        }
        columns.push({
          x,
          y: Math.random() * -50 - 10,
          speed: 0.08 + Math.random() * 0.12, // Much slower speed
          chars,
          section: 3,
        });
      }
    };

    const getColorForSection = (section: number, char: string, isHead: boolean, opacity: number): string => {
      if (section === 0) {
        const lightness = isHead ? 70 : 42;
        return `hsla(168, 76%, ${lightness}%, ${opacity})`;
      } else if (section === 3) {
        let hue = 168;
        if (char === "A") hue = 0;
        else if (char === "T") hue = 35;
        else if (char === "C") hue = 200;
        else if (char === "G") hue = 140;
        
        const lightness = isHead ? 65 : 38;
        return `hsla(${hue}, 70%, ${lightness}%, ${opacity})`;
      }
      return "transparent";
    };

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
      
      ctx.fillStyle = `hsla(200, 70%, 45%, ${item.opacity * 0.8})`;
      ctx.fillRect(-2.5, 15, 5, 30);
      
      ctx.beginPath();
      ctx.moveTo(-10, 45);
      ctx.lineTo(10, 45);
      ctx.lineTo(12, 52);
      ctx.lineTo(-12, 52);
      ctx.closePath();
      ctx.fill();
      
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
      
      const width = 70;
      const height = 22;
      const radius = height / 2;
      
      ctx.beginPath();
      ctx.roundRect(-width / 2, -height / 2, width, height, radius);
      ctx.fillStyle = `hsla(155, 60%, 45%, ${item.opacity})`;
      ctx.fill();
      
      ctx.beginPath();
      ctx.roundRect(-width / 2 + 5, -height / 2 + 4, width - 10, height / 3, radius / 2);
      ctx.fillStyle = `hsla(155, 60%, 60%, ${item.opacity * 0.3})`;
      ctx.fill();
      
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
      
      ctx.beginPath();
      ctx.arc(-10, 0, 14, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(168, 76%, 40%, ${item.opacity})`;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(10, 0, 14, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(168, 70%, 45%, ${item.opacity * 0.9})`;
      ctx.fill();
      
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

    const trailLength = 18;

    const animate = () => {
      // Clear with slight fade for trail effect
      ctx.fillStyle = "rgba(253, 254, 254, 0.04)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.font = `bold ${fontSize}px 'Space Grotesk', monospace`;
      ctx.textAlign = "center";

      // Draw each unique column
      columns.forEach((col) => {
        const headY = col.y * lineHeight;

        for (let j = 0; j < trailLength; j++) {
          const y = headY - j * lineHeight;
          if (y < -lineHeight || y > window.innerHeight + lineHeight) continue;

          const charIndex = Math.abs(Math.floor(col.y) + j) % col.chars.length;
          const char = col.chars[charIndex];
          
          const fadeRatio = 1 - j / trailLength;
          const opacity = fadeRatio * 0.85;
          const isHead = j === 0;

          ctx.fillStyle = getColorForSection(col.section, char, isHead, opacity);
          
          if (isHead) {
            ctx.shadowColor = getColorForSection(col.section, char, true, 0.7);
            ctx.shadowBlur = 10;
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.fillText(char, col.x, y);
        }

        ctx.shadowBlur = 0;

        col.y += col.speed;

        if (col.y * lineHeight > window.innerHeight + trailLength * lineHeight) {
          col.y = Math.random() * -15 - 5;
          for (let j = 0; j < col.chars.length; j++) {
            col.chars[j] = getCharForSection(col.section);
          }
        }
      });

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
