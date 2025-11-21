import React, { useState } from 'react';
import { OfflineScandal } from '../types';
import { WHEEL_SLICES } from '../constants';
import { ArrowRight, BookOpen } from 'lucide-react';

// Made children optional to fix TS error in App.tsx
export const Card = ({ children, className = "" }: { children?: React.ReactNode; className?: string }) => (
  <div className={`bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden ${className}`}>
    {children}
  </div>
);

// Made children optional to fix TS error in App.tsx
export const Button = ({ 
  onClick, 
  disabled, 
  children, 
  variant = "primary",
  className = ""
}: { 
  onClick?: () => void; 
  disabled?: boolean; 
  children?: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
}) => {
  const base = "px-4 py-2 rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white shadow-lg shadow-purple-900/50 disabled:opacity-50 disabled:cursor-not-allowed",
    outline: "border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white bg-transparent",
    ghost: "text-slate-400 hover:text-white hover:bg-slate-800"
  };
  
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

// Made children optional to fix TS error in App.tsx
export const Badge = ({ children, className = "" }: { children?: React.ReactNode; className?: string }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${className}`}>
    {children}
  </span>
);

export const Input = ({ 
  value, 
  onChange, 
  placeholder,
  className = ""
}: { 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
}) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-slate-600 transition-all ${className}`}
  />
);

export const SelectButton = ({ 
  selected, 
  onClick, 
  label 
}: { 
  selected: boolean; 
  onClick: () => void; 
  label: string 
}) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
      selected 
        ? "bg-purple-900/30 border-purple-500 text-purple-200" 
        : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600"
    }`}
  >
    {label}
  </button>
);

export const WheelOfMisfortune = ({ 
  scandals, 
  isFrench 
}: { 
  scandals: OfflineScandal[], 
  isFrench: boolean 
}) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<OfflineScandal | null>(null);

  const slices = WHEEL_SLICES;
  // Neon/Vibrant colors for the dark theme
  const sliceColors = [
    '#fbbf24', // Financial - Amber
    '#ef4444', // Labor - Red
    '#10b981', // Environmental - Emerald
    '#60a5fa', // Privacy - Blue
    '#d946ef', // Product Safety - Fuchsia
  ];

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    // Calculate random rotation (min 5 spins = 1800 deg)
    const randomOffset = Math.floor(Math.random() * 360);
    const totalRotation = 1800 + randomOffset;
    
    // Calculate which segment lands at the TOP (0 deg)
    const finalAngle = totalRotation % 360;
    const segmentAngle = 360 / slices.length;
    // Wheel rotates clockwise, so we check what lands at 0 (top)
    // We adjust because the CSS conic gradient starts at 0deg (top)
    const indexAtTop = Math.floor(((360 - finalAngle) % 360) / segmentAngle);
    
    const category = slices[indexAtTop];

    const categoryScandals = scandals.filter(s => s.category === category || (s.category.includes('Labor') && category.includes('Labor')));
    
    const finalScandal = categoryScandals.length > 0 
      ? categoryScandals[Math.floor(Math.random() * categoryScandals.length)]
      : scandals[0];

    setRotation(rotation + totalRotation);

    setTimeout(() => {
      setSpinning(false);
      setResult(finalScandal);
    }, 3000);
  };

  // Create conic gradient string dynamically
  const gradientString = sliceColors.map((color, i) => {
    const start = (i * 100) / sliceColors.length;
    const end = ((i + 1) * 100) / sliceColors.length;
    return `${color} ${start}% ${end}%`;
  }).join(', ');

  return (
    <div className="flex flex-col items-center space-y-12 p-6">
      <div className="text-center space-y-2">
        {/* Satirical "Planet Saved" Header */}
        <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
          {isFrench ? "PLANÈTE SAUVÉE (OU PRESQUE) 🌿" : "PLANET SAVED (KINDA) 🌿"}
        </h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
          {isFrench 
            ? "L'IA fait une pause forcée (ok, on a explosé le quota). Mais bonne nouvelle : ce refus a économisé 0.4g de CO2 ! Voici une roue 100% mécanique, bio et bas-voltage pour vous occuper." 
            : "The AI refused to work to lower its carbon footprint (okay, we hit the limit). But hey, you just saved 0.4g of CO2! Enjoy this locally-sourced, organic, low-voltage scandal wheel instead."}
        </p>
      </div>

      {/* Added mt-10 for spacing and removed scale-110 on mobile for responsiveness */}
      <div className="relative group cursor-pointer md:scale-110 mt-10" onClick={handleSpin}>
        {/* Pointer */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 filter drop-shadow-xl">
           <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[24px] border-t-white"></div>
        </div>
        
        {/* Outer Rim glow */}
        <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-20 blur-xl animate-pulse"></div>

        {/* The Wheel - Responsive Sizing */}
        <div 
          className="w-64 h-64 sm:w-72 sm:h-72 rounded-full border-8 border-slate-800 relative shadow-2xl transition-transform duration-[3000ms] cubic-bezier(0.25, 0.1, 0.25, 1) overflow-hidden"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            background: `conic-gradient(${gradientString})`
          }}
        >
          {/* Shine overlay */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent pointer-events-none"></div>
          
          {/* Divider Lines (No Titles) */}
          {slices.map((_, i) => (
             <div 
                key={i}
                className="absolute top-0 left-1/2 w-0.5 h-1/2 bg-slate-900/20 origin-bottom"
                style={{ transform: `translateX(-50%) rotate(${i * (360 / slices.length)}deg)` }}
             />
          ))}

          {/* Center Hub */}
          <div className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-slate-900 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center z-10 border-4 border-slate-800">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-slate-700">
               <span className="text-xs font-black text-slate-300 tracking-widest">SPIN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Result Card */}
      {result && (
        <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl animate-[fadeIn_0.5s_ease-out] w-full max-w-md relative overflow-hidden shadow-2xl">
           {/* Color bar matching category */}
           <div className="absolute top-0 left-0 w-1 h-full" style={{ 
             backgroundColor: sliceColors[slices.indexOf(result.category)] || '#ccc' 
           }}></div>
           
          <div className="flex flex-col gap-4 pl-2">
            <div className="flex justify-between items-start">
              <Badge className="bg-slate-800 text-slate-200 border border-slate-600">{result.category}</Badge>
              <a 
                href={result.url} 
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                Source <BookOpen className="w-3 h-3" />
              </a>
            </div>
            
            <h4 className="font-bold text-white text-xl leading-tight">{result.title}</h4>
            <p className="text-slate-300 text-sm leading-relaxed">{result.description}</p>
            
            <Button 
                onClick={() => window.open(result.url, '_blank')} 
                variant="primary" 
                className="mt-2 w-full text-xs"
            >
                {isFrench ? "Lire l'Enquête Complète" : "Read Full Report"} <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      )}

      {!result && !spinning && (
        <Button onClick={handleSpin} variant="outline" className="w-full">
          {isFrench ? "Lancer la Roue Bio & Locale" : "Spin the Organic Wheel"}
        </Button>
      )}
    </div>
  );
};