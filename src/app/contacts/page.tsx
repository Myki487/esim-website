'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import Image from 'next/image'

const questionTypes = [
  'How it works',
  'Technical requirements',
  'Account',
  'Other',
]

const platforms = ['Android', 'iOS', 'Other']

type Country = {
  id: number
  name: string
  popular: boolean
  description: string
}

export default function ContactPage() {
  const [countries, setCountries] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/countries')
      .then((res) => res.json())
      .then((data: Country[]) => setCountries(data.map((c) => c.name)))
  }, [])

  return (
    <div>
      <div className="relative h-64 w-full">
        <Image
          src="/contact-bg.jpg"
          alt="Contact background"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Contact Us</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
				<p>
					If you didn’t find your answer in the FAQ section, please describe your issue or request below.
				</p>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name"></Label>
            <Input id="name" placeholder="Your name" />
          </div>
          <div>
            <Label htmlFor="type"></Label>
            <select id="type" className="w-full bg-slate-800 text-gray-50 border border-gray-700 rounded px-3 py-2">
              {questionTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="email"></Label>
            <Input id="email" type="email" placeholder="Your email" />
          </div>
          <div>
            <Label htmlFor="platform"></Label>
            <select id="platform" className="w-full bg-slate-800 text-gray-50 border border-gray-700 rounded px-3 py-2">
              {platforms.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="phone"></Label>
            <Input id="phone" placeholder="Your phone" />
          </div>
          <div>
						<Label htmlFor="country"></Label>
						<select
							id="country"
							defaultValue=""
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
            <Label htmlFor="message"></Label>
            <Textarea id="message" placeholder="Describe your request or issue" rows={5} />
          </div>
          <div className="md:col-span-2 flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">
              I accept the terms and conditions and the treatment of data use.
            </Label>
          </div>
          <div className="md:col-span-2 text-center">
            <Button type="submit">Send</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
