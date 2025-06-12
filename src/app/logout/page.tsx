'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/components/UserContext'

export default function LogoutPage() {
  const { logout } = useUser()
  const router = useRouter()

  useEffect(() => {
    logout()
    router.replace('/login')
  }, [logout, router])

  return <p className="text-center p-8">Logging out...</p>
}
