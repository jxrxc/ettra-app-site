"use client";

import { useRef, useEffect, useState } from 'react';

export default function CanvasQuillAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [, setIsAnimating] = useState(false);
  const [showText, setShowText] = useState(false);
  const [quillImage, setQuillImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load the quill image
    const img = new Image();
    img.onload = () => {
      setQuillImage(img);
    };
    img.src = '/ettra-logo-full.png';

    // Set canvas size
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = 300;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation variables
    let animationId: number;
    let startTime = 0;
    const duration = 3000; // 3 seconds

    // Animation properties

    // Animation ready

    const drawQuill = (progress: number) => {
      if (!quillImage) return;

      const currentX = -50 + (canvas.width + 100) * progress;
      const currentY = 150 + Math.sin(progress * Math.PI * 2) * 10;
      const currentAngle = progress * Math.PI * 0.2;

      // Save context
      ctx.save();

      // Move to quill position and rotate
      ctx.translate(currentX, currentY);
      ctx.rotate(currentAngle);

      // Draw the quill image (scaled down)
      const quillWidth = 60;
      const quillHeight = 60;
      ctx.drawImage(quillImage, -quillWidth/2, -quillHeight/2, quillWidth, quillHeight);

      // Draw ink trail
      if (progress > 0.1) {
        const trailLength = Math.min(progress * 200, 150);
        const trailGradient = ctx.createLinearGradient(-trailLength, 0, 0, 0);
        trailGradient.addColorStop(0, 'rgba(255, 107, 107, 0)');
        trailGradient.addColorStop(0.3, 'rgba(255, 107, 107, 0.8)');
        trailGradient.addColorStop(1, 'rgba(255, 107, 107, 0.3)');
        
        ctx.fillStyle = trailGradient;
        ctx.fillRect(-trailLength, -2, trailLength, 4);
      }

      // Restore context
      ctx.restore();
    };

    const drawText = () => {
      // Text is now handled by the static component below, not drawn on canvas
      // This prevents duplicate text
    };

    const drawParticles = (progress: number) => {
      const particleCount = 8;
      
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2 + progress * Math.PI;
        const radius = 20 + Math.sin(progress * Math.PI * 2 + i) * 10;
        const x = canvas.width / 2 + Math.cos(angle) * radius;
        const y = canvas.height / 2 + Math.sin(angle) * radius;
        
        ctx.save();
        ctx.globalAlpha = 0.3 + Math.sin(progress * Math.PI * 4 + i) * 0.2;
        ctx.fillStyle = '#FF6B6B';
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const animate = (currentTime: number) => {
      if (startTime === 0) startTime = currentTime;
      
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw elements
      drawParticles(progress);
      drawQuill(progress);
      drawText();
      
      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setTimeout(() => setShowText(true), 500);
      }
    };

    // Start animation only when quill image is loaded
    const startAnimation = () => {
      if (quillImage) {
        setIsAnimating(true);
        startTime = 0;
        animationId = requestAnimationFrame(animate);
      }
    };

    startAnimation();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [quillImage]); // Restart animation when image loads

  return (
    <div className="w-full mb-8">
      {/* Canvas Animation */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-[300px]"
          style={{ background: 'transparent' }}
        />
      </div>

      {/* Static Text (shown after animation) */}
      {showText && (
        <div className="text-center animate-fade-in">
          <p className="text-[20px] leading-relaxed text-[#FF6B6B] mb-3">
            Crafting the art & edge of selling beautifully.
          </p>
          <p className="text-[18px] md:text-[20px] leading-relaxed text-[#FF6B6B] font-bold">
            Your listings. Cinematic. Branded. Effortless.
          </p>
        </div>
      )}
    </div>
  );
}
