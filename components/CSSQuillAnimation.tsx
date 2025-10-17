"use client";

import { useState, useEffect } from 'react';

export default function CSSQuillAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Start animation sequence
    const timer1 = setTimeout(() => {
      setIsAnimating(true);
    }, 500);

    const timer2 = setTimeout(() => {
      setShowText(true);
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="relative w-full h-96 mb-8 overflow-hidden">
      {/* Animated Quill */}
      <div className={`absolute top-1/2 left-0 transform -translate-y-1/2 transition-all duration-3000 ease-in-out ${isAnimating ? 'translate-x-full' : 'translate-x-0'}`}>
        <div className="relative">
          {/* Quill Body */}
          <div className="w-1 h-16 bg-gradient-to-b from-[#FF5277] to-[#E85A7C] rounded-full relative">
            {/* Quill Tip */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-[#FF5277]"></div>
            {/* Quill Feather */}
            <div className="absolute -top-1 -right-2 w-6 h-8 bg-gradient-to-b from-[#E85A7C] to-[#FF5277] rounded-full transform rotate-12"></div>
            {/* Feather Details */}
            <div className="absolute -top-0.5 -right-1 w-4 h-6 bg-gradient-to-b from-[#FF5277] to-[#E85A7C] rounded-full transform rotate-6"></div>
          </div>
          
          {/* Ink Trail Effect */}
          <div className={`absolute top-1/2 left-0 w-32 h-0.5 bg-gradient-to-r from-[#FF6B6B] to-transparent transform -translate-y-1/2 transition-all duration-2000 delay-1000 ${isAnimating ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
        </div>
      </div>

      {/* Animated Text */}
      <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-2000 delay-1500 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="text-center">
          <p className="text-[20px] leading-relaxed text-[#FF6B6B] mb-3 animate-fade-in-up">
            Crafting the art & edge of selling beautifully.
          </p>
          <p className="text-[18px] md:text-[20px] leading-relaxed text-[#FF6B6B] font-bold animate-fade-in-up-delayed">
            Your listings. Cinematic. Branded. Effortless.
          </p>
        </div>
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-[#FF6B6B] rounded-full opacity-60 animate-float-${i + 1}`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
