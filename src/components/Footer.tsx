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
  }, [])

  return (
    <footer className="bg-slate-900 text-gray-200 py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
					<Image src="/Logo.png" alt="TravelsGo Logo" width={64} height={64} />
          <div className="text-xl font-bold">TravelsGo</div>
          <p className="text-sm mt-2">
            travelsgo.com eSIM provides affordable, easy to use travel bundles in over 32 countries worldwide.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Popular countries</h3>
          <ul className="space-y-1 text-sm">
            {popularCountries.map((country) => (
                <Link key={country.id} href={`/countries/${country.id}`} className="hover:underline">
									<li>{country.name}</li>
                </Link>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">FAQ</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/faq" className="hover:underline">View FAQs</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms & Conditions</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Help</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/contacts" className="hover:underline">Contact us</Link></li>
            <li><Link href="/" className="hover:underline">All countries</Link></li>
            <li><Link href="/partners" className="hover:underline">Partnerships</Link></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 mt-10">
        © {new Date().getFullYear()} travelsgo.com — All rights reserved.
      </div>
    </footer>
  )
}
