import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthShell from "../components/AuthShell";
import { login } from "../services/authService";
import { useAuthStore } from "../store/authStore";

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { register, handleSubmit, formState } = useForm<LoginForm>({
    defaultValues: {
      email: "admin@smartleads.local",
      password: "Rahul@2005",
    },
  });

  return (
  <AuthShell
    title="Lead management with a modern sales experience."
    subtitle="Track prospects, manage pipeline activity, and organize your workflow through a clean and responsive dashboard built with the MERN stack."
    accent="Demo Admin Access Included"
  >
    <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.08)] backdrop-blur-2xl sm:p-8">
      {/* DECORATIVE BLUR */}
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-300/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-cyan-300/20 blur-3xl" />

      <div className="relative z-10">
        {/* HEADER */}
        <div>
          <span className="inline-flex items-center rounded-full bg-violet-100 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-700">
            Welcome Back
          </span>

          <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Login
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-[15px]">
            Access your dashboard, manage leads, track conversions,
            and organize your pipeline from anywhere.
          </p>
        </div>

        {/* DEMO ACCESS */}
        <div className="mt-7 rounded-[24px] border border-violet-100 bg-gradient-to-r from-violet-50 to-indigo-50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
                Demo Credentials
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Use the seeded admin account
              </p>
            </div>

            <div className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-700">
              Admin
            </div>
          </div>

          <div className="mt-4 space-y-2 rounded-2xl bg-white/70 p-4">
            <p className="text-sm text-slate-700">
              <span className="font-semibold text-slate-900">
                Email:
              </span>{" "}
              admin@smartleads.local
            </p>

            <p className="text-sm text-slate-700">
              <span className="font-semibold text-slate-900">
                Password:
              </span>{" "}
              Rahul@2005
            </p>
          </div>
        </div>

        {/* FORM */}
        <form
          className="mt-8 space-y-5"
          onSubmit={handleSubmit(async (values) => {
            try {
              const response = await login(values);

              setAuth(response.user, response.token);

              toast.success("Logged in successfully");

              navigate(
                (location.state as { from?: string } | null)?.from || "/"
              );
            } catch (error) {
              toast.error(
                "Login failed. Check your credentials."
              );
            }
          })}
        >
          {/* EMAIL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <input
              {...register("email", { required: true })}
              className="h-14 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 text-sm text-slate-800 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              placeholder="Enter your email address"
              type="email"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">
                Password
              </label>

              <button
                type="button"
                className="text-xs font-medium text-violet-600 transition hover:text-violet-700"
              >
                Forgot Password?
              </button>
            </div>

            <input
              {...register("password", { required: true })}
              className="h-14 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 text-sm text-slate-800 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              placeholder="Enter your password"
              type="password"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={formState.isSubmitting}
            className="flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {formState.isSubmitting
              ? "Signing In..."
              : "Sign In"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-7 border-t border-slate-200 pt-5">
          <p className="text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-violet-600 transition hover:text-violet-700"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  </AuthShell>
);
};

export default LoginPage;
