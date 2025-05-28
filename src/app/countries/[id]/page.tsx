// src/app/countries/[id]/page.tsx

import { Country } from '@/types/Country'
import { notFound } from 'next/navigation'

export default async function CountryPage({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/countries`, {
    cache: 'no-store',
  })

  if (!res.ok) notFound()

  const countries: Country[] = await res.json()
  const country = countries.find((c) => c.id.toString() === params.id)

  if (!country) return notFound()

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{country.name}</h1>
      <p>{country.description}</p>
    </div>
  )
}