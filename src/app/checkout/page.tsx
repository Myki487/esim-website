'use client'

import { useUser } from '@/context/UserContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Purchase } from '@/types/Purchase'

export default function CheckoutPage() {
  const { user } = useUser()
  const router = useRouter()
  const [plan, setPlan] = useState<Purchase | null>(null)
  const [purchaseConfirmed, setPurchaseConfirmed] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      const selectedPlan = localStorage.getItem('selectedPlan')
      if (selectedPlan) {
        setPlan(JSON.parse(selectedPlan))
      }
    }
  }, [user])

  if (!user || !plan) return null

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {purchaseConfirmed ? (
        <div className="p-6 bg-green-100 border border-green-300 text-green-800 rounded">
          <h2 className="text-xl font-semibold mb-2">Purchase Successful!</h2>
          <p>Thank you for your purchase of <strong>{plan.label}</strong> in <strong>{plan.countryName}</strong>.</p>
        </div>
      ) : (
        <>
          <p className="mb-2">Country: <strong>{plan.countryName}</strong></p>
          <p className="mb-2">Plan: <strong>{plan.label}</strong></p>
          <p className="mb-4">Price: <strong>${plan.price}</strong></p>
          <button
            onClick={() => {
						if (!user) return;

						const key = `purchases_${user.email}`;
						const existing = JSON.parse(localStorage.getItem(key) || '[]');
						const newPurchase = { ...plan, date: new Date().toISOString() };
						localStorage.setItem(key, JSON.stringify([...existing, newPurchase]));
						localStorage.removeItem('selectedPlan');
						setPurchaseConfirmed(true);
					}}
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Confirm Purchase
          </button>
        </>
      )}
    </div>
  )
}
