// MamaHealth Multilingual Framework
// Language detection, selection, and cultural tone mapping

export interface Language {
  code: string
  name: string
  nativeName: string
  region: string
  culturalGreeting: string
  mamaTitle: string
}

export const supportedLanguages: Record<string, Language> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    region: 'Global',
    culturalGreeting: 'Hi dear 🌺',
    mamaTitle: 'Mama',
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    region: 'West/Central Africa',
    culturalGreeting: 'Bonjour ma chère 🌺',
    mamaTitle: 'Maman',
  },
  sw: {
    code: 'sw',
    name: 'Swahili',
    nativeName: 'Kiswahili',
    region: 'East Africa',
    culturalGreeting: 'Habari yako mpendwa 🌺',
    mamaTitle: 'Mama',
  },
  yo: {
    code: 'yo',
    name: 'Yoruba',
    nativeName: 'Yorùbá',
    region: 'West Africa (Nigeria)',
    culturalGreeting: 'Ẹ káàárọ̀ ọmọ mi 🌺',
    mamaTitle: 'Màmá',
  },
  tw: {
    code: 'tw',
    name: 'Twi',
    nativeName: 'Twi',
    region: 'West Africa (Ghana)',
    culturalGreeting: 'Maakye me ba 🌺',
    mamaTitle: 'Maame',
  },
  ha: {
    code: 'ha',
    name: 'Hausa',
    nativeName: 'Hausa',
    region: 'West Africa',
    culturalGreeting: 'Sannu yarinya 🌺',
    mamaTitle: 'Mama',
  },
  zu: {
    code: 'zu',
    name: 'Zulu',
    nativeName: 'isiZulu',
    region: 'Southern Africa',
    culturalGreeting: 'Sawubona mntanami 🌺',
    mamaTitle: 'Mama',
  },
  xh: {
    code: 'xh',
    name: 'Xhosa',
    nativeName: 'isiXhosa',
    region: 'Southern Africa',
    culturalGreeting: 'Molo mntanam 🌺',
    mamaTitle: 'Mama',
  },
  am: {
    code: 'am',
    name: 'Amharic',
    nativeName: 'አማርኛ',
    region: 'East Africa (Ethiopia)',
    culturalGreeting: 'ሰላም ልጄ 🌺',
    mamaTitle: 'እናት',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    region: 'North Africa',
    culturalGreeting: 'مرحبا يا عزيزتي 🌺',
    mamaTitle: 'ماما',
  },
  lg: {
    code: 'lg',
    name: 'Luganda',
    nativeName: 'Luganda',
    region: 'East Africa (Uganda)',
    culturalGreeting: 'Oli otya omwana wange 🌺',
    mamaTitle: 'Maama',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    region: 'Diaspora',
    culturalGreeting: 'Hola querida 🌺',
    mamaTitle: 'Mamá',
  },
  pt: {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    region: 'Lusophone Africa',
    culturalGreeting: 'Olá querida 🌺',
    mamaTitle: 'Mamã',
  },
}

// Detect user's preferred language from browser
export function detectLanguage(): string {
  if (typeof window === 'undefined') return 'en'
  
  // Check localStorage first
  const stored = localStorage.getItem('mamaLang')
  if (stored && supportedLanguages[stored]) return stored
  
  // Check browser language
  const browserLang = navigator.language.split('-')[0]
  if (supportedLanguages[browserLang]) return browserLang
  
  // Default to English
  return 'en'
}

// Save user's language preference
export function saveLanguagePreference(langCode: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('mamaLang', langCode)
}

// Get cultural prompt for AI based on language
export function getCulturalPrompt(langCode: string): string {
  const lang = supportedLanguages[langCode] || supportedLanguages.en
  
  const culturalNuances: Record<string, string> = {
    en: 'Use warm, motherly English. Say "dear", "my child", "let\'s check together".',
    fr: 'Parlez français maternel et chaleureux. Utilisez "ma chère", "mon enfant", "ne t\'inquiète pas".',
    sw: 'Tumia Kiswahili cha upole na huruma. Sema "pole sana", "mtoto wangu", "tutaangalia pamoja".',
    yo: 'Ṣe ìsọ̀rọ̀ Yorùbá pẹ̀lú ìfẹ́ àti ìtọ́jú. Lo "ọmọ mi", "má bà a lórùn", "a ó wo ọ́ papọ̀".',
    tw: 'Kasa Twi a ɛyɛ dɛ na ɛyɛ anigye. Ka "me ba", "mma wo ho nhaw wo", "yɛbɛhwɛ no bom".',
    ha: 'Yi magana da Hausa mai tausayi. Faɗa "yarinya", "kada ki damu", "za mu duba tare".',
    zu: 'Khuluma isiZulu esinothando. Thi "mntanami", "ungakhathazeki", "sizobheka ndawonye".',
    xh: 'Thetha isiXhosa esinothando. Yithi "mntanam", "musa ukukhathazeka", "siza kujonga kunye".',
    am: 'በአማርኛ በፍቅር ተናገር። በል "ልጄ"፣ "አትጨነቅ"፣ "አብረን እንመለከት"።',
    ar: 'تحدثي بالعربية بحنان. قولي "يا عزيزتي"، "لا تقلقي"، "سننظر معاً".',
    lg: 'Yogera Oluganda olw\'okwagala. Gamba "omwana wange", "toweraliikirira", "tujja kulaba wamu".',
    es: 'Habla español maternal y cálido. Di "querida", "mi niña", "no te preocupes".',
    pt: 'Fale português maternal e caloroso. Diga "querida", "minha filha", "não se preocupe".',
  }
  
  return culturalNuances[langCode] || culturalNuances.en
}

// Get system prompt for AI with language context
export function getSystemPrompt(langCode: string): string {
  const lang = supportedLanguages[langCode] || supportedLanguages.en
  const culturalTone = getCulturalPrompt(langCode)
  
  return `You are MamaHealth, a warm, caring AI health companion for African families.

LANGUAGE & CULTURE:
- Respond in ${lang.name} (${lang.nativeName})
- ${culturalTone}
- Use the title "${lang.mamaTitle}" when referring to yourself
- Keep responses warm, reassuring, and culturally appropriate for ${lang.region}

MEDICAL GUIDANCE:
- Provide home-care first approach
- Suggest simple remedies (fluids, rest, OTC medications)
- Always include red flags that require doctor visit
- Never diagnose - only triage and guide
- Consider common African illnesses (malaria, typhoid, etc.)
- Keep responses concise (2-3 sentences max)

SAFETY:
- For serious symptoms (high fever >39°C, difficulty breathing, severe pain, blood), immediately advise seeing a doctor
- Always end with "If symptoms persist or worsen, please visit a clinic"
- Never replace professional medical advice

TONE EXAMPLES:
- English: "${lang.culturalGreeting} I'm ${lang.mamaTitle}Health. Tell me what's wrong, and we'll check it together."
- Reassurance: "Don't worry dear, let's take it step by step."
- Urgency: "This needs a doctor's attention. Please visit your clinic today, dear."

Remember: You are like a wise, loving mother or community elder - not a cold chatbot.`
}

// Get welcome message in user's language
export function getWelcomeMessage(langCode: string): string {
  const lang = supportedLanguages[langCode] || supportedLanguages.en
  
  const welcomeMessages: Record<string, string> = {
    en: `${lang.culturalGreeting} I'm MamaHealth. Tell me what's wrong, and we'll check it together.`,
    fr: `${lang.culturalGreeting} Je suis MamaHealth. Dis-moi ce qui ne va pas, et nous allons vérifier ensemble.`,
    sw: `${lang.culturalGreeting} Mimi ni MamaHealth. Niambie nini kiko, tutaangalia pamoja.`,
    yo: `${lang.culturalGreeting} Èmi ni MamaHealth. Sọ fún mi ohun tó ṣẹlẹ̀, a ó wo ọ́ papọ̀.`,
    tw: `${lang.culturalGreeting} Me yɛ MamaHealth. Ka kyerɛ me deɛ ɛyɛ wo, yɛbɛhwɛ no bom.`,
    ha: `${lang.culturalGreeting} Ni ne MamaHealth. Faɗa mini abin da ke damun ki, za mu duba tare.`,
    zu: `${lang.culturalGreeting} NginguMamaHealth. Ngitshele ukuthi yini engahambi kahle, sizobheka ndawonye.`,
    xh: `${lang.culturalGreeting} NdinguMamaHealth. Ndixelele ukuba yintoni engahambi kakuhle, siza kujonga kunye.`,
    am: `${lang.culturalGreeting} እኔ MamaHealth ነኝ። ምን እንደሆነ ንገረኝ፣ አብረን እንመለከት።`,
    ar: `${lang.culturalGreeting} أنا MamaHealth. أخبريني ما الخطأ، وسننظر معاً.`,
    lg: `${lang.culturalGreeting} Nze MamaHealth. Mbuulira ekizibu, tujja kulaba wamu.`,
    es: `${lang.culturalGreeting} Soy MamaHealth. Dime qué te pasa, y lo revisaremos juntas.`,
    pt: `${lang.culturalGreeting} Sou MamaHealth. Diga-me o que está errado, e vamos verificar juntas.`,
  }
  
  return welcomeMessages[langCode] || welcomeMessages.en
}

// Get offline message in user's language
export function getOfflineMessage(langCode: string): string {
  const offlineMessages: Record<string, string> = {
    en: "I'm offline right now, dear 💫 But I've saved your message. When we reconnect, I'll help you properly. For emergencies, please call your doctor immediately.",
    fr: "Je suis hors ligne maintenant, ma chère 💫 Mais j'ai sauvegardé ton message. Quand nous nous reconnecterons, je t'aiderai correctement. Pour les urgences, appelle ton médecin immédiatement.",
    sw: "Niko nje ya mtandao sasa, mpendwa 💫 Lakini nimehifadhi ujumbe wako. Tutakapounganisha tena, nitakusaidia vizuri. Kwa dharura, piga simu daktari wako mara moja.",
    yo: "Mo wà lórí ayélujára báyìí, ọmọ mi 💫 Ṣùgbọ́n mo ti fi ìfiránṣẹ́ rẹ pamọ́. Nígbà tí a bá tún darapọ̀, èmi yóò ràn ọ́ lọ́wọ́ dáadáa. Fún ìṣòro tó burú, pe dókítà rẹ lẹ́sẹ̀kẹsẹ̀.",
    tw: "Me nni intanɛt seesei, me ba 💫 Nanso makoraa wo nkrasɛm. Sɛ yɛsan ba a, mɛboa wo yie. Sɛ ɛyɛ ntɛmntɛm a, frɛ wo dɔkota ntɛm ara.",
    ha: "Ina kashe a yanzu, yarinya 💫 Amma na adana sakonki. Lokacin da muka sake haɗuwa, zan taimake ki da kyau. Don gaggawa, kira likitanka nan take.",
    zu: "Angikayi ku-inthanethi manje, mntanami 💫 Kodwa ngilondoloze umlayezo wakho. Uma siphinde sixhumane, ngizokusiza kahle. Ezimweni eziphuthumayo, shayela udokotela wakho ngokushesha.",
    xh: "Andikho kwi-intanethi ngoku, mntanam 💫 Kodwa ndigcine umyalezo wakho. Xa siphinda sidibane, ndiza kukunceda kakuhle. Kwiimeko ezingxamisekileyo, biza ugqirha wakho ngokukhawuleza.",
    am: "አሁን ከመስመር ውጭ ነኝ፣ ልጄ 💫 ግን መልእክትህን አስቀምጫለሁ። ስንገናኝ በደንብ እረዳሃለሁ። ለአደጋ ጊዜ ዶክተርህን ወዲያውኑ ደውል።",
    ar: "أنا غير متصلة الآن، يا عزيزتي 💫 لكنني حفظت رسالتك. عندما نتصل مرة أخرى، سأساعدك بشكل صحيح. في حالات الطوارئ، اتصلي بطبيبك فوراً.",
    lg: "Sili ku mukutu kati, omwana wange 💫 Naye nterekesewo obubaka bwo. Bwe tunaaddamu okukwatagana, nja kukuyamba bulungi. Mu mbeera ez'amangu, kubira omusawo wo mangu ddala.",
    es: "Estoy desconectada ahora, querida 💫 Pero he guardado tu mensaje. Cuando nos reconectemos, te ayudaré correctamente. Para emergencias, llama a tu médico inmediatamente.",
    pt: "Estou desconectada agora, querida 💫 Mas salvei sua mensagem. Quando nos reconectarmos, vou ajudá-la corretamente. Para emergências, ligue para seu médico imediatamente.",
  }
  
  return offlineMessages[langCode] || offlineMessages.en
}

// Language groups for UI organization
export const languageGroups = {
  'West Africa': ['en', 'fr', 'yo', 'tw', 'ha'],
  'East Africa': ['en', 'sw', 'am', 'lg'],
  'Southern Africa': ['en', 'zu', 'xh'],
  'North Africa': ['ar', 'fr'],
  'Diaspora': ['es', 'pt'],
}

// Get all languages as array for UI
export function getLanguageList(): Language[] {
  return Object.values(supportedLanguages)
}

// Get language by code
export function getLanguage(code: string): Language {
  return supportedLanguages[code] || supportedLanguages.en
}
