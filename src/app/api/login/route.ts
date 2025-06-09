import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
  }

  const user = await db.user.findUnique({ where: { email } })
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
  }

  return NextResponse.json({
    message: 'Login successful',
    user: {
      name: user.name,
      email: user.email,
    },
  })
}
