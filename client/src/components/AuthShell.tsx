import type { ReactNode } from "react";

interface AuthShellProps {
  title: string;
  subtitle: string;
  accent: string;
  children: ReactNode;
}

const AuthShell = ({ title, subtitle, accent, children }: AuthShellProps) => (
  <div className="min-h-screen bg-hero-grid">
    <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-6xl overflow-hidden rounded-[28px] bg-white shadow-panel sm:min-h-[calc(100vh-3rem)] sm:rounded-[40px] lg:grid-cols-[1.1fr_0.9fr]">
      <section className="flex flex-col bg-ink p-5 text-white sm:p-8 md:p-10">
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-white/50 sm:text-xs sm:tracking-[0.28em]">
            Smart Leads Assignment
          </p>
          <h1 className="mt-4 max-w-md font-display text-3xl leading-tight sm:mt-5 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-6 text-white/72 sm:mt-5 sm:text-base sm:leading-7">
            {subtitle}
          </p>
        </div>
        <div className="mt-6 rounded-[24px] bg-white/6 p-4 sm:mt-8 sm:rounded-[32px] sm:p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-mint sm:text-sm sm:tracking-[0.24em]">
            Why this feels useful
          </p>
          <p className="mt-3 text-lg font-semibold leading-7 sm:text-2xl">{accent}</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/72">
            This build includes auth, role-based access, full CRUD, filters, debounced search,
            pagination, CSV export, Docker support, and a mobile-friendly dashboard experience.
          </p>
        </div>
      </section>
      <section className="flex items-center justify-center bg-sand p-4 sm:p-6 md:p-10">
        {children}
      </section>
    </div>
  </div>
);

export default AuthShell;
