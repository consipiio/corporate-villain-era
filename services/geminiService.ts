import { GoogleGenAI } from "@google/genai";
import { GenerationMode, Company, ToxicArchetype } from "../types";

const getClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
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
    // Vibe instruction is replaced by deterministic archetype, but we keep context just in case
    roastTask: "Write a 60-80 word roast predicting their future at this company. Connect their TOXIC PERSONALITY to the scandal.",
    eduTask: "Write a 30-40 word factual explanation of why this issue matters (ESG). No jokes, serious tone.",
    personas: {
      boomer: "Tone: Detached, slightly delusional, preaching 'hard work'. Phrases: 'Back in the 80s', 'Firm handshake'. End with: 'Honestly, just buckle down.'",
      millennial: "Tone: Imposter syndrome, burnout, anxious. Phrases: 'We're all complicit', 'Ethical consumption is impossible'. End with: 'But honestly, we're just teasing. You're doing your best 💕'",
      genz: "Tone: Unfiltered, heavy slang (no cap, bestie, giving). End with: 'But fr we're just roasting you with love, bestie. 💅'"
    }
  },
  fr: {
    context: "Langue de sortie : FRANÇAIS UNIQUEMENT. Culture : Internet France, Twitter FR, Twitch, références JVC 18-25, codes générationnels français.",
    roastTask: "Roast satirique de 60-80 mots. Cynisme français, critique du monde corporate/startup nation/bullshit jobs. Connecte leur ARCHÉTYPE TOXIQUE au scandale.",
    eduTask: "Explication factuelle de 30-40 mots sur l'enjeu ESG. Ton : Journalisme sérieux (Le Monde). Pas de blagues.",
    personas: {
      boomer: "Ton : Michel, 62 ans, lecteur du Figaro. Râle sur les 'wokes' et 'l'assistanat'. Phrases: 'De mon temps', 'Faut traverser la rue'. Fin: 'Allez, va bosser.'",
      millennial: "Ton : Trentenaire urbain, éco-anxieux mais consommateur, burnout, charge mentale. Phrases: 'En vrai c'est complexe', 'Je suis HPI'. Fin: 'Bref, je suis en PLS.'",
      genz: "Ton : Argot lourd (Wesh, Dinguerie, Masterclass, La hess, Cringe, Chockbar, Banger, Dead ça, Pick me, C’est Gucci). Cynisme total. Fin: 'Bref, c'est mort 💀'."
    }
  }
};

/**
 * OPTIMIZED: Generates Commentary and Education using the deterministic Toxic Archetype
 */
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
  // Cache key now includes archetype title
  const cacheKey = `${name}-${company.name}-${mode}-${years}-${isFrench}-${archetype.title}`;
  if (requestCache.has(cacheKey)) {
    return requestCache.get(cacheKey)!;
  }

  try {
    const ai = getClient();
    const lang = isFrench ? PROMPTS.fr : PROMPTS.en;
    const persona = lang.personas[mode];

    // Construct a single complex prompt asking for JSON output
    const prompt = `
      Role: Satirical AI Engine.
      ${lang.context}
      
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
         - Structure: "In ${years} years..." -> Connect archetype/job to scandal -> Personal wink -> Generational signature.
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
      // Fallback if JSON parsing fails (rare with responseMimeType)
      console.error("JSON Parse Error", e);
      data = {
        vibe: archetype.title,
        commentary: isFrench ? "Erreur de formatage. Le stagiaire a glissé." : "Formatting error. The intern tripped.",
        education: isFrench ? "Données corrompues." : "Data corrupted."
      };
    }

    // Cache the successful result
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

// Special case for 20y path (still separate as it's rarely called)
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