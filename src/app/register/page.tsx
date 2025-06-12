// src/app/register/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // --- ВИДАЛЕНО: const [fullName, setFullName] = useState('') ---
  // --- ВИДАЛЕНО: const [phoneNumber, setPhoneNumber] = useState('') ---
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    // --- Змінено: Валідація тепер тільки для username, email, password ---
    if (!username || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    // --- Кінець змін ---

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // --- Змінено: fullName та phoneNumber більше не відправляються ---
        body: JSON.stringify({ name: username, email, password }),
        // --- Кінець змін ---
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.message || 'Registration failed');
        return;
      }

      alert('Registration successful! Please login to your account.');
      router.push('/login');
    } catch (err: unknown) {
      console.error(err);
      let errorMessage = 'Server error. Please try again later.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-8 sm:px-6 lg:px-8"
      style={{
        backgroundImage: 'url("/register-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative z-10 bg-gray-800 bg-opacity-70 p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md animate-fade-in-up border border-gray-700">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 text-center drop-shadow-md">
          Create Account
        </h1>
        <p className="text-gray-300 text-center mb-6">Join our community</p>

        <form onSubmit={handleRegister} className="space-y-5">
          {error && <p className="text-red-400 text-sm text-center font-medium mb-4">{error}</p>}

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          {/* --- ВИДАЛЕНО: div для Full Name --- */}
          {/* --- ВИДАЛЕНО: div для Phone Number --- */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </span>
            ) : (
              'Register'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-green-400 hover:text-green-300 hover:underline transition-colors duration-300">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}