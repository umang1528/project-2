import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { AuthCard } from '../../components/auth/AuthCard';
import { LoginBackground } from '../../components/auth/LoginBackground';
import { LoginForm } from '../../components/auth/LoginForm';
import { useAuthStore } from '../../store/useAuthStore';
import { ShieldCheck, Sparkles, LayoutDashboard, BarChart3 } from 'lucide-react';

export function Login() {
  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (email: string, password: string) => {
    setError('');
    setLoading(true);

    try {
    const response =  await login(email, password);
  
      navigate('/admin/dashboard', { replace: true });
    } catch (caughtError) {
      const err = caughtError as any;
      setError(
        err?.response?.data?.message || err?.message || 'Authentication failed. Please verify your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05070f] text-white">
      <LoginBackground />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1600px] flex-col justify-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="grid min-h-[calc(100vh-80px)] gap-10 lg:grid-cols-[1.25fr_0.9fr] lg:items-center">
          <motion.section
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_0_80px_rgba(255,255,255,0.05)] backdrop-blur-2xl sm:p-10 lg:p-12"
          >
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-gradient-to-br from-[#38bdf8]/20 to-transparent blur-3xl" />
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/70">
                  <ShieldCheck size={16} />
                  Admin Portal
                </span>
                <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                  Premium control for your cinematic portfolio.
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
                  Secure access to dashboard publishing, media workflows, and analytics tracking with luxury motion and modern glassmorphism.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: <Sparkles size={20} />, label: 'Creative metrics' },
                  { icon: <LayoutDashboard size={20} />, label: 'Dashboard insights' },
                  { icon: <BarChart3 size={20} />, label: 'Real-time analytics' },
                  { icon: <ShieldCheck size={20} />, label: 'Secure admin access' },
                ].map((item) => (
                  <div key={item.label} className="rounded-[28px] border border-white/10 bg-black/40 p-5 backdrop-blur-xl">
                    <div className="flex items-center gap-3 text-white/80">
                      <span className="flex h-10 w-10 items-center justify-center rounded-3xl bg-white/5 text-brand-accent">
                        {item.icon}
                      </span>
                      <span className="text-sm font-semibold">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="flex items-center justify-center"
          >
            <AuthCard title="Welcome back" subtitle="Sign in to continue" >
              <AnimatePresence>
                {error ? (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-3xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100"
                  >
                    {error}
                  </motion.div>
                ) : null}
              </AnimatePresence>
              <LoginForm onSubmit={handleSubmit} loading={loading} />
            </AuthCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
