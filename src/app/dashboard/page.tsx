'use client'

import { useUser } from '@/context/UserContext'
import { useEffect, useState } from 'react'
import { Purchase } from '@/types/Purchase'

export default function DashboardPage() {
  const { user } = useUser()
  const [purchases, setPurchases] = useState<Purchase[]>([])

  useEffect(() => {
    if (!user) return

    const data = localStorage.getItem(`purchases_${user.email}`)
    if (data) {
      setPurchases(JSON.parse(data))
    }
  }, [user])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Purchases</h1>
      {purchases.length === 0 ? (
        <p>No purchases yet.</p>
      ) : (
        <ul className="space-y-4">
          {purchases.map((purchase, index) => (
            <li key={index} className="border p-4 rounded shadow">
              <p><strong>Country:</strong> {purchase.countryName}</p>
              <p><strong>Plan:</strong> {purchase.label}</p>
              <p><strong>Price:</strong> ${purchase.price}</p>
              <p><strong>Date:</strong> {new Date(purchase.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
