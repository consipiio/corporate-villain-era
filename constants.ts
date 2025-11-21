import { Company, Resource, OfflineScandal, ToxicArchetype } from './types';

// ==============================
// TOXIC ARCHETYPES (ENGLISH)
// ==============================
export const TOXIC_ARCHETYPES: ToxicArchetype[] = [
  { 
    title: "Free Rider", 
    description: "You do absolutely nothing but are somehow always on the 'team win' email. You master the art of looking busy during standups.", 
    job: "Business Analyst",
    viralQuote: "Yeah I helped with that project! (attended one meeting)"
  },
  { 
    title: "Fake Manager", 
    description: "You're not the boss but you CC the actual boss on everything. You schedule 'alignment syncs' just to assert dominance.", 
    job: "PMO Coordinator",
    viralQuote: "Let's take this offline and circle back"
  },
  { 
    title: "Toxic Positive Vibes Only", 
    description: "Your coworker's mental health is spiraling? Just manifest better energy! You see everything as 'a learning opportunity' even when the building is on fire.", 
    job: "Wellness & Culture Coordinator",
    viralQuote: "There's no such thing as problems, only opportunities!"
  },
  { 
    title: "Doomer Debbie", 
    description: "Every Slack message you send is a 5-paragraph essay about why everything is failing. You send articles about layoffs at 9 PM on Sundays.", 
    job: "Senior Customer Success Manager",
    viralQuote: "Well, THIS won't work. Nothing ever does here."
  },
  { 
    title: "Desk Drive-By Terrorist", 
    description: "You interrupt everyone's flow state every 20 minutes to talk about your sourdough starter. You do not understand that headphones mean 'do not disturb'.", 
    job: "Executive Assistant",
    viralQuote: "Got a sec? This'll be quick! (it's never quick)"
  },
  { 
    title: "Main Character Syndrome", 
    description: "You treat every team meeting like your therapy session. You cry in the break room and make it everyone's problem. You write 1000-word Slack DMs about drama.", 
    job: "Internal Communications Manager",
    viralQuote: "I just feel like nobody HERE understands me"
  },
  { 
    title: "LinkedIn Ladder Climber", 
    description: "Every conversation you have is a networking opportunity. You post 'hustle culture' content while doing the bare minimum. You call everyone 'rockstar'.", 
    job: "Growth Marketing Manager",
    viralQuote: "Let's grab coffee! I'd love to pick your brain"
  },
  { 
    title: "Chronically Online", 
    description: "Your bathroom breaks are 45-minute TikTok sessions. Your camera is always off. You screenshot Slack convos to post on Twitter.", 
    job: "Social Media Coordinator",
    viralQuote: "Sorry my WiFi cut out (was watching YouTube)"
  },
  { 
    title: "Trauma Dumper 3000", 
    description: "You think HR orientation is speed dating. You overshare about relationship drama before people learn your last name. You make coworkers unpaid therapists.", 
    job: "People Operations Specialist",
    viralQuote: "So anyway, my ex... (proceeds for 45 minutes)"
  },
  { 
    title: "Nepo Baby", 
    description: "Your dad is on the board. You have a Director title at 24. You don't know what a pivot table is. You take 3-hour lunches and nobody says anything.", 
    job: "Junior Strategy Associate",
    viralQuote: "My dad says we should just..."
  },
  { 
    title: "Idea Thief", 
    description: "Someone shares an idea in Slack, you pitch it word-for-word in the meeting 10 minutes later. You get promoted while they stay stuck.", 
    job: "Senior Strategy Consultant",
    viralQuote: "Building on what was said earlier... (your idea)"
  },
  { 
    title: "Everything's On Fire", 
    description: "You send 'URGENT' emails at 11 PM about non-urgent things. You use red exclamation marks everywhere. Your panic is always everyone else's emergency.", 
    job: "Technical Project Manager",
    viralQuote: "Need this EOD (sent at 4:47 PM on Friday)"
  },
  { 
    title: "Spreadsheet Psychopath", 
    description: "If it can't be measured in a KPI dashboard, it doesn't matter to you. Burnout isn't real because 'the data looks good'. Human empathy.exe not found.", 
    job: "Senior FP&A Analyst",
    viralQuote: "Show me the metrics on that"
  },
  { 
    title: "Selective Vision Karen", 
    description: "Someone works 80 hours? You don't see it. You stay 10 minutes late once? You demand Employee of the Month. You play favorites like a rigged game.", 
    job: "Operations Manager",
    viralQuote: "I didn't see you at the optional 7 AM meeting"
  },
  { 
    title: "Dr. No", 
    description: "You are the innovation killer. Every idea gets hit with 'we tried that in 2015'. You are the human equivalent of a budget cut.", 
    job: "Senior Product Manager",
    viralQuote: "That's not really feasible right now"
  },
  { 
    title: "Hustle Culture Zombie", 
    description: "You email at 3 AM 'just thinking about Q4'. You brag about not taking vacation. You make everyone feel guilty for having a life.", 
    job: "VP of Marketing",
    viralQuote: "I'll sleep when I'm dead! Rise and grind!"
  },
  { 
    title: "Time Anarchist", 
    description: "You show up to meetings 20 minutes late with Starbucks. You miss every deadline. 'Sorry, forgot' is your entire personality.", 
    job: "DevOps Engineer",
    viralQuote: "My bad, lost track of time (again)"
  },
  { 
    title: "Confidently Incorrect Boss", 
    description: "You don't know what the team does but you have OPINIONS. You make decisions based on a LinkedIn post you saw. Imposter syndrome who?", 
    job: "Director of Digital Experience",
    viralQuote: "I saw this Ted Talk that says..."
  },
  { 
    title: "Teflon Don", 
    description: "Caused the outage? Engineering's fault. Missed budget? Finance's fault. You could teach a masterclass in deflection.", 
    job: "VP of Finance",
    viralQuote: "I wasn't in the loop on that decision"
  },
  { 
    title: "Calendar Terrorist", 
    description: "You send meeting invites for 6 AM or 7 PM because 'we're global'. Your time zone is the only time zone that matters.", 
    job: "Chief of Staff",
    viralQuote: "It's only 8 PM for you, that's totally reasonable"
  },
  { 
    title: "Well Actually Andy", 
    description: "You interrupt every 30 seconds to correct minor details nobody cares about. You make mansplaining an Olympic sport.", 
    job: "Principal Machine Learning Engineer",
    viralQuote: "Well ACTUALLY, if we're being TECHNICAL..."
  },
  { 
    title: "Intellectual Property Vulture", 
    description: "An idea in a 1:1? Your slide deck next week. A code solution? Your architecture review. You have ghostwriters for your entire career.", 
    job: "Director of Product Marketing",
    viralQuote: "I was thinking... (your exact thought from yesterday)"
  },
  { 
    title: "Rage Quitter", 
    description: "You scream in meetings. You throw things. HR knows you by name. Everyone tiptoes around your mood like diffusing a bomb.", 
    job: "CTO",
    viralQuote: "ARE YOU KIDDING ME RIGHT NOW?!"
  },
  { 
    title: "After Hours Addict", 
    description: "You send 'quick questions' at 11 PM. You schedule weekend 'brainstorms'. You think other people's PTO is your planning time.", 
    job: "Agile Delivery Lead",
    viralQuote: "Saw your Slack status was active... quick thing"
  },
  { 
    title: "Goldfish Memory", 
    description: "You definitely said that offensive thing at the holiday party, but you have zero memory of it. You swear you never got the email (with read receipts).", 
    job: "Finance Controller",
    viralQuote: "I don't recall saying that"
  },
  { 
    title: "Ghost Boss", 
    description: "People Slack you and get a response 3 weeks later. You miss every 1:1. Your team manages themselves while you take the credit.", 
    job: "Engineering Manager",
    viralQuote: "(Read 3 weeks ago)"
  },
  { 
    title: "ASAP Overlord", 
    description: "Every. Single. Task. Is. Urgent. Your deadlines are always yesterday. You use 3 exclamation marks minimum in every email.", 
    job: "Senior Scrum Master",
    viralQuote: "Need this ASAP!!!"
  },
  { 
    title: "Wage Theft Specialist", 
    description: "You hire people for Director-level work at coordinator pay. You call it a 'growth opportunity' while approving 0% raises.", 
    job: "Total Rewards Manager",
    viralQuote: "Compensation isn't just about money!"
  },
  { 
    title: "9-to-5 Enforcer", 
    description: "Someone leaves at 5:01? You notice. You take 2-hour lunches? Deserved break. You monitor timesheets like a prison warden.", 
    job: "Workforce Management Analyst",
    viralQuote: "I noticed you clocked out 3 minutes early"
  },
  { 
    title: "Delusion Director", 
    description: "You think the team can redesign the platform by Tuesday. 'It should be simple' is your catchphrase. You ignore the laws of physics.", 
    job: "Chief Product Officer",
    viralQuote: "Can't we just... (something impossible)"
  },
  { 
    title: "Flexibility Catfisher", 
    description: "Your job postings say flexible hours! Reality: You expect availability 24/7. Remote work means working from everywhere, not anywhere.", 
    job: "Head of Talent Acquisition",
    viralQuote: "Flexible means flexible for the BUSINESS"
  },
  { 
    title: "Micromanager in Disguise", 
    description: "You say you're 'hands-off' but demand hourly updates. You trust the team completely (but check their work 47 times).", 
    job: "Program Director",
    viralQuote: "I'm not micromanaging, just staying informed!"
  },
  { 
    title: "Visionary Delegate", 
    description: "You have amazing ideas (stolen from the team). You pitch big visions (the team executes everything). You take the credit (you did nothing).", 
    job: "Chief Innovation Officer",
    viralQuote: "I had this AMAZING idea... (that you'll execute)"
  },
  { 
    title: "Soft Skills Manipulator", 
    description: "You play the victim so well people forget you're the problem. You say 'I'm trying my best' while actively making lives harder.", 
    job: "Department Manager",
    viralQuote: "I'm really struggling too, you know"
  },
  { 
    title: "Two-Faced Taylor", 
    description: "You are super nice in meetings, but an absolute monster in private. You smile while throwing your team under the bus.", 
    job: "Team Lead",
    viralQuote: "Love the energy! (plots your downfall)"
  },
  { 
    title: "Boys Club Gatekeeper", 
    description: "You enforce bro culture at maximum. Promotions happen at golf outings you invite only men to. Diversity is just a buzzword to you.", 
    job: "CEO / Founder",
    viralQuote: "She's just not leadership material"
  },
  { 
    title: "Condescending Colin", 
    description: "You re-explain people's own expertise to them. You talk slowly like they are five. You assume nobody understands the basics but you.", 
    job: "Senior Director of Engineering",
    viralQuote: "Let me break this down for you..."
  }
];

// ==============================
// TOXIC ARCHETYPES (FRENCH)
// ==============================
export const TOXIC_ARCHETYPES_FR: ToxicArchetype[] = [
  {
    title: "Le Touriste",
    description: "Tu ne fais absolument rien mais tu es toujours en copie du mail de félicitations. Tu es le champion du 'Reply All'.",
    job: "Consultant en Stratégie",
    viralQuote: "Gros travail d'équipe les gars ! (a assisté à 0 réunion)"
  },
  {
    title: "Le Petit Chef",
    description: "Tu n'es pas le boss mais tu fliques tout le monde. Tu organises des 'points de synchro' juste pour montrer que tu existes.",
    job: "Coordinateur PMO",
    viralQuote: "On se fait un point rapide ?"
  },
  {
    title: "La Happiness Manager",
    description: "Un burn-out ? Tu proposes un fruit bio ! Tu vois tout comme 'une opportunité', même le licenciement économique.",
    job: "Chief Happiness Officer",
    viralQuote: "On veut que du good vibes ici !"
  },
  {
    title: "Le Dépressif du Slack",
    description: "Chaque message que tu envoies est une thèse sur la fin du monde. Tu partages des articles sur les faillites le dimanche soir.",
    job: "CSM Senior",
    viralQuote: "De toute façon, ça ne marchera jamais."
  },
  {
    title: "La Pipelette",
    description: "Tu interromps la deep work de tout le monde toutes les 10 minutes pour raconter ton week-end en Normandie.",
    job: "Assistant(e) de Direction",
    viralQuote: "T'as deux minutes ? (en prend 45)"
  },
  {
    title: "Le Calimero",
    description: "Chaque réunion est ta thérapie. Tu pleures à la machine à café parce qu'on a oublié ton anniversaire.",
    job: "Comms Interne",
    viralQuote: "J'ai l'impression que personne me comprend."
  },
  {
    title: "L'Influenceur LinkedIn",
    description: "Tu transformes chaque banalité en leçon de vie. 'Ce matin j'ai acheté du pain, voici ce que j'ai appris sur le leadership'.",
    job: "Growth Hacker",
    viralQuote: "Petit post pour célébrer cette réussite..."
  },
  {
    title: "Le Gen Z TikTok",
    description: "Ta pause caca = 45 min de scroll. Ta caméra est coupée. Tu screenes les messages Slack de tes collègues pour ta story privée.",
    job: "Alternant Community Manager",
    viralQuote: "Désolé ma wifi a coupé (était sur YouTube)"
  },
  {
    title: "Le Fils de Patron",
    description: "Tu es Directeur à 24 ans. Tu ne sais pas faire un VLOOKUP. Tu pars en week-end le jeudi midi.",
    job: "VP Stratégie",
    viralQuote: "Mon père pense qu'on devrait..."
  },
  {
    title: "Le Voleur d'Idées",
    description: "Quelqu'un propose un truc, tu le répètes plus fort 5 minutes après et tu te fais promouvoir à sa place.",
    job: "Directeur Conseil",
    viralQuote: "Pour rebondir sur ce que je disais avant..."
  },
  {
    title: "L'Urgentiste Imaginaire",
    description: "Tu mets 'URGENT' et des points d'exclamation rouge partout. Ta panique est le problème de tout le monde.",
    job: "Chef de Projet",
    viralQuote: "Besoin de ça ASAP !!!"
  },
  {
    title: "Le Tableur Fou",
    description: "Si c'est pas dans Excel, ça n'existe pas pour toi. L'épuisement de tes collègues n'est pas dans la cellule B12.",
    job: "Contrôleur de Gestion",
    viralQuote: "T'as les métriques pour ça ?"
  },
  {
    title: "Monsieur Non",
    description: "Tu es le tueur d'innovation. 'On a déjà essayé en 2012' est ta phrase préférée. Tu es l'équivalent humain d'une coupe budgétaire.",
    job: "Product Manager Senior",
    viralQuote: "C'est pas iso-perimètre."
  },
  {
    title: "Le Startuper de la Défense",
    description: "Tu envoies des mails à 3h du mat. Tu te vantes de ne pas dormir. 'Sleep is for the weak' est ta devise.",
    job: "VP Sales",
    viralQuote: "On lâche rien la team ! Hustle !"
  },
  {
    title: "Le Retardataire Chronique",
    description: "Tu arrives 20 min en retard avec un Starbucks. 'Désolé j'ai pas vu l'heure' est ton excuse quotidienne.",
    job: "Lead Dev",
    viralQuote: "Oups, my bad, j'étais focus."
  }
];

export const COMPANIES: Company[] = [
  // --- TECH & DATA ---
  { 
    name: "Handbook", 
    tagline: "Your grandma's secrets are for sale.", 
    issue: "Privacy Violation", 
    location: "Global", 
    realStory: "Facebook / Cambridge Analytica",
    sourceUrl: "https://www.theguardian.com/news/series/cambridge-analytica-files"
  },
  { 
    name: "Mazon", 
    tagline: "You have no choice.", 
    issue: "Antitrust & Labor", 
    location: "Warehouses, USA", 
    realStory: "Amazon Union Busting & Monopoly",
    sourceUrl: "https://www.npr.org/2023/09/26/1197685168/ftc-amazon-antitrust-lawsuit-monopoly"
  },
  { 
    name: "Apfle", 
    tagline: "Slow down, buy new.", 
    issue: "Planned Obsolescence", 
    location: "Silicon Valley", 
    realStory: "Apple Batterygate",
    sourceUrl: "https://www.bbc.com/news/technology-51413724"
  },
  { 
    name: "Gogole", 
    tagline: "Don't be evil (unless it pays).", 
    issue: "Illegal Tracking", 
    location: "Global", 
    realStory: "Google Location Tracking Settlement",
    sourceUrl: "https://www.npr.org/2022/11/14/1136521305/google-settlement-location-tracking-data-privacy"
  },
  { 
    name: "Esla", 
    tagline: "Full Self-Crashing.", 
    issue: "Safety & Labor", 
    location: "Texas/California", 
    realStory: "Tesla Factory Safety & Racism",
    sourceUrl: "https://www.npr.org/2022/02/11/1080073061/california-sues-tesla-racism-fremont"
  },
  { 
    name: "Under", 
    tagline: "Disrupting labor laws.", 
    issue: "Labor Exploitation", 
    location: "Global", 
    realStory: "Uber 'Greyball' & Driver Rights",
    sourceUrl: "https://www.theguardian.com/news/2022/jul/10/uber-files-leak-reveals-global-lobbying-campaign"
  },
  { 
    name: "LeakEqui", 
    tagline: "We lost everyone's identity.", 
    issue: "Data Negligence", 
    location: "USA", 
    realStory: "Equifax Data Breach",
    sourceUrl: "https://www.ftc.gov/enforcement/refunds/equifax-data-breach-settlement"
  },
  { 
    name: "InstaDepress", 
    tagline: "Making teens sad for profit.", 
    issue: "Mental Health", 
    location: "Mobile Screens", 
    realStory: "Meta/Instagram Teen Mental Health",
    sourceUrl: "https://www.theguardian.com/technology/2021/sep/14/facebook-aware-instagram-harmful-effect-teenage-girls-leak-reveals"
  },
  { 
    name: "TheraHoax", 
    tagline: "One drop of lies.", 
    issue: "Medical Fraud", 
    location: "Silicon Valley", 
    realStory: "Theranos Fraud",
    sourceUrl: "https://www.justice.gov/usao-ndca/us-v-elizabeth-holmes-et-al"
  },
  { 
    name: "FoxSuicide", 
    tagline: "Assembling at any cost.", 
    issue: "Labor Conditions", 
    location: "China", 
    realStory: "Foxconn Worker Suicides",
    sourceUrl: "https://www.theguardian.com/technology/2017/jun/18/foxconn-life-death-forbidden-city-longhua-suicide-apple-iphone-brian-merchant-one-device-extract"
  },

  // --- OIL, ENERGY & MINING ---
  { 
    name: "SlickOil", 
    tagline: "Oops, we did it again.", 
    issue: "Environmental Disaster", 
    location: "Gulf of Mexico", 
    realStory: "BP Deepwater Horizon",
    sourceUrl: "https://www.epa.gov/enforcement/deepwater-horizon-bp-gulf-mexico-oil-spill"
  },
  { 
    name: "Ecson", 
    tagline: "We knew before you did.", 
    issue: "Climate Denial", 
    location: "Global", 
    realStory: "ExxonKnew Climate Cover-up",
    sourceUrl: "https://www.scientificamerican.com/article/exxon-knew-about-climate-change-almost-40-years-ago/"
  },
  { 
    name: "Chell", 
    tagline: "Drilling where you live.", 
    issue: "Ecocide", 
    location: "Niger Delta", 
    realStory: "Shell Oil Spills in Nigeria",
    sourceUrl: "https://www.amnesty.org/en/latest/news/2020/06/no-clean-up-no-justice-shell-oil-pollution-in-the-niger-delta/"
  },
  { 
    name: "Chewron", 
    tagline: "Leaving a mess behind.", 
    issue: "Toxic Dumping", 
    location: "Ecuador", 
    realStory: "Chevron (Texaco) in Ecuador",
    sourceUrl: "https://www.theguardian.com/environment/2011/feb/15/chevron-ecuador-fined-billions"
  },
  { 
    name: "BlastMining", 
    tagline: "Erasing history for ore.", 
    issue: "Cultural Destruction", 
    location: "Australia", 
    realStory: "Rio Tinto Juukan Gorge Blast",
    sourceUrl: "https://www.bbc.com/news/world-australia-57314785"
  },
  { 
    name: "DamCollapse", 
    tagline: "Safety is expensive.", 
    issue: "Negligence / Manslaughter", 
    location: "Brazil", 
    realStory: "Vale Dam Collapse (Brumadinho)",
    sourceUrl: "https://www.bbc.com/news/world-latin-america-47022063"
  },
  { 
    name: "BribeCore", 
    tagline: "Paying our way in.", 
    issue: "Bribery & Corruption", 
    location: "Africa/South America", 
    realStory: "Glencore Bribery Scandal",
    sourceUrl: "https://www.justice.gov/opa/pr/glencore-entered-guilty-pleas-foreign-bribery-and-market-manipulation-schemes"
  },
  { 
    name: "DuBont", 
    tagline: "Sticking around forever.", 
    issue: "Water Contamination", 
    location: "Global / USA", 
    realStory: "DuPont / 3M PFAS (Forever Chemicals)",
    sourceUrl: "https://www.theguardian.com/commentisfree/2020/dec/17/dark-waters-pfas-toms-river-pollution-environment"
  },
  { 
    name: "FrackKing", 
    tagline: "Lighting your tap water on fire.", 
    issue: "Water Pollution", 
    location: "USA", 
    realStory: "Halliburton Loophole / Fracking",
    sourceUrl: "https://www.npr.org/2011/12/09/143453774/epa-connects-fracking-with-water-contamination"
  },

  // --- CONSUMER GOODS & FASHION ---
  { 
    name: "Naislait", 
    tagline: "Water is a privilege.", 
    issue: "Water Privatization", 
    location: "California/Global", 
    realStory: "Nestlé Water Bottling",
    sourceUrl: "https://www.theguardian.com/us-news/2021/apr/27/california-nestle-water-bottling-cease-and-desist"
  },
  { 
    name: "SheOut", 
    tagline: "Fashion that lasts a minute.", 
    issue: "Labor & Waste", 
    location: "Global", 
    realStory: "Shein Labor & Waste",
    sourceUrl: "https://time.com/6247732/shein-labor-practices-fast-fashion/"
  },
  { 
    name: "Mike.", 
    tagline: "Just do it (cheaply).", 
    issue: "Sweatshops", 
    location: "Asia", 
    realStory: "Nike Sweatshop Scandal History",
    sourceUrl: "https://www.theguardian.com/business/2023/jun/28/nike-shareholders-demand-payment-alleged-forced-labor-victims"
  },
  { 
    name: "Eh&M", 
    tagline: "Recycling (into the incinerator).", 
    issue: "Greenwashing", 
    location: "Europe", 
    realStory: "H&M Burning Unsold Clothes",
    sourceUrl: "https://qz.com/1296632/hm-is-burning-unsold-clothes-in-a-power-plant-in-sweden"
  },
  { 
    name: "KOKA", 
    tagline: "Choking the ocean.", 
    issue: "Plastic Pollution", 
    location: "Global Oceans", 
    realStory: "Coca-Cola Top Polluter",
    sourceUrl: "https://www.theguardian.com/environment/2021/oct/25/coca-cola-pepsico-and-unilever-ranked-top-plastic-polluters-for-fourth-year"
  },
  { 
    name: "ChocoSlave", 
    tagline: "Bittersweet harvest.", 
    issue: "Child Labor", 
    location: "Ivory Coast", 
    realStory: "Mars/Nestlé/Hershey Child Labor Lawsuit",
    sourceUrl: "https://www.reuters.com/business/sustainable-business/chocolate-makers-face-us-class-action-over-child-labor-2021-02-12/"
  },
  { 
    name: "McForest", 
    tagline: "I'm lovin' the deforestation.", 
    issue: "Deforestation", 
    location: "Amazon Rainforest", 
    realStory: "Cargill / Fast Food Soy Supply",
    sourceUrl: "https://www.theguardian.com/environment/2019/nov/25/cargill-deforestation-supply-chain-soy-poverty"
  },
  { 
    name: "John & John", 
    tagline: "Powdering over the truth.", 
    issue: "Carcinogens", 
    location: "USA", 
    realStory: "Johnson & Johnson Baby Powder",
    sourceUrl: "https://www.reuters.com/investigates/special-report/johnsonandjohnson-cancer/"
  },
  { 
    name: "Valmart", 
    tagline: "Low prices, lower rights.", 
    issue: "Labor Rights", 
    location: "USA", 
    realStory: "Walmart Union Busting",
    sourceUrl: "https://www.hrw.org/report/2007/04/30/discounting-rights/wal-marts-violation-us-workers-right-freedom-association"
  },
  { 
    name: "BeeKiller", 
    tagline: "Roundup ready to kill everything.", 
    issue: "Ecocide", 
    location: "Global", 
    realStory: "Monsanto/Bayer Glyphosate",
    sourceUrl: "https://www.theguardian.com/business/2019/may/13/monsanto-cancer-trial-bayer-roundup-couple-2bn-damages"
  },

  // --- FINANCE & CORPORATE ---
  { 
    name: "CartelCash", 
    tagline: "The drug lord's favorite bank.", 
    issue: "Money Laundering", 
    location: "Mexico/Global", 
    realStory: "HSBC Cartel Laundering",
    sourceUrl: "https://www.bbc.com/news/business-18880269"
  },
  { 
    name: "GhostBank", 
    tagline: "Accounts you didn't ask for.", 
    issue: "Consumer Fraud", 
    location: "USA", 
    realStory: "Wells Fargo Fake Accounts",
    sourceUrl: "https://www.forbes.com/sites/jackkelly/2020/02/24/wells-fargo-forced-to-pay-3-billion-for-the-banks-fake-account-scandal/"
  },
  { 
    name: "Le Man Brothers", 
    tagline: "Too Big To Jail.", 
    issue: "Economic Crash", 
    location: "Wall Street", 
    realStory: "Lehman Brothers / 2008 Crisis",
    sourceUrl: "https://www.federalreservehistory.org/essays/subprime-mortgage-crisis"
  },
  { 
    name: "WireFraud", 
    tagline: "The missing billions.", 
    issue: "Accounting Fraud", 
    location: "Germany", 
    realStory: "Wirecard Collapse",
    sourceUrl: "https://quartr.com/insights/edge/the-rise-and-fall-of-wirecard"
  },
  { 
    name: "XTF", 
    tagline: "Effective altruism (for me).", 
    issue: "Fraud", 
    location: "Bahamas", 
    realStory: "FTX Collapse",
    sourceUrl: "https://www.nytimes.com/2022/11/11/business/ftx-bankruptcy.html"
  },
  { 
    name: "Silverman Sucks", 
    tagline: "Funding The Wolf of Wall Street.", 
    issue: "Corruption", 
    location: "Malaysia", 
    realStory: "Goldman Sachs 1MDB Scandal",
    sourceUrl: "https://www.bbc.com/news/business-54639792"
  },
  { 
    name: "BlakRok", 
    tagline: "Owning the world.", 
    issue: "Fossil Fuel Financing", 
    location: "Global", 
    realStory: "BlackRock Climate Investments",
    sourceUrl: "https://www.theguardian.com/environment/2019/oct/12/top-three-asset-managers-fossil-fuel-investments"
  },

  // --- PHARMA & HEALTH ---
  { 
    name: "OpiCorp", 
    tagline: "Addicted to profit.", 
    issue: "Opioid Crisis", 
    location: "USA", 
    realStory: "Purdue Pharma OxyContin",
    sourceUrl: "https://www.npr.org/2021/09/01/1033486946/sackler-family-immunity-purdue-pharma-settlement-opioid-epidemic"
  },
  { 
    name: "PriceGouge", 
    tagline: "Your life, our price.", 
    issue: "Price Hiking", 
    location: "USA", 
    realStory: "Martin Shkreli / Turing Pharma",
    sourceUrl: "https://www.bbc.com/news/world-us-canada-34331761"
  },
  { 
    name: "Pfizeur", 
    tagline: "Patents over people.", 
    issue: "Inequality", 
    location: "Global South", 
    realStory: "Pfizer/Moderna Vaccine Equity",
    sourceUrl: "https://www.amnesty.org/en/latest/news/2021/09/covid-19-pharmaceutical-companies-putting-profits-ahead-of-lives/"
  },
  { 
    name: "InsulinCartel", 
    tagline: "Pay or die.", 
    issue: "Price Fixing", 
    location: "USA", 
    realStory: "Insulin Pricing Scandal",
    sourceUrl: "https://www.mayoclinicproceedings.org/article/S0025-6196(19)31008-0/fulltext"
  },

  // --- TRANSPORT & LOGISTICS ---
  { 
    name: "Folksvagen", 
    tagline: "Das Cheating.", 
    issue: "Emissions Fraud", 
    location: "Global", 
    realStory: "Volkswagen Dieselgate",
    sourceUrl: "https://www.bbc.com/news/business-34324772"
  },
  { 
    name: "Booming", 
    tagline: "Profits over pilots.", 
    issue: "Safety Negligence", 
    location: "Global", 
    realStory: "Boeing 737 MAX Crashes",
    sourceUrl: "https://www.bbc.co.uk/news/extra/jDOe2y9Tbo/boeing-737-max"
  },
  { 
    name: "RailBomb", 
    tagline: "Cutting brakes, cutting costs.", 
    issue: "Chemical Safety", 
    location: "Ohio, USA", 
    realStory: "Norfolk Southern Train Derailment",
    sourceUrl: "https://www.npr.org/2023/03/06/1161374799/norfolk-southern-train-derailment-east-palestine-ohio"
  },

  // --- MISC & HISTORICAL ---
  { 
    name: "BananaRepublic", 
    tagline: "Funding wars for fruit.", 
    issue: "Terrorism Financing", 
    location: "Colombia", 
    realStory: "Chiquita Brands Paramilitary Payments",
    sourceUrl: "https://www.bbc.com/news/world-latin-america-69109585"
  },
  { 
    name: "GasLeak", 
    tagline: "A tragedy ignored.", 
    issue: "Industrial Disaster", 
    location: "India", 
    realStory: "Union Carbide Bhopal Disaster",
    sourceUrl: "https://www.theatlantic.com/science/archive/2018/12/bhopal-gas-tragedy-toxins-persist-34-years-later/577029/"
  },
  { 
    name: "CancerStick", 
    tagline: "Hooking the next generation.", 
    issue: "Public Health", 
    location: "Global", 
    realStory: "Philip Morris / Tobacco Lobby",
    sourceUrl: "https://www.who.int/news-room/spotlight/tobacco-industry-interference"
  },
  { 
    name: "FeeMaster", 
    tagline: "The monopoly on fun.", 
    issue: "Monopoly Pricing", 
    location: "USA", 
    realStory: "Ticketmaster / Live Nation Antitrust",
    sourceUrl: "https://www.justice.gov/opa/pr/justice-department-sues-live-nation-ticketmaster-monopolizing-markets-across-live-concert"
  },
  { 
    name: "Actiblind", 
    tagline: "Play hard, harass harder.", 
    issue: "Workplace Culture", 
    location: "California", 
    realStory: "Activision Blizzard Harassment Suit",
    sourceUrl: "https://www.npr.org/2021/07/22/1019293032/activision-blizzard-lawsuit-unequal-pay-sexual-harassment-video-games"
  },
  { 
    name: "Emron", 
    tagline: "Creative accounting.", 
    issue: "Fraud", 
    location: "Texas", 
    realStory: "Enron Scandal",
    sourceUrl: "https://www.britannica.com/event/Enron-scandal"
  }
];

export const ESG_RESOURCES: Resource[] = [
  { title: "Corporate Accountability Lab", url: "https://corpaccountabilitylab.org/" },
  { title: "Clean Clothes Campaign", url: "https://cleanclothes.org/" },
  { title: "BankTrack", url: "https://www.banktrack.org/" }
];

export const CLIMATE_RESOURCES: Resource[] = [
  { title: "Climate Anxiety Support", url: "https://www.climatepsychologyalliance.org/" },
  { title: "Indigenous Environmental Network", url: "https://www.ienearth.org/" },
  { title: "Project Drawdown", url: "https://drawdown.org/" }
];

export const AI_IMPACT_RESOURCE = {
  title: "Understanding AI's Carbon Footprint",
  url: "https://www.scientificamerican.com/article/the-ai-boom-could-use-a-shocking-amount-of-electricity/"
};

export const WHEEL_SLICES = [
  "Financial Misconduct",
  "Labor Issues",
  "Environmental",
  "Privacy",
  "Product Safety"
];

export const OFFLINE_SCANDALS: OfflineScandal[] = [
  // Financial Misconduct
  { 
    title: "Wirecard Collapse", 
    description: "The German payment processor admitted €1.9 billion never existed.", 
    category: "Financial Misconduct", 
    url: "https://www.bbc.com/news/business-53104731" 
  },
  { 
    title: "Danske Bank Money Laundering", 
    description: "€200 billion of suspicious transactions flowed through the Estonian branch.", 
    category: "Financial Misconduct", 
    url: "https://pythagoras-solutions.com/en/insights/danske-bank-scandal-turning-point-aml-compliance-of-banking-sector" 
  },

  // Labor Issues
  { 
    title: "Rana Plaza Collapse", 
    description: "1,134 garment workers died due to unsafe factory conditions in Bangladesh.", 
    category: "Labor Issues", 
    url: "https://cleanclothes.org/campaigns/past/rana-plaza$0" 
  },
  { 
    title: "Qatar World Cup Migrant Labor", 
    description: "Thousands of migrant workers died or suffered abuse building stadiums.", 
    category: "Labor Issues", 
    url: "https://www.amnesty.org/en/latest/campaigns/2016/03/qatar-world-cup-of-shame/" 
  },

  // Environmental
  { 
    title: "Deepwater Horizon", 
    description: "The largest marine oil spill in history, releasing 134 million gallons.", 
    category: "Environmental", 
    url: "https://www.epa.gov/enforcement/deepwater-horizon-bp-gulf-mexico-oil-spill" 
  },
  { 
    title: "Volkswagen Emissions Scandal", 
    description: "VW installed software to cheat emissions tests on 11 million cars.", 
    category: "Environmental", 
    url: "https://www.bbc.com/news/business-34324772" 
  },

  // Privacy
  { 
    title: "Cambridge Analytica", 
    description: "Harvested data of 87 million Facebook users without consent for political ads.", 
    category: "Privacy", 
    url: "https://www.nytimes.com/2018/04/04/us/politics/cambridge-analytica-scandal-fallout.html" 
  },
  { 
    title: "Pegasus Spyware", 
    description: "NSO Group software used to spy on journalists and activists globally.", 
    category: "Privacy", 
    url: "https://www.theguardian.com/news/2021/jul/18/what-is-pegasus-spyware-and-how-does-it-hack-phones" 
  },

  // Product Safety
  { 
    title: "Boeing 737 MAX", 
    description: "Two crashes killed 346 people due to a flawed flight control system.", 
    category: "Product Safety", 
    url: "https://www.bbc.com/news/business-47606264" 
  },
  { 
    title: "Theranos Fraud", 
    description: "Elizabeth Holmes claimed to run blood tests with a single drop. It was fake.", 
    category: "Product Safety", 
    url: "https://www.justice.gov/usao-ndca/us-v-elizabeth-holmes-et-al" 
  }
];

export const ADAPTATION_LINKS = {
  fr: "https://www.notre-environnement.gouv.fr/themes/climat/article/l-adaptation-au-changement-climatique",
  en: "https://www.epa.gov/climate-change"
};

export const ADAPTATION_TIPS = [
  {
    id: 'community',
    title: { en: "The Robinson Crusoe Myth", fr: "Fini le Mythe de Robinson" },
    desc: { 
      en: "Surviving alone is a fantasy. Your strongest asset is your neighborhood and community network.", 
      fr: "Survivre seul est un fantasme. Votre meilleur atout, c'est votre voisinage et le lien social." 
    }
  },
  {
    id: 'water',
    title: { en: "Water is Gold", fr: "L'Eau, c'est de l'Or" },
    desc: { 
      en: "Learn to harvest rainwater and reduce usage. It will become the most critical resource.", 
      fr: "Apprenez à récupérer l'eau de pluie et à réduire votre consommation. Ce sera la ressource clé." 
    }
  },
  {
    id: 'lowtech',
    title: { en: "Low-Tech Skills", fr: "Compétences Low-Tech" },
    desc: { 
      en: "Understand how things work without AI. Repairing, growing, and making are the skills of the future.", 
      fr: "Comprenez comment les choses marchent sans IA. Réparer, cultiver et fabriquer sont les compétences du futur." 
    }
  }
];

export function pickToxicArchetype(name: string, isFrench: boolean = false): ToxicArchetype {
  const list = isFrench ? TOXIC_ARCHETYPES_FR : TOXIC_ARCHETYPES;
  const index = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % list.length;
  return list[index];
}