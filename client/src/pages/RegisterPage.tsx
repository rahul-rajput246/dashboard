import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthShell from "../components/AuthShell";
import { register as registerUser } from "../services/authService";
import { useAuthStore } from "../store/authStore";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { register, handleSubmit, formState } = useForm<RegisterForm>();

 return (
  <AuthShell
    title="Create your Smart Leads workspace."
    subtitle="Register a sales account, access the dashboard instantly, and manage your pipeline through a modern CRM-inspired experience."
    accent="All newly registered accounts are automatically assigned the sales role."
  >
    <div className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/60 bg-white/75 p-5 shadow-[0_15px_60px_rgba(0,0,0,0.08)] backdrop-blur-2xl sm:p-7">
      {/* Decorative Gradient */}
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-300/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-cyan-200/20 blur-3xl" />

      <div className="relative z-10">
        {/* TOP */}
        <div>
          <span className="inline-flex rounded-full bg-violet-100 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-700">
            Create Account
          </span>

          <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Register
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-[15px]">
            Set up your account and start managing leads, tracking
            opportunities, and organizing your workflow through a clean,
            responsive dashboard.
          </p>
        </div>

        {/* INFO BOX */}
        <div className="mt-6 rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 to-indigo-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
            Role Information
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-700">
            Every newly created account is assigned the{" "}
            <span className="font-semibold text-violet-700">
              sales
            </span>{" "}
            role by default.
          </p>
        </div>

        {/* FORM */}
        <form
          className="mt-7 space-y-4"
          onSubmit={handleSubmit(async (values) => {
            try {
              const response = await registerUser(values);

              setAuth(response.user, response.token);

              toast.success("Account created successfully");

              navigate("/");
            } catch {
              toast.error(
                "Registration failed. Try another email."
              );
            }
          })}
        >
          {/* NAME */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <input
              {...register("name", { required: true })}
              className="h-14 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 text-sm text-slate-800 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              placeholder="Enter your full name"
            />
          </div>

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
              {...register("password", {
                required: true,
                minLength: 6,
              })}
              className="h-14 w-full rounded-2xl border border-slate-200 bg-white/90 px-4 text-sm text-slate-800 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
              placeholder="Create a secure password"
              type="password"
            />
          </div>

          {/* PASSWORD NOTE */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-sm leading-6 text-slate-600">
              Passwords should contain at least{" "}
              <span className="font-semibold text-slate-800">
                6 characters
              </span>{" "}
              for better security.
            </p>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={formState.isSubmitting}
            className="flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-violet-500/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {formState.isSubmitting
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-violet-600 transition hover:text-violet-700"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  </AuthShell>
);
};

export default RegisterPage;
