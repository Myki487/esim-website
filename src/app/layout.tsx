import './globals.css'
import Header from '@/components/Header'
import { Inter } from 'next/font/google'
import I18nProvider from './i18n-provider'
import Footer from '@/components/Footer'
import { UserProvider } from '@/context/UserContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'eSIM Site',
  description: 'Buy eSIMs for any country',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <UserProvider>
          <I18nProvider>
            <Header />
            <div className="min-h-screen pt-14">
              {children}
            </div>
            <Footer />
          </I18nProvider>
        </UserProvider>
      </body>
    </html>
  )
}
