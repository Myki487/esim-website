'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useUser } from '@/context/UserContext'

export default function LoginPage() {
  const { login, user } = useUser()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) router.push('/dashboard')
  }, [user, router])

  const handleLogin = async () => {
    setError('')
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.message || 'Login failed')
        return
      }

      login({
        id: data.userId,
        email: data.email, 
	    	name: data.username || '',
      })

      router.push('/checkout')
    } catch (err: unknown) {
      console.error(err)
      let errorMessage = 'Server error';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto mt-32 bg-gray-800 text-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-2 p-2 rounded bg-gray-700"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 p-2 rounded bg-gray-700"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
      <p className="mt-4 text-center">
        Don’t have an account?{' '}
        <a href="/register" className="text-blue-400 hover:underline">
          Register here
        </a>
      </p>
    </div>
  )
}