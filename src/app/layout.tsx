import './globals.css'
import Header from '@/components/Header'
import { Inter } from 'next/font/google'
import I18nProvider from './i18n-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'eSIM Site',
  description: 'Buy eSIMs for any country',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
			<I18nProvider>
			<Header />
			<div className="min-h-screen">
				{children}
			</div>
			</I18nProvider>
      </body>
    </html>
  )
}
