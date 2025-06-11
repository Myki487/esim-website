import { notFound } from 'next/navigation'
import Image from 'next/image'
import SearchCountry from '@/components/SearchCountry'
import PlanSelection from '@/components/PlanSelection'
import countries from '@/data/countries'
import CountryTabs from '@/components/CountryTabs'

export default async function CountryPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const country = countries.find((c) => c.id.toString() === resolvedParams.id)

  if (!country) return notFound()

  return (
    <div>
      <div className="relative h-96 w-full border">
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
        <CountryTabs countryName={country.name} />
        <p className="text-gray-400 text-lg">Bundle Options</p>
        <p className="text-gray-400 text-lg">
          You’ll receive an email with your eSIM in seconds, no matter where you are.
        </p>
        <PlanSelection
          key="plan-selection"
          countryId={country.id}
          countryName={country.name}
          prices={country.prices}
        />

      </div>
    </div>
  )
}