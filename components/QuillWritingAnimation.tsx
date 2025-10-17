"use client";

import { useEffect, useState } from 'react';

export default function QuillWritingAnimation() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, 1000);

    // Show text after quill animation completes
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 4000);

    return () => {
      clearTimeout(timer);
      clearTimeout(textTimer);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mb-8 max-w-2xl mx-auto">
      {/* SVG Animation Container */}
      <div className="relative mb-8">
        <svg 
          width="300" 
          height="120" 
          viewBox="0 0 300 120" 
          className="responsive-logo"
        >
          {/* Static Quill Path (initial state) */}
          <path
            d="M50 80 Q60 70 70 75 Q80 80 90 75 Q100 70 110 75 Q120 80 130 75 Q140 70 150 75 L160 80 L155 85 Q145 90 135 85 Q125 80 115 85 Q105 90 95 85 Q85 80 75 85 Q65 90 55 85 Z"
            fill="#FF5277"
            stroke="#FF5277"
            strokeWidth="2"
            className={`transition-all duration-1000 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
          />
          
          {/* Static Quill Tip (initial state) */}
          <path
            d="M155 85 L165 90 L160 95 L155 90 Z"
            fill="#FF5277"
            className={`transition-all duration-1000 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
          />

          {/* Text Line 1 Path */}
          <path
            id="text1"
            d="M20 40 Q50 35 80 40 Q110 45 140 40 Q170 35 200 40 Q230 45 260 40"
            fill="none"
            stroke="#FF6B6B"
            strokeWidth="2"
            strokeDasharray="240"
            strokeDashoffset={showText ? "0" : "240"}
            className="transition-all duration-2000 ease-in-out"
          />

          {/* Text Line 2 Path */}
          <path
            id="text2"
            d="M20 70 Q50 65 80 70 Q110 75 140 70 Q170 65 200 70 Q230 75 260 70"
            fill="none"
            stroke="#FF6B6B"
            strokeWidth="2"
            strokeDasharray="240"
            strokeDashoffset={showText ? "0" : "240"}
            className="transition-all duration-2000 ease-in-out"
            style={{ transitionDelay: '0.5s' }}
          />

          {/* Animated Quill Movement */}
          <g className={`transition-all duration-3000 ease-in-out ${isAnimating ? 'translate-x-32' : 'translate-x-0'}`}>
            <path
              d="M50 80 Q60 70 70 75 Q80 80 90 75 Q100 70 110 75 Q120 80 130 75 Q140 70 150 75 L160 80 L155 85 Q145 90 135 85 Q125 80 115 85 Q105 90 95 85 Q85 80 75 85 Q65 90 55 85 Z"
              fill="#FF5277"
              stroke="#FF5277"
              strokeWidth="2"
              className={`transition-opacity duration-500 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
            />
            <path
              d="M155 85 L165 90 L160 95 L155 90 Z"
              fill="#FF5277"
              className={`transition-opacity duration-500 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
            />
          </g>
        </svg>
      </div>

      {/* Text Content */}
      <div className={`transition-all duration-1000 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <p className="text-[20px] leading-relaxed text-[#FF6B6B] mb-3">
          Crafting the art & edge of selling beautifully.
        </p>
        <p className="text-[18px] md:text-[20px] leading-relaxed text-[#FF6B6B] font-bold">
          Your listings. Cinematic. Branded. Effortless.
        </p>
      </div>
    </div>
  );
}
