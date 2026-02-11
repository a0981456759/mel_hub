import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      onLoginSuccess();
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-md border-2 border-cyan-500 bg-slate-950 p-8 relative">
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500" />

        <div className="text-center mb-8">
          <div className="text-[10px] text-cyan-500/70 uppercase tracking-[0.4em] mb-2">
            ADMIN_AUTHENTICATION
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
            SECURE_LOGIN
          </h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-white/40 font-black uppercase tracking-widest">OPERATOR_EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b-2 border-white/20 py-3 text-sm text-white outline-none focus:border-cyan-500 transition-colors uppercase placeholder:text-white/10 font-mono"
              placeholder="[ EMAIL_ADDRESS ]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-white/40 font-black uppercase tracking-widest">ACCESS_KEY</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b-2 border-white/20 py-3 text-sm text-white outline-none focus:border-cyan-500 transition-colors placeholder:text-white/10 font-mono"
              placeholder="[ PASSWORD ]"
              required
            />
          </div>

          {error && (
            <div className="text-[10px] text-red-400 font-black uppercase tracking-widest text-center py-2 border border-red-500/30 bg-red-500/10">
              AUTH_FAILED: {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 border-2 border-cyan-500 text-cyan-500 font-black uppercase italic tracking-[0.3em] hover:bg-cyan-500 hover:text-black transition-all ${loading ? 'opacity-50 cursor-wait' : ''}`}
          >
            {loading ? 'AUTHENTICATING...' : 'INITIALIZE_SESSION ≫'}
          </button>
        </form>

        <div className="mt-6 text-center text-[9px] text-white/20 uppercase tracking-widest">
          ENCRYPTION: AES-256 // SECURE_CHANNEL
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
