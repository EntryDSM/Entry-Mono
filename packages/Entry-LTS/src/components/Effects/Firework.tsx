import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { FireWorkHeap } from './models/FireWorkHeap';
import { Vector } from './models/Vector';
import { Firework } from './models/Firework';

const FullScreenCanvas = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const FireworksApp: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dimension = {
      width: canvas.width,
      height: canvas.height,
    };

    // Clear the canvas with a fully transparent background
    ctx.clearRect(0, 0, dimension.width, dimension.height);

    const GRAVITY = new Vector(0, 0.2);
    const fireworks = new FireWorkHeap();

    function animate() {
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fillRect(0, 0, dimension.width, dimension.height);

      if (Math.random() < 0.08) {
        fireworks.add(new Firework(ctx, fireworks, dimension, GRAVITY));
      }

      if (fireworks.removalStaged > 0 && fireworks.peek()?.finish) {
        fireworks.remove();
      }

      for (let i = 0; i < fireworks.storage.length; i++) {
        fireworks.storage[i]?.update();
        fireworks.storage[i]?.render();
      }

      requestAnimationFrame(animate);
    }

    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      dimension.width = canvas.width;
      dimension.height = canvas.height;
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <FullScreenCanvas ref={canvasRef} />;
};

export default FireworksApp;
