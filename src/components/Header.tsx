'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useUser } from '@/context/UserContext'

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
  const { user, logout } = useUser() 

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 shadow-md bg-black">
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
      <div className="flex gap-4 items-center">
        {user ? (
          <>
              <Link href="/dashboard" className="text-sm text-white hover:underline">{user.name}</Link>
              <Link onClick={logout} href="/logout" className="text-sm text-white hover:underline">Logout</Link>
          </>
        ) : (
          <>
            <Link href="/login" className="text-sm text-white hover:underline">Login</Link>
          </>
        )}
        <div className="flex gap-1">
          <button onClick={() => changeLanguage('ua')} className="text-sm text-white hover:underline">
            UA
          </button>
          <span className="text-white">/</span>
          <button onClick={() => changeLanguage('en')} className="text-sm text-white hover:underline">
            EN
          </button>
        </div>
      </div>
    </header>
  )
}
