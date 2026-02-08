import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 40 }) => {
  return (
    <div 
      className={`relative flex items-center justify-center ${className}`} 
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Blue Background Square with Rounded Corners */}
        <rect width="100" height="100" rx="16" fill="#0078D4" />

        {/* The Bold 'A' Shape */}
        <path
          d="M50 15L20 85H32L38 70H62L68 85H80L50 15Z"
          fill="white"
        />

        {/* The 'ANUSH' Banner */}
        <rect x="25" y="44" width="50" height="12" fill="#0078D4" stroke="white" strokeWidth="1.5" />
        <text
          x="50"
          y="53"
          textAnchor="middle"
          fill="white"
          style={{ fontSize: '7px', fontWeight: 'bold', fontFamily: 'sans-serif', letterSpacing: '0.5px' }}
        >
          ANUSH
        </text>
      </svg>
    </div>
  );
};

export default Logo;
