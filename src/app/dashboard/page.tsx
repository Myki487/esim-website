'use client'

import { useUser } from '@/context/UserContext'
import { useEffect, useState } from 'react'
import { Purchase } from '@/types/Purchase'

export default function DashboardPage() {
  const { user } = useUser();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/user-purchases?userId=${user.id}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || 'Failed to fetch purchases.');
          console.error('Fetch purchases API error:', data.error);
          setPurchases([]);
          return;
        }

        setPurchases(data);
      } catch (err) {
        console.error('Client-side fetch purchases error:', err);
        setError('An unexpected error occurred while loading purchases.');
        setPurchases([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [user]);

  if (loading) return <p>Loading purchases...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">Your Purchases</h1>
      {purchases.length === 0 ? (
        <p>No purchases yet.</p>
      ) : (
        <ul className="space-y-4">
          {purchases.map((purchase, index) => (
            <li key={purchase.id || index} className="border p-4 rounded shadow">
              <p><strong>Country:</strong> {purchase.countryName}</p>
              <p><strong>Plan:</strong> {purchase.label}</p>
              <p><strong>Price:</strong> ${purchase.price}</p>
              <p><strong>Date:</strong> {new Date(purchase.date).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}