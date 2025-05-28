// src/components/Header.tsx

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'

const navItems = [
  { href: '/', label: 'home' },
  { href: '/about', label: 'about' },
  { href: '/compatibility', label: 'compatibility' },
  { href: '/faq', label: 'faq' },
  { href: '/contacts', label: 'contacts' },
]

export default function Header() {
  const pathname = usePathname()
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <header className="flex justify-between items-center px-6 py-4 shadow-md bg-dark">
      <nav className="flex gap-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-medium ${
              pathname === item.href ? 'text-blue-600' : 'text-white'
            } hover:underline`}
          >
            {t(`nav.${item.label}`)}
          </Link>
        ))}
      </nav>
      <div className="flex gap-2">
        <button onClick={() => changeLanguage('ua')} className="text-sm text-white hover:underline">
          UA
        </button>
        <span>/</span>
        <button onClick={() => changeLanguage('en')} className="text-sm text-white hover:underline">
          EN
        </button>
      </div>
    </header>
  )
}
