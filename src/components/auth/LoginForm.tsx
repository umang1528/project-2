import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Loader2 } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  loading: boolean;
}

export function LoginForm({ onSubmit, loading }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form
      className="space-y-6"
      onSubmit={async (event) => {
        event.preventDefault();
        await onSubmit(email, password);
      }}
    >
      <div className="space-y-5">
        <label className="relative block">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
            <Mail size={18} />
          </span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="w-full rounded-3xl border border-white/10 bg-black/40 py-4 pl-12 pr-4 text-sm text-white outline-none transition focus:border-white/30 focus:bg-white/5"
            required
          />
        </label>

        <label className="relative block">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
            <Lock size={18} />
          </span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="w-full rounded-3xl border border-white/10 bg-black/40 py-4 pl-12 pr-4 text-sm text-white outline-none transition focus:border-white/30 focus:bg-white/5"
            required
          />
        </label>
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading}
        className="flex h-14 w-full items-center justify-center rounded-3xl bg-gradient-to-r from-slate-900 via-black to-slate-950 px-6 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:shadow-[0_0_30px_rgba(255,255,255,0.18)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin" size={18} />
            Authenticating
          </span>
        ) : (
          'Sign In'
        )}
      </motion.button>
    </form>
  );
}
