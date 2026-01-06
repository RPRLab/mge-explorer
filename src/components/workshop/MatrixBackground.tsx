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
    
    const fontSize = 18;
    const columnSpacing = 55;
    const trailLength = 25;

    interface Column {
      x: number;
      y: number;
      speed: number;
      chars: string[];
      section: number;
    }

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

    let columns: Column[] = [];
    let phageItems: FallingItem[] = [];
    let bacteriaItems: FallingItem[] = [];

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      initColumns();
      initBioItems();
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
      
      // Section 0: Binary (left quarter) - unique X positions
      for (let x = columnSpacing / 2; x < sectionWidth; x += columnSpacing) {
        const chars: string[] = [];
        for (let j = 0; j < trailLength + 5; j++) {
          chars.push(getCharForSection(0));
        }
        columns.push({
          x,
          y: Math.random() * window.innerHeight * 0.5,
          speed: 0.8 + Math.random() * 1.2,
          chars,
          section: 0,
        });
      }
      
      // Section 3: DNA (right quarter) - unique X positions
      for (let x = sectionWidth * 3 + columnSpacing / 2; x < screenWidth; x += columnSpacing) {
        const chars: string[] = [];
        for (let j = 0; j < trailLength + 5; j++) {
          chars.push(getCharForSection(3));
        }
        columns.push({
          x,
          y: Math.random() * window.innerHeight * 0.5,
          speed: 0.8 + Math.random() * 1.2,
          chars,
          section: 3,
        });
      }
    };

    const initBioItems = () => {
      const sectionWidth = window.innerWidth / 4;
      
      phageItems = [];
      for (let i = 0; i < 8; i++) {
        phageItems.push({
          x: sectionWidth + Math.random() * sectionWidth,
          y: Math.random() * window.innerHeight,
          speed: 0.4 + Math.random() * 0.6,
          opacity: 0.15 + Math.random() * 0.15,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          scale: 0.2 + Math.random() * 0.15,
        });
      }
      
      bacteriaItems = [];
      for (let i = 0; i < 10; i++) {
        bacteriaItems.push({
          x: sectionWidth * 2 + Math.random() * sectionWidth,
          y: Math.random() * window.innerHeight,
          speed: 0.3 + Math.random() * 0.5,
          opacity: 0.15 + Math.random() * 0.15,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.008,
          scale: 0.35 + Math.random() * 0.25,
          type: Math.random() > 0.5 ? "bacillus" : "coccus",
        });
      }
    };

    const drawPhage = (item: FallingItem) => {
      ctx.save();
      ctx.translate(item.x, item.y);
      ctx.rotate(item.rotation);
      ctx.scale(item.scale, item.scale);
      
      // Head (icosahedral)
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
      
      // Base plate
      ctx.beginPath();
      ctx.moveTo(-10, 45);
      ctx.lineTo(10, 45);
      ctx.lineTo(12, 52);
      ctx.lineTo(-12, 52);
      ctx.closePath();
      ctx.fill();
      
      // Tail fibers
      ctx.strokeStyle = `hsla(200, 60%, 55%, ${item.opacity * 0.6})`;
      ctx.lineWidth = 1.5;
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
      
      // Highlight
      ctx.beginPath();
      ctx.roundRect(-width / 2 + 5, -height / 2 + 4, width - 10, height / 3, radius / 2);
      ctx.fillStyle = `hsla(155, 60%, 60%, ${item.opacity * 0.3})`;
      ctx.fill();
      
      // Flagellum
      ctx.strokeStyle = `hsla(155, 50%, 50%, ${item.opacity * 0.5})`;
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
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      // Clear canvas completely each frame
      ctx.clearRect(0, 0, w, h);

      ctx.font = `bold ${fontSize}px 'Courier New', monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      // Draw each column with trail
      columns.forEach((col) => {
        for (let i = 0; i < trailLength; i++) {
          const charY = col.y - i * fontSize * 1.2;
          
          if (charY < -fontSize || charY > h + fontSize) continue;
          
          const charIndex = (Math.floor(col.y / fontSize) + i) % col.chars.length;
          const char = col.chars[Math.abs(charIndex)];
          
          // Calculate opacity - head is brightest, fades down the trail
          const fadeRatio = 1 - i / trailLength;
          const opacity = fadeRatio * fadeRatio; // Quadratic fade for smoother trail
          
          const isHead = i === 0;
          
          // Color based on section
          if (col.section === 0) {
            // Binary - teal/green
            if (isHead) {
              ctx.fillStyle = `rgba(180, 255, 200, ${opacity})`;
              ctx.shadowColor = "rgba(100, 255, 150, 0.8)";
              ctx.shadowBlur = 15;
            } else {
              ctx.fillStyle = `hsla(168, 76%, ${45 - i * 1.2}%, ${opacity * 0.9})`;
              ctx.shadowBlur = 0;
            }
          } else if (col.section === 3) {
            // DNA - colored by base
            let hue = 168;
            if (char === "A") hue = 0;
            else if (char === "T") hue = 35;
            else if (char === "C") hue = 200;
            else if (char === "G") hue = 140;
            
            if (isHead) {
              ctx.fillStyle = `hsla(${hue}, 80%, 75%, ${opacity})`;
              ctx.shadowColor = `hsla(${hue}, 80%, 60%, 0.8)`;
              ctx.shadowBlur = 15;
            } else {
              ctx.fillStyle = `hsla(${hue}, 70%, ${40 - i * 1}%, ${opacity * 0.9})`;
              ctx.shadowBlur = 0;
            }
          }

          ctx.fillText(char, col.x, charY);
        }

        ctx.shadowBlur = 0;

        // Update position
        col.y += col.speed;

        // Reset when off screen
        if (col.y - trailLength * fontSize * 1.2 > h) {
          col.y = -fontSize * 2;
          // Regenerate characters
          for (let j = 0; j < col.chars.length; j++) {
            col.chars[j] = getCharForSection(col.section);
          }
        }
      });

      const sectionWidth = w / 4;

      // Draw and update phages
      phageItems.forEach((item) => {
        drawPhage(item);
        item.y += item.speed;
        item.rotation += item.rotationSpeed;
        if (item.y > h + 100) {
          item.y = -100;
          item.x = sectionWidth + Math.random() * sectionWidth;
        }
      });

      // Draw and update bacteria
      bacteriaItems.forEach((item) => {
        if (item.type === "bacillus") {
          drawBacillus(item);
        } else {
          drawCoccus(item);
        }
        item.y += item.speed;
        item.rotation += item.rotationSpeed;
        if (item.y > h + 80) {
          item.y = -80;
          item.x = sectionWidth * 2 + Math.random() * sectionWidth;
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
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
      aria-hidden="true"
    />
  );
};

export default MatrixBackground;
