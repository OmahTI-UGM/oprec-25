'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Ensures cookies are included in requests if your backend sets them
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      // Redirect after successful login
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to log in');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to log out');
      }

      // Redirect to login page after successful logout
      router.push('/auth/login');
    } catch (err: any) {
      setError(err.message || 'Logout failed');
    }
  };

  const handleRefreshToken = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      setMessage('Token refreshed successfully');
    } catch (err: any) {
      setError(err.message || 'Failed to refresh token');
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <button type="submit">Login</button>
      </form>
      
      {/* Logout button */}
      <button onClick={handleLogout} style={{ marginTop: '20px' }}>
        Logout
      </button>

      {/* Refresh Token button */}
      <button onClick={handleRefreshToken} style={{ marginTop: '10px' }}>
        Refresh Token
      </button>
    </div>
  );
}
