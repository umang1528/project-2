import type { ReactNode } from 'react';

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_0_80px_rgba(255,255,255,0.05)] backdrop-blur-2xl sm:p-10">
      <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      <div className="relative space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-white/50">{subtitle}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
}
