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

  const commonButtonClasses = `
    bg-travels-go-blue-accent text-white px-5 py-2 rounded-full font-bold font-poppins shadow-md
    transition-colors duration-300
    hover:bg-blue-600 active:bg-blue-700
    focus:outline-none focus:ring-2 focus:ring-travels-go-blue-accent
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
        <Link href="/" className="text-3xl font-poppins font-bold text-travels-go-blue-accent hover:text-blue-400 transition-colors duration-300">
          TravelsGo
        </Link>

        <div className="flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${commonLinkClasses} ${isActive(item.href) ? activeLinkClass : inactiveLinkClass} transition-colors duration-300`}
            >
              {t(`nav.${item.label}`)}
            </Link>
          ))}


          {/* <div className="flex gap-2 font-inter">
            <button
              onClick={() => changeLanguage('ua')}
              className={`
                text-base font-medium transition-colors duration-300
                ${i18n.language === 'ua' ? 'text-travels-go-blue-accent' : 'text-travels-go-text-gray hover:text-travels-go-blue-accent'}
                focus:outline-none focus:ring-2 focus:ring-travels-go-blue-accent
              `}
            >
              UA
            </button>
            <span className="text-travels-go-text-gray">/</span>
            <button
              onClick={() => changeLanguage('en')}
              className={`
                text-base font-medium transition-colors duration-300
                ${i18n.language === 'en' ? 'text-travels-go-blue-accent' : 'text-travels-go-text-gray hover:text-travels-go-blue-accent'}
                focus:outline-none focus:ring-2 focus:ring-travels-go-blue-accent
								`}
								>
              EN
            </button>
          </div> */}
							{user ? (
								<>
									<Link
										href="/dashboard"
										className={`
											${commonLinkClasses}
											${isActive('/dashboard') ? activeLinkClass : inactiveLinkClass}
											${!isActive('/dashboard') ? 'hover:text-travels-go-blue-accent' : ''}
											transition-colors duration-300
										`}
									>
										{user.name}
									</Link>
									<button
										onClick={logout}
										className={commonButtonClasses}
									>
										{t('common.logout')}
									</button>
								</>
							) : (
								<>
									<button
										onClick={() => router.push('/login')} 
										className={commonButtonClasses}
									>
										{t('common.login')}
									</button>
									<button
										onClick={() => router.push('/register')} 
										className={commonButtonClasses} 
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