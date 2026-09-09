import React, { useState } from 'react';
import { 
  Utensils, Lock, Eye, EyeOff, Sparkles, 
  AlertCircle, ArrowRight, ShieldCheck, Leaf, 
  CheckCircle2, User, KeyRound 
} from 'lucide-react';

export default function StudentLoginPage() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Verifying Credentials...');
  const [status, setStatus] = useState('idle'); // 'idle' | 'error' | 'success'
  const [errorMessage, setErrorMessage] = useState('');

  // 🚀 Quick Autofill for Hackathon Demo
  const handleQuickFill = () => {
    setStudentId('1907001');
    setPassword('kuet1234');
    setStatus('idle');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!studentId || !password) {
      setStatus('error');
      setErrorMessage('অনুগ্রহ করে স্টুডেন্ট আইডি ও পাসওয়ার্ড দিন!');
      return;
    }

    setStatus('idle');
    setLoading(true);
    setLoadingText('Connecting to Campus Server...');

    // Dynamic Loading Animation Stages
    setTimeout(() => setLoadingText('Authenticating Student Profile...'), 800);
    setTimeout(() => setLoadingText('Syncing Live Cafeteria Tokens...'), 1600);

    setTimeout(() => {
      if (password === 'kuet1234' || password.length >= 6) {
        setLoading(false);
        setStatus('success');
        setTimeout(() => {
          // Redirect to Student Dashboard (Dynamic Navigation Trigger)
          alert('Login Successful! Redirecting to Student Dashboard...');
        }, 1000);
      } else {
        setLoading(false);
        setStatus('error');
        setErrorMessage('পাসওয়ার্ডটি ভুল হয়েছে! আবার চেষ্টা করুন।');
      }
    }, 2400);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans select-none">
      
      {/* 🔮 Animated Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse delay-700" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* 🍃 Floating Zero-Waste Badges (Visible on larger screens) */}
      <div className="hidden lg:flex absolute top-12 left-12 bg-slate-900/60 backdrop-blur-md border border-emerald-500/20 px-4 py-2.5 rounded-2xl items-center gap-3 shadow-xl animate-bounce duration-[3000ms]">
        <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
          <Leaf className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-semibold text-emerald-400">Zero Waste Campus Initiative</p>
          <p className="text-[11px] text-slate-400">Over 2,450+ meals saved this month</p>
        </div>
      </div>

      <div className="hidden lg:flex absolute bottom-12 right-12 bg-slate-900/60 backdrop-blur-md border border-amber-500/20 px-4 py-2.5 rounded-2xl items-center gap-3 shadow-xl animate-pulse">
        <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
          <Utensils className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-semibold text-amber-400">Live Availability Sync</p>
          <p className="text-[11px] text-slate-400">Central Hall: 164 portions active</p>
        </div>
      </div>

      {/* 🛡️ Main Login Glass Container */}
      <div className={`w-full max-w-md bg-slate-900/70 backdrop-blur-2xl border transition-all duration-300 rounded-3xl p-8 shadow-2xl relative z-10 ${
        status === 'error' ? 'border-red-500/50 animate-shake' : 
        status === 'success' ? 'border-emerald-500/60 ring-2 ring-emerald-500/20' : 'border-slate-800'
      }`}>
        
        {/* Top Header Logo */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-2xl flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/30 mx-auto transform hover:rotate-6 transition-transform duration-300">
              <Utensils className="w-8 h-8" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
            </span>
          </div>

          <h1 className="text-2xl font-black tracking-wider text-white mt-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            THE LAST PLATE
          </h1>
          <p className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" /> Student Access Portal
          </p>
        </div>

        {/* ⚡ Hackathon Demo Autofill Banner */}
        <div className="mb-6 p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-emerald-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Demo Credentials Ready</span>
          </div>
          <button 
            type="button" 
            onClick={handleQuickFill}
            className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-lg font-semibold transition-all hover:scale-105"
          >
            Auto-fill
          </button>
        </div>

        {/* Error Alert Box */}
        {status === 'error' && (
          <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-xs flex items-center gap-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        {/* Success Alert Box */}
        {status === 'success' && (
          <div className="mb-5 p-3.5 bg-emerald-500/10 border border-emerald-500/40 rounded-2xl text-emerald-400 text-xs flex items-center gap-2.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span className="font-medium">Welcome back, Student! Redirecting...</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Student ID Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
              Student Roll / Campus Email
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-emerald-400 transition-colors">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="e.g. 1907001 or roll@kuet.ac.bd"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-mono"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Password</label>
              <a href="#forgot" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">Forgot?</a>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-emerald-400 transition-colors">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl pl-10 pr-11 py-3.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || status === 'success'}
            className="w-full mt-2 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black py-4 rounded-2xl text-sm transition-all duration-300 shadow-lg shadow-emerald-500/25 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span className="font-semibold text-xs animate-pulse">{loadingText}</span>
              </div>
            ) : status === 'success' ? (
              <span>Authenticated! Loading...</span>
            ) : (
              <>
                <span>Sign In to Meal Portal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-8 text-center text-xs text-slate-500 border-t border-slate-800/80 pt-5">
          <p>
            Don't have an account?{' '}
            <a href="#signup" className="text-emerald-400 hover:underline font-semibold">
              Register Student Roll
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}