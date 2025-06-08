'use client'

import { useUser } from '@/context/UserContext'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function LoginPage() {
  const { login, user } = useUser()
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) router.push('/dashboard')
  }, [user])

  const handleLogin = () => {
    if (username === 'Admin777' && password === '03058425') {
      login({ username: 'Admin777', email: 'myusername1928@gmail.com' })
      router.push('/checkout')
    } else if (username === 'VavyLone' && password === 'VavyLone487') {
      login({ username: 'VavyLone', email: 'mr.k.g.487@gmail.com' })
      router.push('/checkout')
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto mt-32 bg-gray-800 text-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        className="w-full mb-2 p-2 rounded bg-gray-700"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 p-2 rounded bg-gray-700"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700">
        Login
      </button>
    </div>
  )
}
