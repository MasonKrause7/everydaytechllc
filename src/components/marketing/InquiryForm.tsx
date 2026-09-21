"use client";

import { useActionState } from "react";
import {
  submitInquiry,
  type InquireState,
} from "@/app/actions/inquire";

const initialState: InquireState = { ok: false, message: "" };

export function InquiryForm() {
  const [state, formAction, pending] = useActionState(
    submitInquiry,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" name="name" required autoComplete="name" />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Company" name="company" autoComplete="organization" />
        <div>
          <label
            htmlFor="project_type"
            className="mb-2 block text-sm font-medium text-ink"
          >
            What do you need?
          </label>
          <select
            id="project_type"
            name="project_type"
            defaultValue=""
            className="w-full rounded-md border border-line bg-surface-elevated px-3.5 py-2.5 text-ink outline-none transition focus:border-accent"
          >
            <option value="" disabled>
              Select one
            </option>
            <option value="website">Website</option>
            <option value="app">App</option>
            <option value="ai">AI integration</option>
            <option value="msp">MSP custom coding</option>
            <option value="other">Something else</option>
          </select>
        </div>
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-ink"
        >
          Tell me about the project
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What are you trying to improve? Any deadlines or constraints I should know?"
          className="w-full rounded-md border border-line bg-surface-elevated px-3.5 py-2.5 text-ink outline-none transition placeholder:text-muted/70 focus:border-accent"
        />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Sending…" : "Submit project idea"}
        </button>
        {state.message ? (
          <p
            role="status"
            className={`text-sm ${state.ok ? "text-accent-deep" : "text-red-700"}`}
          >
            {state.message}
          </p>
        ) : (
          <p className="text-sm text-muted">
            No pitch deck required — a clear problem is enough.
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-ink">
        {label}
        {required ? "" : " (optional)"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-md border border-line bg-surface-elevated px-3.5 py-2.5 text-ink outline-none transition focus:border-accent"
      />
    </div>
  );
}
