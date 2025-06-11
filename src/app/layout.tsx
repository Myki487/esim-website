import './globals.css'
import Header from '@/components/Header'
import { Poppins, Inter } from 'next/font/google'
import I18nProvider from './i18n-provider'
import Footer from '@/components/Footer'
import { UserProvider } from '@/context/UserContext'
import type { Metadata } from 'next'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'TravelsGo',
  description: 'Your go-to for affordable eSIM plans worldwide.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} dark`}>
      <body className={inter.className}>
        <UserProvider>
          <I18nProvider>
            <Header />
            <div className="min-h-screen pt-1">
              {children}
            </div>
            <Footer />
          </I18nProvider>
        </UserProvider>
      </body>
    </html>
  )
}