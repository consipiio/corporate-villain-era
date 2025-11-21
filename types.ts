export type GenerationMode = "boomer" | "millennial" | "genz";

export interface Company {
  name: string;
  tagline: string;
  issue: string;
  location: string;
  realStory: string;
  sourceUrl: string; // Link to the real scandal source
}

export interface Resource {
  title: string;
  url: string;
}

export interface OfflineScandal {
  title: string;
  description: string;
  category: string; // Must match the wheel slices
  url: string;      // Link to source
}

export interface ToxicArchetype {
  title: string;
  description: string;
  job: string;
  viralQuote: string;
}

export interface Result {
  // vibe is now derived from archetype, but we keep the string for simple display if needed
  vibe?: string; 
  archetype?: ToxicArchetype; // The specific toxic personality
  score?: number;
  company?: Company;
  commentary: string; // The roast
  education?: string; // The fact check
  is20Years: boolean;
  errorType?: 'QUOTA' | 'GENERIC'; // To trigger the wheel
}

export interface GradientColors {
  bg: string;
  text: string;
  border: string;
}