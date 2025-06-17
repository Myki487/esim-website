'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useUser } from '@/components/UserContext'

const navItems = [
  { href: '/about', label: 'about' },
  { href: '/compatibility', label: 'compatibility' },
  { href: '/faq', label: 'faq' },
  { href: '/contacts', label: 'contacts' },
]

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { t, i18n } = useTranslation()
  const { user, logout } = useUser()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  const isActive = (href: string) => pathname === href;

  const commonLinkClasses = `
    text-base font-inter font-medium
    focus:outline-none focus:ring-2 focus:ring-travels-go-blue-accent
  `;
  const activeLinkClass = 'text-travels-go-blue-accent';
  const inactiveLinkClass = 'text-travels-go-text-light';

  const redButtonClasses = `
    bg-red-700 text-white px-4 py-1 rounded-full font-bold font-poppins shadow-md
    transition-colors duration-300
    hover:bg-red-800 active:bg-red-900
  `;

  const blueButtonClasses = `
    bg-blue-600 text-white px-4 py-1 rounded-full font-bold font-poppins shadow-md
    transition-colors duration-300
    hover:bg-blue-700 active:bg-blue-800
  `;

  const greenTextClasses = `
    text-green-400 hover:text-green-300 active:text-green-200 transition-colors duration-300
    font-semibold
  `;


  return (
    <header className="
      fixed top-0 left-0 w-full z-50
      bg-travels-go-dark-purple bg-opacity-90 backdrop-blur-sm
      text-travels-go-text-light
      shadow-lg
      py-4 px-6 md:px-10
    ">
      <nav className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="text-3xl font-poppins font-bold text-travels-go-blue-accent hover:text-blue-400 transition-colors duration-400">
          TravelsGo
        </Link>

        <div className="flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${commonLinkClasses} ${isActive(item.href) ? activeLinkClass : inactiveLinkClass}`}
            >
              {t(`nav.${item.label}`)}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                href="/dashboard"
                className={`
                  ${commonLinkClasses}
                  ${isActive('/dashboard') ? activeLinkClass : inactiveLinkClass}
                  ${!isActive('/dashboard') ? 'hover:text-travels-go-blue-accent' : ''}
                  ${greenTextClasses}
                  no-focus-highlight
                `}
              >
                {user.name}
              </Link>
              <button
                onClick={() => {
                  console.log('Header: Logout button clicked.');
                  logout();
                }}
                className={redButtonClasses}
              >
                {t('common.logout')}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  console.log('Header: Login button clicked, redirecting to /login.');
                  router.push('/login');
                }}
                className={blueButtonClasses}
              >
                {t('common.login')}
              </button>
              <button
                onClick={() => {
                  console.log('Header: Register button clicked, redirecting to /register.');
                  router.push('/register');
                }}
                className={blueButtonClasses}
              >
                {t('common.register')}
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}