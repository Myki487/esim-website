'use client'

import { useUser } from '@/components/UserContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState, FormEvent } from 'react'
import { Purchase } from '@/types/Purchase'
import classNames from 'classnames'

export default function CheckoutPage() {
  const { user, updateUser } = useUser()
  const router = useRouter()
  const [plan, setPlan] = useState<Purchase | null>(null)
  const [purchaseConfirmed, setPurchaseConfirmed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const [fullName, setFullName] = useState(user?.fullName || '')
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '')
  const [email, setEmail] = useState(user?.email || '')
  const [isFormValid, setIsFormValid] = useState(false)

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'google_pay'>('card')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [isCardFormValid, setIsCardFormValid] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    const selectedPlan = localStorage.getItem('selectedPlan')
    if (selectedPlan) {
      try {
        const parsedPlan = JSON.parse(selectedPlan) as Purchase
        setPlan(parsedPlan)
      } catch (errorParsing: unknown) {
        console.error('Error parsing selectedPlan from localStorage:', errorParsing);
        setError('Invalid plan data in local storage.');
        setPlan(null);
      }
    } else {
      setError('No plan selected. Please go back and select a plan.');
      setPlan(null);
    }
  }, [user, router]);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setPhoneNumber(user.phoneNumber || '');
      setEmail(user.email || '');
    }
  }, [user]);

  useEffect(() => {
    const formIsValid = fullName.trim() !== '' && phoneNumber.trim() !== '' && email.trim() !== '' && plan !== null;
    setIsFormValid(formIsValid);

    const cardFormIsValid = cardNumber.length === 16 && cardExpiry.length === 5 && cardCvv.length === 3;
    setIsCardFormValid(cardFormIsValid);

  }, [fullName, phoneNumber, email, plan, cardNumber, cardExpiry, cardCvv]);

  const handleConfirmPurchase = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    if (!user || !user.id || !plan) {
      setError('Missing user or plan data.');
      setLoading(false);
      return;
    }

    try {
      const userUpdateRes = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          fullName: fullName,
          phoneNumber: phoneNumber,
        }),
      });

      if (!userUpdateRes.ok) {
        const errorData: { message?: string } = await userUpdateRes.json();
        throw new Error(errorData.message || 'Failed to update user profile.');
      }
      updateUser({ fullName, phoneNumber });

    } catch (errUpdatingProfile: unknown) {
      let errorMessage = 'Failed to update user profile.';
      if (errUpdatingProfile instanceof Error) {
        errorMessage = `Failed to update user profile: ${errUpdatingProfile.message}`;
      }
      setError(errorMessage);
      setLoading(false);
      return;
    }

    if (paymentMethod === 'card' && !isCardFormValid) {
        setError('Please fill in all card details correctly.');
        setLoading(false);
        return;
    }

    if (paymentMethod === 'google_pay') {
        await new Promise(resolve => setTimeout(resolve, 1500));
    } else if (paymentMethod === 'card') {
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    try {
      const dataToSend = {
        userId: user.id,
        countryId: plan.countryId,
        planId: plan.planId,
        countryName: plan.countryName,
        label: plan.label,
        price: plan.price,
      };

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
        return;
      }

      localStorage.removeItem('selectedPlan');
      setPurchaseConfirmed(true);

    } catch (errPurchase: unknown) {
      let errorMessage = 'An unexpected error occurred during purchase confirmation.';
      if (errPurchase instanceof Error) {
        errorMessage = errPurchase.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p className="text-center mt-20 text-gray-700 dark:text-gray-300">Redirecting to login...</p>;
  }

  if (!plan) {
    return (
      <div className="max-w-2xl mx-auto p-8 mt-20 text-center animate-fade-in-up bg-gray-800 shadow-lg rounded-xl">
        <h1 className="text-3xl font-bold text-gray-200 mb-6">Checkout</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <p className="text-lg text-gray-400">Please select a plan before proceeding to checkout.</p>
        <button
          onClick={() => router.push('/')}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center pt-20 pb-10 px-4"
      style={{
        backgroundImage: 'url("/checkbox-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        opacity: '0.8',
      }}
    >
      <div className="container mx-auto max-w-3xl animate-fade-in-up bg-gray-900 bg-opacity-90 p-6 sm:p-8 lg:p-10 rounded-xl shadow-2xl border border-gray-700">
        <h1 className="text-4xl font-extrabold text-white mb-8 text-center drop-shadow-md">
          Checkout
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {purchaseConfirmed ? (
          <div className="p-8 bg-gray-800 border border-green-700 text-green-100 rounded-xl shadow-lg text-center animate-fade-in-up">
            <h2 className="text-3xl font-semibold mb-4 text-green-300">🎉 Purchase Successful! 🎉</h2>
            <p className="text-lg mb-4 text-gray-200">Thank you for your purchase of:</p>
            <p className="text-xl font-bold text-green-300">
              {plan.label} for {plan.countryName}
            </p>
            <p className="text-2xl font-bold text-green-500 mt-2">
              Total: ${plan.price}
            </p>
            <button
              onClick={() => router.push('/dashboard')}
              className="mt-8 px-8 py-4 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-300 shadow-lg text-lg font-semibold"
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleConfirmPurchase} className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Order Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-gray-200">
              <div>
                <p className="font-semibold">Country:</p>
                <p className="text-green-300 font-medium">{plan.countryName}</p>
              </div>
              <div>
                <p className="font-semibold">Plan:</p>
                <p className="text-green-300 font-medium">{plan.label}</p>
              </div>
              <div className="col-span-1 md:col-span-2">
                <p className="text-2xl font-bold text-green-500 mt-4">
                  Total Price: ${plan.price}
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Your Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                  value={email}
                  readOnly
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Payment Method</h2>
            <div className="flex space-x-4 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={classNames(
                  "flex-1 px-6 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 hover:bg-gray-700",
                  paymentMethod === 'card'
                    ? "bg-purple-600 text-white shadow-md border border-purple-500"
                    : "bg-gray-800 text-gray-200 border border-gray-700"
                )}
              >
                Payment Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('google_pay')}
                className={classNames(
                  "flex-1 px-6 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 hover:bg-gray-700",
                  paymentMethod === 'google_pay'
                    ? "bg-purple-600 text-white shadow-md border border-purple-500"
                    : "bg-gray-800 text-gray-200 border border-gray-700"
                )}
              >
                Google Pay
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-4 animate-slide-down">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                    placeholder="XXXX XXXX XXXX XXXX"
                    required={paymentMethod === 'card'}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-300">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      id="cardExpiry"
                      className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                      value={cardExpiry}
                      onChange={(e) => {
                        const input = e.target.value.replace(/\D/g, '');
                        let formattedInput = input;
                        if (input.length > 2) {
                          formattedInput = input.slice(0, 2) + '/' + input.slice(2, 4);
                        }
                        setCardExpiry(formattedInput.slice(0, 5));
                      }}
                      placeholder="MM/YY"
                      required={paymentMethod === 'card'}
                    />
                  </div>
                  <div>
                    <label htmlFor="cardCvv" className="block text-sm font-medium text-gray-300">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cardCvv"
                      className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                      placeholder="XXX"
                      required={paymentMethod === 'card'}
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className={classNames(
                "w-full px-6 py-4 mt-8 rounded-lg text-xl font-bold transition-all duration-300 shadow-lg",
                {
                  "bg-green-600 text-white hover:bg-green-700": isFormValid && (paymentMethod === 'google_pay' || isCardFormValid),
                  "bg-gray-700 text-gray-400 cursor-not-allowed": !isFormValid || (paymentMethod === 'card' && !isCardFormValid),
                }
              )}
              disabled={loading || !isFormValid || (paymentMethod === 'card' && !isCardFormValid)}
            >
              {loading ? 'Processing Payment...' : `Pay $${plan.price}`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}