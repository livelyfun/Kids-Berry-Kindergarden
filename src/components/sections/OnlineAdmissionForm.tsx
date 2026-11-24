"use client";

import { useState, type FormEvent } from "react";
import {
  CheckCircle2,
  ExternalLink,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  Loader2,
  MessageCircle,
  Paperclip,
  Send,
  Upload,
  X,
} from "lucide-react";
import type { ProgramItem } from "@/types/cms";

interface OnlineAdmissionFormProps {
  programs: ProgramItem[];
  whatsappNumber: string;
  schoolName: string;
}

interface UploadedDocSlot {
  key: string;
  label: string;
  required: boolean;
  accept: string;
  hint: string;
}

interface SubmittedDocValue {
  key: string;
  label: string;
  url: string;
  fileType: "image" | "pdf" | "file";
  fileName: string;
}

const DOCUMENT_SLOTS: UploadedDocSlot[] = [
  {
    key: "child_photo",
    label: "Child's Passport-Size Photograph",
    required: false,
    accept: "image/*",
    hint: "Upload clear photo of the student (JPG / PNG)",
  },
  {
    key: "birth_certificate",
    label: "Child's Birth Registration Certificate",
    required: false,
    accept: "image/*,.pdf,application/pdf",
    hint: "Upload photo or PDF scan of Ward / Municipality birth certificate",
  },
  {
    key: "immunization_card",
    label: "Immunization / Vaccination Card",
    required: false,
    accept: "image/*,.pdf,application/pdf",
    hint: "Upload vaccination record photo or PDF",
  },
  {
    key: "guardian_id",
    label: "Parent / Guardian Citizenship or ID",
    required: false,
    accept: "image/*,.pdf,application/pdf",
    hint: "For verified safe pickup authorization (Image or PDF)",
  },
  {
    key: "previous_school_doc",
    label: "Previous School Progress / Transfer Note (Optional)",
    required: false,
    accept: "image/*,.pdf,application/pdf",
    hint: "Applicable if transferring into LKG, UKG, Grade 1, or Grade 2",
  },
];

interface FormState {
  childName: string;
  childDob: string;
  childAge: string;
  childGender: string;
  program: string;
  preferredCare: string;
  transportRequired: boolean;
  mealsRequired: boolean;
  previousSchool: string;
  medicalNotes: string;
  parentName: string;
  relation: string;
  phone: string;
  secondaryPhone: string;
  email: string;
  address: string;
  message: string;
}

export function OnlineAdmissionForm({
  programs,
  whatsappNumber,
  schoolName,
}: OnlineAdmissionFormProps) {
  const defaultProgram = programs[0]
    ? `${programs[0].title} (${programs[0].ageGroup})`
    : "Playgroup (1.8 – 2.5 Years)";

  const initialForm: FormState = {
    childName: "",
    childDob: "",
    childAge: "",
    childGender: "Girl",
    program: defaultProgram,
    preferredCare: "Regular Class (9:00 AM – 3:00 PM)",
    transportRequired: false,
    mealsRequired: true,
    previousSchool: "",
    medicalNotes: "",
    parentName: "",
    relation: "Mother",
    phone: "",
    secondaryPhone: "",
    email: "",
    address: "",
    message: "",
  };

  const [form, setForm] = useState<FormState>(initialForm);
  const [docs, setDocs] = useState<Record<string, SubmittedDocValue>>({});
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const [slotError, setSlotError] = useState<Record<string, string>>({});
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleFileUpload = async (slot: UploadedDocSlot, file: File) => {
    setUploadingSlot(slot.key);
    setSlotError((prev) => ({ ...prev, [slot.key]: "" }));
    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/admissions/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok || !data?.url) {
        setSlotError((prev) => ({
          ...prev,
          [slot.key]:
            data?.error || "Upload failed. Please try a smaller image or PDF.",
        }));
      } else {
        setDocs((prev) => ({
          ...prev,
          [slot.key]: {
            key: slot.key,
            label: slot.label,
            url: String(data.url),
            fileType:
              data.fileType === "image" || data.fileType === "pdf"
                ? data.fileType
                : "file",
            fileName: String(data.fileName || file.name),
          },
        }));
      }
    } catch {
      setSlotError((prev) => ({
        ...prev,
        [slot.key]: "Network error while uploading document.",
      }));
    } finally {
      setUploadingSlot(null);
    }
  };

  const handleRemoveDoc = (key: string) => {
    setDocs((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (uploadingSlot) {
      setError("Please wait for your document upload to finish before submitting.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const documentsPayload = Object.values(docs).filter((d) => Boolean(d.url));
      const res = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          documents: documentsPayload,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Unable to submit admission application.");
      } else {
        setSubmittedId(String(data.id || "RECEIVED"));
      }
    } catch {
      setError("Network error while submitting admission form.");
    } finally {
      setSubmitting(false);
    }
  };

  const uploadedList = Object.values(docs).filter((d) => Boolean(d.url));
  const whatsappPrefillUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Namaste ${schoolName}! I have submitted the Online Admission Form (Ref: ${
      submittedId || "New"
    }) for ${form.childName} (${form.program}). Parent: ${form.parentName}, Phone: ${
      form.phone
    }. Documents uploaded: ${uploadedList.length}.`,
  )}`;

  if (submittedId) {
    return (
      <div className="rounded-[2rem] border border-[#26A69A]/25 bg-white p-8 text-center shadow-warm sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#26A69A]/15 text-[#26A69A]">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#FFF1EB] px-3.5 py-1 text-xs font-semibold text-[#E91E63]">
          Reference ID: {submittedId.slice(-8).toUpperCase()}
        </span>
        <h3 className="mt-3 font-[family-name:var(--font-fredoka)] text-[1.45rem] font-semibold leading-[1.28] text-[#2D3436] sm:text-[1.75rem]">
          Admission Application Received!
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#78909C]">
          Thank you, <strong className="text-[#2D3436]">{form.parentName}</strong>!
          The online admission application for{" "}
          <strong className="text-[#E91E63]">{form.childName}</strong> (
          {form.program}) along with{" "}
          <strong className="text-[#26A69A]">
            {uploadedList.length} uploaded document
            {uploadedList.length === 1 ? "" : "s"}
          </strong>{" "}
          has been securely saved to our school admissions desk. We will call or
          WhatsApp you shortly to finalize orientation.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={whatsappPrefillUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#26A69A] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#26A69A]/90"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Confirm on WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => {
              setSubmittedId(null);
              setForm(initialForm);
              setDocs({});
            }}
            className="inline-flex items-center gap-2 rounded-full border border-[#2D3436]/15 bg-[#FFF8F5] px-6 py-3 text-sm font-semibold text-[#2D3436] transition-colors hover:bg-[#FFF1EB]"
          >
            Submit Another Application
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
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2D3436]/8 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E91E63]">
            <GraduationCap className="h-4 w-4" />
            Official Online Admission Form
          </span>
          <h3 className="mt-1 font-[family-name:var(--font-fredoka)] text-[1.4rem] font-semibold leading-[1.25] text-[#2D3436] sm:text-[1.7rem]">
            Student Enrollment &amp; Document Upload
          </h3>
        </div>
        <span className="rounded-full bg-[#26A69A]/12 px-3.5 py-1 text-xs font-semibold text-[#26A69A]">
          Playgroup to Grade 2
        </span>
      </div>

      {error && (
        <p className="mt-4 rounded-2xl bg-[#FF6B81]/12 px-4 py-3 text-xs font-medium text-[#E91E63]">
          {error}
        </p>
      )}

      {/* SECTION A: STUDENT DETAILS */}
      <div className="mt-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#E91E63]">
          1. Student Information
        </h4>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="adm-childName"
              className="mb-1.5 block text-xs font-semibold text-[#2D3436]"
            >
              Child&rsquo;s Full Name <span className="text-[#E91E63]">*</span>
            </label>
            <input
              id="adm-childName"
              type="text"
              required
              placeholder="e.g., Aarav Yadav"
              value={form.childName}
              onChange={(e) => setForm({ ...form, childName: e.target.value })}
              className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-2.5 text-sm text-[#2D3436] placeholder:text-[#78909C]/60 focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
            />
          </div>

          <div>
            <label
              htmlFor="adm-childDob"
              className="mb-1.5 block text-xs font-semibold text-[#2D3436]"
            >
              Date of Birth <span className="text-[#E91E63]">*</span>
            </label>
            <input
              id="adm-childDob"
              type="date"
              required
              value={form.childDob}
              onChange={(e) => setForm({ ...form, childDob: e.target.value })}
              className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-2.5 text-sm text-[#2D3436] focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
            />
          </div>

          <div>
            <label
              htmlFor="adm-childAge"
              className="mb-1.5 block text-xs font-semibold text-[#2D3436]"
            >
              Child&rsquo;s Current Age <span className="text-[#E91E63]">*</span>
            </label>
            <input
              id="adm-childAge"
              type="text"
              required
              placeholder="e.g., 3 years 4 months"
              value={form.childAge}
              onChange={(e) => setForm({ ...form, childAge: e.target.value })}
              className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-2.5 text-sm text-[#2D3436] placeholder:text-[#78909C]/60 focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
            />
          </div>

          <div>
            <label
              htmlFor="adm-childGender"
              className="mb-1.5 block text-xs font-semibold text-[#2D3436]"
            >
              Gender
            </label>
            <select
              id="adm-childGender"
              value={form.childGender}
              onChange={(e) => setForm({ ...form, childGender: e.target.value })}
              className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-2.5 text-sm text-[#2D3436] focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
            >
              <option value="Girl">Girl</option>
              <option value="Boy">Boy</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="adm-program"
              className="mb-1.5 block text-xs font-semibold text-[#2D3436]"
            >
              Applying for Class / Program{" "}
              <span className="text-[#E91E63]">*</span>
            </label>
            <select
              id="adm-program"
              value={form.program}
              onChange={(e) => setForm({ ...form, program: e.target.value })}
              className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-2.5 text-sm text-[#2D3436] focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
            >
              {programs.map((p) => (
                <option key={p.id} value={`${p.title} (${p.ageGroup})`}>
                  {p.title} ({p.ageGroup})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="adm-preferredCare"
              className="mb-1.5 block text-xs font-semibold text-[#2D3436]"
            >
              Preferred Care Schedule
            </label>
            <select
              id="adm-preferredCare"
              value={form.preferredCare}
              onChange={(e) =>
                setForm({ ...form, preferredCare: e.target.value })
              }
              className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-2.5 text-sm text-[#2D3436] focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
            >
              <option value="Regular Class (9:00 AM – 3:00 PM)">
                Regular Class (9:00 AM – 3:00 PM)
              </option>
              <option value="Full-Day Daycare (9:00 AM – 5:00 PM)">
                Full-Day Daycare (9:00 AM – 5:00 PM)
              </option>
              <option value="Regular Class + After-Class Care (3:00 PM – 5:00 PM)">
                Regular Class + After-Class Care (3:00 PM – 5:00 PM)
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="adm-prevSchool"
              className="mb-1.5 block text-xs font-semibold text-[#2D3436]"
            >
              Previous School (if transferring)
            </label>
            <input
              id="adm-prevSchool"
              type="text"
              placeholder="Optional — for LKG / UKG / Grade 1 / Grade 2"
              value={form.previousSchool}
              onChange={(e) =>
                setForm({ ...form, previousSchool: e.target.value })
              }
              className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-2.5 text-sm text-[#2D3436] placeholder:text-[#78909C]/60 focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
            />
          </div>

          <div>
            <label
              htmlFor="adm-medical"
              className="mb-1.5 block text-xs font-semibold text-[#2D3436]"
            >
              Food Allergies / Health Notes
            </label>
            <input
              id="adm-medical"
              type="text"
              placeholder="e.g., No allergies / vegetarian diet"
              value={form.medicalNotes}
              onChange={(e) =>
                setForm({ ...form, medicalNotes: e.target.value })
              }
              className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-2.5 text-sm text-[#2D3436] placeholder:text-[#78909C]/60 focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
            />
          </div>

          <div className="flex flex-wrap gap-5 pt-1 sm:col-span-2">
            <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-[#2D3436]">
              <input
                type="checkbox"
                checked={form.mealsRequired}
                onChange={(e) =>
                  setForm({ ...form, mealsRequired: e.target.checked })
                }
                className="h-4 w-4 accent-[#E91E63]"
              />
              <span>Include School Meals + Daily Hot Milk &amp; Fruits</span>
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-[#2D3436]">
              <input
                type="checkbox"
                checked={form.transportRequired}
                onChange={(e) =>
                  setForm({ ...form, transportRequired: e.target.checked })
                }
                className="h-4 w-4 accent-[#26A69A]"
              />
              <span>Need School Van Transportation Service</span>
            </label>
          </div>
        </div>
      </div>

      {/* SECTION B: PARENT / GUARDIAN DETAILS */}
      <div className="mt-7 border-t border-[#2D3436]/8 pt-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#26A69A]">
          2. Parent / Guardian Contact Information
        </h4>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="adm-parentName"
              className="mb-1.5 block text-xs font-semibold text-[#2D3436]"
            >
              Parent / Guardian Full Name{" "}
              <span className="text-[#E91E63]">*</span>
            </label>
            <input
              id="adm-parentName"
              type="text"
              required
              placeholder="e.g., Sarita Yadav"
              value={form.parentName}
              onChange={(e) => setForm({ ...form, parentName: e.target.value })}
              className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-2.5 text-sm text-[#2D3436] placeholder:text-[#78909C]/60 focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
            />
          </div>

          <div>
            <label
              htmlFor="adm-relation"
              className="mb-1.5 block text-xs font-semibold text-[#2D3436]"
            >
              Relation to Student
            </label>
            <select
              id="adm-relation"
              value={form.relation}
              onChange={(e) => setForm({ ...form, relation: e.target.value })}
              className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-2.5 text-sm text-[#2D3436] focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
            >
              <option value="Mother">Mother</option>
              <option value="Father">Father</option>
              <option value="Guardian">Guardian</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="adm-phone"
              className="mb-1.5 block text-xs font-semibold text-[#2D3436]"
            >
              Primary Phone / WhatsApp <span className="text-[#E91E63]">*</span>
            </label>
            <input
              id="adm-phone"
              type="tel"
              required
              placeholder="e.g., 98XXXXXXXX"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-2.5 text-sm text-[#2D3436] placeholder:text-[#78909C]/60 focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
            />
          </div>

          <div>
            <label
              htmlFor="adm-secPhone"
              className="mb-1.5 block text-xs font-semibold text-[#2D3436]"
            >
              Alternate / Emergency Phone
            </label>
            <input
              id="adm-secPhone"
              type="tel"
              placeholder="Optional backup contact"
              value={form.secondaryPhone}
              onChange={(e) =>
                setForm({ ...form, secondaryPhone: e.target.value })
              }
              className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-2.5 text-sm text-[#2D3436] placeholder:text-[#78909C]/60 focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
            />
          </div>

          <div>
            <label
              htmlFor="adm-email"
              className="mb-1.5 block text-xs font-semibold text-[#2D3436]"
            >
              Email Address
            </label>
            <input
              id="adm-email"
              type="email"
              placeholder="parent@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-2.5 text-sm text-[#2D3436] placeholder:text-[#78909C]/60 focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
            />
          </div>

          <div>
            <label
              htmlFor="adm-address"
              className="mb-1.5 block text-xs font-semibold text-[#2D3436]"
            >
              Residential Address <span className="text-[#E91E63]">*</span>
            </label>
            <input
              id="adm-address"
              type="text"
              required
              placeholder="e.g., Pichara, Biratnagar-11"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-2.5 text-sm text-[#2D3436] placeholder:text-[#78909C]/60 focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="adm-message"
              className="mb-1.5 block text-xs font-semibold text-[#2D3436]"
            >
              Additional Notes or Questions (Optional)
            </label>
            <textarea
              id="adm-message"
              rows={2}
              placeholder="Preferred joining month, pickup location, or questions for teachers..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-2.5 text-sm text-[#2D3436] placeholder:text-[#78909C]/60 focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
            />
          </div>
        </div>
      </div>

      {/* SECTION C: DOCUMENT UPLOADS */}
      <div className="mt-7 border-t border-[#2D3436]/8 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF7A45]">
              3. Upload Required Admission Documents
            </h4>
            <p className="mt-0.5 text-xs text-[#78909C]">
              Upload clear photos or PDFs — they will be sent straight to the
              school CMS admissions desk.
            </p>
          </div>
          <span className="rounded-full bg-[#FFF1EB] px-3 py-1 text-[11px] font-semibold text-[#E91E63]">
            {uploadedList.length} / {DOCUMENT_SLOTS.length} Uploaded
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {DOCUMENT_SLOTS.map((slot) => {
            const uploaded = docs[slot.key];
            const isUploading = uploadingSlot === slot.key;
            const errMsg = slotError[slot.key];

            return (
              <div
                key={slot.key}
                className="flex flex-col justify-between gap-3 rounded-2xl border border-[#2D3436]/10 bg-[#FFF8F5] p-3.5 sm:flex-row sm:items-center"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#2D3436]/10 bg-white">
                    {uploaded?.fileType === "image" ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={uploaded.url}
                        alt={slot.label}
                        className="h-full w-full object-cover"
                      />
                    ) : uploaded?.fileType === "pdf" ? (
                      <FileText className="h-5 w-5 text-[#E91E63]" />
                    ) : uploaded ? (
                      <Paperclip className="h-5 w-5 text-[#26A69A]" />
                    ) : slot.key === "child_photo" ? (
                      <ImageIcon className="h-5 w-5 text-[#78909C]" />
                    ) : (
                      <FileText className="h-5 w-5 text-[#78909C]" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#2D3436] sm:text-sm">
                      {slot.label}
                    </p>
                    {uploaded ? (
                      <p className="truncate text-[11px] font-medium text-[#26A69A]">
                        Uploaded: {uploaded.fileName}
                      </p>
                    ) : (
                      <p className="text-[11px] text-[#78909C]">{slot.hint}</p>
                    )}
                    {errMsg && (
                      <p className="text-[11px] font-medium text-[#E91E63]">
                        {errMsg}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  {uploaded && (
                    <>
                      <a
                        href={uploaded.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border border-[#26A69A]/30 bg-white px-3 py-1.5 text-[11px] font-semibold text-[#26A69A] hover:bg-[#26A69A] hover:text-white"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>View</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => handleRemoveDoc(slot.key)}
                        className="inline-flex items-center gap-1 rounded-full border border-[#FF6B81]/30 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[#E91E63] hover:bg-[#FFF1EB]"
                        aria-label={`Remove ${slot.label}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </>
                  )}

                  <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#26A69A] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#26A69A]/90">
                    <input
                      type="file"
                      accept={slot.accept}
                      disabled={isUploading}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleFileUpload(slot, f);
                        e.target.value = "";
                      }}
                      className="hidden"
                    />
                    {isUploading ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Upload className="h-3.5 w-3.5" />
                    )}
                    <span>
                      {isUploading
                        ? "Uploading..."
                        : uploaded
                          ? "Replace"
                          : "Upload"}
                    </span>
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={submitting || Boolean(uploadingSlot)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF7A45] via-[#FF6B81] to-[#E91E63] px-7 py-3.5 text-sm font-semibold text-white shadow-warm transition-transform duration-200 hover:-translate-y-0.5 hover:opacity-95 disabled:opacity-60"
        >
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          <span>
            {submitting
              ? "Submitting Application..."
              : "Submit Admission Application"}
          </span>
        </button>

        <a
          href={whatsappPrefillUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[#26A69A]/30 bg-[#26A69A]/10 px-6 py-3.5 text-sm font-semibold text-[#26A69A] transition-colors hover:bg-[#26A69A] hover:text-white"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Questions? Chat on WhatsApp</span>
        </a>
      </div>
    </form>
  );
}
