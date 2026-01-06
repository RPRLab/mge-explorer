import { useEffect, useRef } from "react";

interface Column {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  opacity: number;
}

const MatrixBackground = () => {
  const canvasLeftRef = useRef<HTMLCanvasElement>(null);
  const canvasRightRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const binaryChars = ["0", "1"];
    const dnaChars = ["A", "T", "C", "G"];

    const initCanvas = (
      canvas: HTMLCanvasElement,
      chars: string[],
      color: string
    ) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      const resizeCanvas = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      const fontSize = 14;
      const columnCount = Math.floor(canvas.width / fontSize);
      const columns: Column[] = [];

      for (let i = 0; i < columnCount; i++) {
        columns.push({
          x: i * fontSize,
          y: Math.random() * canvas.height,
          speed: 0.5 + Math.random() * 1.5,
          chars: Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]),
          opacity: 0.1 + Math.random() * 0.3,
        });
      }

      return { ctx, columns, fontSize, color, chars, cleanup: () => window.removeEventListener("resize", resizeCanvas) };
    };

    const animate = (
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      columns: Column[],
      fontSize: number,
      color: string,
      chars: string[]
    ) => {
      ctx.fillStyle = "rgba(250, 253, 252, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      columns.forEach((col) => {
        col.chars.forEach((char, i) => {
          const y = col.y + i * fontSize;
          if (y > 0 && y < canvas.height) {
            const fadeOpacity = i === 0 ? col.opacity : col.opacity * (1 - i / col.chars.length);
            ctx.fillStyle = `hsla(${color}, ${fadeOpacity})`;
            ctx.font = `${fontSize}px Space Grotesk, monospace`;
            ctx.fillText(char, col.x, y);
          }
        });

        col.y += col.speed;

        if (col.y > canvas.height + fontSize * col.chars.length) {
          col.y = -fontSize * col.chars.length;
          col.chars = Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]);
        }

        if (Math.random() < 0.01) {
          const idx = Math.floor(Math.random() * col.chars.length);
          col.chars[idx] = chars[Math.floor(Math.random() * chars.length)];
        }
      });
    };

    const leftCanvas = canvasLeftRef.current;
    const rightCanvas = canvasRightRef.current;

    if (!leftCanvas || !rightCanvas) return;

    const leftState = initCanvas(leftCanvas, binaryChars, "200, 80%, 45%");
    const rightState = initCanvas(rightCanvas, dnaChars, "168, 76%, 36%");

    if (!leftState || !rightState) return;

    let animationId: number;
    const loop = () => {
      animate(leftState.ctx, leftCanvas, leftState.columns, leftState.fontSize, leftState.color, binaryChars);
      animate(rightState.ctx, rightCanvas, rightState.columns, rightState.fontSize, rightState.color, dnaChars);
      animationId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animationId);
      leftState.cleanup();
      rightState.cleanup();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasLeftRef}
        className="absolute top-0 left-0 w-32 md:w-48 h-full pointer-events-none opacity-60"
        aria-hidden="true"
      />
      <canvas
        ref={canvasRightRef}
        className="absolute top-0 right-0 w-32 md:w-48 h-full pointer-events-none opacity-60"
        aria-hidden="true"
      />
    </>
  );
};

export default MatrixBackground;
