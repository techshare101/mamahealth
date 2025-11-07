import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ChatProvider } from '@/lib/chatTrigger'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MamaHealth - Smart care with a mother\'s heart',
  description: 'AI-powered home-care guidance for African families. Combining medical knowledge with a mother\'s care.',
  keywords: 'health, Africa, AI, telemedicine, home care, family health',
  icons: {
    icon: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FF6B6B" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MamaHealth" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={inter.className}>
        <ChatProvider>{children}</ChatProvider>
      </body>
    </html>
  )
}
