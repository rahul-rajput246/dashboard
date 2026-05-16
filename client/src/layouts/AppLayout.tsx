import type { ReactNode } from "react";
import { BarChart3, LogOut, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-hero-grid px-3 py-3 sm:px-4 sm:py-5 md:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-[1600px] gap-4 sm:min-h-[calc(100vh-2.5rem)] sm:gap-6 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)] 2xl:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="rounded-[28px] bg-ink px-4 py-5 text-white shadow-panel sm:rounded-[36px] sm:px-6 sm:py-7 lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)] lg:overflow-y-auto">
          <div className="rounded-[24px] bg-white/8 p-4 sm:rounded-[28px] sm:p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-mint p-3 text-moss">
                <BarChart3 size={22} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-white/55">Smart Leads</p>
                <p className="font-display text-2xl">Dashboard</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-white/72">
              A responsive lead pipeline built to match the assignment while still feeling premium
              and practical.
            </p>
          </div>

          <div className="mt-5 rounded-[24px] border border-white/10 bg-white/5 p-4 sm:mt-6 sm:rounded-[28px] sm:p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/45">Signed In As</p>
            <p className="mt-3 break-words text-lg font-semibold sm:text-xl">{user?.name}</p>
            <p className="mt-1 break-all text-sm text-white/65">{user?.email}</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-mint">
              <ShieldCheck size={14} />
              {user?.role}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <LogOut size={16} />
            Logout
          </button>
        </aside>

        <main className="min-w-0 self-start">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
