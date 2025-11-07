import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { detectSymptom, detectRegion, getOTCRecommendations, hasDangerousSymptoms } from '@/lib/otc'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

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

    // Detect region and symptom for metadata
    const region = detectRegion(lang, country)
    const symptom = detectSymptom(message)
    const otcRec = getOTCRecommendations(region, symptom)
    
    // Build OTC list for prompt
    const otcList = otcRec ? otcRec.medicines.join(', ') : 'No specific OTC suggestions available'
    const regionName = otcRec ? otcRec.regionName : 'your region'

    // Build Mama's detailed prompt
    const mamaPrompt = `You are MamaHealth 🌺 — a caring AI family health companion for Africa.
Your job: respond in a warm, motherly tone with complete, actionable medical guidance.

Context:
- Language: ${lang}
- Region: ${regionName}
- Detected symptom: ${symptom}
- OTC medicines available regionally: ${otcList}

Instructions:
1. Begin with empathy and reassurance ("Don't worry dear 🌺..." or "I understand, my dear...")
2. Give a brief triage summary:
   - What might be causing this symptom
   - What to watch for (warning signs)
   - When it's safe to manage at home vs. when to see a doctor
3. Recommend safe, regionally available over-the-counter medicines from this list: ${otcList}
4. Include clear dosage guidance:
   - For adults: "Follow pack instructions, typically X mg every Y hours"
   - For children: "Use pediatric formulation, check pack for age-appropriate dose"
   - Safety: "Do not exceed recommended dose"
5. Add practical home-care steps:
   - Hydration (specific amounts if relevant)
   - Rest and positioning
   - Diet recommendations
   - Temperature management
   - When to monitor symptoms
6. Always finish with a safety disclaimer: "If symptoms persist more than 3 days, worsen, or you notice [specific warning signs], please see a doctor immediately."

Tone: Warm, caring, motherly, but medically sound. Use simple language. Be specific with advice.
Respond fully in ${lang} language.

User message:
${message}`

    // Call OpenAI API with new SDK
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.8,
      max_tokens: 600,
      messages: [
        {
          role: 'system',
          content: mamaPrompt,
        },
      ],
    })

    const aiResponse = completion.choices[0]?.message?.content?.trim() || "I'm here to help, dear. Can you tell me more about your symptoms?"

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
