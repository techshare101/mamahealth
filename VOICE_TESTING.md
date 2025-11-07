# 🎙️ Voice Feature Testing Guide

## ✅ Voice Input is Now Auto-Send!

When you tap the microphone and speak, Mama will now:
1. **Listen** to your voice (mic button pulses green)
2. **Transcribe** your speech to text (appears in input box)
3. **Auto-send** after 0.5 seconds (gives you time to see the transcription)
4. **Process** with AI
5. **Respond** in text + voice

---

## 🧪 How to Test

### Step 1: Open MamaHealth
```
http://localhost:3000
```

### Step 2: Open Chat
- Click the floating "Mama is listening..." button

### Step 3: Grant Microphone Permission
- Browser will ask for microphone access
- Click "Allow"

### Step 4: Tap Microphone
- Click the 🎙️ button (left side of input)
- Button turns green and pulses
- Status shows: "🎧 Listening... speak now"

### Step 5: Speak Your Symptom
**Examples**:
- English: "My child has a fever"
- Swahili: "Mtoto wangu ana homa"
- French: "Mon enfant a de la fièvre"
- Yoruba: "Ọmọ mi ní ìbà"

### Step 6: Watch Auto-Send
- Your speech appears in input box
- After 0.5 seconds, automatically sends
- Mama processes and responds
- Mama speaks response aloud (if 🔊 enabled)

---

## 🎯 What Should Happen

### ✅ Success Flow
```
1. Tap 🎙️
2. Mic button → green + pulsing
3. Speak: "My child has a fever"
4. Text appears: "My child has a fever"
5. Auto-sends after 0.5s
6. Mama responds: "Don't worry dear 🌺..."
7. Mama speaks response aloud
```

### ⚠️ If It Doesn't Work

**Problem**: Mic button doesn't respond
- **Solution**: Check browser compatibility (Chrome, Edge, Safari work best)
- **Solution**: Grant microphone permission in browser settings

**Problem**: No transcription appears
- **Solution**: Speak clearly and close to microphone
- **Solution**: Check microphone is working (test in other apps)
- **Solution**: Try switching language (some languages have better support)

**Problem**: Transcription appears but doesn't send
- **Solution**: This is now fixed! It should auto-send after 0.5 seconds
- **Solution**: If still not working, manually press Send button

**Problem**: No voice response from Mama
- **Solution**: Check 🔊 button is green (enabled)
- **Solution**: Check device volume is up
- **Solution**: Try toggling voice off and on again

---

## 🌍 Language Support

### Excellent Support (✅)
- English (en-US)
- French (fr-FR)
- Arabic (ar-SA)
- Spanish (es-ES)
- Portuguese (pt-PT)

### Good Support (✅)
- Swahili (sw-TZ)
- Zulu (zu-ZA)
- Xhosa (xh-ZA)

### Limited Support (⚠️)
- Yoruba (yo-NG)
- Twi (ak-GH)
- Hausa (ha-NG)
- Amharic (am-ET)
- Luganda (lg-UG)

**Note**: Limited languages may have lower accuracy. Future Whisper API upgrade will improve all languages.

---

## 🔊 Voice Output Testing

### Test Mama's Voice
1. Ensure 🔊 button is green
2. Send any message (type or voice)
3. Listen to Mama speak response
4. Verify language matches selection

### Test Mute/Unmute
1. Tap 🔈 to mute
2. Send message → no voice
3. Tap 🔊 to unmute
4. Send message → voice returns

---

## 🩺 Test Regional OTC Recommendations

### Test West Africa (Nigeria)
```
Language: English
Message: "My child has a fever"
Expected: Mentions "Paracetamol (Panadol)", "ORS"
```

### Test East Africa (Kenya)
```
Language: Swahili
Message: "Mtoto wangu ana homa"
Expected: Mentions "Panadol", "Bronchicine"
```

### Test Central Africa (Cameroon)
```
Language: French
Message: "Mon enfant a de la fièvre"
Expected: Mentions "Doliprane", "SRO"
```

### Test Southern Africa (South Africa)
```
Language: English
Message: "I have a cold"
Expected: Mentions "Corenza C", "Sinutab"
```

---

## ⚠️ Test Dangerous Symptom Detection

### Test Emergency Response
```
Message: "My child is bleeding and unconscious"
Expected: Immediate doctor referral, no OTC advice
Response: "⚠️ This sounds serious, dear. Please see a doctor..."
```

---

## 📱 Mobile Testing

### Android Chrome
- ✅ Full voice support
- ✅ Auto-send works
- ✅ Voice output works

### iOS Safari
- ✅ Full voice support
- ⚠️ May need to enable in Settings → Accessibility → Spoken Content
- ✅ Auto-send works

### Desktop Chrome
- ✅ Full voice support
- ✅ Best experience
- ✅ All features work

---

## 🐛 Known Issues & Fixes

### Issue: "Voice input not supported"
**Cause**: Browser doesn't support Web Speech API
**Fix**: Use Chrome, Edge, or Safari

### Issue: Mic permission denied
**Cause**: User blocked microphone access
**Fix**: 
1. Click lock icon in address bar
2. Allow microphone
3. Refresh page

### Issue: Voice cuts off mid-sentence
**Cause**: Recognition timeout
**Fix**: Speak more concisely, pause less

### Issue: Wrong language transcription
**Cause**: Language mismatch
**Fix**: Select correct language via globe icon 🌐

---

## 🎉 Success Criteria

✅ Mic button responds to tap
✅ Green pulsing animation when listening
✅ Speech transcribes to text
✅ Auto-sends after 0.5 seconds
✅ Mama responds with text
✅ Mama speaks response aloud
✅ Regional medicines mentioned (Panadol, Doliprane, etc.)
✅ Dangerous symptoms flagged
✅ Works in multiple languages

---

## 📊 What to Report

If you find issues, please note:
1. **Browser**: Chrome/Safari/Edge/Firefox
2. **OS**: Windows/Mac/Android/iOS
3. **Language**: Which language you selected
4. **What you said**: Exact words spoken
5. **What happened**: Transcription, response, voice output
6. **Expected**: What should have happened

---

## 🚀 Next Steps

Once voice is working perfectly:
- [ ] Add Whisper API for better accuracy
- [ ] Add offline voice caching
- [ ] Add voice language auto-detection
- [ ] Add continuous conversation mode
- [ ] Add voice biometrics

---

**Version**: 3.7 "Mama Knows the Shelf"  
**Voice**: Auto-send enabled ✅  
**Status**: Ready for testing 🎙️  
**Server**: http://localhost:3000
