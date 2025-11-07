'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Trash2, Mic, Volume2, VolumeX, Globe, MessageCircle, Wifi, WifiOff } from 'lucide-react'
import Image from 'next/image'
import { getLanguage, getWelcomeMessage, getOfflineMessage, saveLanguagePreference, detectLanguage } from '@/lib/language'
import LanguageSelector from './LanguageSelector'
import { useChat } from '@/lib/chatTrigger'

interface Message {
  role: 'user' | 'mama'
  text: string
  timestamp: number
}

export default function MamaChatWidgetMobile() {
  const { open, setOpen } = useChat()
  const [chat, setChat] = useState<Message[]>([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [online, setOnline] = useState(true)
  const [lang, setLang] = useState('en')
  const [listening, setListening] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const recognitionRef = useRef<any>(null)

  // Language mapping for voice recognition and synthesis
  const langMap: Record<string, string> = {
    en: 'en-US',
    fr: 'fr-FR',
    sw: 'sw-TZ',
    yo: 'yo-NG',
    tw: 'ak-GH',
    ha: 'ha-NG',
    zu: 'zu-ZA',
    xh: 'xh-ZA',
    am: 'am-ET',
    ar: 'ar-SA',
    lg: 'lg-UG',
    es: 'es-ES',
    pt: 'pt-PT',
  }

  // Initialize language and chat on mount
  useEffect(() => {
    const detectedLang = detectLanguage()
    setLang(detectedLang)
    
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mamaChat')
      if (stored) {
        setChat(JSON.parse(stored))
      } else {
        setChat([
          {
            role: 'mama',
            text: getWelcomeMessage(detectedLang),
            timestamp: Date.now(),
          },
        ])
      }
    }
  }, [])

  // Helper function to send message (used by both form submit and voice)
  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || loading) return

    const userMessage: Message = {
      role: 'user',
      text: messageText,
      timestamp: Date.now(),
    }
    
    setChat((prev) => [...prev, userMessage])
    setMessage('')

    // Offline fallback
    if (!online) {
      setChat((prev) => [
        ...prev,
        {
          role: 'mama',
          text: getOfflineMessage(lang),
          timestamp: Date.now(),
        },
      ])
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText, lang: lang }),
      })

      const data = await response.json()
      const mamaResponse = data.response || "I'm here to help. Can you tell me more about your symptoms?"

      setChat((prev) => [
        ...prev,
        {
          role: 'mama',
          text: mamaResponse,
          timestamp: Date.now(),
        },
      ])

      // 🗣️ Mama speaks her response
      speakMama(mamaResponse)
    } catch (error) {
      console.error('Chat error:', error)
      setChat((prev) => [
        ...prev,
        {
          role: 'mama',
          text: "I'm having trouble connecting right now, dear 💖 Please try again in a moment. If this is urgent, please contact your doctor.",
          timestamp: Date.now(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  // 🎙️ Initialize browser speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.lang = langMap[lang] || 'en-US'
        recognition.interimResults = false
        recognition.continuous = false

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setMessage(transcript)
          setListening(false)
          
          // Auto-send after transcription (with small delay for user to see)
          setTimeout(() => {
            sendMessage(transcript)
          }, 500)
        }
        recognition.onerror = () => setListening(false)
        recognition.onend = () => setListening(false)

        recognitionRef.current = recognition
      }
    }
  }, [lang, sendMessage])

  // 🗣️ Speak text using OpenAI Neural TTS (with offline cache fallback)
  const speakMama = async (text: string) => {
    if (!voiceEnabled || typeof window === 'undefined') return
    
    try {
      // Import voice cache dynamically
      const { saveVoiceToCache, findMatchingVoice } = await import('@/lib/voiceCache')
      
      // If offline, try cached version
      if (!online) {
        const cached = await findMatchingVoice(text)
        if (cached) {
          const url = URL.createObjectURL(cached)
          const audio = new Audio(url)
          audio.volume = 1
          audio.play()
          return
        }
        console.warn('No cached voice for this message 💫')
        // Fall back to browser TTS if offline and not cached
        fallbackTobrowserTTS(text)
        return
      }

      // Fetch from OpenAI TTS API
      const res = await fetch('/api/voice/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, lang }),
      })

      if (!res.ok) {
        throw new Error('TTS API failed')
      }

      const blob = await res.blob()
      const voiceLabel = res.headers.get('X-Mama-Voice') || undefined

      // Save to cache for offline use
      await saveVoiceToCache(lang, text, blob, voiceLabel)

      // Play the audio
      const url = URL.createObjectURL(blob)
      const audio = new Audio(url)
      audio.volume = 1
      audio.play()
    } catch (error) {
      console.error('Mama voice error:', error)
      // Fall back to browser TTS on error
      fallbackTobrowserTTS(text)
    }
  }

  // Fallback to browser's built-in speech synthesis
  const fallbackTobrowserTTS = (text: string) => {
    if (typeof window === 'undefined') return
    
    window.speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = langMap[lang] || 'en-US'
    utterance.pitch = 1.05
    utterance.rate = 0.95
    utterance.volume = 1
    
    window.speechSynthesis.speak(utterance)
  }

  // 🎙️ Start listening
  const startListening = () => {
    if (recognitionRef.current) {
      try {
        setListening(true)
        recognitionRef.current.lang = langMap[lang] || 'en-US'
        recognitionRef.current.start()
      } catch (error) {
        console.error('Speech recognition error:', error)
        setListening(false)
      }
    } else {
      alert('Voice input not supported on this device 💫')
    }
  }

  // 🛑 Stop listening
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setListening(false)
    }
  }

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setOnline(true)
    const handleOffline = () => setOnline(false)
    
    setOnline(navigator.onLine)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Persist chat to localStorage (keep last 10 messages)
  useEffect(() => {
    if (typeof window !== 'undefined' && chat.length > 0) {
      const recentChat = chat.slice(-10)
      localStorage.setItem('mamaChat', JSON.stringify(recentChat))
    }
  }, [chat])

  const clearChat = () => {
    if (confirm('Clear chat history? This cannot be undone.')) {
      const initialMessage: Message = {
        role: 'mama',
        text: getWelcomeMessage(lang),
        timestamp: Date.now(),
      }
      setChat([initialMessage])
      localStorage.setItem('mamaChat', JSON.stringify([initialMessage]))
    }
  }

  const handleLanguageChange = (newLang: string) => {
    setLang(newLang)
    saveLanguagePreference(newLang)
    
    // Add a message about language change
    const languageChangeMessage: Message = {
      role: 'mama',
      text: getWelcomeMessage(newLang),
      timestamp: Date.now(),
    }
    setChat((prev) => [...prev, languageChangeMessage])
  }

  // Form submit handler
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    await sendMessage(message)
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-[#FF6B6B] to-[#FFB84D] text-white rounded-full shadow-2xl p-4 sm:p-5 flex items-center gap-2 sm:gap-3 font-medium z-50 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="hidden sm:inline text-sm font-semibold">
          Mama is listening...
        </span>
        {!online && (
          <WifiOff className="w-4 h-4 absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5" />
        )}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute inset-0 rounded-full bg-[#FF6B6B]"
        />
      </motion.button>

      {/* Bottom Sheet Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center sm:justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="bg-[#FDFBF6] rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg h-[85vh] sm:h-[80vh] shadow-2xl flex flex-col overflow-hidden"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ duration: 0.3, type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#FF6B6B] to-[#FFB84D] p-4 sm:p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src="/logo.svg"
                    alt="MamaHealth"
                    width={36}
                    height={36}
                    className="w-9 h-9"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">MamaHealth</h3>
                    <div className="flex items-center gap-1.5 text-xs text-white/90">
                      {online ? (
                        <>
                          <Wifi className="w-3 h-3" />
                          <span>Online</span>
                        </>
                      ) : (
                        <>
                          <WifiOff className="w-3 h-3" />
                          <span>Offline mode</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <LanguageSelector
                    currentLang={lang}
                    onLanguageChange={handleLanguageChange}
                  />
                  <button
                    onClick={clearChat}
                    className="text-white/80 hover:text-white text-xs px-2 py-1 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-white hover:text-white/80 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-[#FDFBF6] to-white">
                {chat.map((msg, i) => (
                  <motion.div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`max-w-[85%] p-3 sm:p-4 rounded-2xl shadow-md ${
                        msg.role === 'mama'
                          ? 'bg-[#A8D5BA] text-[#4B3F72] rounded-tl-sm'
                          : 'bg-[#FFB84D] text-[#4B3F72] rounded-tr-sm'
                      }`}
                    >
                      {msg.role === 'mama' && (
                        <p className="text-xs font-semibold mb-1 accent-text opacity-80">
                          Mama says:
                        </p>
                      )}
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </motion.div>
                ))}

                {loading && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="bg-[#A8D5BA] text-[#4B3F72] p-4 rounded-2xl shadow-md rounded-tl-sm">
                      <div className="flex gap-1">
                        <motion.div
                          className="w-2 h-2 bg-[#4B3F72] rounded-full"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-[#4B3F72] rounded-full"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-[#4B3F72] rounded-full"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input Form */}
              <form
                onSubmit={handleSend}
                className="p-4 bg-white border-t border-[#A8D5BA]/30"
              >
                <div className="flex gap-2 items-center">
                  {/* 🎙️ Voice Input Button */}
                  <motion.button
                    type="button"
                    onClick={listening ? stopListening : startListening}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-full transition-all ${
                      listening 
                        ? 'bg-[#A8D5BA] text-white animate-pulse' 
                        : 'bg-white text-[#FF6B6B] border-2 border-[#FF6B6B]'
                    }`}
                    title={listening ? 'Stop listening' : 'Tap to speak'}
                  >
                    {listening ? '🛑' : '🎙️'}
                  </motion.button>

                  {/* 🔊 Voice Output Toggle */}
                  <motion.button
                    type="button"
                    onClick={() => setVoiceEnabled((v) => !v)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-full transition-all ${
                      voiceEnabled 
                        ? 'bg-[#A8D5BA] text-white' 
                        : 'bg-gray-300 text-[#4B3F72]'
                    }`}
                    title={voiceEnabled ? 'Mute Mama' : 'Unmute Mama'}
                  >
                    {voiceEnabled ? '🔊' : '🔈'}
                  </motion.button>

                  <input
                    type="text"
                    placeholder={
                      listening 
                        ? "Mama is listening... 🎙️" 
                        : online 
                        ? "Type or speak your symptom..." 
                        : "Offline - message saved"
                    }
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={loading || listening}
                    className="flex-1 px-4 py-3 rounded-full border-2 border-[#A8D5BA] focus:outline-none focus:border-[#FF6B6B] text-[#4B3F72] placeholder:text-[#4B3F72]/50 disabled:opacity-50 text-sm"
                  />
                  <motion.button
                    type="submit"
                    disabled={loading || !message.trim()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-[#FF6B6B] to-[#FFB84D] hover:from-[#FFB84D] hover:to-[#A8D5BA] text-white font-semibold p-3 rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
                <p className="text-xs text-[#4B3F72]/60 mt-2 text-center">
                  {listening ? (
                    <>🎧 Listening... speak now</>
                  ) : online ? (
                    <>🌺 Mama is online and ready to help</>
                  ) : (
                    <>💫 Offline mode - your messages are saved</>
                  )}
                </p>
                <p className="text-xs text-[#4B3F72]/50 mt-1 text-center">
                  {voiceEnabled ? '🔊 Voice enabled • ' : '🔈 Voice muted • '}
                  For emergencies, call your doctor immediately
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
