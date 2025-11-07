'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Check } from 'lucide-react'
import { getLanguageList, getLanguage, saveLanguagePreference, type Language } from '@/lib/language'

interface LanguageSelectorProps {
  currentLang: string
  onLanguageChange: (langCode: string) => void
}

export default function LanguageSelector({ currentLang, onLanguageChange }: LanguageSelectorProps) {
  const [open, setOpen] = useState(false)
  const [languages] = useState<Language[]>(getLanguageList())
  const currentLanguage = getLanguage(currentLang)

  const handleSelect = (langCode: string) => {
    saveLanguagePreference(langCode)
    onLanguageChange(langCode)
    setOpen(false)
  }

  return (
    <div className="relative">
      {/* Language Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#A8D5BA] text-[#4B3F72] text-sm font-medium hover:bg-white transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
        <span className="sm:hidden">{currentLanguage.code.toUpperCase()}</span>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-[#A8D5BA]/30 overflow-hidden z-50"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#FF6B6B] to-[#FFB84D] p-4">
                <h3 className="text-white font-semibold text-sm">Choose Your Language</h3>
                <p className="text-white/80 text-xs mt-1">Mama speaks your tongue 🌺</p>
              </div>

              {/* Language List */}
              <div className="max-h-96 overflow-y-auto p-2">
                {languages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    onClick={() => handleSelect(lang.code)}
                    whileHover={{ backgroundColor: 'rgba(168, 213, 186, 0.1)' }}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                      currentLang === lang.code ? 'bg-[#A8D5BA]/20' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#4B3F72]">
                            {lang.nativeName}
                          </span>
                          {currentLang === lang.code && (
                            <Check className="w-4 h-4 text-[#FF6B6B]" />
                          )}
                        </div>
                        <p className="text-xs text-[#4B3F72]/60 mt-0.5">
                          {lang.name} • {lang.region}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-[#A8D5BA]/30 p-3 bg-[#FDFBF6]">
                <p className="text-xs text-[#4B3F72]/60 text-center">
                  More languages coming soon! 🌍
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
