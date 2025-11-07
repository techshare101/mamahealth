import otcData from '@/data/otcDictionary.json'

export type Region = 'west_africa' | 'east_africa' | 'central_africa' | 'southern_africa' | 'north_africa'

export interface OTCRecommendation {
  region: Region
  regionName: string
  symptom: string
  medicines: string[]
  safetyWarnings: string[]
}

// Language to region mapping
const langToRegion: Record<string, Region> = {
  en: 'west_africa',
  fr: 'central_africa',
  sw: 'east_africa',
  yo: 'west_africa',
  tw: 'west_africa',
  ha: 'west_africa',
  zu: 'southern_africa',
  xh: 'southern_africa',
  am: 'east_africa',
  ar: 'north_africa',
  lg: 'east_africa',
  es: 'west_africa',
  pt: 'southern_africa',
}

/**
 * Detect user's region based on language or country
 */
export function detectRegion(language: string, countryHint?: string): Region {
  // First try to match by country
  if (countryHint) {
    const key = Object.keys(otcData.regions).find((region) =>
      otcData.regions[region as Region].countries.some(
        (c) => c.toLowerCase() === countryHint.toLowerCase()
      )
    )
    if (key) return key as Region
  }

  // Fall back to language mapping
  return langToRegion[language] || 'west_africa'
}

/**
 * Detect symptom from user message
 */
export function detectSymptom(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  // Check each symptom category
  for (const [symptom, keywords] of Object.entries(otcData.common_symptoms)) {
    if (keywords.some((keyword) => lowerMessage.includes(keyword.toLowerCase()))) {
      return symptom
    }
  }
  
  return 'general'
}

/**
 * Get OTC recommendations for a region and symptom
 */
export function getOTCRecommendations(
  region: Region,
  symptom: string
): OTCRecommendation | null {
  const regionData = otcData.regions[region]
  if (!regionData) return null

  const medicines = regionData.otc[symptom as keyof typeof regionData.otc]
  if (!medicines || medicines.length === 0) return null

  return {
    region,
    regionName: regionData.common_name,
    symptom,
    medicines,
    safetyWarnings: otcData.safety_guidelines.always_include,
  }
}

/**
 * Build AI system prompt with regional OTC context
 */
export function buildOTCPrompt(
  language: string,
  message: string,
  countryHint?: string
): string {
  const region = detectRegion(language, countryHint)
  const symptom = detectSymptom(message)
  const otcRec = getOTCRecommendations(region, symptom)

  const basePrompt = `You are MamaHealth, a warm, culturally aware African AI nurse.
You provide concise, caring, safe home-care guidance.

Always include:
- Home care steps (rest, hydration, monitoring)
- If applicable, over-the-counter (OTC) medicine options (only safe, non-prescription ones)
- A clear safety reminder to visit a doctor if symptoms persist or worsen

SAFETY RULES:
- Mention only mild, non-prescription remedies
- Never list antibiotics, controlled substances, or prescription-only medications
- Always close with: "If symptoms persist or worsen, please see a qualified clinician"
- For infants under 6 months, always recommend seeing a doctor
- Respond in the user's language (${language})`

  if (otcRec) {
    return `${basePrompt}

REGIONAL CONTEXT:
In ${otcRec.regionName}, common OTC options for ${symptom} include:
${otcRec.medicines.map((med) => `- ${med}`).join('\n')}

Use these familiar medicine names when giving advice, so families recognize them from their local pharmacy.`
  }

  return basePrompt
}

/**
 * Get all regions
 */
export function getAllRegions() {
  return Object.entries(otcData.regions).map(([key, data]) => ({
    code: key as Region,
    name: data.common_name,
    countries: data.countries,
  }))
}

/**
 * Get safety guidelines
 */
export function getSafetyGuidelines() {
  return otcData.safety_guidelines
}

/**
 * Check if a message mentions any dangerous symptoms
 */
export function hasDangerousSymptoms(message: string): boolean {
  const dangerousKeywords = [
    'blood',
    'bleeding',
    'unconscious',
    'seizure',
    'convulsion',
    'chest pain',
    'difficulty breathing',
    'severe pain',
    'high fever',
    'damu',
    'kutapika damu',
    'kifafa',
    'maumivu makali',
    'sang',
    'saignement',
    'convulsion',
    'douleur sévère',
  ]

  const lowerMessage = message.toLowerCase()
  return dangerousKeywords.some((keyword) => lowerMessage.includes(keyword))
}
