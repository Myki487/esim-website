// src/components/Footer.tsx
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Country } from '@/types/Country';
import { useEffect, useState } from 'react'

export default function Footer() {
  const [popularCountries, setPopularCountries] = useState<Country[]>([])

  useEffect(() => {
    fetch('/api/countries')
      .then((res) => res.json())
      .then((data: Country[]) => {
        const popular = data.filter((c) => c.popular)
        setPopularCountries(popular)
      })
      .catch((error) => console.error("Failed to fetch popular countries:", error));
  }, [])

  return (
    <footer className="bg-gray-950 text-gray-300 py-12 px-6 shadow-top">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-8">
        {/* Company Info & Logo */}
        <div className="lg:col-span-2">
          <Image src="/Logo.png" alt="TravelsGo Logo" width={80} height={80} className="mb-4" />
          <div className="text-3xl font-extrabold text-white mb-2">TravelsGo</div>
          <p className="text-sm leading-relaxed">
            TravelsGo eSIM provides affordable, easy to use travel bundles in over 32 countries worldwide.
            Stay connected wherever your adventures take you.
          </p>
          <div className="mt-6 flex space-x-4">
            {/* Social Media Icons */}
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path d="M18.29 2.502h3.39L15.353 9.47l6.883 12.015h-5.698L11.536 14.62l-4.494 7.37H3.4L10.378 12.63l-6.284-9.988h6.297l3.784 5.922 4.415-5.962ZM11.192 13.91L5.352 4.062h-1.63L11.455 22h1.63L18.293 4.062h-1.63Z" />
              </svg>
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.666 2h.649zM14 12a2 2 0 11-4 0 2 2 0 014 0zM12 7a5 5 0 100 10 5 5 0 000-10z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Popular Countries</h3>
          <div className="max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
              {popularCountries.length > 0 ? (
                popularCountries.slice(0, 12).map((country) => (
                  <li key={country.id}>
                    <Link href={`/countries/${country.id}`} className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                      {country.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="col-span-2">No popular countries found.</li>
              )}
            </ul>
          </div>
        </div>

        {/* Quick Links (FAQ & Legal) */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/faq" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">View FAQs</Link></li>
            <li><Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Terms & Conditions</Link></li>
            <li><Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Privacy Policy</Link></li>
            <li><Link href="/contacts" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Contact Us</Link></li>
          </ul>
        </div>

        {/* Support & Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">All Countries</Link></li>
            <li><Link href="/partners" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Partnerships</Link></li>
            <li><Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">About Us</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-8 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} TravelsGo. All rights reserved.</p>
        <p className="mt-1">Designed with passion for travelers worldwide.</p>
      </div>
    </footer>
  )
}