'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return null;

  return (
		<div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
			<div className="bg-gray-800 p-6 rounded-xl shadow-md text-center">
				<h2 className="text-xl font-bold mb-4">Welcome, {user.username}!</h2>
					<Link href="/logout" onClick={handleLogout} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">Logout</Link>
			</div>
		</div>
  );
}
