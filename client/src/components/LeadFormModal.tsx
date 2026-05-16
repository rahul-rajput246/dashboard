import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Lead, LeadPayload } from "../types/lead";
import { leadSources, leadStatuses } from "../utils/constants";

interface LeadFormModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  initialLead?: Lead | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (payload: LeadPayload) => Promise<void>;
}

const fieldClasses =
  "w-full rounded-2xl border border-moss/15 bg-sand px-4 py-3 text-sm text-ink outline-none transition focus:border-moss";

const LeadFormModal = ({
  isOpen,
  mode,
  initialLead,
  isSubmitting,
  onClose,
  onSubmit,
}: LeadFormModalProps) => {
  const { register, handleSubmit, reset } = useForm<LeadPayload>({
    defaultValues: {
      name: "",
      email: "",
      source: "Website",
      status: "New",
    },
  });

  useEffect(() => {
    if (initialLead) {
      reset({
        name: initialLead.name,
        email: initialLead.email,
        source: initialLead.source,
        status: initialLead.status,
      });
      return;
    }

    reset({
      name: "",
      email: "",
      source: "Website",
      status: "New",
    });
  }, [initialLead, reset]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/40 p-3 backdrop-blur-sm sm:flex sm:items-center sm:justify-center sm:p-4">
      <div className="mx-auto w-full max-w-xl rounded-[24px] bg-white p-4 shadow-panel sm:rounded-[32px] sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/45 sm:text-xs sm:tracking-[0.24em]">
              {mode === "create" ? "New Lead" : "Edit Lead"}
            </p>
            <h3 className="mt-2 font-display text-2xl leading-tight text-ink sm:text-3xl">
              {mode === "create" ? "Capture a fresh opportunity" : "Refine the lead details"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="self-start text-sm font-semibold text-ink/55"
          >
            Close
          </button>
        </div>

        <form
          className="mt-6 space-y-4"
          onSubmit={handleSubmit(async (values) => {
            await onSubmit(values);
          })}
        >
          <input
            {...register("name", { required: true })}
            placeholder="Lead name"
            className={fieldClasses}
          />
          <input
            {...register("email", { required: true })}
            placeholder="Lead email"
            type="email"
            className={fieldClasses}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <select {...register("source", { required: true })} className={fieldClasses}>
              {leadSources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
            <select {...register("status", { required: true })} className={fieldClasses}>
              {leadStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-full border border-moss/20 px-5 py-3 text-sm font-semibold text-ink sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-moss disabled:opacity-50 sm:w-auto"
            >
              {isSubmitting ? "Saving..." : mode === "create" ? "Create Lead" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadFormModal;
