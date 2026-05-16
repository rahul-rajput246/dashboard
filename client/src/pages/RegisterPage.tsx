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
      title="Create a polished dashboard account in seconds."
      subtitle="The assignment needs registration, hashed passwords, and role-based access. This screen keeps that flow simple and mobile friendly."
      accent="Every self-registered account is created as a sales user."
    >
      <div className="w-full max-w-md rounded-[24px] bg-white p-5 shadow-panel sm:rounded-[32px] sm:p-7">
        <p className="text-[11px] uppercase tracking-[0.2em] text-ink/45 sm:text-xs sm:tracking-[0.24em]">
          Set up your access
        </p>
        <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">Register</h2>
        <p className="mt-3 text-sm leading-6 text-ink/65">
          Create your sales account and jump straight into the dashboard without fighting the layout
          on smaller screens.
        </p>
        <form
          className="mt-6 space-y-3 sm:space-y-4"
          onSubmit={handleSubmit(async (values) => {
            try {
              const response = await registerUser(values);
              setAuth(response.user, response.token);
              toast.success("Account created");
              navigate("/");
            } catch {
              toast.error("Registration failed. Try a different email.");
            }
          })}
        >
          <input
            {...register("name", { required: true })}
            className="w-full rounded-2xl border border-moss/15 bg-sand px-4 py-3.5 text-sm outline-none transition focus:border-moss"
            placeholder="Full name"
          />
          <input
            {...register("email", { required: true })}
            className="w-full rounded-2xl border border-moss/15 bg-sand px-4 py-3.5 text-sm outline-none transition focus:border-moss"
            placeholder="Email address"
            type="email"
          />
          <input
            {...register("password", { required: true, minLength: 6 })}
            className="w-full rounded-2xl border border-moss/15 bg-sand px-4 py-3.5 text-sm outline-none transition focus:border-moss"
            placeholder="Password"
            type="password"
          />
          <div className="rounded-2xl border border-moss/15 bg-mint px-4 py-3 text-sm leading-6 text-ink/75">
            New accounts are created with the <span className="font-semibold">sales</span> role.
          </div>
          <button
            type="submit"
            disabled={formState.isSubmitting}
            className="w-full rounded-full bg-ink px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-moss disabled:opacity-50"
          >
            {formState.isSubmitting ? "Creating..." : "Create Account"}
          </button>
        </form>
        <p className="mt-5 text-center text-sm leading-6 text-ink/65 sm:text-left">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-moss">
            Sign in
          </Link>
        </p>
      </div>
    </AuthShell>
  );
};

export default RegisterPage;
