import { COMPANIES } from './constants';
import { Company, GradientColors } from './types';

export function getScore(name: string, companyName: string): number {
  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i);
  }
  sum += companyName.length * 3;
  // Deterministic score between 20 and 80
  return (((sum % 61) + 61) % 61) + 20;
}

export function getCompanyForTimeline(name: string, years: number): Company {
  let sum = 0;
  for (let i = 0; i < name.length; i++) {
    sum += name.charCodeAt(i);
  }
  // Multiplier ensures different companies for different years
  sum += years * 7; 
  return COMPANIES[sum % COMPANIES.length];
}

export function getGradient(score: number): GradientColors {
  const n = (score - 20) / 60; // Normalize 0-1
  
  // Low score (Red) -> High score (Green/Toxic)
  // But satirically: High compatibility with villainy is "Green" (Success) but visually toxic
  
  if (n < 0.5) {
    // Red/Orange (Low compatibility)
    return { 
      bg: "from-red-500/20 to-orange-500/20",
      text: "text-red-400",
      border: "border-red-500/50"
    };
  } else {
    // Green/Toxic (High compatibility)
    return { 
      bg: "from-lime-500/20 to-green-500/20",
      text: "text-lime-400",
      border: "border-lime-500/50"
    };
  }
}

export function getTimelineLabel(years: number): string {
  if (years === 20) return "The Long Haul (20y)";
  return `${years} Year${years > 1 ? 's' : ''}`;
}