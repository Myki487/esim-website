'use client'

import { notFound } from 'next/navigation'
import { Country } from '@/types/Country'
import Image from 'next/image'
import SearchCountry from '@/components/SearchCountry'
import { useEffect, useState } from 'react'
import classNames from 'classnames'

interface PlanOption {
  label: string
  value: string
}

const unlimitedOptions: PlanOption[] = [
  { label: '1 Day', value: '1-day' },
  { label: '3 Days', value: '3-days' },
  { label: '7 Days', value: '7-days' },
  { label: '15 Days', value: '15-days' },
  { label: '30 Days', value: '30-days' },
]

const dataPlans: PlanOption[] = [
  { label: '2GB', value: '2gb' },
  { label: '5GB', value: '5gb' },
  { label: '10GB', value: '10gb' },
  { label: '20GB', value: '20gb' },
  { label: '50GB', value: '50gb' },
]

export default function CountryPage({ params }: { params: { id: string } }) {
  const [country, setCountry] = useState<Country | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string>('')

  useEffect(() => {
    const fetchCountry = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/countries`, {
        cache: 'no-store',
      })
      if (!res.ok) return notFound()
      const countries: Country[] = await res.json()
      const found = countries.find((c) => c.id.toString() === params.id)
      if (!found) return notFound()
      setCountry(found)
    }
    fetchCountry()
  }, [params.id])

  if (!country) return null

  return (
    <div>
      <div className="relative h-64 w-full">
        <Image
          src={`/country-images/${country.id}.jpg`} // заміни на свій шлях
          alt={`${country.name} Travel Bundle`}
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            {country.name} Travel Bundle
          </h1>
        </div>
      </div>

      <div className="my-12">
        <SearchCountry />
      </div>

      <div className="max-w-4xl mx-auto px-6 space-y-6">
        <p className="text-gray-700 text-lg">
          The {country.name} Travel Bundle is available in a range of data sizes from 1GB to 20GB.
        </p>
        <p className="text-gray-700 text-lg">2G / 3G / 4G Data Speed</p>
        <p className="text-gray-700 text-lg">Bundle Options</p>
        <p className="text-gray-700 text-lg">
          You’ll receive an email with your eSIM in seconds, no matter where you are.
        </p>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Unlimited Daily Pass</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {unlimitedOptions.map((plan) => (
              <div
                key={plan.value}
                className={classNames(
                  'p-4 border rounded cursor-pointer text-center hover:shadow transition',
                  selectedPlan === plan.value && 'border-blue-500 bg-blue-400'
                )}
                onClick={() => setSelectedPlan(plan.value)}
              >
                {plan.label}
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mb-4">Value Data Plans</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {dataPlans.map((plan) => (
              <div
                key={plan.value}
                className={classNames(
                  'p-4 border rounded cursor-pointer text-center hover:shadow transition',
                  selectedPlan === plan.value && 'border-blue-500 bg-blue-400'
                )}
                onClick={() => setSelectedPlan(plan.value)}
              >
                {plan.label}
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              disabled={!selectedPlan}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
