"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Authentication check
    if (email === 'jackyho@tvas.ca' && password === '@Dad0933718328') {
      document.cookie = "tvas_admin_auth=authenticated; path=/; max-age=86400; SameSite=Strict";
      router.push('/admin');
    } else {
      setError('Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Aesthetic Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[100px] pointer-events-none opacity-60" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[100px] pointer-events-none opacity-60" />

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in duration-700">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center p-2.5 shadow-xl shadow-blue-200">
              <Image src="/logo.png" width={40} height={40} alt="TVAS Logo" className="brightness-0 invert object-contain" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-black tracking-tighter text-slate-900 uppercase leading-none">
                TVAS Admin
              </h1>
              <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest mt-1 flex items-center gap-1.5">
                <ShieldCheck size={12} />
                Secure Portal
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-2xl shadow-blue-900/5">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                Administrator Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-bold placeholder:text-slate-300"
                  placeholder="admin@tvas.ca"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all font-bold placeholder:text-slate-300"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm py-4 px-4 rounded-xl text-center font-bold animate-shake">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-xl shadow-blue-200 transition-all active:translate-y-1 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  Authenticate
                  <ArrowRight size={20} />
                </>
              )}
            </Button>
          </form>
        </div>

        <p className="text-center mt-10 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
          Authorized Personnel Only • TVAS CMS v2.0
        </p>
      </div>
    </div>
  );
}
