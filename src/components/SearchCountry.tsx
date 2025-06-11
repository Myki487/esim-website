'use client'

import { Country } from '@/types/Country'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaSearch } from 'react-icons/fa';

type Props = {
  compact?: boolean
}

export default function SearchCountry({ compact = false }: Props) {
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

  const visibleCountries = compact
    ? searchTerm === '' ? [] : filteredCountries
    : searchTerm !== ''
    ? filteredCountries
    : showAll
    ? filteredCountries
    : popularCountries

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full max-w-lg mb-8">
        <input
          type="text"
          placeholder="Search for a destination..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 pl-10 border border-travels-go-purple-300 rounded-full w-full bg-travels-go-purple-500 text-travels-go-text-light placeholder-travels-go-text-gray focus:outline-none focus:ring-2 focus:ring-travels-go-blue-accent focus:border-transparent transition-all duration-300"
        />
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-travels-go-text-gray" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl px-4">
        {visibleCountries.map((country) => (
          <Link key={country.id} href={`/countries/${country.id}`}>
            <div className="
              border border-travels-go-purple-500 rounded-xl p-4 flex flex-col items-center justify-center text-center
              bg-travels-go-purple-500 text-travels-go-text-light shadow-lg cursor-pointer
              hover:bg-travels-go-purple-300 hover:shadow-xl hover:scale-105 transition-all duration-300
              min-h-[120px] sm:min-h-[60px]
            ">
              <h3 className="font-poppins font-semibold text-sm md:text-lg text-travels-go-text-light mb-1">
                {country.name}
              </h3>
              <p className="font-inter text-sm text-travels-go-text-gray">
                {country.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {!compact && otherCountries.length > 0 && searchTerm === '' && (
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="mt-8 px-6 py-3 bg-travels-go-blue-accent text-white rounded-full font-bold hover:bg-blue-400 transition-all duration-300 shadow-lg"
        >
          {showAll ? 'Показати менше країн' : 'Показати більше країн'}
        </button>
      )}
    </div>
  )
}