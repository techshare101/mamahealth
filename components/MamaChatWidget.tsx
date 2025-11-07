'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'
import Image from 'next/image'

interface Message {
  role: 'mama' | 'user'
  text: string
}

export default function MamaChatWidget() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState<Message[]>([
    {
      role: 'mama',
      text: "Hi dear 🌺 I'm MamaHealth. Tell me what's wrong, and we'll check it together.",
    },
  ])
  const [loading, setLoading] = useState(false)

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || loading) return

    const userMessage: Message = { role: 'user', text: message }
    setChat((prev) => [...prev, userMessage])
    setMessage('')
    setLoading(true)

    try {
      // Call API route for AI response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message }),
      })

      const data = await response.json()

      setChat((prev) => [
        ...prev,
        {
          role: 'mama',
          text: data.response || "I'm here to help. Can you tell me more about your symptoms?",
        },
      ])
    } catch (error) {
      console.error('Chat error:', error)
      setChat((prev) => [
        ...prev,
        {
          role: 'mama',
          text: "I'm having trouble connecting right now. Please try again in a moment, dear. 💖",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-br from-[#FF6B6B] to-[#FFB84D] text-white rounded-full shadow-2xl p-5 flex items-center gap-3 font-medium z-50 group"
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
        <MessageCircle className="w-6 h-6" />
        <span className="hidden md:inline text-sm font-semibold">
          Mama is listening...
        </span>
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

      {/* Chat Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end md:items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="bg-[#FDFBF6] rounded-3xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.3, type: 'spring' }}
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: '80vh' }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#FF6B6B] to-[#FFB84D] p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src="/logo.svg"
                    alt="MamaHealth"
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">MamaHealth</h3>
                    <p className="text-sm text-white/80">Your caring AI companion</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white hover:text-white/80 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-[#FDFBF6] to-white">
                {chat.map((msg, i) => (
                  <motion.div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl shadow-md ${
                        msg.role === 'mama'
                          ? 'bg-[#A8D5BA] text-[#4B3F72]'
                          : 'bg-[#FFB84D] text-[#4B3F72]'
                      }`}
                    >
                      {msg.role === 'mama' && (
                        <p className="text-xs font-semibold mb-1 accent-text">
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
                    <div className="bg-[#A8D5BA] text-[#4B3F72] p-4 rounded-2xl shadow-md">
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
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Describe your symptom..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={loading}
                    className="flex-1 px-4 py-3 rounded-full border-2 border-[#A8D5BA] focus:outline-none focus:border-[#FF6B6B] text-[#4B3F72] placeholder:text-[#4B3F72]/50 disabled:opacity-50"
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
                  This is AI guidance. For emergencies, call your doctor immediately.
                </p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
