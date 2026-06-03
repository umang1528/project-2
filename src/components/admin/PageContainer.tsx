import { ReactNode } from 'react';

interface PageContainerProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  headerAction?: ReactNode;
}

export function PageContainer({ title, subtitle, children, headerAction }: PageContainerProps) {
  return (
    <section className="space-y-6">
      <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(255,255,255,0.04)] backdrop-blur-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-[0.35em] text-white/40">{title}</div>
            <h2 className="text-3xl font-semibold tracking-tight text-white">{title}</h2>
            <p className="max-w-3xl text-sm leading-6 text-white/60">{subtitle}</p>
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      </div>

      {children}
    </section>
  );
}
