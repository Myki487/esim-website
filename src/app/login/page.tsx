'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useUser } from '@/context/UserContext' // Ensure this path is correct
import Link from 'next/link' // Import Link for proper Next.js navigation

export default function LoginPage() {
  const { login, user } = useUser()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null) // Ensure error can be null
  const [loading, setLoading] = useState(false) // Add loading state

  useEffect(() => {
    // Redirect if user is already logged in
    if (user) {
      router.push('/dashboard') // Redirect to dashboard after login
    }
  }, [user, router])

  const handleLogin = async (e: React.FormEvent) => { // Use FormEvent for form submission
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      // Important: Ensure data.user contains fullName and phoneNumber from API
      login(data.user); // Pass the full user object from the API response
      router.push('/dashboard'); // Redirect to dashboard after successful login

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
        backgroundImage: 'url("/login-bg.jpg")', // New login background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Semi-transparent overlay for better readability */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Login Form Container */}
      <div className="relative z-10 bg-gray-800 bg-opacity-70 p-8 sm:p-10 rounded-xl shadow-2xl w-full max-w-sm sm:max-w-md animate-fade-in-up border border-gray-700">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 text-center drop-shadow-md">
          Welcome Back!
        </h1>
        <p className="text-gray-300 text-center mb-6">Login to your account</p>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && <p className="text-red-400 text-sm text-center font-medium mb-4">{error}</p>}

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
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{' '}
          <Link href="/register" className="font-medium text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-300">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}