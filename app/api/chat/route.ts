import { NextRequest, NextResponse } from 'next/server'
import { getSystemPrompt, getLanguage } from '@/lib/language'
import { buildOTCPrompt, detectSymptom, detectRegion, getOTCRecommendations, hasDangerousSymptoms } from '@/lib/otc'

export async function POST(request: NextRequest) {
  try {
    const { message, lang = 'en', country } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      console.error('OpenAI API key not configured')
      const language = getLanguage(lang)
      return NextResponse.json(
        {
          response:
            "I'm not fully set up yet, dear. Please ask the team to add the OpenAI API key. 💖",
        },
        { status: 200 }
      )
    }

    // Check for dangerous symptoms - immediate doctor referral
    if (hasDangerousSymptoms(message)) {
      return NextResponse.json({
        response:
          "⚠️ This sounds serious, dear. Please see a doctor or visit the nearest clinic immediately. For emergencies, call your local emergency number. 💖",
        urgent: true,
      })
    }

    // Get culturally-aware system prompt with regional OTC context
    const systemPrompt = buildOTCPrompt(lang, message, country)
    
    // Detect region and symptom for metadata
    const region = detectRegion(lang, country)
    const symptom = detectSymptom(message)
    const otcRec = getOTCRecommendations(region, symptom)

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 200,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('OpenAI API error:', error)
      return NextResponse.json(
        {
          response:
            "I'm having a little trouble right now, dear. Please try again in a moment. 💖",
        },
        { status: 200 }
      )
    }

    const data = await response.json()
    const aiResponse = data.choices[0]?.message?.content || "I'm here to help. Can you tell me more?"

    return NextResponse.json({
      response: aiResponse,
      metadata: {
        region,
        symptom,
        otcAvailable: otcRec ? otcRec.medicines : [],
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      {
        response:
          "Something went wrong, dear. Please try again. If this continues, please contact support. 💖",
      },
      { status: 200 }
    )
  }
}
