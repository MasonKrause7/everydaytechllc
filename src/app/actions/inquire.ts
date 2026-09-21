"use server";

import { createClient } from "@/lib/supabase/server";

export type InquireState = {
  ok: boolean;
  message: string;
};

export async function submitInquiry(
  _prev: InquireState,
  formData: FormData,
): Promise<InquireState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const projectType = String(formData.get("project_type") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return {
      ok: false,
      message: "Name, email, and a short project description are required.",
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("project_inquiries").insert({
    name,
    email,
    company: company || null,
    project_type: projectType || null,
    message,
  });

  if (error) {
    console.error("project_inquiries insert failed:", error.message);
    return {
      ok: false,
      message: "Something went wrong submitting your idea. Please try again.",
    };
  }

  return {
    ok: true,
    message: "Got it — I’ll follow up soon to talk through next steps.",
  };
}
