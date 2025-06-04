import { notFound } from 'next/navigation'
import Image from 'next/image'
import SearchCountry from '@/components/SearchCountry'
import PlanSelection from '@/components/PlanSelection'
import countries from '@/data/countries'

export default async function CountryPage({ params }: { params: { id: string } }) {
  const country = countries.find((c) => c.id.toString() === params.id)

  if (!country) return notFound()

  return (
    <div>
      <div className="relative h-64 w-full border">
        <Image
          src={`/country-images/${country.id}.jpg`}
          alt={`${country.name} Travel Bundle`}
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            {country.name} Travel Bundle
          </h1>
					<SearchCountry compact />
        </div>
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

        <PlanSelection key="plan-selection" />
      </div>
    </div>
  )
}
