'use client'

import { Country } from '@/types/Country';
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function SearchCountry() {
  const [countries, setCountries] = useState<Country[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch('/api/countries')
      const data = await res.json()
      setCountries(data)
    }
    fetchCountries()
  }, [])

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const popularCountries = filteredCountries.filter((c) => c.popular)
  const otherCountries = filteredCountries.filter((c) => !c.popular)

  const visibleCountries = showAll ? filteredCountries : popularCountries

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Search country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded mb-4 w-full max-w-md"
      />

			<div className="grid grid-cols-2 gap-4">
				{visibleCountries.map((country) => (
					<Link key={country.id} href={`/countries/${country.id}`}>
						<div className="border rounded-xl p-3 hover:shadow transition cursor-pointer">
							<h3 className="font-medium">{country.name}</h3>
							<p className="text-sm text-gray-500">{country.description}</p>
						</div>
					</Link>
				))}
			</div>

      {/* Кнопки */}
      {otherCountries.length > 0 && searchTerm === '' && (
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {showAll ? 'Показати менше' : 'Показати більше'}
        </button>
      )}
    </div>
  )
}
