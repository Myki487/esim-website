'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Country } from '@/types/Country'

const questionTypes = ['How it works', 'Technical requirements', 'Account', 'Other']
const platforms = ['Android', 'Android Tablet', 'iPhone', 'iPad', 'Other']

export default function ContactForm() {
  const [countries, setCountries] = useState<string[]>([])
  const [termsAccepted, setTermsAccepted] = useState(false)

  useEffect(() => {
    fetch('/api/countries')
      .then((res) => res.json())
      .then((data: Country[]) => setCountries(data.map((c) => c.name)))
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <p className='text-center mb-5 text-xl'> 
        If you didn’t find your answer in the FAQ section, please describe your issue or request below.
      </p>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" />
          <Input id="name" placeholder="Your name" />
        </div>
        <div>
          <Label htmlFor="type" />
          <select id="type" className="w-full bg-slate-800 text-gray-50 border border-gray-700 rounded px-3 py-2">
            <option value="" hidden>
              Question Type
            </option>
            {questionTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="email" />
          <Input id="email" type="email" placeholder="Your email" />
        </div>
        <div>
          <Label htmlFor="platform" />
          <select 
            id="platform" 
            className="w-full bg-slate-800 text-gray-50 border border-gray-700 rounded px-3 py-2">
            <option value="" hidden>
              Platform
            </option>
            {platforms.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="phone" />
          <Input id="phone" placeholder="Your phone" />
        </div>
        <div>
          <Label htmlFor="country" />
          <select
            id="country"
            className="w-full bg-slate-800 text-gray-50 border border-gray-700 rounded px-3 py-2"
          >
            <option value="" hidden>
              Country
            </option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="message" />
          <Textarea id="message" placeholder="Describe your request or issue" rows={5} />
        </div>
        <div className="md:col-span-2 flex items-center space-x-2">
          <Checkbox id="terms" checked={termsAccepted} onCheckedChange={(checked) => setTermsAccepted(!!checked)} />
          <Label htmlFor="terms">
            I accept the terms and conditions and the treatment of data use.
          </Label>
        </div>
        <div className="md:col-span-2 text-center">
          <Button type="submit" className='w-full h-12' disabled={!termsAccepted}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}
