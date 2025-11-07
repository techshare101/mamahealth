import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { text, lang = 'en' } = await req.json()

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    /**
     * 🌍 Regional female-voice map
     * Currently using OpenAI's available voices
     * As more regional voices become available, update these mappings
     * 
     * Available OpenAI voices: alloy, echo, fable, onyx, nova, shimmer
     * - alloy: neutral, balanced
     * - nova: warm, friendly (best for female voice)
     * - shimmer: soft, gentle
     */
    const voiceMap: Record<string, { voice: 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer'; label: string }> = {
      en: { voice: 'nova', label: 'English (Nigeria/UK)' },
      fr: { voice: 'shimmer', label: 'French (Francophone Africa)' },
      sw: { voice: 'nova', label: 'Swahili (East Africa)' },
      yo: { voice: 'nova', label: 'Yoruba (West Africa)' },
      tw: { voice: 'nova', label: 'Twi (Ghana)' },
      ha: { voice: 'nova', label: 'Hausa (Nigeria)' },
      zu: { voice: 'nova', label: 'Zulu (South Africa)' },
      xh: { voice: 'nova', label: 'Xhosa (South Africa)' },
      am: { voice: 'shimmer', label: 'Amharic (Ethiopia)' },
      ar: { voice: 'shimmer', label: 'Arabic (North Africa)' },
      lg: { voice: 'nova', label: 'Luganda (Uganda)' },
      es: { voice: 'shimmer', label: 'Spanish (Diaspora)' },
      pt: { voice: 'shimmer', label: 'Portuguese (Mozambique/Angola)' },
    }

    const selected = voiceMap[lang] || voiceMap.en

    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key not configured for TTS')
      return NextResponse.json(
        { error: 'Voice service not configured' },
        { status: 503 }
      )
    }

    // Generate speech using OpenAI TTS
    const tts = await openai.audio.speech.create({
      model: 'tts-1', // Use tts-1 for faster, tts-1-hd for higher quality
      voice: selected.voice,
      input: text,
      speed: 0.95, // Slightly slower for warmth and clarity
    })

    const buffer = Buffer.from(await tts.arrayBuffer())

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'X-Mama-Voice': selected.label,
        'X-Mama-Language': lang,
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      },
    })
  } catch (error) {
    console.error('MamaHealth TTS error:', error)
    return NextResponse.json(
      { error: 'Mama lost her voice 🌺 Please try again.' },
      { status: 500 }
    )
  }
}
