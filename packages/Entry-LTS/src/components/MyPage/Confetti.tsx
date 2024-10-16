import React, { useRef, useEffect } from 'react';

interface Confetti {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  angle: number;
  rotation: number;
  opacity: number;
}

const COLORS = [
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ffff00',
  '#ff00ff',
  '#00ffff',
  '#ff8000',
  '#8000ff',
  '#0080ff',
  '#ff0080',
];

const ConfettiComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const confetti: Confetti[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createConfetti = (): Confetti => ({
      x: Math.random() * canvas.width,
      y: -20,
      size: Math.random() * 5 + 5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      speed: Math.random() * 2 + 2,
      angle: Math.random() * Math.PI * 2,
      rotation: Math.random() * 0.1 - 0.05,
      opacity: 1,
    });

    const addConfetti = (count: number) => {
      for (let i = 0; i < count; i++) {
        confetti.push(createConfetti());
      }
    };

    const updateConfetti = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = confetti.length - 1; i >= 0; i--) {
        const particle = confetti[i];

        particle.y += particle.speed;
        particle.x += Math.sin(particle.angle) * 1.5;
        particle.angle += particle.rotation;
        particle.opacity -= 0.005;

        if (particle.opacity <= 0 || particle.y > canvas.height) {
          confetti.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.angle);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fillRect(
          -particle.size / 2,
          -particle.size / 2,
          particle.size,
          particle.size,
        );
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(updateConfetti);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    addConfetti(100);
    updateConfetti();

    const intervalId = setInterval(() => {
      if (confetti.length < 500) {
        addConfetti(10);
      }
    }, 100);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      clearInterval(intervalId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: 'block' }} />;
};

export default ConfettiComponent;
