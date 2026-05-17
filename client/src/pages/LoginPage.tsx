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
    accent="Demo Admin: admin@smartleads.local / Rahul@2005"
  >
    <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/60 bg-white/75 p-5 shadow-[0_15px_60px_rgba(0,0,0,0.08)] backdrop-blur-2xl sm:p-7">
      {/* Decorative Gradient */}
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-300/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-cyan-200/20 blur-3xl" />

      <div className="relative z-10">
        {/* TOP */}
        <div>
          <span className="inline-flex rounded-full bg-violet-100 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-700">
            Welcome Back
          </span>

          <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Login
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-[15px]">
            Sign in to access your lead pipeline, manage customer
            interactions, and monitor sales activity from anywhere.
          </p>
        </div>

        {/* DEMO BOX */}
        <div className="mt-6 rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 to-indigo-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
            Demo Access
          </p>

          <div className="mt-3 space-y-1 text-sm text-slate-700">
            <p>
              <span className="font-semibold">Email:</span>{" "}
              admin@smartleads.local
            </p>

            <p>
              <span className="font-semibold">Password:</span>{" "}
              Rahul@2005
            </p>
          </div>
        </div>

        {/* FORM */}
        <form
          className="mt-7 space-y-4"
          onSubmit={handleSubmit(async (values) => {
            try {
              const response = await login(values);

              setAuth(response.user, response.token);

              toast.success("Logged in successfully");

              navigate(
                (location.state as { from?: string } | null)?.from || "/"
              );
            } catch (error) {
              toast.error("Login failed. Check your credentials.");
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
              placeholder="Enter your email"
              type="email"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

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
            {formState.isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="mt-6 text-center text-sm text-slate-600">
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
  </AuthShell>
);
};

export default LoginPage;
