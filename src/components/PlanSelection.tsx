'use client'

import { useState } from 'react'
import classNames from 'classnames'

const unlimitedOptions = [
  { label: '1 Day', value: '1-day' },
  { label: '3 Days', value: '3-days' },
  { label: '7 Days', value: '7-days' },
  { label: '15 Days', value: '15-days' },
  { label: '30 Days', value: '30-days' },
]

const dataPlans = [
  { label: '2GB', value: '2gb' },
  { label: '5GB', value: '5gb' },
  { label: '10GB', value: '10gb' },
  { label: '20GB', value: '20gb' },
  { label: '50GB', value: '50gb' },
]

export default function PlanSelection() {
	const [selectedPlan, setSelectedPlan] = useState<string | null>(null)


  return (
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
          className="px-6 py-3 mb-8 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          Buy Now
        </button>
      </div>
    </div>
  )
}
