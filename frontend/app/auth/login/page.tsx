'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ButtonLink from '@/components/ui/ButtonLink';
import { ArrowLeft } from 'lucide-react';

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
    <section className="login-page relative min-h-screen w-full bg-[#242529] py-8 px-[min(5vw,32px)] flex flex-col justify-center items-center">
      <ButtonLink href="/" className="absolute top-10 left-[min(5vw,32px)] px-4 py-2 rounded-sm bg-custom-gray-dark text-white flex justify-center items-center gap-2">
        <ArrowLeft className="h-5" />
        Kembali
      </ButtonLink>


      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main spotlight blur effect */}
        <div 
          className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] 
          rounded-full bg-[#6069FF]/20 blur-[120px]"
        />
        
        {/* Secondary glow */}
        <div 
          className="absolute bottom-[19%] left-[-10%] w-[600px] h-[600px] 
          rounded-full bg-[#FF7538]/20 blur-[100px]"
        />

        {/* Star-like effects */}
        <div className="absolute top-4 right-6 w-1 h-1 bg-white/70 rounded-full" />
        <div className="absolute top-16 left-8 w-0.5 h-0.5 bg-white/60 rounded-full" />
        <div className="absolute bottom-12 right-16 w-1 h-1 bg-white/50 rounded-full" />
      </div>

      {/* Content container */}
      <div className="relative w-full max-w-md">
          {/* Main content */}
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


          {/* <div className="space-y-6 text-center">
            <h1 className="text-2xl font-semibold text-white">Reset Password</h1>
            
            <p className="text-sm text-gray-400">
              Type your email address below and we'll send you a password reset link
            </p> */}

            <div className="space-y-4">
              <h1 className='text-xl'>Masuk</h1>

              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 
                  rounded-lg text-white placeholder-custom-gray-light focus:outline-none 
                  focus:border-custom-blue focus:ring-1 focus:ring-custom-blue"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 
                  rounded-lg text-white placeholder-custom-gray-light focus:outline-none 
                  focus:border-[#FF7538] focus:ring-1 focus:ring-[#FF7538]"
              />

              <button 
                className="w-full py-3 px-4 bg-gradient-to-r from-[#FF7538]/90 
                  to-[#6069FF]/90 hover:from-[#FF7538] hover:to-[#6069FF] 
                  text-white rounded-lg transition-all duration-200"
              >
                Masuk
              </button>
            </div>
          {/* </div> */}
        </div>
    </section>
  );
}
