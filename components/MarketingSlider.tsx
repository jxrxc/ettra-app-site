// components/MarketingSlider.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  className?: string;
};

export default function MarketingSlider({ className = "" }: Props) {
  const [sliderPosition, setSliderPosition] = useState(0); // 0 = Boring, 1 = Elevated

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(parseFloat(e.target.value));
  };

  return (
    <div className={`relative ${className}`}>
      {/* Slider Container */}
      <div className="relative bg-gradient-to-r from-gray-100 to-gray-200 rounded-full p-2 shadow-inner">
        {/* Slider Track */}
        <div className="relative h-12 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full overflow-hidden">
          {/* Background Labels */}
          <div className="absolute inset-0 flex items-center justify-between px-6 text-sm font-medium text-gray-600">
            <span>BORING</span>
            <span>ELEVATED</span>
          </div>
          
          {/* Slider Button */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={sliderPosition}
            onChange={handleSliderChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          
          {/* Animated Button */}
          <div
            className="absolute top-1 left-1 w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full shadow-lg transition-all duration-300 ease-out flex items-center justify-center"
            style={{
              transform: `translateX(${sliderPosition * (100 - 10)}%)`,
            }}
          >
            <div className="w-3 h-3 bg-white rounded-full shadow-inner"></div>
          </div>
        </div>
      </div>

      {/* Logo Display Area */}
      <div className="mt-8 flex justify-center">
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Boring State - Simple Square */}
          <div
            className="absolute inset-0 transition-all duration-500 ease-in-out"
            style={{
              opacity: 1 - sliderPosition,
              transform: `scale(${1 - sliderPosition * 0.3})`,
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center shadow-lg">
              <div className="text-center text-white font-bold text-xs leading-tight px-2">
                <div>UR</div>
                <div>CURRENT</div>
                <div>MARKETER</div>
              </div>
            </div>
          </div>

          {/* Elevated State - Ettra Logo */}
          <div
            className="absolute inset-0 transition-all duration-500 ease-in-out"
            style={{
              opacity: sliderPosition,
              transform: `scale(${0.7 + sliderPosition * 0.3})`,
            }}
          >
            <Image
              src="/ettra-logo-md.png"
              alt="Ettra Logo"
              width={128}
              height={128}
              className="w-full h-full object-contain drop-shadow-lg"
              priority
            />
          </div>
        </div>
      </div>

      {/* Status Text */}
      <div className="mt-4 text-center">
        <div className="text-lg font-semibold text-gray-700 transition-colors duration-300">
          {sliderPosition < 0.5 ? (
            <span className="text-gray-500">Basic Marketing</span>
          ) : (
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Elevated Branding
            </span>
          )}
        </div>
        <div className="text-sm text-gray-500 mt-1">
          {sliderPosition < 0.5 
            ? "Generic, forgettable, one-size-fits-all" 
            : "Cinematic, branded, effortless"
          }
        </div>
      </div>
    </div>
  );
}
