"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Blocks,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  ExternalLink,
  Image as ImageIcon,
  Inbox,
  LayoutDashboard,
  Layers,
  Loader2,
  LogOut,
  MessageSquareQuote,
  Pencil,
  Plus,
  Save,
  Settings,
  ShieldCheck,
  Trash2,
  Users,
  Utensils,
  X,
} from "lucide-react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type {
  AdminContactInquiry,
  AdminFacility,
  AdminFoodMenu,
  AdminGalleryImage,
  AdminInitialData,
  AdminPageSection,
  AdminProgram,
  AdminSiteSettings,
  AdminTeamMember,
  AdminTestimonial,
} from "@/types/admin";

type TabId =
  | "overview"
  | "settings"
  | "programs"
  | "facilities"
  | "menu"
  | "gallery"
  | "testimonials"
  | "team"
  | "sections"
  | "inquiries";

const ACCENT_OPTIONS = ["magenta", "orange", "teal", "coral", "olive", "blue"];
const ICON_OPTIONS = [
  "blocks",
  "bed",
  "camera",
  "apple",
  "trees",
  "handHeart",
  "sparkles",
  "heart",
  "shield",
  "sun",
  "clock",
  "book",
  "palette",
  "music",
  "utensils",
  "smile",
  "compass",
  "calendarCheck",
  "fileCheck",
  "partyPopper",
  "users",
];

type ModalState =
  | { kind: "closed" }
  | { kind: "program"; mode: "create" | "edit"; item: Record<string, unknown> }
  | { kind: "facility"; mode: "create" | "edit"; item: Record<string, unknown> }
  | { kind: "gallery"; mode: "create" | "edit"; item: Record<string, unknown> }
  | {
      kind: "testimonial";
      mode: "create" | "edit";
      item: Record<string, unknown>;
    }
  | { kind: "team"; mode: "create" | "edit"; item: Record<string, unknown> }
  | { kind: "menu"; mode: "create" | "edit"; item: Record<string, unknown> }
  | { kind: "section"; mode: "create" | "edit"; item: Record<string, unknown> };

interface AdminDashboardClientProps {
  adminBasePath: string;
  user: { username: string; name: string };
  initialData: AdminInitialData;
}

export function AdminDashboardClient({
  adminBasePath,
  user,
  initialData,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [toast, setToast] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [settings, setSettings] = useState<AdminSiteSettings | null>(
    initialData.settings,
  );
  const [programs, setPrograms] = useState<AdminProgram[]>(initialData.programs);
  const [facilities, setFacilities] = useState<AdminFacility[]>(
    initialData.facilities,
  );
  const [gallery, setGallery] = useState<AdminGalleryImage[]>(
    initialData.gallery,
  );
  const [testimonials, setTestimonials] = useState<AdminTestimonial[]>(
    initialData.testimonials,
  );
  const [team, setTeam] = useState<AdminTeamMember[]>(initialData.team);
  const [menu, setMenu] = useState<AdminFoodMenu[]>(initialData.menu);
  const [sections, setSections] = useState<AdminPageSection[]>(
    initialData.sections,
  );
  const [inquiries, setInquiries] = useState<AdminContactInquiry[]>(
    initialData.inquiries,
  );

  const [sectionCategoryFilter, setSectionCategoryFilter] = useState("all");
  const [modal, setModal] = useState<ModalState>({ kind: "closed" });
  const [saving, setSaving] = useState(false);

  // Account password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newUsername, setNewUsername] = useState(user.username);

  const showToast = (type: "success" | "error", text: string) => {
    setToast({ type, text });
    setTimeout(() => {
      setToast((prev) => (prev?.text === text ? null : prev));
    }, 4000);
  };

  async function refreshResource(resource: string) {
    const res = await fetch(`/api/admin/${resource}`);
    if (!res.ok) return;
    const json = await res.json();
    const data = json.data;
    switch (resource) {
      case "settings":
        setSettings(data);
        break;
      case "programs":
        setPrograms(data);
        break;
      case "facilities":
        setFacilities(data);
        break;
      case "gallery":
        setGallery(data);
        break;
      case "testimonials":
        setTestimonials(data);
        break;
      case "team":
        setTeam(data);
        break;
      case "menu":
        setMenu(data);
        break;
      case "sections":
        setSections(data);
        break;
      case "inquiries":
        setInquiries(data);
        break;
    }
  }

  async function handleTogglePublish(
    resource: string,
    id: string,
    currentPublished: boolean,
  ) {
    try {
      const res = await fetch(`/api/admin/${resource}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, published: !currentPublished }),
      });
      if (!res.ok) {
        showToast("error", "Failed to update publish status.");
        return;
      }
      await refreshResource(resource);
      showToast(
        "success",
        !currentPublished ? "Published to live site." : "Unpublished from site.",
      );
    } catch {
      showToast("error", "Network error while toggling status.");
    }
  }

  async function handleDelete(resource: string, id: string, label: string) {
    if (!confirm(`Delete "${label}" permanently?`)) return;
    try {
      const res = await fetch(`/api/admin/${resource}?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        showToast("error", "Failed to delete item.");
        return;
      }
      await refreshResource(resource);
      showToast("success", `Deleted "${label}".`);
    } catch {
      showToast("error", "Network error while deleting.");
    }
  }

  async function handleSaveSettings(e: FormEvent) {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) {
        const d = await res.json();
        showToast("error", d?.error || "Failed to save site settings.");
      } else {
        await refreshResource("settings");
        showToast("success", "Site settings saved & published.");
      }
    } catch {
      showToast("error", "Network error while saving settings.");
    } finally {
      setSaving(false);
    }
  }

  async function handleModalSubmit(e: FormEvent) {
    e.preventDefault();
    if (modal.kind === "closed") return;

    const resourceMap: Record<Exclude<ModalState["kind"], "closed">, string> = {
      program: "programs",
      facility: "facilities",
      gallery: "gallery",
      testimonial: "testimonials",
      team: "team",
      menu: "menu",
      section: "sections",
    };

    const resource = resourceMap[modal.kind];
    setSaving(true);

    try {
      const method = modal.mode === "create" ? "POST" : "PATCH";
      const res = await fetch(`/api/admin/${resource}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modal.item),
      });
      const json = await res.json();
      if (!res.ok) {
        showToast("error", json?.error || "Failed to save changes.");
        return;
      }
      await refreshResource(resource);
      setModal({ kind: "closed" });
      showToast(
        "success",
        modal.mode === "create"
          ? "Item created successfully."
          : "Item updated successfully.",
      );
    } catch {
      showToast("error", "Network error while saving.");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdateAccount(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/account", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: newUsername,
          currentPassword,
          newPassword,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        showToast("error", json?.error || "Failed to update account.");
      } else {
        setCurrentPassword("");
        setNewPassword("");
        showToast("success", "Admin credentials updated.");
      }
    } catch {
      showToast("error", "Network error updating account.");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdateInquiryStatus(id: string, status: string) {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        await refreshResource("inquiries");
        showToast("success", `Inquiry marked as ${status}.`);
      }
    } catch {
      showToast("error", "Failed to update inquiry.");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push(`${adminBasePath}/login`);
    router.refresh();
  }

  const navItems: Array<{
    id: TabId;
    label: string;
    icon: React.ReactNode;
    count?: number;
  }> = [
    {
      id: "overview",
      label: "Overview",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      id: "settings",
      label: "Site Settings",
      icon: <Settings className="h-4 w-4" />,
    },
    {
      id: "sections",
      label: "Page Sections",
      icon: <Layers className="h-4 w-4" />,
      count: sections.length,
    },
    {
      id: "programs",
      label: "Programs & Care",
      icon: <Blocks className="h-4 w-4" />,
      count: programs.length,
    },
    {
      id: "facilities",
      label: "Facilities",
      icon: <Building2 className="h-4 w-4" />,
      count: facilities.length,
    },
    {
      id: "menu",
      label: "Weekly Food Menu",
      icon: <Utensils className="h-4 w-4" />,
      count: menu.length,
    },
    {
      id: "gallery",
      label: "Photo Gallery",
      icon: <ImageIcon className="h-4 w-4" />,
      count: gallery.length,
    },
    {
      id: "testimonials",
      label: "Testimonials",
      icon: <MessageSquareQuote className="h-4 w-4" />,
      count: testimonials.length,
    },
    {
      id: "team",
      label: "Team Members",
      icon: <Users className="h-4 w-4" />,
      count: team.length,
    },
    {
      id: "inquiries",
      label: "Inquiries",
      icon: <Inbox className="h-4 w-4" />,
      count: inquiries.filter((i) => i.status === "NEW").length || inquiries.length,
    },
  ];

  const uniqueCategories = Array.from(new Set(sections.map((s) => s.category)));
  const filteredSections =
    sectionCategoryFilter === "all"
      ? sections
      : sections.filter((s) => s.category === sectionCategoryFilter);

  return (
    <div className="min-h-screen bg-[#FFF8F5] text-[#2D3436]">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-30 border-b border-[#E91E63]/12 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            {settings?.logoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={settings.logoUrl}
                alt="School Logo"
                className="h-10 w-10 rounded-xl border border-[#FF6B81]/20 object-contain p-0.5"
              />
            )}
            <div>
              <h1 className="font-[family-name:var(--font-fredoka)] text-lg font-semibold text-[#2D3436]">
                {settings?.shortName || "Kids Berry"} CMS Admin
              </h1>
              <p className="text-xs text-[#78909C]">
                Signed in as <strong className="text-[#E91E63]">{user.username}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#2D3436]/15 bg-[#FFF8F5] px-4 py-2 text-xs font-semibold text-[#2D3436] transition-colors hover:border-[#26A69A] hover:text-[#26A69A]"
            >
              <span>View Public Site</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#2D3436] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#E91E63]"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50">
          <div
            className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-warm-lg ${
              toast.type === "success"
                ? "border-[#26A69A]/30 bg-white text-[#26A69A]"
                : "border-[#E91E63]/30 bg-white text-[#E91E63]"
            }`}
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{toast.text}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-7 sm:px-6 lg:grid-cols-12 lg:px-8">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3">
          <nav className="flex flex-wrap gap-1.5 rounded-3xl border border-[#2D3436]/8 bg-white p-3 shadow-warm lg:flex-col">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center justify-between gap-2 rounded-2xl px-3.5 py-2.5 text-left text-xs font-semibold transition-all sm:text-sm ${
                    isActive
                      ? "bg-[#E91E63] text-white shadow-sm"
                      : "text-[#2D3436] hover:bg-[#FFF1EB] hover:text-[#E91E63]"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </span>
                  {item.count !== undefined && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-[#FFF1EB] text-[#78909C]"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Active Panel */}
        <section className="lg:col-span-9">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="rounded-3xl border border-[#2D3436]/8 bg-white p-6 shadow-warm">
                <h2 className="font-[family-name:var(--font-fredoka)] text-xl font-semibold text-[#2D3436]">
                  CMS Content Overview
                </h2>
                <p className="mt-1 text-sm text-[#78909C]">
                  Only items marked <strong>Published</strong> are visible on the
                  public website. Toggle any item or manage sections using the
                  menu.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {[
                    {
                      label: "Programs & Care",
                      pub: programs.filter((x) => x.published).length,
                      total: programs.length,
                      tab: "programs" as TabId,
                    },
                    {
                      label: "Facilities",
                      pub: facilities.filter((x) => x.published).length,
                      total: facilities.length,
                      tab: "facilities" as TabId,
                    },
                    {
                      label: "Food Menu Days",
                      pub: menu.filter((x) => x.published).length,
                      total: menu.length,
                      tab: "menu" as TabId,
                    },
                    {
                      label: "Gallery Photos",
                      pub: gallery.filter((x) => x.published).length,
                      total: gallery.length,
                      tab: "gallery" as TabId,
                    },
                    {
                      label: "Testimonials",
                      pub: testimonials.filter((x) => x.published).length,
                      total: testimonials.length,
                      tab: "testimonials" as TabId,
                    },
                    {
                      label: "Team Members",
                      pub: team.filter((x) => x.published).length,
                      total: team.length,
                      tab: "team" as TabId,
                    },
                    {
                      label: "Page Sections",
                      pub: sections.filter((x) => x.published).length,
                      total: sections.length,
                      tab: "sections" as TabId,
                    },
                    {
                      label: "New Inquiries",
                      pub: inquiries.filter((x) => x.status === "NEW").length,
                      total: inquiries.length,
                      tab: "inquiries" as TabId,
                    },
                  ].map((stat) => (
                    <button
                      key={stat.label}
                      type="button"
                      onClick={() => setActiveTab(stat.tab)}
                      className="rounded-2xl border border-[#2D3436]/8 bg-[#FFF8F5] p-4 text-left transition-colors hover:border-[#E91E63]/30 hover:bg-[#FFF1EB]/60"
                    >
                      <p className="text-xs font-medium text-[#78909C]">
                        {stat.label}
                      </p>
                      <p className="mt-1 font-[family-name:var(--font-fredoka)] text-2xl font-semibold text-[#2D3436]">
                        {stat.pub}{" "}
                        <span className="text-sm font-normal text-[#78909C]">
                          / {stat.total}
                        </span>
                      </p>
                      <p className="mt-0.5 text-[11px] font-semibold text-[#26A69A]">
                        Published / Total
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Admin Password Security Box */}
              <form
                onSubmit={handleUpdateAccount}
                className="rounded-3xl border border-[#2D3436]/8 bg-white p-6 shadow-warm"
              >
                <div className="flex items-center gap-2 text-[#E91E63]">
                  <ShieldCheck className="h-5 w-5" />
                  <h3 className="font-[family-name:var(--font-fredoka)] text-lg font-semibold text-[#2D3436]">
                    Admin Account &amp; Password
                  </h3>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-[#2D3436]">
                      Username
                    </label>
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="w-full rounded-xl border border-[#2D3436]/15 bg-[#FFF8F5] px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-[#2D3436]">
                      Current Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full rounded-xl border border-[#2D3436]/15 bg-[#FFF8F5] px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-[#2D3436]">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full rounded-xl border border-[#2D3436]/15 bg-[#FFF8F5] px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#2D3436] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#E91E63]"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Update Credentials</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: SITE SETTINGS */}
          {activeTab === "settings" && settings && (
            <form
              onSubmit={handleSaveSettings}
              className="space-y-6 rounded-3xl border border-[#2D3436]/8 bg-white p-6 shadow-warm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2D3436]/8 pb-4">
                <div>
                  <h2 className="font-[family-name:var(--font-fredoka)] text-xl font-semibold text-[#2D3436]">
                    Global School &amp; Business Settings
                  </h2>
                  <p className="text-xs text-[#78909C]">
                    Controls school name, address, timings, contact info, logo,
                    and core features across all pages.
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-full bg-[#E91E63] px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#E91E63]/90 disabled:opacity-60"
                >
                  {saving ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Save className="h-3.5 w-3.5" />
                  )}
                  <span>Save Settings</span>
                </button>
              </div>

              <ImageUploadField
                label="School Logo"
                value={settings.logoUrl}
                onChange={(url) => setSettings({ ...settings, logoUrl: url })}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField
                  label="School Full Name"
                  value={settings.schoolName}
                  onChange={(v) => setSettings({ ...settings, schoolName: v })}
                />
                <TextField
                  label="Short Brand Name"
                  value={settings.shortName}
                  onChange={(v) => setSettings({ ...settings, shortName: v })}
                />
                <TextField
                  label="School Type Badge"
                  value={settings.schoolType}
                  onChange={(v) => setSettings({ ...settings, schoolType: v })}
                />
                <TextField
                  label="Established Year"
                  value={settings.establishedYear}
                  onChange={(v) =>
                    setSettings({ ...settings, establishedYear: v })
                  }
                />
              </div>

              <TextField
                label="Main Tagline"
                value={settings.tagline}
                onChange={(v) => setSettings({ ...settings, tagline: v })}
              />
              <TextAreaField
                label="Site Description / Sub-Tagline"
                value={settings.subTagline}
                onChange={(v) => setSettings({ ...settings, subTagline: v })}
              />

              <h3 className="border-t border-[#2D3436]/8 pt-4 font-[family-name:var(--font-fredoka)] text-base font-semibold text-[#2D3436]">
                Location &amp; Contact
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField
                  label="Street / Area"
                  value={settings.street}
                  onChange={(v) => setSettings({ ...settings, street: v })}
                />
                <TextField
                  label="Ward Label"
                  value={settings.ward}
                  onChange={(v) => setSettings({ ...settings, ward: v })}
                />
                <TextField
                  label="City"
                  value={settings.city}
                  onChange={(v) => setSettings({ ...settings, city: v })}
                />
                <TextField
                  label="Full Address"
                  value={settings.fullAddress}
                  onChange={(v) => setSettings({ ...settings, fullAddress: v })}
                />
                <TextField
                  label="Landmark Description"
                  value={settings.landmark}
                  onChange={(v) => setSettings({ ...settings, landmark: v })}
                />
                <TextField
                  label="Primary Phone"
                  value={settings.primaryPhone}
                  onChange={(v) => setSettings({ ...settings, primaryPhone: v })}
                />
                <TextField
                  label="Secondary Phone"
                  value={settings.secondaryPhone}
                  onChange={(v) =>
                    setSettings({ ...settings, secondaryPhone: v })
                  }
                />
                <TextField
                  label="WhatsApp Number (digits only, e.g. 977980...)"
                  value={settings.whatsappNumber}
                  onChange={(v) =>
                    setSettings({ ...settings, whatsappNumber: v })
                  }
                />
                <TextField
                  label="General Email"
                  value={settings.email}
                  onChange={(v) => setSettings({ ...settings, email: v })}
                />
                <TextField
                  label="Admissions Email"
                  value={settings.admissionsEmail}
                  onChange={(v) =>
                    setSettings({ ...settings, admissionsEmail: v })
                  }
                />
              </div>

              <h3 className="border-t border-[#2D3436]/8 pt-4 font-[family-name:var(--font-fredoka)] text-base font-semibold text-[#2D3436]">
                Timings &amp; Core School Facilities
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField
                  label="Open Days"
                  value={settings.openDays}
                  onChange={(v) => setSettings({ ...settings, openDays: v })}
                />
                <TextField
                  label="Regular Timing"
                  value={settings.regularClassTime}
                  onChange={(v) =>
                    setSettings({ ...settings, regularClassTime: v })
                  }
                />
                <TextField
                  label="After-Class Care Timing"
                  value={settings.afterClassCareTime}
                  onChange={(v) =>
                    setSettings({ ...settings, afterClassCareTime: v })
                  }
                />
                <TextField
                  label="Full Daycare Timing"
                  value={settings.daycareTime}
                  onChange={(v) => setSettings({ ...settings, daycareTime: v })}
                />
                <TextField
                  label="Closed On"
                  value={settings.closedOn}
                  onChange={(v) => setSettings({ ...settings, closedOn: v })}
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    key: "montessoriImplemented" as const,
                    label: "Montessori Implemented",
                  },
                  { key: "daycareAvailable" as const, label: "Daycare Available" },
                  { key: "foodProvided" as const, label: "Food Provided" },
                  { key: "cctvMonitoring" as const, label: "CCTV Monitoring" },
                ].map((flag) => (
                  <label
                    key={flag.key}
                    className="flex cursor-pointer items-center gap-2.5 rounded-2xl border border-[#2D3436]/12 bg-[#FFF8F5] px-4 py-3 text-xs font-semibold text-[#2D3436]"
                  >
                    <input
                      type="checkbox"
                      checked={settings[flag.key]}
                      onChange={(e) =>
                        setSettings({ ...settings, [flag.key]: e.target.checked })
                      }
                      className="h-4 w-4 accent-[#E91E63]"
                    />
                    <span>{flag.label}</span>
                  </label>
                ))}
              </div>

              <h3 className="border-t border-[#2D3436]/8 pt-4 font-[family-name:var(--font-fredoka)] text-base font-semibold text-[#2D3436]">
                Social &amp; Maps
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField
                  label="Facebook URL"
                  value={settings.facebookUrl}
                  onChange={(v) => setSettings({ ...settings, facebookUrl: v })}
                />
                <TextField
                  label="Instagram URL"
                  value={settings.instagramUrl}
                  onChange={(v) => setSettings({ ...settings, instagramUrl: v })}
                />
                <TextField
                  label="Google Maps Embed URL"
                  value={settings.googleMapsEmbedUrl}
                  onChange={(v) =>
                    setSettings({ ...settings, googleMapsEmbedUrl: v })
                  }
                />
                <TextField
                  label="Google Maps Open Link"
                  value={settings.googleMapsLinkUrl}
                  onChange={(v) =>
                    setSettings({ ...settings, googleMapsLinkUrl: v })
                  }
                />
              </div>
            </form>
          )}

          {/* TAB 3: PAGE SECTIONS */}
          {activeTab === "sections" && (
            <SectionCard
              title="Page Sections (Home, About, Pillars, Routine, Admissions, FAQs)"
              subtitle="Edit or toggle Publish/Unpublish on homepage Hero, Philosophy, Care Grid cards, Core Values, Pillars, Daily Routine & FAQs."
              onAdd={() =>
                setModal({
                  kind: "section",
                  mode: "create",
                  item: {
                    page: "home",
                    category: "care-grid",
                    badge: "",
                    title: "",
                    subtitle: "",
                    description: "",
                    imageUrl: "/images/hero-classroom.jpg",
                    imageAlt: "",
                    iconName: "sparkles",
                    accent: "magenta",
                    sortOrder: sections.length + 1,
                    published: false,
                  },
                })
              }
            >
              <div className="mb-4 flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setSectionCategoryFilter("all")}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    sectionCategoryFilter === "all"
                      ? "bg-[#E91E63] text-white"
                      : "bg-[#FFF8F5] text-[#78909C]"
                  }`}
                >
                  All ({sections.length})
                </button>
                {uniqueCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSectionCategoryFilter(cat)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      sectionCategoryFilter === cat
                        ? "bg-[#E91E63] text-white"
                        : "bg-[#FFF8F5] text-[#78909C]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {filteredSections.map((item) => (
                  <ItemRow
                    key={item.id}
                    title={item.title}
                    meta={`${item.page} • ${item.category}${item.badge ? ` • ${item.badge}` : ""}`}
                    subtitle={item.description}
                    imageUrl={item.imageUrl || undefined}
                    published={item.published}
                    onTogglePublish={() =>
                      handleTogglePublish("sections", item.id, item.published)
                    }
                    onEdit={() =>
                      setModal({
                        kind: "section",
                        mode: "edit",
                        item: {
                          ...item,
                          metadata: item.metadata
                            ? JSON.stringify(item.metadata, null, 2)
                            : "",
                        },
                      })
                    }
                    onDelete={() =>
                      handleDelete("sections", item.id, item.title)
                    }
                  />
                ))}
              </div>
            </SectionCard>
          )}

          {/* TAB 4: PROGRAMS & CARE TRACKS */}
          {activeTab === "programs" && (
            <SectionCard
              title="Programs & Care Schedules"
              subtitle="Manage Care Tracks (Regular Class, Daycare, After-Class Care) and Academic Levels (Playgroup, Nursery, Junior KG, Senior KG)."
              onAdd={() =>
                setModal({
                  kind: "program",
                  mode: "create",
                  item: {
                    programType: "ACADEMIC",
                    badge: "",
                    title: "",
                    subtitle: "",
                    ageGroup: "",
                    ageEligibility: "",
                    timing: "9:00 AM – 3:00 PM",
                    duration: "",
                    classSize: "Max 16 Children",
                    ratio: "1:8 Ratio",
                    shortDescription: "",
                    fullDescription: "",
                    highlights: "",
                    curriculumAreas: "",
                    iconName: "blocks",
                    accent: "magenta",
                    imageUrl: "/images/program-nursery.jpg",
                    imageAlt: "",
                    sortOrder: programs.length + 1,
                    published: false,
                  },
                })
              }
            >
              <div className="space-y-3">
                {programs.map((item) => (
                  <ItemRow
                    key={item.id}
                    title={item.title}
                    meta={`${item.programType} • ${item.timing} • ${item.ageGroup}`}
                    subtitle={item.shortDescription}
                    imageUrl={item.imageUrl}
                    published={item.published}
                    onTogglePublish={() =>
                      handleTogglePublish("programs", item.id, item.published)
                    }
                    onEdit={() =>
                      setModal({
                        kind: "program",
                        mode: "edit",
                        item: {
                          ...item,
                          highlights: Array.isArray(item.highlights)
                            ? item.highlights.join("\n")
                            : "",
                          curriculumAreas: Array.isArray(item.curriculumAreas)
                            ? item.curriculumAreas.join("\n")
                            : "",
                        },
                      })
                    }
                    onDelete={() =>
                      handleDelete("programs", item.id, item.title)
                    }
                  />
                ))}
              </div>
            </SectionCard>
          )}

          {/* TAB 5: FACILITIES */}
          {activeTab === "facilities" && (
            <SectionCard
              title="Campus Facilities"
              subtitle="Manage CCTV monitoring, nutrition kitchen highlights, clean classrooms, daycare rooms, and campus wellness."
              onAdd={() =>
                setModal({
                  kind: "facility",
                  mode: "create",
                  item: {
                    badge: "Safety & Care",
                    title: "",
                    subtitle: "",
                    description: "",
                    highlights: "",
                    iconName: "shield",
                    accent: "magenta",
                    imageUrl: "/images/hero-classroom.jpg",
                    imageAlt: "",
                    showOnHome: true,
                    sortOrder: facilities.length + 1,
                    published: false,
                  },
                })
              }
            >
              <div className="space-y-3">
                {facilities.map((item) => (
                  <ItemRow
                    key={item.id}
                    title={item.title}
                    meta={`${item.badge}${item.showOnHome ? " • Featured on About" : ""}`}
                    subtitle={item.description}
                    imageUrl={item.imageUrl}
                    published={item.published}
                    onTogglePublish={() =>
                      handleTogglePublish("facilities", item.id, item.published)
                    }
                    onEdit={() =>
                      setModal({
                        kind: "facility",
                        mode: "edit",
                        item: {
                          ...item,
                          highlights: Array.isArray(item.highlights)
                            ? item.highlights.join("\n")
                            : "",
                        },
                      })
                    }
                    onDelete={() =>
                      handleDelete("facilities", item.id, item.title)
                    }
                  />
                ))}
              </div>
            </SectionCard>
          )}

          {/* TAB 6: WEEKLY FOOD MENU */}
          {activeTab === "menu" && (
            <SectionCard
              title="Weekly Food Menu (Sunday – Friday)"
              subtitle="Manage daily morning snacks, hot lunches, and afternoon hot milk & fresh fruit boosters."
              onAdd={() =>
                setModal({
                  kind: "menu",
                  mode: "create",
                  item: {
                    day: "",
                    morningSnack: "",
                    hotLunch: "",
                    afternoonBooster: "Daily Hot Milk + Fresh Seasonal Fruits",
                    accent: "magenta",
                    sortOrder: menu.length + 1,
                    published: false,
                  },
                })
              }
            >
              <div className="space-y-3">
                {menu.map((item) => (
                  <ItemRow
                    key={item.id}
                    title={item.day}
                    meta={`Morning: ${item.morningSnack}`}
                    subtitle={`Lunch: ${item.hotLunch} • Afternoon: ${item.afternoonBooster}`}
                    published={item.published}
                    onTogglePublish={() =>
                      handleTogglePublish("menu", item.id, item.published)
                    }
                    onEdit={() =>
                      setModal({ kind: "menu", mode: "edit", item: { ...item } })
                    }
                    onDelete={() => handleDelete("menu", item.id, item.day)}
                  />
                ))}
              </div>
            </SectionCard>
          )}

          {/* TAB 7: GALLERY */}
          {activeTab === "gallery" && (
            <SectionCard
              title="Campus Photo Gallery"
              subtitle="Upload campus photos via Cloudinary and organize by Montessori, Outdoor Play, Art, or Events."
              onAdd={() =>
                setModal({
                  kind: "gallery",
                  mode: "create",
                  item: {
                    title: "",
                    category: "montessori",
                    categoryLabel: "Montessori Classroom",
                    description: "",
                    imageUrl: "",
                    dateLabel: "Campus Life",
                    aspect: "square",
                    sortOrder: gallery.length + 1,
                    published: false,
                  },
                })
              }
            >
              <div className="space-y-3">
                {gallery.map((item) => (
                  <ItemRow
                    key={item.id}
                    title={item.title}
                    meta={`${item.categoryLabel} • ${item.dateLabel}`}
                    subtitle={item.description}
                    imageUrl={item.imageUrl}
                    published={item.published}
                    onTogglePublish={() =>
                      handleTogglePublish("gallery", item.id, item.published)
                    }
                    onEdit={() =>
                      setModal({
                        kind: "gallery",
                        mode: "edit",
                        item: { ...item },
                      })
                    }
                    onDelete={() =>
                      handleDelete("gallery", item.id, item.title)
                    }
                  />
                ))}
              </div>
            </SectionCard>
          )}

          {/* TAB 8: TESTIMONIALS */}
          {activeTab === "testimonials" && (
            <SectionCard
              title="Parent Testimonials"
              subtitle="Manage verified parent reviews shown in the Home page testimonial carousel."
              onAdd={() =>
                setModal({
                  kind: "testimonial",
                  mode: "create",
                  item: {
                    parentName: "",
                    relation: "Parents of ...",
                    childName: "",
                    program: "Nursery",
                    quote: "",
                    rating: 5,
                    location: "Pichara, Biratnagar-11",
                    accent: "magenta",
                    sortOrder: testimonials.length + 1,
                    published: false,
                  },
                })
              }
            >
              <div className="space-y-3">
                {testimonials.map((item) => (
                  <ItemRow
                    key={item.id}
                    title={`${item.parentName} (${item.rating}★)`}
                    meta={`${item.program} • ${item.location}`}
                    subtitle={item.quote}
                    published={item.published}
                    onTogglePublish={() =>
                      handleTogglePublish(
                        "testimonials",
                        item.id,
                        item.published,
                      )
                    }
                    onEdit={() =>
                      setModal({
                        kind: "testimonial",
                        mode: "edit",
                        item: { ...item },
                      })
                    }
                    onDelete={() =>
                      handleDelete("testimonials", item.id, item.parentName)
                    }
                  />
                ))}
              </div>
            </SectionCard>
          )}

          {/* TAB 9: TEAM MEMBERS */}
          {activeTab === "team" && (
            <SectionCard
              title="Educators & Care Team"
              subtitle="Manage principal, Montessori educators, and daycare coordinators shown on the About Us page."
              onAdd={() =>
                setModal({
                  kind: "team",
                  mode: "create",
                  item: {
                    name: "",
                    role: "",
                    qualification: "",
                    experience: "",
                    bio: "",
                    quote: "",
                    imageUrl: "/images/team-1.jpg",
                    accent: "magenta",
                    sortOrder: team.length + 1,
                    published: false,
                  },
                })
              }
            >
              <div className="space-y-3">
                {team.map((item) => (
                  <ItemRow
                    key={item.id}
                    title={item.name}
                    meta={`${item.role} • ${item.experience}`}
                    subtitle={item.bio}
                    imageUrl={item.imageUrl}
                    published={item.published}
                    onTogglePublish={() =>
                      handleTogglePublish("team", item.id, item.published)
                    }
                    onEdit={() =>
                      setModal({ kind: "team", mode: "edit", item: { ...item } })
                    }
                    onDelete={() => handleDelete("team", item.id, item.name)}
                  />
                ))}
              </div>
            </SectionCard>
          )}

          {/* TAB 10: INQUIRIES */}
          {activeTab === "inquiries" && (
            <div className="rounded-3xl border border-[#2D3436]/8 bg-white p-6 shadow-warm">
              <h2 className="font-[family-name:var(--font-fredoka)] text-xl font-semibold text-[#2D3436]">
                Parent Inquiries &amp; Tour Requests
              </h2>
              <p className="mt-1 text-xs text-[#78909C]">
                Messages submitted from the public Contact and Admissions pages.
              </p>

              <div className="mt-5 space-y-3">
                {inquiries.length === 0 ? (
                  <p className="rounded-2xl bg-[#FFF8F5] p-6 text-center text-sm text-[#78909C]">
                    No parent inquiries yet.
                  </p>
                ) : (
                  inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="rounded-2xl border border-[#2D3436]/10 bg-[#FFF8F5] p-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-semibold text-[#2D3436]">
                              {inq.parentName}
                            </h3>
                            <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-[#E91E63]">
                              {inq.phone}
                            </span>
                            {inq.email && (
                              <span className="text-xs text-[#78909C]">
                                {inq.email}
                              </span>
                            )}
                          </div>
                          {(inq.childName || inq.program || inq.preferredCare) && (
                            <p className="mt-1 text-xs font-medium text-[#26A69A]">
                              {[
                                inq.childName &&
                                  `Child: ${inq.childName}${inq.childAge ? ` (${inq.childAge})` : ""}`,
                                inq.program && `Program: ${inq.program}`,
                                inq.preferredCare && `Topic: ${inq.preferredCare}`,
                                inq.preferredDate &&
                                  `Visit Date: ${inq.preferredDate}`,
                              ]
                                .filter(Boolean)
                                .join(" • ")}
                            </p>
                          )}
                          {inq.message && (
                            <p className="mt-2 text-xs leading-relaxed text-[#2D3436]">
                              {inq.message}
                            </p>
                          )}
                          <p className="mt-2 text-[11px] text-[#78909C]">
                            Submitted:{" "}
                            {new Date(inq.createdAt).toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <select
                            value={inq.status}
                            onChange={(e) =>
                              handleUpdateInquiryStatus(inq.id, e.target.value)
                            }
                            className="rounded-xl border border-[#2D3436]/15 bg-white px-3 py-1.5 text-xs font-semibold text-[#2D3436]"
                          >
                            <option value="NEW">NEW</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="ENROLLED">ENROLLED</option>
                            <option value="ARCHIVED">ARCHIVED</option>
                          </select>
                          <button
                            type="button"
                            onClick={() =>
                              handleDelete("inquiries", inq.id, inq.parentName)
                            }
                            className="rounded-xl border border-[#FF6B81]/30 bg-white p-2 text-[#E91E63] hover:bg-[#FFF1EB]"
                            aria-label="Delete inquiry"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* CREATE / EDIT MODAL */}
      {modal.kind !== "closed" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D3436]/60 p-4 backdrop-blur-xs">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-[#2D3436]/10 bg-white p-6 shadow-warm-lg sm:p-8">
            <div className="flex items-center justify-between border-b border-[#2D3436]/8 pb-4">
              <h3 className="font-[family-name:var(--font-fredoka)] text-xl font-semibold text-[#2D3436]">
                {modal.mode === "create" ? "Create" : "Edit"}{" "}
                <span className="capitalize">{modal.kind}</span>
              </h3>
              <button
                type="button"
                onClick={() => setModal({ kind: "closed" })}
                className="rounded-xl bg-[#FFF8F5] p-2 text-[#78909C] hover:text-[#E91E63]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleModalSubmit} className="mt-5 space-y-4">
              {renderModalFields(modal, (nextItem) =>
                setModal({ ...modal, item: nextItem }),
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#2D3436]/8 pt-4">
                <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-[#2D3436]">
                  <input
                    type="checkbox"
                    checked={Boolean(modal.item.published)}
                    onChange={(e) =>
                      setModal({
                        ...modal,
                        item: { ...modal.item, published: e.target.checked },
                      })
                    }
                    className="h-4 w-4 accent-[#E91E63]"
                  />
                  <span>Publish immediately on public website</span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setModal({ kind: "closed" })}
                    className="rounded-full border border-[#2D3436]/15 px-5 py-2.5 text-xs font-semibold text-[#2D3436]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-full bg-[#E91E63] px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#E91E63]/90 disabled:opacity-60"
                  >
                    {saving ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Save className="h-3.5 w-3.5" />
                    )}
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function renderModalFields(
  modal: Exclude<ModalState, { kind: "closed" }>,
  update: (next: Record<string, unknown>) => void,
) {
  const item = modal.item;
  const set = (key: string, val: unknown) => update({ ...item, [key]: val });

  switch (modal.kind) {
    case "program":
      return (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField
              label="Program Type"
              value={String(item.programType || "ACADEMIC")}
              options={["ACADEMIC", "CARE_TRACK"]}
              onChange={(v) => set("programType", v)}
            />
            <TextField
              label="Title *"
              required
              value={String(item.title || "")}
              onChange={(v) => set("title", v)}
            />
            <TextField
              label="Subtitle"
              value={String(item.subtitle || "")}
              onChange={(v) => set("subtitle", v)}
            />
            <TextField
              label="Badge (optional)"
              value={String(item.badge || "")}
              onChange={(v) => set("badge", v)}
            />
            <TextField
              label="Age Group"
              value={String(item.ageGroup || "")}
              onChange={(v) => set("ageGroup", v)}
            />
            <TextField
              label="Timing (e.g. 9:00 AM – 3:00 PM)"
              value={String(item.timing || "")}
              onChange={(v) => set("timing", v)}
            />
            <TextField
              label="Class Size"
              value={String(item.classSize || "")}
              onChange={(v) => set("classSize", v)}
            />
            <TextField
              label="Teacher-Child Ratio"
              value={String(item.ratio || "")}
              onChange={(v) => set("ratio", v)}
            />
            <SelectField
              label="Accent Color"
              value={String(item.accent || "magenta")}
              options={ACCENT_OPTIONS}
              onChange={(v) => set("accent", v)}
            />
            <NumberField
              label="Sort Order"
              value={Number(item.sortOrder || 0)}
              onChange={(v) => set("sortOrder", v)}
            />
          </div>
          <ImageUploadField
            label="Program Photo"
            value={String(item.imageUrl || "")}
            onChange={(url) => set("imageUrl", url)}
          />
          <TextAreaField
            label="Short Description"
            value={String(item.shortDescription || "")}
            onChange={(v) => set("shortDescription", v)}
          />
          <TextAreaField
            label="Full Description"
            value={String(item.fullDescription || "")}
            onChange={(v) => set("fullDescription", v)}
          />
          <TextAreaField
            label="Highlights (one per line)"
            value={String(item.highlights || "")}
            onChange={(v) => set("highlights", v)}
          />
          <TextAreaField
            label="Curriculum Areas (one per line)"
            value={String(item.curriculumAreas || "")}
            onChange={(v) => set("curriculumAreas", v)}
          />
        </>
      );

    case "facility":
      return (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              label="Title *"
              required
              value={String(item.title || "")}
              onChange={(v) => set("title", v)}
            />
            <TextField
              label="Badge"
              value={String(item.badge || "")}
              onChange={(v) => set("badge", v)}
            />
            <TextField
              label="Subtitle"
              value={String(item.subtitle || "")}
              onChange={(v) => set("subtitle", v)}
            />
            <SelectField
              label="Icon"
              value={String(item.iconName || "shield")}
              options={ICON_OPTIONS}
              onChange={(v) => set("iconName", v)}
            />
            <SelectField
              label="Accent Color"
              value={String(item.accent || "magenta")}
              options={ACCENT_OPTIONS}
              onChange={(v) => set("accent", v)}
            />
            <NumberField
              label="Sort Order"
              value={Number(item.sortOrder || 0)}
              onChange={(v) => set("sortOrder", v)}
            />
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-[#2D3436]">
            <input
              type="checkbox"
              checked={Boolean(item.showOnHome)}
              onChange={(e) => set("showOnHome", e.target.checked)}
              className="h-4 w-4 accent-[#E91E63]"
            />
            <span>Feature on About Us Campus Snapshot</span>
          </label>
          <ImageUploadField
            label="Facility Photo"
            value={String(item.imageUrl || "")}
            onChange={(url) => set("imageUrl", url)}
          />
          <TextAreaField
            label="Description"
            value={String(item.description || "")}
            onChange={(v) => set("description", v)}
          />
          <TextAreaField
            label="Bullet Highlights (one per line)"
            value={String(item.highlights || "")}
            onChange={(v) => set("highlights", v)}
          />
        </>
      );

    case "gallery":
      return (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              label="Photo Title *"
              required
              value={String(item.title || "")}
              onChange={(v) => set("title", v)}
            />
            <SelectField
              label="Category"
              value={String(item.category || "montessori")}
              options={["montessori", "outdoor", "art", "events"]}
              onChange={(v) => {
                const map: Record<string, string> = {
                  montessori: "Montessori Classroom",
                  outdoor: "Outdoor & Play",
                  art: "Art & Creativity",
                  events: "Celebrations & Events",
                };
                update({
                  ...item,
                  category: v,
                  categoryLabel: map[v] || "Campus Life",
                });
              }}
            />
            <TextField
              label="Date / Tag Label"
              value={String(item.dateLabel || "")}
              onChange={(v) => set("dateLabel", v)}
            />
            <NumberField
              label="Sort Order"
              value={Number(item.sortOrder || 0)}
              onChange={(v) => set("sortOrder", v)}
            />
          </div>
          <ImageUploadField
            label="Gallery Image *"
            value={String(item.imageUrl || "")}
            onChange={(url) => set("imageUrl", url)}
          />
          <TextAreaField
            label="Caption / Description"
            value={String(item.description || "")}
            onChange={(v) => set("description", v)}
          />
        </>
      );

    case "testimonial":
      return (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              label="Parent Name *"
              required
              value={String(item.parentName || "")}
              onChange={(v) => set("parentName", v)}
            />
            <TextField
              label="Relation (e.g. Parents of Aarav)"
              value={String(item.relation || "")}
              onChange={(v) => set("relation", v)}
            />
            <TextField
              label="Child Name"
              value={String(item.childName || "")}
              onChange={(v) => set("childName", v)}
            />
            <TextField
              label="Program / Care Track"
              value={String(item.program || "")}
              onChange={(v) => set("program", v)}
            />
            <TextField
              label="Neighborhood / Location"
              value={String(item.location || "")}
              onChange={(v) => set("location", v)}
            />
            <NumberField
              label="Star Rating (1 - 5)"
              value={Number(item.rating || 5)}
              onChange={(v) => set("rating", Math.min(5, Math.max(1, v)))}
            />
            <SelectField
              label="Accent Color"
              value={String(item.accent || "magenta")}
              options={ACCENT_OPTIONS}
              onChange={(v) => set("accent", v)}
            />
            <NumberField
              label="Sort Order"
              value={Number(item.sortOrder || 0)}
              onChange={(v) => set("sortOrder", v)}
            />
          </div>
          <TextAreaField
            label="Parent Quote *"
            required
            value={String(item.quote || "")}
            onChange={(v) => set("quote", v)}
          />
        </>
      );

    case "team":
      return (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              label="Full Name *"
              required
              value={String(item.name || "")}
              onChange={(v) => set("name", v)}
            />
            <TextField
              label="Role *"
              required
              value={String(item.role || "")}
              onChange={(v) => set("role", v)}
            />
            <TextField
              label="Qualification"
              value={String(item.qualification || "")}
              onChange={(v) => set("qualification", v)}
            />
            <TextField
              label="Experience"
              value={String(item.experience || "")}
              onChange={(v) => set("experience", v)}
            />
            <SelectField
              label="Accent Color"
              value={String(item.accent || "magenta")}
              options={ACCENT_OPTIONS}
              onChange={(v) => set("accent", v)}
            />
            <NumberField
              label="Sort Order"
              value={Number(item.sortOrder || 0)}
              onChange={(v) => set("sortOrder", v)}
            />
          </div>
          <ImageUploadField
            label="Portrait Photo"
            value={String(item.imageUrl || "")}
            onChange={(url) => set("imageUrl", url)}
          />
          <TextAreaField
            label="Short Bio"
            value={String(item.bio || "")}
            onChange={(v) => set("bio", v)}
          />
          <TextAreaField
            label="Educator Quote"
            value={String(item.quote || "")}
            onChange={(v) => set("quote", v)}
          />
        </>
      );

    case "menu":
      return (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              label="Day *"
              required
              value={String(item.day || "")}
              onChange={(v) => set("day", v)}
            />
            <NumberField
              label="Sort Order (1 = Sunday)"
              value={Number(item.sortOrder || 0)}
              onChange={(v) => set("sortOrder", v)}
            />
            <SelectField
              label="Accent Color"
              value={String(item.accent || "magenta")}
              options={ACCENT_OPTIONS}
              onChange={(v) => set("accent", v)}
            />
          </div>
          <TextField
            label="Morning Snack"
            value={String(item.morningSnack || "")}
            onChange={(v) => set("morningSnack", v)}
          />
          <TextField
            label="Hot Lunch"
            value={String(item.hotLunch || "")}
            onChange={(v) => set("hotLunch", v)}
          />
          <TextField
            label="Afternoon Hot Milk & Fresh Fruit Booster"
            value={String(item.afternoonBooster || "")}
            onChange={(v) => set("afternoonBooster", v)}
          />
        </>
      );

    case "section":
      return (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField
              label="Page"
              value={String(item.page || "home")}
              options={["home", "about", "programs", "admissions", "shared"]}
              onChange={(v) => set("page", v)}
            />
            <SelectField
              label="Category"
              value={String(item.category || "care-grid")}
              options={[
                "hero",
                "philosophy",
                "care-grid",
                "story",
                "value",
                "pillar",
                "routine",
                "admission-step",
                "admission-req",
                "age-row",
                "faq",
                "cta",
              ]}
              onChange={(v) => set("category", v)}
            />
            <TextField
              label="Badge / Small Eyebrow / Timing"
              value={String(item.badge || "")}
              onChange={(v) => set("badge", v)}
            />
            <TextField
              label="Title *"
              required
              value={String(item.title || "")}
              onChange={(v) => set("title", v)}
            />
            <TextField
              label="Subtitle / Quote / Highlight Word"
              value={String(item.subtitle || "")}
              onChange={(v) => set("subtitle", v)}
            />
            <SelectField
              label="Icon"
              value={String(item.iconName || "sparkles")}
              options={ICON_OPTIONS}
              onChange={(v) => set("iconName", v)}
            />
            <SelectField
              label="Accent Color"
              value={String(item.accent || "magenta")}
              options={ACCENT_OPTIONS}
              onChange={(v) => set("accent", v)}
            />
            <NumberField
              label="Sort Order"
              value={Number(item.sortOrder || 0)}
              onChange={(v) => set("sortOrder", v)}
            />
          </div>
          <ImageUploadField
            label="Section Image (if applicable)"
            value={String(item.imageUrl || "")}
            onChange={(url) => set("imageUrl", url)}
          />
          <TextAreaField
            label="Description / Body Text"
            value={String(item.description || "")}
            onChange={(v) => set("description", v)}
          />
          <TextAreaField
            label="Extra Metadata JSON (optional)"
            value={String(item.metadata || "")}
            onChange={(v) => set("metadata", v)}
          />
        </>
      );
  }
}

function SectionCard({
  title,
  subtitle,
  onAdd,
  children,
}: {
  title: string;
  subtitle: string;
  onAdd: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-[#2D3436]/8 bg-white p-6 shadow-warm">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#2D3436]/8 pb-4">
        <div>
          <h2 className="font-[family-name:var(--font-fredoka)] text-xl font-semibold text-[#2D3436]">
            {title}
          </h2>
          <p className="mt-0.5 text-xs text-[#78909C]">{subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#E91E63] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#E91E63]/90"
        >
          <Plus className="h-4 w-4" />
          <span>Add New</span>
        </button>
      </div>
      {children}
    </div>
  );
}

function ItemRow({
  title,
  meta,
  subtitle,
  imageUrl,
  published,
  onTogglePublish,
  onEdit,
  onDelete,
}: {
  title: string;
  meta: string;
  subtitle?: string;
  imageUrl?: string;
  published: boolean;
  onTogglePublish: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#2D3436]/8 bg-[#FFF8F5] p-4 sm:flex-row sm:items-center">
      <div className="flex min-w-0 items-start gap-3">
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={title}
            className="h-14 w-16 shrink-0 rounded-xl border border-[#2D3436]/10 bg-white object-cover"
          />
        )}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-[#2D3436]">
              {title}
            </h3>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                published
                  ? "bg-[#26A69A]/15 text-[#26A69A]"
                  : "bg-[#78909C]/15 text-[#78909C]"
              }`}
            >
              {published ? "Published" : "Draft"}
            </span>
          </div>
          <p className="mt-0.5 text-xs font-medium text-[#E91E63]">{meta}</p>
          {subtitle && (
            <p className="mt-1 line-clamp-2 text-xs text-[#78909C]">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onTogglePublish}
          className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
            published
              ? "border border-[#26A69A]/25 bg-white text-[#26A69A] hover:bg-[#26A69A]/10"
              : "bg-[#26A69A] text-white hover:bg-[#26A69A]/90"
          }`}
        >
          {published ? (
            <>
              <EyeOff className="h-3.5 w-3.5" />
              <span>Unpublish</span>
            </>
          ) : (
            <>
              <Eye className="h-3.5 w-3.5" />
              <span>Publish</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1 rounded-xl border border-[#2D3436]/12 bg-white px-3 py-2 text-xs font-semibold text-[#2D3436] hover:border-[#E91E63] hover:text-[#E91E63]"
        >
          <Pencil className="h-3.5 w-3.5" />
          <span>Edit</span>
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="inline-flex items-center justify-center rounded-xl border border-[#FF6B81]/25 bg-white p-2 text-[#E91E63] hover:bg-[#FFF1EB]"
          aria-label={`Delete ${title}`}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#2D3436]">
        {label}
      </label>
      <input
        type="text"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#2D3436]/15 bg-[#FFF8F5] px-3 py-2 text-sm text-[#2D3436] focus:border-[#E91E63] focus:bg-white focus:outline-none"
      />
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#2D3436]">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="w-full rounded-xl border border-[#2D3436]/15 bg-[#FFF8F5] px-3 py-2 text-sm text-[#2D3436] focus:border-[#E91E63] focus:bg-white focus:outline-none"
      />
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#2D3436]">
        {label}
      </label>
      <textarea
        rows={3}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#2D3436]/15 bg-[#FFF8F5] px-3 py-2 text-sm text-[#2D3436] focus:border-[#E91E63] focus:bg-white focus:outline-none"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#2D3436]">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#2D3436]/15 bg-[#FFF8F5] px-3 py-2 text-sm text-[#2D3436] focus:border-[#E91E63] focus:bg-white focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
