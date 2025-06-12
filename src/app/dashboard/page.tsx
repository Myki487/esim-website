'use client'

import { useUser } from '@/context/UserContext'
import { useEffect, useState, FormEvent } from 'react'
import { Purchase } from '@/types/Purchase'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { user, updateUser, logout } = useUser();
  const router = useRouter();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loadingPurchases, setLoadingPurchases] = useState(true);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editFullName, setEditFullName] = useState(user?.fullName || '');
  const [editPhoneNumber, setEditPhoneNumber] = useState(user?.phoneNumber || '');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!user?.id) {
        setLoadingPurchases(false);
        return;
      }

      setLoadingPurchases(true);
      setPurchaseError(null);

      try {
        const res = await fetch(`/api/user-purchases?userId=${user.id}`);
        const data = await res.json();

        if (!res.ok) {
          setPurchaseError(data.message || 'Failed to fetch purchases.');
          console.error('Fetch purchases API error:', data.error);
          setPurchases([]);
          return;
        }

        setPurchases(data);
      } catch (err) {
        console.error('Client-side fetch purchases error:', err);
        setPurchaseError('An unexpected error occurred while loading purchases.');
        setPurchases([]);
      } finally {
        setLoadingPurchases(false);
      }
    };

    fetchPurchases();
    if (user) {
      setEditName(user.name || '');
      setEditFullName(user.fullName || '');
      setEditPhoneNumber(user.phoneNumber || '');
    }
  }, [user]);

  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileError(null);
    setProfileSuccess(null);

    if (!user?.id) {
      setProfileError('User not logged in.');
      setProfileSaving(false);
      return;
    }

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          name: editName,
          fullName: editFullName,
          phoneNumber: editPhoneNumber,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setProfileError(data.message || 'Failed to update profile.');
        console.error('Profile update API error:', data.error);
        return;
      }

      updateUser({ name: editName, fullName: editFullName, phoneNumber: editPhoneNumber });
      setProfileSuccess('Profile updated successfully!');
      setIsEditingProfile(false);
    } catch (err: unknown) {
      console.error('Client-side profile update error:', err);
      let errorMessage = 'An unexpected error occurred while updating profile.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setProfileError(errorMessage);
    } finally {
      setProfileSaving(false);
    }
  };

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordSaving(true);
    setPasswordError(null);
    setPasswordSuccess(null);

    if (!user?.id) {
      setPasswordError('User not logged in.');
      setPasswordSaving(false);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordError('New passwords do not match.');
      setPasswordSaving(false);
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long.');
      setPasswordSaving(false);
      return;
    }

    try {
      const res = await fetch('/api/user/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPasswordError(data.message || 'Failed to change password.');
        console.error('Change password API error:', data.error);
        return;
      }

      setPasswordSuccess('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setIsChangingPassword(false);
    } catch (err: unknown) {
      console.error('Client-side change password error:', err);
      let errorMessage = 'An unexpected error occurred while changing password.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setPasswordError(errorMessage);
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user?.id) {
      alert('User not logged in.');
      return;
    }

    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone, and all your data will be lost.')) {
      try {
        const res = await fetch('/api/user/delete-account', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user.id }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || 'Failed to delete account.');
          console.error('API error deleting account:', data.error);
          return;
        }

        alert('Account successfully deleted. You will be redirected to the login page.');
        logout();
        router.push('/login');
      } catch (err: unknown) {
        console.error('Client-side account deletion error:', err);
        let errorMessage = 'An unexpected error occurred while deleting account.';
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        alert(errorMessage);
      }
    }
  };


  if (!user) {
    return <p className="text-center mt-20 text-gray-700 dark:text-gray-300">Redirecting to login...</p>;
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center pt-20 pb-10 px-4"
      style={{
        backgroundImage: 'url("/dashboard-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        opacity: '0.8',
      }}
    >
      <div className="container mx-auto p-6 sm:p-8 lg:p-10 max-w-4xl animate-fade-in-up bg-gray-900 bg-opacity-90 rounded-xl shadow-2xl border border-gray-700">
        <h1 className="text-4xl font-extrabold text-white mb-8 text-center drop-shadow-md">
          Your Dashboard
        </h1>

        <section className="bg-gray-800 bg-opacity-70 shadow-lg rounded-xl p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4 flex justify-between items-center">
            Profile Information
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md"
            >
              {isEditingProfile ? 'Cancel' : 'Edit Profile'}
            </button>
          </h2>
          {isEditingProfile ? (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label htmlFor="editName" className="block text-sm font-medium text-gray-300">
                  Name (Username)
                </label>
                <input
                  type="text"
                  id="editName"
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="editFullName" className="block text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  id="editFullName"
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                  value={editFullName}
                  onChange={(e) => setEditFullName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="editPhoneNumber" className="block text-sm font-medium text-gray-300">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="editPhoneNumber"
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                  value={editPhoneNumber}
                  onChange={(e) => setEditPhoneNumber(e.target.value)}
                />
              </div>
              {profileError && <p className="text-red-500 text-sm">{profileError}</p>}
              {profileSuccess && <p className="text-green-500 text-sm">{profileSuccess}</p>}
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-md disabled:opacity-50"
                disabled={profileSaving}
              >
                {profileSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          ) : (
            <div className="text-gray-200">
              <p className="mb-2"><strong>Email:</strong> {user.email}</p>
              <p className="mb-2"><strong>Username:</strong> {user.name}</p>
              <p className="mb-2"><strong>Full Name:</strong> {user.fullName || 'N/A'}</p>
              <p className="mb-2"><strong>Phone Number:</strong> {user.phoneNumber || 'N/A'}</p>
            </div>
          )}
        </section>

        <section className="bg-gray-800 bg-opacity-70 shadow-lg rounded-xl p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4 flex justify-between items-center">
            Change Password
            <button
              onClick={() => {
                setIsChangingPassword(!isChangingPassword);
                setPasswordError(null);
                setPasswordSuccess(null);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md"
            >
              {isChangingPassword ? 'Cancel' : 'Change Password'}
            </button>
          </h2>
          {isChangingPassword && (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-300">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </div>
              {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-md disabled:opacity-50"
                disabled={passwordSaving}
              >
                {passwordSaving ? 'Changing...' : 'Change Password'}
              </button>
            </form>
          )}
          {passwordSuccess && !isChangingPassword && (
            <p className="text-green-500 text-sm mt-4 text-center">{passwordSuccess}</p>
          )}
        </section>

        <section className="bg-gray-800 bg-opacity-70 shadow-lg rounded-xl p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">
            Purchase History
          </h2>
          {loadingPurchases ? (
            <p className="text-gray-300">Loading purchases...</p>
          ) : purchaseError ? (
            <p className="text-red-500">{purchaseError}</p>
          ) : purchases.length === 0 ? (
            <p className="text-gray-300">No purchases yet.</p>
          ) : (
            <ul className="space-y-4">
              {purchases.map((purchase, index) => (
                <li
                  key={purchase.id || index}
                  className="bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-600 animate-fade-in-up"
                >
                  <p className="text-lg font-semibold text-blue-300">
                    {purchase.countryName} - {purchase.label}
                  </p>
                  <p className="text-gray-300">
                    Price: <span className="font-medium">${purchase.price}</span>
                  </p>
                  <p className="text-gray-300">
                    Date: {new Date(purchase.date).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="bg-gray-800 bg-opacity-70 shadow-lg rounded-xl p-6 border border-gray-700">
          <button
            className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
        </section>
      </div>
    </div>
  );
}