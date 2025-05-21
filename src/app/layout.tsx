import type { Metadata } from 'next'
import { Geist_Mono, Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
  variable: '--font-nunito',
  weight: ["400", "500", "600", "700", "800"],
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Lottery Simulator',
  description:
    'The goal of the project is to deliver an application that can simulate lottery draws in the future and predict the distribution of revenue, prize payouts, and jackpots.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="LottoSim" />
      </head>

      <body className={`${nunito.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
