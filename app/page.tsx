'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Heart, MessageCircle, Shield, Home, Instagram, Twitter, Youtube } from 'lucide-react'
import Image from 'next/image'
import MamaChatWidgetMobile from '@/components/MamaChatWidgetMobile'

export default function LandingPage() {
  const [isMounted, setIsMounted] = useState(false)
  const [email, setEmail] = useState('')
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Email submitted:', email)
    alert('Thank you for joining MamaHealth early access! 🌺')
    setEmail('')
  }

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FF6B6B] via-[#FFB84D] to-[#A8D5BA]">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-center">
            <h1 className="text-5xl font-bold mb-4">MamaHealth</h1>
            <p className="text-xl">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  const howItWorksSteps = [
    {
      icon: MessageCircle,
      step: '1',
      title: 'Tell Mama what is wrong',
      text: 'Describe your symptom or choose from a list — Mama listens carefully.',
      color: 'from-[#FF6B6B] to-[#FFB84D]',
    },
    {
      icon: Shield,
      step: '2',
      title: 'Get quick triage',
      text: 'MamaHealth checks if it is safe to treat at home or you should see a doctor.',
      color: 'from-[#FFB84D] to-[#A8D5BA]',
    },
    {
      icon: Home,
      step: '3',
      title: 'Receive care advice',
      text: 'Get clear home-care steps, OTC suggestions, and when to escalate.',
      color: 'from-[#A8D5BA] to-[#4B3F72]',
    },
  ]

  const whyTrustFeatures = [
    {
      emoji: '🧠',
      title: 'Localized Wisdom',
      text: 'Designed for Africa, with malaria, flu, and local illnesses included.',
    },
    {
      emoji: '💬',
      title: 'Multilingual Support',
      text: 'English, Swahili, Yoruba, Twi, and French.',
    },
    {
      emoji: '💊',
      title: 'Home-Care First',
      text: 'Practical, safe guidance before rushing to a clinic.',
    },
    {
      emoji: '🧕🏾',
      title: 'Built on Trust',
      text: 'Inspired by Africa\'s first doctor: Mama.',
    },
    {
      emoji: '🔒',
      title: 'Safe & Private',
      text: 'Your information stays on your device; no PHI collected.',
    },
    {
      emoji: '🌍',
      title: 'Community Driven',
      text: 'Built with and for African families.',
    },
  ]

  const testimonials = [
    {
      quote: 'MamaHealth helped me treat my son\'s fever safely at home.',
      author: 'Grace',
      location: 'Kenya',
    },
    {
      quote: 'It felt like chatting with my mother — but smarter!',
      author: 'Uche',
      location: 'Nigeria',
    },
    {
      quote: 'Now I know when to go to the clinic and when to rest.',
      author: 'Awa',
      location: 'Ghana',
    },
  ]

  const socialLinks = [
    { icon: Instagram, label: '@mamahealth_app' },
    { icon: Twitter, label: '@mamahealthAI' },
    { icon: Youtube, label: 'MamaHealth Africa' },
  ]

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FF6B6B] via-[#FFB84D] to-[#A8D5BA] px-6 py-20"
      >
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 pointer-events-none"
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <Heart className="w-full h-full text-white" />
            </motion.div>
          ))}
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="inline-block mb-6"
            >
              <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <Image src="/logo.svg" alt="MamaHealth Logo" width={32} height={32} className="w-8 h-8" />
                <span className="font-poppins font-semibold text-lg">MamaHealth</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Smart care with a mother&apos;s heart.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed"
            >
              MamaHealth helps families across Africa decide if home care is enough or a doctor is needed — with trusted, AI-guided triage and home-care advice in your language.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#4B3F72] font-semibold px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all text-lg"
              >
                Try MamaHealth Free 🌺
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full border-2 border-white hover:bg-white/30 transition-all text-lg"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right: Logo & Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex flex-col items-center"
          >
            {/* Large Logo Display */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mb-8"
            >
              <Image 
                src="/logo.svg" 
                alt="MamaHealth Logo" 
                width={200} 
                height={200} 
                className="w-48 h-48 md:w-56 md:h-56 drop-shadow-2xl"
              />
            </motion.div>

            {/* Chat Preview */}
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-6 border-2 border-white/30 w-full"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg"
                >
                  <p className="text-[#4B3F72] text-sm">
                    <span className="font-semibold">You:</span> My child has a fever of 38.5°C. What should I do?
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  className="bg-[#A8D5BA]/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg ml-4"
                >
                  <p className="text-[#4B3F72] text-sm">
                    <span className="font-semibold accent-text">Mama says:</span> Let&apos;s check together. Give fluids, paracetamol, and monitor. If fever persists beyond 3 days or goes above 39°C, see a doctor.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-[#FDFBF6]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#4B3F72]"
          >
            How MamaHealth Works
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorksSteps.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="relative"
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all h-full">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.2 + 0.3 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6`}
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div className="text-6xl font-bold text-[#FF6B6B]/20 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-[#4B3F72]">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why MamaHealth */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#A8D5BA]/20 to-[#FDFBF6]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#4B3F72]"
          >
            Why families trust MamaHealth
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {whyTrustFeatures.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-semibold mb-2 text-[#4B3F72]">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-[#FDFBF6]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#4B3F72]"
          >
            Voices from Home
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-white to-[#A8D5BA]/10 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-[#FF6B6B] mb-4">
                  <Heart className="w-8 h-8" fill="currentColor" />
                </div>
                <p className="text-lg text-[#4B3F72] mb-6 italic accent-text">
                  &quot;{item.quote}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#FFB84D]" />
                  <div>
                    <p className="font-semibold text-[#4B3F72]">{item.author}</p>
                    <p className="text-sm text-gray-600">{item.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1 }}
        className="relative py-24 px-6 bg-gradient-to-r from-[#4B3F72] via-[#FF6B6B] to-[#FFB84D] overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <Heart className="w-12 h-12 text-white" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Join MamaHealth Early Access
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-12 text-white/90"
          >
            Be among the first to experience Africa&apos;s trusted AI family-health companion. Smart care for every home.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="px-6 py-4 rounded-full w-full sm:flex-1 text-[#4B3F72] focus:outline-none focus:ring-4 focus:ring-white/50 text-lg"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-[#FFB84D] hover:bg-[#A8D5BA] text-[#4B3F72] font-semibold px-8 py-4 rounded-full shadow-2xl transition-all text-lg"
            >
              Join Beta 🌺
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex justify-center gap-6"
          >
            {socialLinks.map((social, idx) => (
              <motion.a
                key={idx}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
              >
                <social.icon className="w-6 h-6 text-white" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* MamaHealth Chat Widget */}
      <MamaChatWidgetMobile />

      {/* Footer */}
      <footer className="bg-[#4B3F72] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Image src="/logo.svg" alt="MamaHealth Logo" width={40} height={40} className="w-10 h-10" />
            <span className="text-2xl font-bold font-poppins">MamaHealth</span>
          </div>
          <p className="text-white/80 mb-6">
            Because Mama always knows best.
          </p>
          <p className="text-sm text-white/60">
            © 2024 MamaHealth. Bringing trusted AI-powered home-care to every African family.
          </p>
        </div>
      </footer>
    </main>
  )
}
