// src/app/checkout/page.tsx
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
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Вхід: перевіряємо, чи є користувач
    if (!user) {
      console.log('User not found in context, redirecting to login.')
      router.push('/login')
      return
    }

    // Вхід: завантажуємо вибраний план з localStorage
    const selectedPlan = localStorage.getItem('selectedPlan')
    if (selectedPlan) {
      try {
        const parsedPlan = JSON.parse(selectedPlan) as Purchase
        setPlan(parsedPlan)
        console.log('Selected plan loaded from localStorage:', parsedPlan)
      } catch (e) {
        console.error('Error parsing selectedPlan from localStorage:', e)
        setError('Invalid plan data in local storage.')
        setPlan(null)
      }
    } else {
      console.log('No selected plan found in localStorage.')
      setError('No plan selected. Please go back and select a plan.');
      setPlan(null);
    }
  }, [user, router]); // Залежності, щоб useEffect спрацьовував при зміні user або router

  const handleConfirmPurchase = async () => {
    setError(null); // Очищаємо попередні помилки

    // Перевірка, чи є користувач і план ПЕРЕД надсиланням запиту
    if (!user || !user.id) {
      console.error('handleConfirmPurchase: User object or user.id is missing.', user);
      setError('User is not logged in or user ID is missing. Please log in again.');
      return;
    }
    if (!plan) {
      console.error('handleConfirmPurchase: Plan data is missing.', plan);
      setError('No plan selected. Please go back and select a plan.');
      return;
    }

    setLoading(true);

    try {
      // Логуємо дані, які ми збираємося надіслати
      const dataToSend = {
        userId: user.id,
        countryId: plan.countryId,
        planId: plan.planId,
        countryName: plan.countryName,
        label: plan.label,
        price: plan.price,
      };
      console.log('Attempting to send purchase data:', dataToSend);

      const res = await fetch('/api/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const responseData = await res.json();

      if (!res.ok) {
        setError(responseData.message || 'Failed to confirm purchase.');
        console.error('Purchase API error:', responseData.error || responseData.message);
        return;
      }

      localStorage.removeItem('selectedPlan');
      setPurchaseConfirmed(true);
      console.log('Purchase confirmed successfully:', responseData);

    } catch (err: unknown) {
      console.error('Client-side purchase error:', err);
      let errorMessage = 'An unexpected error occurred during purchase confirmation.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Цей рендер відбувається на основі стану, а не просто повертає null
  if (!user) {
    return <p>Redirecting to login...</p>;
  }

  if (!plan) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <p>Please select a plan before proceeding to checkout.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

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
            onClick={handleConfirmPurchase}
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            disabled={loading || !user || !plan || !user.id}
          >
            {loading ? 'Confirming...' : 'Confirm Purchase'}
          </button>
        </>
      )}
    </div>
  )
}