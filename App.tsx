import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  BrainCircuit, 
  Leaf, 
  AlertTriangle, 
  Globe, 
  ArrowRight, 
  RefreshCw,
  TrendingUp,
  Droplets,
  CloudFog,
  Info,
  Users,
  Hammer,
  BookOpenCheck,
  Quote,
  ScanFace
} from 'lucide-react';
import { GenerationMode, Result, ToxicArchetype } from './types';
import { 
  ESG_RESOURCES, 
  CLIMATE_RESOURCES, 
  AI_IMPACT_RESOURCE, 
  OFFLINE_SCANDALS, 
  ADAPTATION_TIPS, 
  ADAPTATION_LINKS,
  pickToxicArchetype 
} from './constants';
import { getCompanyForTimeline, getScore, getGradient } from './utils';
import { generateAnalysis, generateMindfulness } from './services/geminiService';
import { Card, Button, Input, Badge, SelectButton, WheelOfMisfortune } from './components/UIComponents';

const App: React.FC = () => {
  const [name, setName] = useState("");
  const [genMode, setGenMode] = useState<GenerationMode>("millennial");
  const [years, setYears] = useState(5);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [isFrench, setIsFrench] = useState(false);
  
  // Define valid timeline options for the slider
  const timelineOptions = [1, 5, 10, 15, 20];

  // Helper for simple translations
  const t = (en: string, fr: string) => isFrench ? fr : en;

  // Reset result if name changes
  useEffect(() => {
    if (name === "") {
      setResult(null);
    }
  }, [name]);

  const handleExpose = async () => {
    if (!name.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      // 1. Determine Toxic Archetype (Deterministic based on name)
      const archetype = pickToxicArchetype(name, isFrench);

      // 2. Check for Special 20 Year Path
      if (years === 20) {
        const mindfulnessMsg = await generateMindfulness(genMode, isFrench);
        
        // Handle Quota error in mindfulness
        if (mindfulnessMsg === "QUOTA_LIMIT") {
           setResult({
            vibe: archetype.title,
            archetype: archetype,
            commentary: "",
            is20Years: true,
            errorType: 'QUOTA'
          });
        } else {
          setResult({
            vibe: archetype.title,
            archetype: archetype,
            commentary: mindfulnessMsg,
            is20Years: true
          });
        }
      } else {
        // 3. Normal Corporate Path - Pass Archetype to AI
        const company = getCompanyForTimeline(name, years);
        const score = getScore(name, company.name);
        
        // Call the single optimized function with the archetype
        const analysis = await generateAnalysis(
          name,
          company,
          genMode,
          years,
          score,
          isFrench,
          archetype
        );

        if (analysis.errorType === 'QUOTA') {
           setResult({
            vibe: "",
            score,
            company,
            commentary: "",
            education: "",
            is20Years: false,
            errorType: 'QUOTA'
          });
        } else {
          setResult({
            vibe: analysis.vibe,
            archetype: archetype,
            score,
            company,
            commentary: analysis.commentary,
            education: analysis.education,
            is20Years: false
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getIconForTip = (id: string) => {
    switch(id) {
      case 'community': return <Users className="w-5 h-5 text-emerald-400" />;
      case 'water': return <Droplets className="w-5 h-5 text-cyan-400" />;
      case 'lowtech': return <Hammer className="w-5 h-5 text-orange-400" />;
      default: return <Leaf className="w-5 h-5 text-green-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 flex flex-col items-center selection:bg-purple-500/30 relative">
      
      {/* Language Toggle */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
        <button
          onClick={() => {
            setIsFrench(!isFrench);
            // Reset simulation when language changes to avoid mixed languages
            setResult(null);
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
            isFrench 
              ? "bg-blue-900/40 border-blue-500 text-blue-200" 
              : "bg-slate-900 border-slate-700 text-slate-400 hover:text-white"
          }`}
        >
          <span className="text-lg">{isFrench ? "🇫🇷" : "🇺🇸"}</span>
          <span className="text-xs font-bold uppercase tracking-wider">
            {isFrench ? "Mode Baguette" : "American Dream"}
          </span>
        </button>
      </div>

      {/* Header */}
      <header className="max-w-2xl w-full mb-12 text-center space-y-4 pt-12 md:pt-4">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-xl mb-4">
          <Briefcase className="w-8 h-8 text-purple-400 mr-3" />
          <h1 className="text-3xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 tracking-tight">
            Corporate Villain Era
          </h1>
        </div>
        <p className="text-slate-400 text-lg font-light">
          {t("Discover your inevitable unethical future.", "Prédiction de ton avenir coupable.")}
        </p>
        
        {/* Signature */}
        <div className="mt-6 flex items-center justify-center animate-[fadeIn_1s_ease-out]">
          <div className="relative group">
             <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
             <div className="relative px-6 py-2.5 bg-slate-900/80 backdrop-blur-xl ring-1 ring-white/10 rounded-full flex items-center gap-4 md:gap-6 shadow-2xl">
                
                {/* Left Side */}
                <div className="flex flex-col items-center leading-tight">
                   <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-0.5">{t("Vibe by", "Vibe par")}</span>
                   <span className="text-sm font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 font-display">
                      Louise S.
                   </span>
                </div>
                
                {/* Divider */}
                <div className="h-8 w-px bg-slate-700/50"></div>
                
                {/* Right Side */}
                <div className="flex flex-col items-center leading-tight">
                   <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-0.5">{t("Roasts by", "Insultes par")}</span>
                   <div className="flex items-center gap-1">
                      <span className="text-sm font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 font-display">
                        Gemini
                      </span>
                      <span className="text-[9px] px-1 py-0.5 bg-slate-800 rounded text-slate-500 -mt-3 ml-0.5">2.5</span>
                   </div>
                </div>

             </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl w-full space-y-8">
        
        {/* Controls Card */}
        <Card className="p-6 md:p-8 bg-slate-900/80 backdrop-blur">
          <div className="space-y-6">
            
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                {t("Your Name", "Ton prénom")}
              </label>
              <Input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder={t("E.g. Alex El Alaoui", "Ex: Zoubida Dubosc")}
              />
            </div>

            {/* Generation Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                {t("Who's Roasting You?", "Choisis ton juge")}
              </label>
              <div className="grid grid-cols-3 gap-2">
                <SelectButton selected={genMode === 'boomer'} onClick={() => setGenMode('boomer')} label="Boomer" />
                <SelectButton selected={genMode === 'millennial'} onClick={() => setGenMode('millennial')} label="Millennial" />
                <SelectButton selected={genMode === 'genz'} onClick={() => setGenMode('genz')} label="Gen Z" />
              </div>
            </div>

            {/* Timeline Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  {t("Timeline Projection", "Combien de temps avant de vendre ton âme ?")}
                </label>
                <Badge className={years === 20 ? "bg-emerald-900 text-emerald-200 border border-emerald-700" : "bg-slate-800 text-slate-300"}>
                  {years === 20 
                    ? t("The Long Haul", "Le Marathon") 
                    : `+${years} ${t("Years", "Ans")}`
                  }
                </Badge>
              </div>
              <input 
                type="range" 
                min="1" 
                max="5" 
                step="1"
                value={timelineOptions.indexOf(years) + 1}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setYears(timelineOptions[val - 1]);
                }}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              <div className="flex justify-between text-xs text-slate-600 font-mono">
                <span>1y</span><span>5y</span><span>10y</span><span>15y</span><span className="text-emerald-600 font-bold">20y</span>
              </div>
            </div>

            {/* Action Button */}
            <Button 
              onClick={handleExpose} 
              disabled={!name.trim() || loading} 
              className="w-full py-4 text-lg"
            >
              {loading ? (
                <>
                  <BrainCircuit className="w-5 h-5 animate-spin" />
                  {t("Analyzing Moral Flexibility...", "Analyse de ta souplesse morale...")}
                </>
              ) : (
                <>
                  {t("Expose My Match", "Révéler mon match")}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Results Area */}
        {result && (
          <div className="space-y-6 animate-[fadeIn_0.7s_ease-out]">
            
            {/* === PATH SPLIT: QUOTA vs NORMAL === */}
            {result.errorType === 'QUOTA' ? (
              <Card className="p-8 border-red-900/50 bg-slate-900/90">
                 <WheelOfMisfortune scandals={OFFLINE_SCANDALS} isFrench={isFrench} />
              </Card>
            ) : (
              <>
                {/* ID Card Style Archetype (Full Width) */}
                {result.archetype && (
                  <div className="w-full">
                    <div className="relative overflow-hidden bg-slate-900/90 border border-slate-700 rounded-xl shadow-xl backdrop-blur-sm">
                       {/* Decorative ID Bar */}
                       <div className="h-2 w-full bg-gradient-to-r from-purple-600 to-pink-600"></div>
                       
                       <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center">
                          {/* Left: Avatar/Photo Placeholder */}
                          <div className="shrink-0">
                             <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-600 flex items-center justify-center shadow-inner">
                                <ScanFace className="w-10 h-10 text-purple-400 opacity-80" />
                             </div>
                          </div>

                          {/* Middle: Identity Details */}
                          <div className="flex-1 space-y-1">
                             <div className="flex items-center gap-2 mb-1">
                                <Badge className="bg-purple-900/30 text-purple-300 border border-purple-500/30 text-[10px]">
                                  {t("PERSONA DETECTED", "PERSONA DÉTECTÉE")}
                                </Badge>
                             </div>
                             <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
                                {result.archetype.title}
                             </h3>
                             <p className="text-purple-400 font-bold text-sm flex items-center gap-2">
                                <Briefcase className="w-4 h-4" />
                                {result.archetype.job}
                             </p>
                          </div>

                          {/* Right: Quote & Desc (Desktop) */}
                          <div className="md:w-1/2 bg-slate-950/50 rounded-lg p-4 border border-slate-800/50">
                             <p className="text-slate-300 text-sm italic mb-2 flex gap-2">
                                <Quote className="w-4 h-4 text-slate-600 shrink-0" />
                                "{result.archetype.viralQuote}"
                             </p>
                             <p className="text-xs text-slate-500 border-t border-slate-800 pt-2 mt-2">
                                {result.archetype.description}
                             </p>
                          </div>
                       </div>
                    </div>
                  </div>
                )}

                {/* 20 Year Special Path UI */}
                {result.is20Years ? (
                  <Card className="bg-gradient-to-br from-emerald-900/30 to-slate-900 border-emerald-800/50">
                    <div className="p-8 md:p-12 text-center space-y-6">
                      <div className="flex justify-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 animate-pulse-slow"></div>
                          <Leaf className="w-16 h-16 text-emerald-400 relative z-10" />
                        </div>
                      </div>
                      
                      <h2 className="text-3xl md:text-4xl font-bold text-emerald-100">
                        {t("The Long View", "La Vue d'Ensemble")}
                      </h2>
                      
                      <p className="text-lg md:text-xl text-emerald-200/90 leading-relaxed italic">
                        "{result.commentary}"
                      </p>

                      <div className="pt-8 border-t border-emerald-800/30">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-500 mb-4">
                          {t("Resources for the Future", "Ressources pour l'Avenir")}
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4">
                          {CLIMATE_RESOURCES.map((r, i) => (
                            <a 
                              key={i} 
                              href={r.url} 
                              target="_blank" 
                              rel="noreferrer"
                              className="block p-4 bg-emerald-950/50 border border-emerald-800/50 hover:border-emerald-500 rounded-lg transition-all text-sm text-emerald-300 hover:text-emerald-100"
                            >
                              {r.title} ↗
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ) : (
                  /* Normal Corporate Path UI */
                  <>
                    <Card className="overflow-visible relative">
                      {/* Top decorative bar */}
                      <div className={`h-2 w-full bg-gradient-to-r ${getGradient(result.score!).bg.replace('/20', '')}`} />
                      
                      <div className="p-8 md:p-10 space-y-8">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-500 text-sm font-mono">
                              <Globe className="w-4 h-4" />
                              {result.company?.location}
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-white">
                              {result.company?.name}
                            </h2>
                            <p className="text-xl text-slate-400 italic font-light">
                              "{result.company?.tagline}"
                            </p>
                          </div>
                          
                          {/* Score Circle */}
                          <div className={`
                            relative flex flex-col items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full border-4 
                            ${getGradient(result.score!).border} bg-slate-950 shadow-2xl shrink-0
                          `}>
                            <span className={`text-3xl md:text-4xl font-black ${getGradient(result.score!).text}`}>
                              {result.score}%
                            </span>
                            <span className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">
                              {t("Complicit", "Complice")}
                            </span>
                          </div>
                        </div>

                        {/* Scandal Badge */}
                        <div className="inline-block">
                          <Badge className="bg-red-900/30 text-red-400 border border-red-800 px-3 py-1.5">
                            <AlertTriangle className="w-3 h-3 inline mr-1.5 mb-0.5" />
                            {t("Active Scandal:", "Scandale Actif:")} {result.company?.issue}
                          </Badge>
                        </div>

                        {/* AI Roast */}
                        <div className="bg-slate-950/50 border-l-4 border-purple-500 p-6 rounded-r-lg">
                          <p className="text-lg text-slate-200 leading-relaxed">
                            {result.commentary}
                          </p>
                        </div>

                        {/* Real World Context with integrated reset button */}
                        <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-5 h-5 text-cyan-400" />
                              <h3 className="font-bold text-cyan-400 text-sm uppercase tracking-wider">
                                {t("Reality Check", "Retour à la Réalité")}
                              </h3>
                            </div>
                            {/* Read Source Button */}
                            {result.company?.sourceUrl && (
                              <a 
                                href={result.company.sourceUrl}
                                target="_blank" 
                                rel="noreferrer"
                                className="flex items-center gap-1 text-[10px] md:text-xs text-slate-400 hover:text-cyan-300 transition-colors border border-slate-700 hover:border-cyan-500 px-2 py-1 rounded"
                              >
                                {t("Read Source", "Lire la Source")} <ArrowRight className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                          <p className="text-slate-300 text-sm mb-2">
                            <span className="font-bold text-slate-200">{t("Real Inspiration:", "Inspiration Réelle:")}</span> {result.company?.realStory}
                          </p>
                          <p className="text-slate-400 text-sm leading-relaxed mb-4">
                            {result.education}
                          </p>
                          
                          {/* Reset Button - Integrated here */}
                          <button 
                            onClick={() => {
                              setResult(null);
                              setName("");
                            }} 
                            className="text-slate-600 hover:text-slate-400 text-sm flex items-center gap-2 transition-colors group mt-4 pt-4 border-t border-slate-700/50"
                          >
                            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                            {t("Try Another Scenario", "Essayer un Autre Scénario")}
                          </button>
                        </div>
                      </div>
                    </Card>

                    {/* Resources */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {ESG_RESOURCES.map((r, i) => (
                        <a 
                          key={i} 
                          href={r.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-lg transition-all group"
                        >
                          <span className="text-sm font-medium text-slate-400 group-hover:text-white">{r.title}</span>
                          <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-purple-400 transition-transform group-hover:translate-x-1" />
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        )}

        {/* === UNIVERSAL SECTION: Adaptation / Survival Guide === */}
        {/* Displayed at the bottom of the page, always accessible */}
        <div className="mt-12 p-6 rounded-xl border border-emerald-900/50 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-emerald-900/20 rounded-lg text-emerald-500">
                  <BookOpenCheck className="w-5 h-5" />
               </div>
               <div>
                 <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-500">
                   {t("Survival Guide", "Manuel de Survie")}
                 </h3>
                 <p className="text-xs text-slate-400">
                   {t("Habits to implement now (Inspired by Ilian Moundib)", "Habitudes à prendre maintenant (Inspiré d'Ilian Moundib)")}
                 </p>
               </div>
            </div>
            
            <a 
              href={isFrench ? ADAPTATION_LINKS.fr : ADAPTATION_LINKS.en}
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-2 text-xs text-slate-400 hover:text-emerald-400 transition-colors border border-slate-700 hover:border-emerald-500/50 px-3 py-1.5 rounded-full"
            >
              {t("Official Adaptation Guide", "Guide Officiel Adaptation")} <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {ADAPTATION_TIPS.map((tip) => (
               <div key={tip.id} className="bg-slate-950/50 border border-slate-800 p-4 rounded-lg hover:border-emerald-800/50 transition-colors">
                  <div className="mb-3">
                     {getIconForTip(tip.id)}
                  </div>
                  <h4 className="font-bold text-slate-200 mb-1.5 text-sm">
                     {isFrench ? tip.title.fr : tip.title.en}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                     {isFrench ? tip.desc.fr : tip.desc.en}
                  </p>
               </div>
             ))}
          </div>

          <div className="mt-4 md:hidden text-center">
             <a 
              href={isFrench ? ADAPTATION_LINKS.fr : ADAPTATION_LINKS.en}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs text-emerald-400 underline underline-offset-2"
            >
              {t("Read the Official Guide", "Lire le Guide Officiel")}
            </a>
          </div>
        </div>

        {/* Ecological Footprint Invoice - MOVED TO THE VERY END */}
        {result && !result.errorType && !result.is20Years && (
          <div className="mt-8 p-4 md:p-5 bg-slate-950 border border-dashed border-slate-800 rounded-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800"></div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Info className="w-3 h-3" />
                  {t("Digital Invoice (Approximate)", "Facture Numérique (Estimée)")}
                </h3>
                <p className="text-slate-400 text-xs">
                  {t("Generating these insults wasn't free for the planet.", "Générer ces insultes a un coût pour la planète.")}
                </p>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2" title="Estimated CO2e for 1 AI query">
                  <CloudFog className="w-4 h-4 text-slate-400" />
                  <div>
                    <span className="block font-bold text-slate-200">~0.4g CO2e</span>
                    <span className="text-[10px] text-slate-500 block">
                      {t("≈ 1/10 of an email", "≈ 1/10 d'un e-mail")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2" title="Estimated cooling water evaporation">
                  <Droplets className="w-4 h-4 text-cyan-900" />
                  <div>
                    <span className="block font-bold text-slate-200">~5ml {t("Water", "Eau")}</span>
                    <span className="text-[10px] text-slate-500 block">
                      {t("≈ 1 teaspoon", "≈ 1 c. à café")}
                    </span>
                  </div>
                </div>
              </div>

              <a 
                href={AI_IMPACT_RESOURCE.url}
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors"
              >
                {t("Read about AI Impact", "Impact de l'IA")}
              </a>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default App;