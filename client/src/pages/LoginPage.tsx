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
      password: "Admin@123",
    },
  });

  return (
    <AuthShell
      title="Lead management with a little more personality."
      subtitle="Use the seeded admin account or register your own sales user. The layout is optimized for both desktop work and quick mobile checks."
      accent="Default admin: admin@smartleads.local / Admin@123"
    >
      <div className="w-full max-w-md rounded-[24px] bg-white p-5 shadow-panel sm:rounded-[32px] sm:p-7">
        <p className="text-[11px] uppercase tracking-[0.2em] text-ink/45 sm:text-xs sm:tracking-[0.24em]">
          Welcome back
        </p>
        <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">Login</h2>
        <p className="mt-3 text-sm leading-6 text-ink/65">
          Sign in to manage leads, review pipeline activity, and keep your team organized from any
          screen size.
        </p>
        <form
          className="mt-6 space-y-3 sm:space-y-4"
          onSubmit={handleSubmit(async (values) => {
            try {
              const response = await login(values);
              setAuth(response.user, response.token);
              toast.success("Logged in successfully");
              navigate((location.state as { from?: string } | null)?.from || "/");
            } catch (error) {
              toast.error("Login failed. Check your credentials.");
            }
          })}
        >
          <input
            {...register("email", { required: true })}
            className="w-full rounded-2xl border border-moss/15 bg-sand px-4 py-3.5 text-sm outline-none transition focus:border-moss"
            placeholder="Email address"
            type="email"
          />
          <input
            {...register("password", { required: true })}
            className="w-full rounded-2xl border border-moss/15 bg-sand px-4 py-3.5 text-sm outline-none transition focus:border-moss"
            placeholder="Password"
            type="password"
          />
          <button
            type="submit"
            disabled={formState.isSubmitting}
            className="w-full rounded-full bg-ink px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-moss disabled:opacity-50"
          >
            {formState.isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="mt-5 text-center text-sm leading-6 text-ink/65 sm:text-left">
          Need an account?{" "}
          <Link to="/register" className="font-semibold text-moss">
            Create one
          </Link>
        </p>
      </div>
    </AuthShell>
  );
};

export default LoginPage;
