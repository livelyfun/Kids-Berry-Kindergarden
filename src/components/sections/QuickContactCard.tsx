"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import { getSiteConfig } from "@/data/site-data";

export function QuickContactCard() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("General Question");
  const [message, setMessage] = useState("");

  const site = getSiteConfig();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  const whatsappUrl = `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(
    `Namaste Kids Berry Kindergarten School! Name: ${name || "Parent"} (${
      phone || "N/A"
    }) — ${subject}: ${message || "I would like to connect with the school."}`,
  )}`;

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-[2rem] border border-[#26A69A]/25 bg-white p-8 text-center shadow-warm">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#26A69A]/15 text-[#26A69A]">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-4 text-[1.35rem] font-semibold leading-[1.28] text-[#2D3436] sm:text-[1.55rem]">
          Message Preview Ready
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#78909C]">
          This contact form is a frontend UI preview for now. You can send your
          note immediately via WhatsApp or call our office directly.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#26A69A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#26A69A]/90"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Send on WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => {
              setSent(false);
              setName("");
              setPhone("");
              setMessage("");
            }}
            className="rounded-full border border-[#2D3436]/15 px-5 py-3 text-sm font-semibold text-[#2D3436] hover:bg-[#FFF1EB]"
          >
            Reset Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full flex-col justify-between rounded-[2rem] border border-[#E91E63]/15 bg-white p-6 shadow-warm sm:p-8"
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[1.35rem] font-semibold leading-[1.28] text-[#2D3436] sm:text-[1.55rem]">
            Send Us a Quick Note
          </h3>
          <span className="rounded-full bg-[#FFF1EB] px-3 py-1 text-xs font-semibold text-[#E91E63]">
            Frontend UI
          </span>
        </div>
        <p className="mt-1.5 text-sm text-[#78909C]">
          Have a question about timings, age placement, or visiting hours?
        </p>

        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="contact-name"
                className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#2D3436]"
              >
                Your Name *
              </label>
              <input
                id="contact-name"
                type="text"
                required
                placeholder="Parent name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-3 text-sm text-[#2D3436] focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
              />
            </div>
            <div>
              <label
                htmlFor="contact-phone"
                className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#2D3436]"
              >
                Phone / WhatsApp *
              </label>
              <input
                id="contact-phone"
                type="tel"
                required
                placeholder="+977 98XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-3 text-sm text-[#2D3436] focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-subject"
              className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#2D3436]"
            >
              Topic
            </label>
            <select
              id="contact-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-3 text-sm text-[#2D3436] focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
            >
              <option>General Question</option>
              <option>Book a Campus Tour</option>
              <option>Regular Class (9:00 AM – 3:00 PM)</option>
              <option>
                Daycare &amp; After-Class Care (3:00 PM – 5:00 PM)
              </option>
              <option>Weekly Food Menu &amp; Facilities</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="contact-msg"
              className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#2D3436]"
            >
              Message *
            </label>
            <textarea
              id="contact-msg"
              rows={4}
              required
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-2xl border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-3 text-sm text-[#2D3436] focus:border-[#E91E63] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E91E63]/20"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E91E63] px-6 py-3.5 text-sm font-semibold text-white shadow-warm transition-all hover:-translate-y-0.5 hover:bg-[#E91E63]/90"
      >
        <Send className="h-4 w-4" />
        <span>Preview Message</span>
      </button>
    </form>
  );
}
