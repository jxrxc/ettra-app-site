"use client";

import { useRef, useEffect, useState } from 'react';

export default function CanvasQuillAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [, setIsAnimating] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

    // Quill properties
    const quill = {
      x: -50,
      y: 150,
      width: 8,
      height: 60,
      angle: 0,
      featherSize: 25
    };

    // Text properties
    const textLines = [
      "Crafting the art & edge of selling beautifully.",
      "Your listings. Cinematic. Branded. Effortless."
    ];

    const drawQuill = (progress: number) => {
      const currentX = -50 + (canvas.width + 100) * progress;
      const currentY = 150 + Math.sin(progress * Math.PI * 2) * 10;
      const currentAngle = progress * Math.PI * 0.3;

      // Save context
      ctx.save();

      // Move to quill position and rotate
      ctx.translate(currentX, currentY);
      ctx.rotate(currentAngle);

      // Draw quill body (gradient)
      const bodyGradient = ctx.createLinearGradient(0, -quill.height/2, 0, quill.height/2);
      bodyGradient.addColorStop(0, '#FF5277');
      bodyGradient.addColorStop(1, '#E85A7C');
      
      ctx.fillStyle = bodyGradient;
      ctx.fillRect(-quill.width/2, -quill.height/2, quill.width, quill.height);

      // Draw quill tip
      ctx.beginPath();
      ctx.moveTo(0, quill.height/2);
      ctx.lineTo(-quill.width/2, quill.height/2 + 15);
      ctx.lineTo(quill.width/2, quill.height/2 + 15);
      ctx.closePath();
      ctx.fillStyle = '#FF5277';
      ctx.fill();

      // Draw feather
      const featherGradient = ctx.createLinearGradient(-quill.featherSize/2, -quill.height/2, quill.featherSize/2, -quill.height/2);
      featherGradient.addColorStop(0, 'transparent');
      featherGradient.addColorStop(0.3, '#E85A7C');
      featherGradient.addColorStop(1, '#FF5277');
      
      ctx.fillStyle = featherGradient;
      ctx.beginPath();
      ctx.ellipse(0, -quill.height/2 - 5, quill.featherSize/2, 12, 0, 0, Math.PI * 2);
      ctx.fill();

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

    const drawText = (progress: number) => {
      if (progress < 0.6) return;

      const textProgress = Math.min((progress - 0.6) / 0.4, 1);
      
      ctx.save();
      ctx.fillStyle = '#FF6B6B';
      ctx.font = '20px Montserrat, sans-serif';
      ctx.textAlign = 'center';

      // First line
      const firstLineY = 200;
      ctx.globalAlpha = Math.min(textProgress * 2, 1);
      ctx.fillText(textLines[0], canvas.width / 2, firstLineY);

      // Second line (delayed)
      if (textProgress > 0.5) {
        const secondLineY = firstLineY + 30;
        ctx.globalAlpha = Math.min((textProgress - 0.5) * 2, 1);
        ctx.font = 'bold 18px Montserrat, sans-serif';
        ctx.fillText(textLines[1], canvas.width / 2, secondLineY);
      }

      ctx.restore();
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
      drawText(progress);
      
      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setTimeout(() => setShowText(true), 500);
      }
    };

    // Start animation
    setIsAnimating(true);
    startTime = 0;
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

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
