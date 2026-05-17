import type { ReactNode } from "react";
import { BarChart3, ShieldCheck, Sparkles } from "lucide-react";

interface AuthShellProps {
  title: string;
  subtitle: string;
  accent: string;
  children: ReactNode;
}

const AuthShell = ({
  title,
  subtitle,
  accent,
  children,
}: AuthShellProps) => (
  <div className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-violet-50 to-cyan-50 px-3 py-3 sm:px-5 sm:py-5 lg:px-8 lg:py-8">
    {/* BACKGROUND BLUR */}
    <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />
    <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

    <div className="relative mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-7xl overflow-hidden rounded-[32px] border border-white/60 bg-white/70 shadow-[0_20px_80px_rgba(0,0,0,0.08)] backdrop-blur-2xl sm:min-h-[calc(100vh-2.5rem)] lg:grid-cols-[1.05fr_0.95fr]">
      {/* LEFT SIDE */}
      <section className="relative hidden flex-col overflow-hidden bg-slate-950 p-6 text-white sm:p-8 lg:flex lg:p-10 xl:p-14">
        {/* DECORATIVE */}
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative z-10">
          {/* LOGO */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 shadow-lg shadow-violet-500/30">
              <BarChart3 size={28} />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">
                Smart Leads
              </p>

              <h2 className="mt-1 text-2xl font-semibold">
                Dashboard
              </h2>
            </div>
          </div>

          {/* HERO */}
          <div className="mt-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-200">
              <Sparkles size={14} />
              Internship Assignment Project
            </span>

            <h1 className="mt-6 max-w-xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl xl:text-6xl">
              {title}
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              {subtitle}
            </p>
          </div>

          {/* FEATURE CARD */}
          <div className="mt-10 rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-violet-500/15 p-3 text-violet-300">
                <ShieldCheck size={22} />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-violet-300">
                  Why This Project Stands Out
                </p>

                <h3 className="mt-2 text-2xl font-semibold leading-tight text-white">
                  {accent}
                </h3>

                <p className="mt-4 max-w-lg text-sm leading-7 text-white/70">
                  Built with authentication, role-based access,
                  responsive UI, protected routes, debounced
                  search, filtering, pagination, CSV export,
                  Docker support, and deployment-ready
                  architecture.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="relative z-10 mt-8 flex flex-wrap gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.16em] text-white/45">
              Frontend
            </p>

            <p className="mt-1 text-sm font-medium">
              React + TypeScript
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.16em] text-white/45">
              Backend
            </p>

            <p className="mt-1 text-sm font-medium">
              Node + Express
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.16em] text-white/45">
              Database
            </p>

            <p className="mt-1 text-sm font-medium">
              MongoDB Atlas
            </p>
          </div>
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="relative flex min-h-screen items-center justify-center bg-white/70 p-4 sm:p-6 lg:min-h-0 lg:bg-white/40 lg:p-10">
        <div className="w-full max-w-md lg:max-w-lg">
          {children}
        </div>
      </section>
    </div>
  </div>
);

export default AuthShell;