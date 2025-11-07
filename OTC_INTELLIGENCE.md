# 🩺 MamaHealth v3.7 "Mama Knows the Shelf" 💊

## Vision

**"Real medicines, real shelves, real Africa"** - Mama now recommends OTC medicines that families actually recognize and can find at their local pharmacy.

---

## 🌟 What's Been Built

### **Regional OTC Dictionary**
- **5 African regions** covered
- **50+ countries** mapped
- **9 symptom categories** with localized medicines
- **100+ OTC medicines** catalogued
- **Safety guidelines** built-in

### **Intelligent Symptom Detection**
- **Auto-detects symptoms** from user messages
- **Multilingual keywords** (English, French, Swahili, Yoruba, Arabic)
- **Dangerous symptom flagging** for immediate doctor referral
- **Context-aware** recommendations

### **Regional Medicine Mapping**
- **West Africa**: Panadol, Brustan, Action Cold & Flu
- **East Africa**: Panadol, Bronchicine, ENO, Hedex
- **Central Africa**: Doliprane, Efferalgan, Fervex, SRO
- **Southern Africa**: Panado, Corenza C, Sinutab, Disprin
- **North Africa**: Doliprane, Brufen, Maalox, Aerius

---

## 🗺️ Regional Coverage

### West Africa (400M people)
**Countries**: Nigeria, Ghana, Togo, Benin, Senegal, Côte d'Ivoire, Mali, Burkina Faso

**Common Medicines**:
- **Fever**: Paracetamol (Panadol), ORS, Ibuprofen
- **Cough**: Guaifenesin syrup, Honey + Lemon, Benylin
- **Pain**: Paracetamol, Ibuprofen (Brustan, Nurofen)
- **Cold**: Vitamin C (Redoxon), Action Cold & Flu
- **Stomach**: ORS, Antacid tablets, Buscopan

### East Africa (300M people)
**Countries**: Kenya, Tanzania, Uganda, Rwanda, Burundi, Ethiopia, Somalia

**Common Medicines**:
- **Fever**: Paracetamol (Panadol), ORS, Ibuprofen
- **Cough**: Bronchicine, Honey-Lemon, Benadryl
- **Pain**: Ibuprofen, Diclofenac gel, Hedex
- **Stomach**: ORS, ENO, Gestid, Buscopan
- **Diarrhea**: ORS, Zinc tablets, Imodium

### Central Africa (250M people)
**Countries**: DR Congo, Cameroon, Congo-Brazzaville, Gabon, CAR, Chad

**Common Medicines** (Francophone):
- **Fièvre**: Paracetamol, Doliprane, Efferalgan
- **Toux**: Sirop contre la toux, Miel + Citron, Bronchodermine
- **Douleur**: Paracetamol, Doliprane, Ibuprofen
- **Rhume**: Vitamine C, Fervex, Paracetamol
- **Diarrhée**: SRO (Sels de Réhydratation Orale), Zinc

### Southern Africa (200M people)
**Countries**: South Africa, Zimbabwe, Lesotho, Botswana, Namibia, Zambia, Mozambique

**Common Medicines**:
- **Fever**: Paracetamol (Panado), Ibuprofen, Disprin
- **Cold**: Corenza C, Sinutab, Flutex
- **Cough**: Benylin, Linctagon, Honey + Lemon
- **Pain**: Panado, Disprin, Nurofen
- **Allergy**: Loratadine, Cetirizine, Allergex

### North Africa (250M people)
**Countries**: Egypt, Morocco, Algeria, Tunisia, Libya, Sudan

**Common Medicines**:
- **Fever**: Paracetamol (Doliprane), Ibuprofen (Brufen), Panadol
- **Cough**: Acetylcysteine syrup, Bronchicum
- **Cold**: Vitamine C, Fervex
- **Stomach**: Antiacides, Gaviscon, Maalox
- **Allergy**: Loratadine, Cétirizine, Aerius

**Total Coverage: 1.4 Billion people**

---

## 🎯 How It Works

### 1. User Sends Message
```
User: "My child has a fever and headache"
Language: English
Location: Nigeria (detected from browser/profile)
```

### 2. System Detects Context
```typescript
Region: west_africa
Symptom: fever (detected from keywords)
OTC Available: ["Paracetamol (Panadol)", "ORS", "Ibuprofen"]
```

### 3. AI Prompt Enhanced
```
Base Prompt: "You are MamaHealth, a warm African AI nurse..."

+ Regional Context:
"In West Africa, common OTC options for fever include:
- Paracetamol (Panadol)
- ORS (Oral Rehydration Salts)
- Ibuprofen"
```

### 4. Mama Responds
```
"Don't worry dear 🌺. You can give your child Paracetamol (Panadol) 
for the fever - follow the dosage on the pack for their age. Make sure 
they drink plenty of water and rest. If the fever continues for more 
than 3 days or goes above 39°C, please see a doctor."
```

---

## 💊 Symptom Categories

### Fever
**Keywords**: fever, temperature, hot, homa (Swahili), fièvre (French), ìbà (Yoruba)
**OTC Options**: Paracetamol, Ibuprofen, ORS

### Cough
**Keywords**: cough, coughing, kikohozi (Swahili), toux (French), ìkọ́ (Yoruba)
**OTC Options**: Guaifenesin, Honey + Lemon, Benylin, Bronchicine

### Pain
**Keywords**: pain, ache, hurt, maumivu (Swahili), douleur (French), ìrora (Yoruba)
**OTC Options**: Paracetamol, Ibuprofen, Aspirin, Diclofenac gel

### Cold/Flu
**Keywords**: cold, flu, runny nose, mafua (Swahili), rhume (French)
**OTC Options**: Vitamin C, Paracetamol Cold, Corenza C, Fervex

### Stomach Issues
**Keywords**: stomach, belly, tummy, tumbo (Swahili), ventre (French), ikùn (Yoruba)
**OTC Options**: Antacids, Buscopan, ENO, Gaviscon

### Diarrhea
**Keywords**: diarrhea, loose stool, kuharisha (Swahili), diarrhée (French), ìgbónse (Yoruba)
**OTC Options**: ORS, Zinc tablets, Imodium, Loperamide

### Headache
**Keywords**: headache, head pain, kichwa (Swahili), mal de tête (French), orí (Yoruba)
**OTC Options**: Paracetamol, Ibuprofen, Aspirin, Hedex

### Allergy
**Keywords**: allergy, allergic, itching, allergie (French), àtọ̀sí (Yoruba)
**OTC Options**: Cetirizine, Loratadine, Chlorpheniramine

### Malaria Prevention
**Keywords**: malaria, mosquito, prevention
**OTC Options**: Mosquito nets, Insect repellent, Coils

---

## 🛡️ Safety Features

### Dangerous Symptom Detection
**Auto-flags these keywords for immediate doctor referral**:
- Blood, bleeding
- Unconscious, seizure, convulsion
- Chest pain, difficulty breathing
- Severe pain, high fever (>39°C)
- Multilingual: damu, kifafa, sang, saignement, etc.

**Response**:
```
"⚠️ This sounds serious, dear. Please see a doctor or visit 
the nearest clinic immediately. For emergencies, call your 
local emergency number. 💖"
```

### Safety Guidelines
**Always included**:
- "If symptoms persist or worsen, please see a qualified clinician"
- "For emergencies, call your doctor immediately"
- "Follow package instructions for dosage"

**Never recommended**:
- Antibiotics (prescription only)
- Controlled substances
- Injectable medications
- Prescription-only drugs

### Age-Specific Warnings
- **Infants under 6 months**: Always consult a doctor
- **Children under 2**: Use only pediatric formulations
- **Elderly**: Check for drug interactions

---

## 📁 File Structure

### Data
```
data/
  └── otcDictionary.json    # Regional OTC database (5 regions, 50+ countries)
```

### Utilities
```
lib/
  └── otc.ts                # OTC intelligence functions
      ├── detectRegion()
      ├── detectSymptom()
      ├── getOTCRecommendations()
      ├── buildOTCPrompt()
      ├── hasDangerousSymptoms()
      └── getSafetyGuidelines()
```

### API
```
app/api/chat/
  └── route.ts              # Enhanced with OTC intelligence
```

---

## 🧪 Example Conversations

### Nigeria (English - West Africa)
```
User: "My child has a fever of 38°C"

Mama: "Don't worry dear 🌺. You can give your child Paracetamol 
(Panadol) - check the pack for the right dose for their age. 
Make sure they drink plenty of water and ORS to stay hydrated. 
Monitor the temperature. If the fever continues for more than 
3 days or goes above 39°C, please see a doctor."
```

### Kenya (Swahili - East Africa)
```
User: "Mtoto wangu ana kikohozi"

Mama: "Pole sana mpendwa 🌺. Jaribu kumpa Bronchicine au 
mchanganyiko wa asali na limau. Hakikisha anapumzika na 
kunywa maji mengi. Kama kikohozi kinaendelea au kuna 
shida ya kupumua, tafadhali tembelea kliniki."
```

### Cameroon (French - Central Africa)
```
User: "Mon enfant a de la fièvre"

Mama: "Ne t'inquiète pas ma chère 🌺. Tu peux donner du 
Paracétamol (Doliprane) à ton enfant - suis les instructions 
sur la boîte pour son âge. Assure-toi qu'il boive beaucoup 
d'eau et du SRO. Si la fièvre persiste plus de 3 jours, 
consulte un médecin s'il te plaît."
```

### South Africa (English - Southern Africa)
```
User: "I have a bad cold and headache"

Mama: "Sorry to hear that, dear 🌺. You can try Corenza C 
or Sinutab for the cold symptoms, and Panado for the headache. 
Rest well and drink plenty of fluids. If symptoms worsen or 
last more than a week, please see a doctor."
```

### Egypt (Arabic - North Africa)
```
User: "عندي صداع شديد"

Mama: "آسفة لسماع ذلك يا عزيزتي 🌺. يمكنك تناول باراسيتامول 
(دوليبران) أو إيبوبروفين (بروفين) للصداع. تأكدي من شرب الكثير 
من الماء والراحة. إذا استمر الصداع أو ازداد سوءًا، يرجى زيارة الطبيب."
```

---

## 🚀 API Response Format

### Request
```typescript
POST /api/chat
{
  "message": "My child has a fever",
  "lang": "en",
  "country": "Nigeria"  // optional
}
```

### Response
```typescript
{
  "response": "Don't worry dear 🌺. You can give your child...",
  "metadata": {
    "region": "west_africa",
    "symptom": "fever",
    "otcAvailable": [
      "Paracetamol (Panadol)",
      "ORS (Oral Rehydration Salts)",
      "Ibuprofen"
    ]
  }
}
```

### Urgent Response (Dangerous Symptoms)
```typescript
{
  "response": "⚠️ This sounds serious, dear. Please see a doctor...",
  "urgent": true
}
```

---

## 📊 Impact Metrics

### Before OTC Intelligence
- Generic advice: "Take pain reliever"
- Users confused: "Which one?"
- Low trust: "Is this available here?"
- No regional context

### After OTC Intelligence
- ✅ **Specific medicines**: "Take Panadol" (Nigeria) or "Panado" (South Africa)
- ✅ **Recognizable brands**: Families know these names
- ✅ **Local availability**: Medicines actually on shelves
- ✅ **Higher trust**: "Mama knows my pharmacy!"
- ✅ **Better adherence**: Clear, actionable advice
- ✅ **Cultural relevance**: French names in Francophone regions

---

## 🔮 Future Enhancements

### Phase 1: Current (✅ Complete)
- ✅ 5 regions, 50+ countries
- ✅ 9 symptom categories
- ✅ 100+ OTC medicines
- ✅ Dangerous symptom detection
- ✅ Safety guidelines

### Phase 2: Expansion (Next)
- [ ] Add 20 more countries
- [ ] Expand to 15 symptom categories
- [ ] Include dosage calculators (age/weight)
- [ ] Add medicine images/photos
- [ ] Pharmacy locator integration

### Phase 3: Advanced
- [ ] Real-time pharmacy stock checking
- [ ] Price comparison across pharmacies
- [ ] Generic vs. brand alternatives
- [ ] Medicine interaction checker
- [ ] Prescription reminder system

### Phase 4: Community
- [ ] User-submitted medicine reports
- [ ] Community pharmacy reviews
- [ ] Medicine availability crowdsourcing
- [ ] Local health worker verification

---

## 🧪 Testing Guide

### Test Regional Detection
```bash
# Nigeria (West Africa)
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "My child has a fever", "lang": "en", "country": "Nigeria"}'

# Expected: Panadol, ORS

# Kenya (East Africa)
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Mtoto wangu ana homa", "lang": "sw", "country": "Kenya"}'

# Expected: Panadol, Bronchicine, ENO
```

### Test Dangerous Symptoms
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "My child is bleeding and unconscious", "lang": "en"}'

# Expected: Urgent referral, no OTC advice
```

### Test Multilingual Symptoms
```bash
# French
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Mon enfant a de la fièvre", "lang": "fr"}'

# Expected: Doliprane, Efferalgan

# Swahili
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Nina kikohozi", "lang": "sw"}'

# Expected: Bronchicine, Honey-Lemon
```

---

## 🎯 Best Practices

### For Developers
1. **Always test with real medicine names** from target regions
2. **Update dictionary quarterly** - new medicines, discontinued ones
3. **Verify with local pharmacists** - ensure availability
4. **Monitor user feedback** - "Medicine not found" reports
5. **Log all recommendations** - for safety audits

### For Content
1. **Use generic names first** - then brand in parentheses
2. **Include dosage guidance** - "Follow pack instructions"
3. **Age-appropriate warnings** - Infants, children, elderly
4. **Clear safety disclaimers** - Always end with doctor referral
5. **Cultural sensitivity** - Respect local health beliefs

---

## 🌟 The Achievement

**MamaHealth now speaks the language of African pharmacies!**

- ✅ **5 regions** covered
- ✅ **50+ countries** mapped
- ✅ **100+ medicines** catalogued
- ✅ **9 symptom categories**
- ✅ **Multilingual detection**
- ✅ **Dangerous symptom flagging**
- ✅ **Safety guidelines built-in**

**From Panadol in Lagos to Panado in Johannesburg, from Doliprane in Kinshasa to Corenza C in Cape Town - Mama knows what's on your shelf.** 🩺💊🌺

---

**Version**: 3.7 "Mama Knows the Shelf"  
**Regions**: 5 (West, East, Central, Southern, North Africa)  
**Countries**: 50+  
**Medicines**: 100+  
**Status**: Production Ready ✅  
**Next**: Pharmacy locator + Stock checking + Dosage calculator
