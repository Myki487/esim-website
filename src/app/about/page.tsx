'use client'

import Image from 'next/image'

export default function AboutPage() {
  return (
    <div>
      <div className="relative h-64 w-full">
        <Image
          src="/about-bg.jpg"
          alt="About Us Background"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">About Us</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-8 text-center">
        <h2 className="text-3xl font-semibold text-gray-500">Who We Are</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          At <span className="font-semibold text-gray-400">travelsgo.com</span>, we are passionate about making travel simpler and more connected.
          Founded with the vision of breaking the boundaries of expensive roaming and unreliable SIM cards, we bring you modern eSIM technology that just works.
        </p>

        <p className="text-gray-600 text-lg leading-relaxed">
          Whether you’re exploring the streets of Tokyo, relaxing on a beach in Bali, or attending a conference in Berlin, our service keeps you connected with fast, affordable data in over 40 countries worldwide.
        </p>

        <p className="text-gray-600 text-lg leading-relaxed">
          We are a team of travel enthusiasts, tech lovers, and problem solvers — all united under one mission: to redefine how people connect abroad.
        </p>

        <p className="text-gray-600 text-lg leading-relaxed">
          With 24/7 support and constantly growing compatibility, we’re here to support your adventures — wherever they may take you.
        </p>
      </div>
    </div>
  )
}
