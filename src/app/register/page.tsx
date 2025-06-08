'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { StaticUser } from '@/types/StaticUser'

export default function RegisterPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleRegister = () => {
    if (!username || !email || !password) {
      setError('Please fill in all fields')
      return
    }

    const usersString = localStorage.getItem('registered_users')
    const users: StaticUser[] = usersString ? JSON.parse(usersString) : []

    const userExists = users.some(
      (user) => user.username === username || user.email === email
    )

    if (userExists) {
      setError('User with this username or email already exists')
      return
    }

    const newUser: StaticUser = { username, email, password }
    users.push(newUser)
    localStorage.setItem('registered_users', JSON.stringify(users))
    router.push('/login')
  }

  return (
    <div className="p-8 max-w-md mx-auto mt-32 bg-gray-800 text-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Username"
        className="w-full mb-2 p-2 rounded bg-gray-700"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
      <button onClick={handleRegister} className="w-full bg-green-600 py-2 rounded hover:bg-green-700">
        Register
      </button>
			<p className="mt-4 text-center">
				Already have an account?{' '}
				<a href="/login" className="text-green-400 hover:underline">
					Login here
				</a>
			</p>
    </div>
  )
}
