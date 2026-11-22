"use client";

import { useState, type FormEvent } from "react";
import {
  CheckCircle2,
  Loader2,
  MessageCircle,
  Send,
  Sparkles,
} from "lucide-react";
import type { ProgramItem } from "@/types/cms";

interface AdmissionInquiryFormProps {
  programs: ProgramItem[];
  whatsappNumber: string;
  schoolName: string;
}

interface InquiryState {
  parentName: string;
  phone: string;
  email: string;
  childName: string;
  childAge: string;
  program: string;
  visitDate: string;
  message: string;
}

export function AdmissionInquiryForm({
  programs,
  whatsappNumber,
  schoolName,
}: AdmissionInquiryFormProps) {
  const defaultProgram = programs[0]
    ? `${programs[0].title} (${programs[0].ageGroup})`
    : "Playgroup (1.8 – 2.5 Years)";

  const initialState: InquiryState = {
    parentName: "",
    phone: "",
    email: "",
    childName: "",
    childAge: "",
    program: defaultProgram,
    visitDate: "",
    message: "",
  };

  const [form, setForm] = useState<InquiryState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName: form.parentName,
          phone: form.phone,
          email: form.email,
          childName: form.childName,
          childAge: form.childAge,
          program: form.program,
          preferredDate: form.visitDate,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Unable to submit inquiry.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Network error while submitting your inquiry.");
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappPrefillUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Namaste ${schoolName}! Parent: ${form.parentName || "Parent"}, Child: ${
      form.childName || "Child"
    } (${form.childAge || "Age N/A"}), Interested in: ${form.program}. Phone: ${
      form.phone || "N/A"
    }. ${form.message ? `Notes: ${form.message}` : ""}`,
  )}`;

  if (submitted) {
    return (
      <div className="rounded-[2rem] border border-[#26A69A]/25 bg-white p-8 text-center shadow-warm sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#26A69A]/15 text-[#26A69A]">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h3 className="mt-5 text-[1.35rem] font-semibold leading-[1.28] text-[#2D3436] sm:text-[1.55rem]">
          Tour Inquiry Submitted!
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#78909C]">
          Thank you,{" "}
          <strong className="text-[#2D3436]">
            {form.parentName || "Parent"}
          </strong>
          ! Your inquiry for{" "}
          <strong className="text-[#E91E63]">
            {form.childName || "your child"}
          </strong>{" "}
          ({form.program}) has been saved. Our admissions coordinator will
          contact you shortly.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={whatsappPrefillUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#26A69A] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#26A69A]/90"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Chat Immediately on WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setForm(initialState);
            }}
            className="inline-flex items-center gap-2 rounded-full border border-[#2D3436]/15 bg-[#FFF8F5] px-6 py-3 text-sm font-semibold text-[#2D3436] transition-colors hover:bg-[#FFF1EB]"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-[#E91E63]/15 bg-white p-6 shadow-warm sm:p-10"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2D3436]/8 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E91E63]">
            <Sparkles className="h-3.5 w-3.5" />
            Admission &amp; Tour Inquiry
          </span>
          <h3 className="mt-1 text-[1.35rem] font-semibold leading-[1.28] text-[#2D3436] sm:text-[1.55rem]">
            Request a Campus Visit or Seat Info
          </h3>
        </div>
        <span className="rounded-full bg-[#26A69A]/12 px-3.5 py-1 text-xs font-semibold text-[#26A69A]">
          Online Inquiry
        </span>
      </div>

      {error && (
        <p className="mt-4 rounded-2xl bg-[#FF6B81]/12 px-4 py-3 text-xs font-medium text-[#E91E63]">
          {error}
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="parentName"
            className="mb-1.5 block text-sm font-semibold text-[#2D3436]"
          >
            Parent / Guardian Name <span className="text-[#E91E63]">*</span>
          </label>
          <input
            id="parentName"
            type="text"
            required
            placeholder="e.g., Sarita Yadav"
            value={form.parentName}
            onChange={(e) => setForm({ ...form, parentName: e.target.value })}
            className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-3 text-sm text-[#2D3436] placeholder:text-[#78909C]/60 focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-1.5 block text-sm font-semibold text-[#2D3436]"
          >
            Phone / WhatsApp Number <span className="text-[#E91E63]">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            required
            placeholder="e.g., +977 98XXXXXXXX"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-3 text-sm text-[#2D3436] placeholder:text-[#78909C]/60 focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-semibold text-[#2D3436]"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="parent@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-3 text-sm text-[#2D3436] placeholder:text-[#78909C]/60 focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
          />
        </div>

        <div>
          <label
            htmlFor="childName"
            className="mb-1.5 block text-sm font-semibold text-[#2D3436]"
          >
            Child&rsquo;s Full Name <span className="text-[#E91E63]">*</span>
          </label>
          <input
            id="childName"
            type="text"
            required
            placeholder="e.g., Aarav Yadav"
            value={form.childName}
            onChange={(e) => setForm({ ...form, childName: e.target.value })}
            className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-3 text-sm text-[#2D3436] placeholder:text-[#78909C]/60 focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
          />
        </div>

        <div>
          <label
            htmlFor="childAge"
            className="mb-1.5 block text-sm font-semibold text-[#2D3436]"
          >
            Child&rsquo;s Age / Date of Birth{" "}
            <span className="text-[#E91E63]">*</span>
          </label>
          <input
            id="childAge"
            type="text"
            required
            placeholder="e.g., 3 years 2 months"
            value={form.childAge}
            onChange={(e) => setForm({ ...form, childAge: e.target.value })}
            className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-3 text-sm text-[#2D3436] placeholder:text-[#78909C]/60 focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
          />
        </div>

        <div>
          <label
            htmlFor="program"
            className="mb-1.5 block text-sm font-semibold text-[#2D3436]"
          >
            Program of Interest
          </label>
          <select
            id="program"
            value={form.program}
            onChange={(e) => setForm({ ...form, program: e.target.value })}
            className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-3 text-sm text-[#2D3436] focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
          >
            {programs.map((p) => (
              <option key={p.id} value={`${p.title} (${p.ageGroup})`}>
                {p.title} ({p.ageGroup})
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="visitDate"
            className="mb-1.5 block text-sm font-semibold text-[#2D3436]"
          >
            Preferred Campus Visit Day (Sunday – Friday)
          </label>
          <input
            id="visitDate"
            type="date"
            value={form.visitDate}
            onChange={(e) => setForm({ ...form, visitDate: e.target.value })}
            className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-3 text-sm text-[#2D3436] focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="mb-1.5 block text-sm font-semibold text-[#2D3436]"
          >
            Questions or Notes for Our Admissions Coordinator
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Share anything helpful about your child's personality, transport needs, or preferred tour time..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-3 text-sm text-[#2D3436] placeholder:text-[#78909C]/60 focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
          />
        </div>
      </div>

      <div className="mt-7 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-xs text-[#78909C]">
          No entrance test required • Friendly campus tours available Sun–Fri.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E91E63] px-8 py-3.5 text-sm font-semibold text-white shadow-warm transition-all hover:-translate-y-0.5 hover:bg-[#E91E63]/90 disabled:opacity-60 sm:w-auto"
        >
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          <span>{submitting ? "Submitting..." : "Submit Inquiry"}</span>
        </button>
      </div>
    </form>
  );
}
