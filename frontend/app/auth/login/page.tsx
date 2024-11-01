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
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to log in');
    }
  };

  return (
    <section className="login-page relative min-h-screen w-full bg-[#242529] py-8 px-[min(5vw,32px)] flex flex-col justify-center items-center">
      <ButtonLink href="/" className="absolute top-10 left-[min(5vw,32px)] px-4 py-2 rounded-sm bg-custom-gray-dark text-white flex justify-center items-center gap-2">
        <ArrowLeft className="h-5" />
        Kembali
      </ButtonLink>

      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] 
          rounded-full bg-[#6069FF]/20 blur-[120px]"
        />
        <div 
          className="absolute bottom-[19%] left-[-10%] w-[600px] h-[600px] 
          rounded-full bg-[#FF7538]/20 blur-[100px]"
        />
        <div className="absolute top-4 right-6 w-1 h-1 bg-white/70 rounded-full" />
        <div className="absolute top-16 left-8 w-0.5 h-0.5 bg-white/60 rounded-full" />
        <div className="absolute bottom-12 right-16 w-1 h-1 bg-white/50 rounded-full" />
      </div>

      <div className="relative w-full max-w-md">
        <h1 className="text-xl font-semibold text-white text-center mb-4">Masuk</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 
              rounded-lg text-white placeholder-custom-gray-light focus:outline-none 
              focus:border-custom-blue focus:ring-1 focus:ring-custom-blue"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 
              rounded-lg text-white placeholder-custom-gray-light focus:outline-none 
              focus:border-[#FF7538] focus:ring-1 focus:ring-[#FF7538]"
            required
          />
          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-500">{message}</p>}
          <button 
            type="submit" 
            className="w-full py-3 px-4 bg-gradient-to-r from-[#FF7538]/90 
              to-[#6069FF]/90 hover:from-[#FF7538] hover:to-[#6069FF] 
              text-white rounded-lg transition-all duration-200"
          >
            Masuk
          </button>
        </form>
        <a href="/auth/register">blm punya akun?</a>
      </div>
    </section>
  );
}
