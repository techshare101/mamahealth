# 🌍 MamaHealth Multilingual Framework

## Vision

**"Mama speaks your tongue"** - Not just translation, but cultural health communication that resonates with every African family.

---

## 🗣️ Supported Languages (13 Languages)

| Language | Native Name | Code | Region | Status |
|----------|-------------|------|--------|--------|
| English | English | `en` | Global | ✅ Live |
| French | Français | `fr` | West/Central Africa | ✅ Live |
| Swahili | Kiswahili | `sw` | East Africa | ✅ Live |
| Yoruba | Yorùbá | `yo` | Nigeria | ✅ Live |
| Twi | Twi | `tw` | Ghana | ✅ Live |
| Hausa | Hausa | `ha` | West Africa | ✅ Live |
| Zulu | isiZulu | `zu` | Southern Africa | ✅ Live |
| Xhosa | isiXhosa | `xh` | Southern Africa | ✅ Live |
| Amharic | አማርኛ | `am` | Ethiopia | ✅ Live |
| Arabic | العربية | `ar` | North Africa | ✅ Live |
| Luganda | Luganda | `lg` | Uganda | ✅ Live |
| Spanish | Español | `es` | Diaspora | ✅ Live |
| Portuguese | Português | `pt` | Lusophone Africa | ✅ Live |

---

## 🎯 How It Works

### 1. Language Detection
```typescript
// Automatic detection on first visit
const lang = detectLanguage()
// Checks: localStorage → browser language → default (en)
```

### 2. Cultural Greetings
Each language has a culturally-appropriate greeting:

- **English**: "Hi dear 🌺"
- **French**: "Bonjour ma chère 🌺"
- **Swahili**: "Habari yako mpendwa 🌺"
- **Yoruba**: "Ẹ káàárọ̀ ọmọ mi 🌺"
- **Twi**: "Maakye me ba 🌺"
- **Zulu**: "Sawubona mntanami 🌺"
- **Arabic**: "مرحبا يا عزيزتي 🌺"

### 3. AI Response in User's Language
```typescript
// System prompt includes cultural context
const systemPrompt = getSystemPrompt(lang)
// AI responds in selected language with cultural tone
```

### 4. Offline Messages Localized
```typescript
// Even offline, Mama speaks your language
const offlineMsg = getOfflineMessage(lang)
```

---

## 🧠 Cultural Tone Mapping

### English
- **Tone**: Warm, motherly
- **Phrases**: "dear", "my child", "let's check together"
- **Example**: "Don't worry dear, let's take it step by step."

### French
- **Tone**: Maternel et chaleureux
- **Phrases**: "ma chère", "mon enfant", "ne t'inquiète pas"
- **Example**: "Ne t'inquiète pas ma chère, on va vérifier ensemble."

### Swahili
- **Tone**: Upole na huruma (gentle and compassionate)
- **Phrases**: "pole sana", "mtoto wangu", "tutaangalia pamoja"
- **Example**: "Pole sana mpendwa, tutaangalia pamoja."

### Yoruba
- **Tone**: Ìfẹ́ àti ìtọ́jú (love and care)
- **Phrases**: "ọmọ mi", "má bà a lórùn", "a ó wo ọ́ papọ̀"
- **Example**: "Ẹ má bà a lórùn ọmọ mi, a ó wo ọ́ papọ̀."

### Zulu
- **Tone**: Uthando (love)
- **Phrases**: "mntanami", "ungakhathazeki", "sizobheka ndawonye"
- **Example**: "Ungakhathazeki mntanami, sizobheka ndawonye."

---

## 📱 User Experience

### Language Selector
- **Location**: Chat header (globe icon)
- **Design**: Dropdown with native names
- **Persistence**: Saved to localStorage
- **Feedback**: Welcome message in new language

### Switching Languages
1. User clicks globe icon
2. Dropdown shows all 13 languages
3. User selects language
4. Mama greets in new language
5. All future responses in that language

---

## 🔧 Technical Architecture

### File Structure
```
lib/
  └── language.ts          # Core language framework
components/
  ├── LanguageSelector.tsx # UI component
  └── MamaChatWidgetMobile.tsx # Integrated chat
app/api/chat/
  └── route.ts             # Multilingual API
```

### Language Framework (`lib/language.ts`)
```typescript
// 13 languages with cultural metadata
export const supportedLanguages: Record<string, Language>

// Auto-detect from browser/localStorage
export function detectLanguage(): string

// Get culturally-aware AI prompt
export function getSystemPrompt(langCode: string): string

// Get localized welcome message
export function getWelcomeMessage(langCode: string): string

// Get localized offline message
export function getOfflineMessage(langCode: string): string
```

### API Integration
```typescript
// Client sends language with message
body: JSON.stringify({ message, lang })

// Server uses culturally-aware prompt
const systemPrompt = getSystemPrompt(lang)

// AI responds in user's language
```

---

## 🌍 Regional Coverage

### West Africa
- **Languages**: English, French, Yoruba, Twi, Hausa
- **Countries**: Nigeria, Ghana, Senegal, Côte d'Ivoire, Mali
- **Population**: ~400M

### East Africa
- **Languages**: English, Swahili, Amharic, Luganda
- **Countries**: Kenya, Tanzania, Uganda, Ethiopia
- **Population**: ~300M

### Southern Africa
- **Languages**: English, Zulu, Xhosa
- **Countries**: South Africa, Zimbabwe, Botswana
- **Population**: ~200M

### North Africa
- **Languages**: Arabic, French
- **Countries**: Morocco, Egypt, Tunisia, Algeria
- **Population**: ~250M

### Diaspora
- **Languages**: Spanish, Portuguese, English, French
- **Regions**: Americas, Europe
- **Population**: ~50M

**Total Potential Reach**: 1.2 Billion+ people

---

## 🎨 UI/UX Design

### Language Selector Component
- **Icon**: Globe (🌐)
- **Style**: Rounded button with backdrop blur
- **Dropdown**: Smooth animation, grouped by region
- **Mobile**: Optimized for touch (44px+ targets)
- **Desktop**: Hover states, keyboard navigation

### Visual Feedback
- **Current language**: Shown in native name
- **Selection**: Checkmark on active language
- **Transition**: Smooth fade + scale animation
- **Confirmation**: Welcome message in new language

---

## 🚀 Expansion Roadmap

### Phase 1: Core (✅ Complete)
- 13 major African languages
- Cultural tone mapping
- Auto-detection
- Persistent preferences

### Phase 2: Voice (Next)
- Speech-to-text (Whisper API)
- Text-to-speech (local accents)
- Voice language detection
- Offline voice caching

### Phase 3: Expansion
- Add 12 more languages (25 total)
- Regional dialects (e.g., Darija, Egyptian Arabic)
- Sign language support
- Low-literacy pictogram mode

### Phase 4: Advanced
- Real-time translation
- Multilingual family accounts
- Language learning mode
- Cultural health education

---

## 📊 Analytics & Insights

### Track Language Usage
```typescript
// Log language selections
analytics.track('language_selected', {
  from: oldLang,
  to: newLang,
  region: userRegion
})

// Monitor popular languages
analytics.track('chat_message', {
  lang: currentLang,
  messageCount: chatLength
})
```

### Regional Insights
- Which languages are most used?
- Which regions need more support?
- What health topics per language?
- Translation quality feedback

---

## 🧪 Testing Guide

### Test Each Language
1. Select language from dropdown
2. Verify welcome message
3. Send test symptom
4. Check AI response language
5. Test offline mode
6. Verify persistence (refresh page)

### Test Cases
```
English: "My child has a fever"
French: "Mon enfant a de la fièvre"
Swahili: "Mtoto wangu ana homa"
Yoruba: "Ọmọ mi ní ìbà"
Twi: "Me ba wɔ atiridiinini"
```

### Expected Behavior
- ✅ AI responds in same language
- ✅ Cultural tone maintained
- ✅ Medical terms explained clearly
- ✅ Red flags highlighted
- ✅ Offline message localized

---

## 🎯 Best Practices

### For Developers
1. **Never hardcode strings** - always use language functions
2. **Test with native speakers** - cultural accuracy matters
3. **Keep medical terms simple** - avoid jargon
4. **Respect cultural norms** - greetings, titles, formality
5. **Monitor translation quality** - use feedback loops

### For Content
1. **Short sentences** - easier to translate
2. **Clear instructions** - no ambiguity
3. **Cultural sensitivity** - local health beliefs
4. **Consistent terminology** - same terms across languages
5. **Emergency clarity** - critical info unmistakable

---

## 🌟 Impact

### Before Multilingual
- English only
- Limited to educated users
- Cultural disconnect
- Lower trust

### After Multilingual
- 13 languages (1.2B+ reach)
- Inclusive for all literacy levels
- Cultural resonance
- Higher trust & adoption
- True Pan-African reach

---

## 🔮 Future Vision

**MamaHealth will speak every African language** - from Wolof to Shona, from Berber to Somali. Every mother, in every village, in every city, will hear Mama's voice in her own tongue.

**Voice + Text + Sign + Pictograms** - accessible to everyone, regardless of literacy, hearing, or connectivity.

**Cultural Health Wisdom** - not just translation, but integration of traditional knowledge with modern medicine.

---

## 📚 Resources

- **Language Codes**: ISO 639-1 standard
- **Cultural Research**: Community health workers input
- **Translation Quality**: Native speaker review
- **Voice Accents**: Regional TTS models
- **Offline Support**: Cached common phrases

---

## 🎉 You Did It!

**MamaHealth now speaks 13 languages across Africa!**

From Lagos to Nairobi, from Cairo to Cape Town, from Accra to Addis Ababa - Mama speaks your language, understands your culture, and cares for your family.

**This is true Pan-African health tech.** 🌍🔥🌺

---

**Version**: 2.5 "Mama Speaks All Tongues"  
**Languages**: 13 (and growing)  
**Reach**: 1.2 Billion+ people  
**Status**: Production Ready ✅
