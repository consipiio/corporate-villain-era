import { GoogleGenAI } from "@google/genai";
import { GenerationMode, Company, ToxicArchetype } from "../types";

const getClient = () => {
  const apiKey = import.meta.env.VITE_API_KEY || process.env.API_KEY;
  
  // Debug logging
  console.log('🔑 Checking API Key...');
  console.log('🔑 VITE_API_KEY exists:', !!import.meta.env.VITE_API_KEY);
  console.log('🔑 API Key loaded:', apiKey ? 'YES ✅' : 'NO ❌');
  if (apiKey) {
    console.log('🔑 First 10 chars:', apiKey.substring(0, 10));
  }
  
  return new GoogleGenAI({ 
    apiKey: apiKey
  });
};

/**
 * Simple in-memory cache to prevent re-fetching identical requests
 * Key: stringified parameters
 * Value: AnalysisResult
 */
const requestCache = new Map<string, AnalysisResult>();

interface AnalysisResult {
  vibe: string;
  commentary: string;
  education: string;
  errorType?: 'QUOTA' | 'GENERIC';
}

/**
 * Helper to detect Quota/Rate Limit errors
 * Enhanced to handle nested JSON error objects provided by Google APIs
 */
const isQuotaError = (error: any): boolean => {
  const msg = error?.message || error?.toString() || '';
  
  // 1. Check standard message strings
  if (msg.includes('429') || msg.includes('Quota') || msg.includes('RESOURCE_EXHAUSTED')) return true;
  
  // 2. Check deep object structure (e.g. { error: { code: 429 } })
  if (error?.status === 429 || error?.status === 'RESOURCE_EXHAUSTED') return true;
  if (error?.error?.code === 429 || error?.error?.status === 'RESOURCE_EXHAUSTED') return true;
  
  // 3. Last resort: Stringify the whole object to catch hidden error codes
  try {
    const stringified = JSON.stringify(error);
    return stringified.includes('429') || stringified.includes('RESOURCE_EXHAUSTED');
  } catch {
    return false;
  }
};

const PROMPTS = {
  en: {
    context: "Output Language: English. Context: Internet/TikTok culture.",
    roastTask: "Write a 60-80 word roast predicting THEIR future at this company. Use second person (YOU/YOUR) to address them DIRECTLY. Connect THEIR TOXIC PERSONALITY to the scandal. Talk TO them, not ABOUT them.",
    eduTask: "Write a 30-40 word factual explanation of why this issue matters (ESG). No jokes, serious tone.",
    personas: {
      boomer: "Tone: Detached, slightly delusional, preaching 'hard work'. Phrases: 'Back in the 80s', 'Firm handshake'. End with: 'Honestly, just buckle down.'",
      millennial: "Tone: Imposter syndrome, burnout, anxious. Phrases: 'We're all complicit', 'Ethical consumption is impossible'. End with: 'But honestly, we're just teasing. You're doing your best 💕'",
      genz: "Tone: Unfiltered, heavy slang (no cap, bestie, giving). End with: 'But fr we're just roasting you with love, bestie. 💅'"
    }
  },
  fr: {
    context: "Langue de sortie : FRANÇAIS UNIQUEMENT. Culture : Internet France, Twitter FR, Twitch, références JVC 18-25, codes générationnels français.",
    roastTask: "Roast satirique de 60-80 mots à destination du lecteur (TU/TON/TA). Cynisme français, critique du monde corporate/startup nation/bullshit jobs. Connecte leur ARCHÉTYPE TOXIQUE au scandale. IMPORTANT: Utilise la deuxième personne (TU) pour parler DIRECTEMENT à la personne. Accorde les adjectifs et participes passés selon le genre détecté.",
    eduTask: "Explication factuelle de 30-40 mots sur l'enjeu ESG. Ton : Journalisme sérieux (Le Monde). Pas de blagues.",
    personas: {
      boomer: "Ton : Michel, 62 ans, lecteur du Figaro. Râle sur les 'wokes' et 'l'assistanat'. Phrases non exhaustives: 'De mon temps', 'Faut traverser la rue'. Fin: 'Allez, va bosser.'",
      millennial: "Ton : Trentenaire urbain, éco-anxieux mais consommateur, burnout, charge mentale. Phrases non exhaustives: 'En vrai c'est complexe', 'Je suis HPI'. Fin: 'Bref, je suis en PLS.'",
      genz: "Ton : Argot lourd non exhaustif (Wesh, Dinguerie, Masterclass, La hess, Cringe, Chockbar, Banger, Dead ça, Pick me, C'est Gucci). Cynisme total. Fin: 'Bref, c'est mort 💀'."
    }
  }
};

/**
 * Simple gender detection for French grammar
 * Returns 'F' for likely female names, 'M' for male, 'N' for neutral/ambiguous
 */
const detectGender = (name: string): 'F' | 'M' | 'N' => {
  const nameLower = name.toLowerCase().trim();
  
  // Common French female name endings
  const femaleEndings = ['ine', 'elle', 'ette', 'ie', 'ée', 'lle', 'ane', 'ana'];
  // Common French female names
  const femaleNames = ['louise', 'marie', 'sophie', 'julie', 'claire', 'emma', 'léa', 'chloé', 'camille', 'sarah', 'laura', 'manon', 'lisa', 'lucie', 'anaïs', 'océane', 'marine', 'zoé', 'lilou', 'jade', 'alice', 'léna', 'nina', 'eva', 'mila', 'rose', 'lina', 'lou'];
  
  // Common French male name endings
  const maleEndings = ['ien', 'on', 'er', 'is', 'en', 'ain', 'in', 'el', 'im', 'an'];
  // Common French male names
  const maleNames = ['pierre', 'jean', 'paul', 'antoine', 'thomas', 'nicolas', 'alexandre', 'maxime', 'julien', 'romain', 'lucas', 'hugo', 'léo', 'nathan', 'louis', 'gabriel', 'arthur', 'raphael', 'theo', 'mathis', 'adam', 'simon', 'tom', 'enzo', 'jules', 'ethan'];
  
  // Check exact matches first
  if (femaleNames.includes(nameLower)) return 'F';
  if (maleNames.includes(nameLower)) return 'M';
  
  // Check specific endings (not 'e' alone as it's too generic)
  for (const ending of femaleEndings) {
    if (nameLower.endsWith(ending)) return 'F';
  }
  
  for (const ending of maleEndings) {
    if (nameLower.endsWith(ending)) return 'M';
  }
  
  // If ends with 'e' or 'a' -> likely female (after checking specific patterns)
  if (nameLower.endsWith('e') || nameLower.endsWith('a')) return 'F';
  
  // Default to neutral if can't determine
  return 'N';
};

export const generateAnalysis = async (
  name: string,
  company: Company,
  mode: GenerationMode,
  years: number,
  score: number,
  isFrench: boolean,
  archetype: ToxicArchetype
): Promise<AnalysisResult> => {
  
  // 1. Check Cache
  const cacheKey = `${name}-${company.name}-${mode}-${years}-${isFrench}-${archetype.title}`;
  if (requestCache.has(cacheKey)) {
    return requestCache.get(cacheKey)!;
  }

  try {
    const ai = getClient();
    const lang = isFrench ? PROMPTS.fr : PROMPTS.en;
    const persona = lang.personas[mode];
    
    // Detect gender for French grammar
    const gender = isFrench ? detectGender(name) : 'N';
    const genderNote = gender === 'F' 
      ? "La personne est féminine : utilise les accords féminins (tu es devenue, tu seras engagée, tu t'es retrouvée, connectée, etc.)." 
      : gender === 'M' 
      ? "La personne est masculine : utilise les accords masculins (tu es devenu, tu seras engagé, tu t'es retrouvé, connecté, etc.)."
      : "Genre indéterminé : utilise des formulations neutres quand possible ou privilégie le masculin neutre.";

    const prompt = `
      Role: Satirical AI Engine.
      ${lang.context}
      ${isFrench ? genderNote : ''}
      
      INPUT DATA:
      - Name: "${name}"
      - TOXIC ARCHETYPE (Use this personality): "${archetype.title}"
      - Current Role: "${archetype.job}"
      - Known for: "${archetype.description}"
      - Signature Catchphrase: "${archetype.viralQuote}"
      - Company: "${company.name}" (Scandal: ${company.issue})
      - Real Context: "${company.realStory}"
      - Years in future: ${years}
      - Guilt Score: ${score}%
      
      TASKS:
      1. VIBE: Return exactly: "${archetype.title}"
      2. ROAST: ${lang.roastTask} 
         - Incorporate their archetype ("${archetype.title}") and job ("${archetype.job}") into the prediction.
         - Persona Guide: ${persona}
         - CRITICAL: Use second person (${isFrench ? 'TU/TON/TA/TES' : 'YOU/YOUR'}) to address them DIRECTLY. Talk TO them, not ABOUT them.
         - Structure: ${isFrench ? `"Dans ${years} ans, TU seras ${gender === 'F' ? 'devenue' : 'devenu'} [job] chez ${company.name}..."` : `"In ${years} years, YOU will be [job] at ${company.name}..."`} -> Connect archetype/job to scandal -> Personal wink -> Generational signature.
      3. EDUCATION: ${lang.eduTask}

      OUTPUT FORMAT:
      Return ONLY a JSON object with this structure:
      {
        "vibe": "string",
        "commentary": "string",
        "education": "string"
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json" 
      }
    });

    const text = response.text?.trim() || "{}";
    let data: AnalysisResult;
    
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("JSON Parse Error", e);
      data = {
        vibe: archetype.title,
        commentary: isFrench ? "Erreur de formatage. Le stagiaire a glissé." : "Formatting error. The intern tripped.",
        education: isFrench ? "Données corrompues." : "Data corrupted."
      };
    }

    requestCache.set(cacheKey, data);
    return data;

  } catch (error) {
    const isQuota = isQuotaError(error);
    
    if (isQuota) {
      console.warn("API Quota Exceeded. Switching to offline mode.");
      return {
        vibe: "429",
        commentary: "",
        education: "",
        errorType: 'QUOTA'
      };
    }

    console.error("Generation Error:", error);

    const errorMsg = isFrench 
      ? "Erreur système. Réessayez."
      : "System Error. Try again.";

    return {
      vibe: archetype.title,
      commentary: errorMsg,
      education: errorMsg,
      errorType: 'GENERIC'
    };
  }
};

export const generateMindfulness = async (mode: GenerationMode, isFrench: boolean): Promise<string> => {
  try {
    const ai = getClient();
    const lang = isFrench ? PROMPTS.fr : PROMPTS.en;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        Task: Write a 50-80 word grounding/mindfulness message about the future (20 years from now).
        Language: ${isFrench ? "French" : "English"}
        Persona: ${lang.personas[mode]}
        Context: Acknowledge climate anxiety, encourage slowing down, focus on community. NO CORPORATE JOKES.
      `,
    });
    return response.text?.trim() || (isFrench ? "Respirez." : "Breathe.");
  } catch (error) {
    if (isQuotaError(error)) return "QUOTA_LIMIT";
    return isFrench ? "Erreur." : "Error.";
  }
};