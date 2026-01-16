import React, { useEffect, useState } from 'react';

export const BackgroundLeaves: React.FC = () => {
  const [leaves, setLeaves] = useState<number[]>([]);

  useEffect(() => {
    // Create an array of random items to render leaves
    setLeaves(Array.from({ length: 15 }, (_, i) => i));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Animated Gradient Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-lime-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      
      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150"></div>

      {/* Seasonal Tree SVG - Bottom Right */}
      <div className="absolute bottom-0 right-[-100px] md:right-[-50px] opacity-40 md:opacity-50 transform scale-75 md:scale-100 origin-bottom-right transition-opacity duration-1000">
        <svg width="600" height="600" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            {/* Trunk */}
            <path className="animate-season-trunk" d="M100 180 Q105 140 100 100 Q95 80 80 60 L85 65 Q100 85 105 100 Q110 80 130 60 L125 65 Q110 85 105 100 Q105 140 110 180 Z" />
            
            {/* Foliage Groups */}
            <g className="animate-season-foliage">
                <circle cx="80" cy="50" r="25" />
                <circle cx="130" cy="50" r="25" />
                <circle cx="105" cy="30" r="30" />
                <circle cx="60" cy="70" r="20" />
                <circle cx="150" cy="70" r="20" />
                
                {/* Extra foliage details */}
                <circle cx="90" cy="60" r="20" />
                <circle cx="120" cy="60" r="20" />
            </g>
        </svg>
      </div>

      {/* Falling Leaves */}
      {leaves.map((i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = 15 + Math.random() * 15;
        const scale = 0.6 + Math.random() * 0.6;
        
        return (
          <div
            key={i}
            className="leaf"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              transform: `scale(${scale})`
            }}
          />
        );
      })}
    </div>
  );
};