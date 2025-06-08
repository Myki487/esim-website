'use client'

import { useState } from 'react'
import Link from 'next/link'
import classNames from 'classnames'

type TabType = 'features' | 'summary' | 'compatibility'

type Props = {
  countryName: string
}

export default function CountryTabs({ countryName }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('features')

  const tabs: TabType[] = ['features', 'summary', 'compatibility']

  return (
    <div className="space-y-4 mt-3">
      <div className="flex space-x-4 border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={classNames(
              'text-lg font-medium pb-1 border-b-2 transition',
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-blue-600'
            )}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'features' && (
        <div className="space-y-2">
          <p className="text-gray-400 text-lg">
            The {countryName} Travel Bundle is available in a range of data sizes from 1GB to 20GB.
          </p>
          <p className="text-gray-400 text-lg">2G / 3G / 4G / 5G Data Speed</p>
        </div>
      )}

      {activeTab === 'summary' && (
        <div className="space-y-2">
          <p className="text-gray-400 text-lg font-semibold">Bundle Summary</p>
          <p className="text-gray-400 text-lg">How long is my bundle valid?<br />7 Days from activation</p>
          <p className="text-gray-400 text-lg">Activation<br />Your bundle will activate automatically once you connect to a network in a country covered by the bundle.</p>
        </div>
      )}

      {activeTab === 'compatibility' && (
        <div className="space-y-2">
          <p className="text-gray-400 text-lg">
            All smartphones with eSIM technology-enabled are compatible.{' '}
            <Link href="/compatibility" className="text-blue-600 underline">Check it now</Link>
          </p>
          <p className="text-gray-400 text-lg">
            You’ll receive an email with your eSIM in seconds, no matter where you are.
          </p>
        </div>
      )}
    </div>
  )
}
