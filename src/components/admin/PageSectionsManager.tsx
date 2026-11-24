"use client";

import { useState, type FormEvent } from "react";
import {
  BookOpen,
  ClipboardList,
  Eye,
  EyeOff,
  Home,
  Info,
  Loader2,
  Megaphone,
  Pencil,
  Plus,
  Save,
  X,
} from "lucide-react";
import {
  AccentSwatchPicker,
  ICON_OPTIONS,
  ItemRow,
  NumberField,
  SectionCard,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/admin/AdminFormPrimitives";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { AdminPageSection } from "@/types/admin";

type PageGroupId = "home" | "about" | "programs" | "admissions" | "cta";

type SectionCategory =
  | "hero"
  | "philosophy"
  | "care-grid"
  | "story"
  | "value"
  | "pillar"
  | "routine"
  | "admission-step"
  | "age-row"
  | "admission-req"
  | "faq"
  | "cta";

interface SectionDraft {
  id?: string;
  page: string;
  category: SectionCategory;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  iconName: string;
  accent: string;
  sortOrder: number;
  published: boolean;
  // Friendly metadata fields (serialized automatically to metadata JSON)
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryImageUrl: string;
  secondaryImageAlt: string;
  statValue: string;
  statLabel: string;
  quoteAuthor: string;
  href: string;
  visionTitle: string;
  visionText: string;
  missionTitle: string;
  missionText: string;
  logoCaption: string;
  activitiesText: string;
  requiredDoc: boolean;
  rawExtraMetadata: Record<string, unknown>;
}

const DESTINATION_LINKS = [
  { value: "/facilities", label: "Facilities Page (/facilities)" },
  { value: "/facilities#weekly-menu", label: "Weekly Food Menu (/facilities#weekly-menu)" },
  { value: "/programs#learning-approach", label: "Montessori Pillars (/programs#learning-approach)" },
  { value: "/programs#care-timings", label: "Daycare & Care Timings (/programs#care-timings)" },
  { value: "/programs", label: "All Programs (/programs)" },
  { value: "/gallery", label: "Photo Gallery (/gallery)" },
  { value: "/about", label: "About Us (/about)" },
  { value: "/admissions", label: "Admissions (/admissions)" },
  { value: "/contact", label: "Contact & Visit (/contact)" },
];

const CATEGORY_LABELS: Record<SectionCategory, string> = {
  hero: "Top Hero Banner",
  philosophy: "Montessori Philosophy Spread",
  "care-grid": "Care & Safety Highlight Card",
  story: "School Story, Vision & Mission",
  value: "Core Value",
  pillar: "Montessori Learning Pillar",
  routine: "Daily Routine Time Slot",
  "admission-step": "Enrollment Step",
  "age-row": "Age Eligibility Row",
  "admission-req": "Required Document",
  faq: "Parent FAQ",
  cta: "Bottom Call-to-Action Banner",
};

function toDraft(item: AdminPageSection): SectionDraft {
  const m = (item.metadata || {}) as Record<string, unknown>;
  const activities = Array.isArray(m.activities)
    ? m.activities.map((a) => String(a)).join("\n")
    : "";

  return {
    id: item.id,
    page: item.page,
    category: (item.category || "care-grid") as SectionCategory,
    badge: item.badge || "",
    title: item.title || "",
    subtitle: item.subtitle || "",
    description: item.description || "",
    imageUrl: item.imageUrl || "",
    imageAlt: item.imageAlt || "",
    iconName: item.iconName || "sparkles",
    accent: item.accent || "magenta",
    sortOrder: item.sortOrder || 0,
    published: item.published,
    primaryCtaLabel: String(m.primaryCtaLabel || "Schedule a Campus Visit"),
    primaryCtaHref: String(m.primaryCtaHref || "/contact"),
    secondaryCtaLabel: String(m.secondaryCtaLabel || "WhatsApp Admissions"),
    secondaryImageUrl: String(m.secondaryImageUrl || "/images/gallery-art.jpg"),
    secondaryImageAlt: String(m.secondaryImageAlt || "Children creative art"),
    statValue: String(m.statValue || "1:8"),
    statLabel: String(m.statLabel || "Loving Educator–Child Ratio"),
    quoteAuthor: String(
      m.quoteAuthor || "Montessori Implemented Pre-school & Daycare",
    ),
    href: String(m.href || "/facilities"),
    visionTitle: String(m.visionTitle || "Our Vision"),
    visionText: String(m.visionText || ""),
    missionTitle: String(m.missionTitle || "Our Mission"),
    missionText: String(m.missionText || ""),
    logoCaption: String(m.logoCaption || ""),
    activitiesText: activities,
    requiredDoc: m.required !== false,
    rawExtraMetadata: m,
  };
}

function emptyDraft(
  page: string,
  category: SectionCategory,
  sortOrder: number,
): SectionDraft {
  return {
    page,
    category,
    badge:
      category === "admission-req"
        ? "Required"
        : category === "admission-step"
          ? `0${sortOrder}`
          : "",
    title: "",
    subtitle: "",
    description: "",
    imageUrl:
      category === "care-grid" ||
      category === "hero" ||
      category === "philosophy" ||
      category === "story"
        ? "/images/hero-classroom.jpg"
        : "",
    imageAlt: "",
    iconName: "sparkles",
    accent: "magenta",
    sortOrder,
    published: true,
    primaryCtaLabel: "Schedule a Campus Visit",
    primaryCtaHref: "/contact",
    secondaryCtaLabel: "WhatsApp Admissions",
    secondaryImageUrl: "/images/gallery-art.jpg",
    secondaryImageAlt: "Children creative activity",
    statValue: "1:8",
    statLabel: "Loving Educator–Child Ratio",
    quoteAuthor: "Montessori Implemented Pre-school & Daycare",
    href: "/facilities",
    visionTitle: "Our Vision",
    visionText: "",
    missionTitle: "Our Mission",
    missionText: "",
    logoCaption: "",
    activitiesText: "",
    requiredDoc: true,
    rawExtraMetadata: {},
  };
}

function buildMetadataPayload(draft: SectionDraft): Record<string, unknown> | null {
  switch (draft.category) {
    case "hero":
      return {
        ...draft.rawExtraMetadata,
        primaryCtaLabel: draft.primaryCtaLabel.trim() || "Schedule a Campus Visit",
        primaryCtaHref: draft.primaryCtaHref.trim() || "/contact",
        secondaryCtaLabel: draft.secondaryCtaLabel.trim() || "WhatsApp Admissions",
      };
    case "philosophy":
      return {
        ...draft.rawExtraMetadata,
        secondaryImageUrl: draft.secondaryImageUrl.trim(),
        secondaryImageAlt:
          draft.secondaryImageAlt.trim() || "Kids Berry classroom activity",
        statValue: draft.statValue.trim() || "1:8",
        statLabel: draft.statLabel.trim() || "Loving Educator–Child Ratio",
        quoteAuthor: draft.quoteAuthor.trim(),
      };
    case "care-grid":
      return {
        ...draft.rawExtraMetadata,
        href: draft.href.trim() || "/facilities",
      };
    case "story":
      return {
        ...draft.rawExtraMetadata,
        visionTitle: draft.visionTitle.trim() || "Our Vision",
        visionText: draft.visionText.trim(),
        missionTitle: draft.missionTitle.trim() || "Our Mission",
        missionText: draft.missionText.trim(),
        logoCaption: draft.logoCaption.trim(),
      };
    case "pillar":
      return {
        ...draft.rawExtraMetadata,
        activities: draft.activitiesText
          .split(/\r?\n/)
          .map((s) => s.trim())
          .filter(Boolean),
      };
    case "admission-req":
      return {
        ...draft.rawExtraMetadata,
        required: draft.requiredDoc,
      };
    default:
      return Object.keys(draft.rawExtraMetadata).length > 0
        ? draft.rawExtraMetadata
        : null;
  }
}

export function PageSectionsManager({
  sections,
  onRefresh,
  onNotify,
}: {
  sections: AdminPageSection[];
  onRefresh: () => Promise<void>;
  onNotify: (type: "success" | "error", text: string) => void;
}) {
  const [pageTab, setPageTab] = useState<PageGroupId>("home");
  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null);
  const [draft, setDraft] = useState<SectionDraft | null>(null);
  const [saving, setSaving] = useState(false);

  const byCat = (cat: SectionCategory) =>
    sections
      .filter((s) => s.category === cat)
      .sort((a, b) => a.sortOrder - b.sortOrder);

  const hero = byCat("hero")[0];
  const philosophy = byCat("philosophy")[0];
  const careGrid = byCat("care-grid");
  const story = byCat("story")[0];
  const values = byCat("value");
  const pillars = byCat("pillar");
  const routine = byCat("routine");
  const admissionSteps = byCat("admission-step");
  const ageRows = byCat("age-row");
  const admissionReqs = byCat("admission-req");
  const faqs = byCat("faq");
  const cta = byCat("cta")[0];

  const pageTabs: Array<{
    id: PageGroupId;
    label: string;
    icon: React.ReactNode;
  }> = [
    { id: "home", label: "Home Page", icon: <Home className="h-3.5 w-3.5" /> },
    { id: "about", label: "About Page", icon: <Info className="h-3.5 w-3.5" /> },
    {
      id: "programs",
      label: "Programs Page",
      icon: <BookOpen className="h-3.5 w-3.5" />,
    },
    {
      id: "admissions",
      label: "Admissions Page",
      icon: <ClipboardList className="h-3.5 w-3.5" />,
    },
    {
      id: "cta",
      label: "Bottom CTA Banner",
      icon: <Megaphone className="h-3.5 w-3.5" />,
    },
  ];

  async function togglePublish(item: AdminPageSection) {
    try {
      const res = await fetch("/api/admin/sections", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, published: !item.published }),
      });
      if (!res.ok) {
        onNotify("error", "Could not update publish status.");
        return;
      }
      await onRefresh();
      onNotify(
        "success",
        !item.published ? `"${item.title}" is now live.` : `"${item.title}" is now hidden.`,
      );
    } catch {
      onNotify("error", "Network error updating section.");
    }
  }

  async function deleteSection(item: AdminPageSection) {
    if (!confirm(`Delete "${item.title}" permanently?`)) return;
    try {
      const res = await fetch(`/api/admin/sections?id=${item.id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        onNotify("error", "Failed to delete item.");
        return;
      }
      await onRefresh();
      onNotify("success", `Deleted "${item.title}".`);
    } catch {
      onNotify("error", "Network error while deleting.");
    }
  }

  function openEdit(item: AdminPageSection) {
    setDraft(toDraft(item));
    setModalMode("edit");
  }

  function openCreate(page: string, category: SectionCategory, count: number) {
    setDraft(emptyDraft(page, category, count + 1));
    setModalMode("create");
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!draft || !modalMode) return;
    setSaving(true);

    const badgeValue =
      draft.category === "admission-req"
        ? draft.requiredDoc
          ? "Required"
          : "Optional"
        : draft.badge.trim() || null;

    const subtitleValue =
      draft.category === "routine"
        ? draft.badge.trim() || draft.subtitle.trim() || null
        : draft.subtitle.trim() || null;

    const payload = {
      ...(modalMode === "edit" && draft.id ? { id: draft.id } : {}),
      page: draft.page,
      category: draft.category,
      badge: badgeValue,
      title: draft.title.trim(),
      subtitle: subtitleValue,
      description: draft.description,
      imageUrl: draft.imageUrl.trim() || null,
      imageAlt: draft.imageAlt.trim() || draft.title.trim() || null,
      iconName: draft.iconName,
      accent: draft.accent,
      sortOrder: draft.sortOrder,
      published: draft.published,
      metadata: buildMetadataPayload(draft),
    };

    try {
      const res = await fetch("/api/admin/sections", {
        method: modalMode === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        onNotify("error", json?.error || "Failed to save section.");
        return;
      }
      await onRefresh();
      setModalMode(null);
      setDraft(null);
      onNotify(
        "success",
        modalMode === "create" ? "Added successfully." : "Changes saved & updated.",
      );
    } catch {
      onNotify("error", "Network error while saving.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Selector Bar */}
      <div className="rounded-3xl border border-[#2D3436]/8 bg-white p-5 shadow-warm">
        <h2 className="font-[family-name:var(--font-fredoka)] text-xl font-semibold text-[#2D3436]">
          Website Page Sections
        </h2>
        <p className="mt-1 text-xs text-[#78909C]">
          Pick a website page below to edit its headlines, photos, cards, daily
          schedule, and FAQs without touching code.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {pageTabs.map((tab) => {
            const active = pageTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setPageTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  active
                    ? "bg-[#E91E63] text-white shadow-sm"
                    : "border border-[#2D3436]/10 bg-[#FFF8F5] text-[#2D3436] hover:border-[#E91E63]/35 hover:text-[#E91E63]"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. HOME PAGE */}
      {pageTab === "home" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <SpotlightBlock
              label="Top Hero Banner"
              helper="Main photo, headline & action buttons at the top of the Home page."
              item={hero}
              onEdit={() =>
                hero ? openEdit(hero) : openCreate("home", "hero", 0)
              }
              onTogglePublish={() => hero && togglePublish(hero)}
            />

            <SpotlightBlock
              label="Montessori Philosophy Spread"
              helper="Welcome story, quote & dual photo collage below the Hero."
              item={philosophy}
              onEdit={() =>
                philosophy
                  ? openEdit(philosophy)
                  : openCreate("home", "philosophy", 1)
              }
              onTogglePublish={() => philosophy && togglePublish(philosophy)}
            />
          </div>

          <SectionCard
            title="Care & Safety Highlight Cards"
            subtitle="The 3-column photo cards on the Home page (CCTV, Fresh Meals, Montessori, Daycare, Play Garden, Art)."
            addLabel="Add Highlight Card"
            onAdd={() => openCreate("home", "care-grid", careGrid.length)}
          >
            <div className="space-y-3">
              {careGrid.length === 0 ? (
                <EmptyHint text="No highlight cards yet. Click Add Highlight Card to create one." />
              ) : (
                careGrid.map((item) => (
                  <ItemRow
                    key={item.id}
                    title={item.title}
                    meta={`${item.badge || "Card"} • Links to ${String((item.metadata as Record<string, unknown> | null)?.href || "/facilities")}`}
                    subtitle={item.description}
                    imageUrl={item.imageUrl || undefined}
                    published={item.published}
                    onTogglePublish={() => togglePublish(item)}
                    onEdit={() => openEdit(item)}
                    onDelete={() => deleteSection(item)}
                  />
                ))
              )}
            </div>
          </SectionCard>
        </div>
      )}

      {/* 2. ABOUT PAGE */}
      {pageTab === "about" && (
        <div className="space-y-6">
          <SpotlightBlock
            label="School Story, Vision & Mission"
            helper="Main introduction card, campus photo, Vision & Mission boxes on the About Us page."
            item={story}
            onEdit={() =>
              story ? openEdit(story) : openCreate("about", "story", 0)
            }
            onTogglePublish={() => story && togglePublish(story)}
          />

          <SectionCard
            title="Our Core Values"
            subtitle="The 4 value cards displayed in the Core Values grid on /about."
            addLabel="Add Core Value"
            onAdd={() => openCreate("about", "value", values.length)}
          >
            <div className="space-y-3">
              {values.length === 0 ? (
                <EmptyHint text="No core values yet." />
              ) : (
                values.map((item) => (
                  <ItemRow
                    key={item.id}
                    title={item.title}
                    meta={`Icon: ${item.iconName} • Order ${item.sortOrder}`}
                    subtitle={item.description}
                    published={item.published}
                    onTogglePublish={() => togglePublish(item)}
                    onEdit={() => openEdit(item)}
                    onDelete={() => deleteSection(item)}
                  />
                ))
              )}
            </div>
          </SectionCard>
        </div>
      )}

      {/* 3. PROGRAMS PAGE */}
      {pageTab === "programs" && (
        <div className="space-y-6">
          <SectionCard
            title="Montessori Learning Pillars"
            subtitle="Interactive tabs in 'Five Pillars of Hands-On Discovery' on /programs."
            addLabel="Add Learning Pillar"
            onAdd={() => openCreate("programs", "pillar", pillars.length)}
          >
            <div className="space-y-3">
              {pillars.length === 0 ? (
                <EmptyHint text="No learning pillars yet." />
              ) : (
                pillars.map((item) => {
                  const actCount = Array.isArray(
                    (item.metadata as Record<string, unknown> | null)
                      ?.activities,
                  )
                    ? (
                        (item.metadata as Record<string, unknown>)
                          .activities as unknown[]
                      ).length
                    : 0;
                  return (
                    <ItemRow
                      key={item.id}
                      title={item.title}
                      meta={`${item.subtitle || "Pillar"} • ${actCount} activities`}
                      subtitle={item.description}
                      published={item.published}
                      onTogglePublish={() => togglePublish(item)}
                      onEdit={() => openEdit(item)}
                      onDelete={() => deleteSection(item)}
                    />
                  );
                })
              )}
            </div>
          </SectionCard>

          <SectionCard
            title="Daily School Routine (9 AM – 5 PM)"
            subtitle="Time-ordered daily schedule blocks displayed on /programs."
            addLabel="Add Time Slot"
            onAdd={() => openCreate("programs", "routine", routine.length)}
          >
            <div className="space-y-3">
              {routine.length === 0 ? (
                <EmptyHint text="No routine time slots yet." />
              ) : (
                routine.map((item) => (
                  <ItemRow
                    key={item.id}
                    title={item.title}
                    meta={item.subtitle || item.badge || "Time Slot"}
                    subtitle={item.description}
                    published={item.published}
                    onTogglePublish={() => togglePublish(item)}
                    onEdit={() => openEdit(item)}
                    onDelete={() => deleteSection(item)}
                  />
                ))
              )}
            </div>
          </SectionCard>
        </div>
      )}

      {/* 4. ADMISSIONS PAGE */}
      {pageTab === "admissions" && (
        <div className="space-y-6">
          <SectionCard
            title="4-Step Enrollment Process"
            subtitle="Step cards shown at the top of /admissions."
            addLabel="Add Step"
            onAdd={() =>
              openCreate("admissions", "admission-step", admissionSteps.length)
            }
          >
            <div className="space-y-3">
              {admissionSteps.map((item) => (
                <ItemRow
                  key={item.id}
                  title={item.title}
                  meta={`Step ${item.badge || item.sortOrder}`}
                  subtitle={item.description}
                  published={item.published}
                  onTogglePublish={() => togglePublish(item)}
                  onEdit={() => openEdit(item)}
                  onDelete={() => deleteSection(item)}
                />
              ))}
            </div>
          </SectionCard>

          <SectionCard
            title="Age Eligibility Guidelines"
            subtitle="Program age range rows on /admissions."
            addLabel="Add Age Row"
            onAdd={() => openCreate("admissions", "age-row", ageRows.length)}
          >
            <div className="space-y-3">
              {ageRows.map((item) => (
                <ItemRow
                  key={item.id}
                  title={item.title}
                  meta={`${item.badge || ""} • ${item.subtitle || ""}`}
                  subtitle={item.description}
                  published={item.published}
                  onTogglePublish={() => togglePublish(item)}
                  onEdit={() => openEdit(item)}
                  onDelete={() => deleteSection(item)}
                />
              ))}
            </div>
          </SectionCard>

          <SectionCard
            title="Required Documents Checklist"
            subtitle="Documents list parents bring during enrollment."
            addLabel="Add Document"
            onAdd={() =>
              openCreate("admissions", "admission-req", admissionReqs.length)
            }
          >
            <div className="space-y-3">
              {admissionReqs.map((item) => (
                <ItemRow
                  key={item.id}
                  title={item.title}
                  meta={item.badge || "Required"}
                  subtitle={item.description}
                  published={item.published}
                  onTogglePublish={() => togglePublish(item)}
                  onEdit={() => openEdit(item)}
                  onDelete={() => deleteSection(item)}
                />
              ))}
            </div>
          </SectionCard>

          <SectionCard
            title="Helpful Answers for Parents (FAQs)"
            subtitle="Frequently asked questions accordion on /admissions."
            addLabel="Add Question"
            onAdd={() => openCreate("admissions", "faq", faqs.length)}
          >
            <div className="space-y-3">
              {faqs.map((item) => (
                <ItemRow
                  key={item.id}
                  title={item.title}
                  meta={`FAQ #${item.sortOrder}`}
                  subtitle={item.description}
                  published={item.published}
                  onTogglePublish={() => togglePublish(item)}
                  onEdit={() => openEdit(item)}
                  onDelete={() => deleteSection(item)}
                />
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {/* 5. CTA BANNER */}
      {pageTab === "cta" && (
        <SpotlightBlock
          label="Bottom Call-to-Action Banner"
          helper="The gradient banner near the bottom of the Home page inviting parents to visit or chat on WhatsApp."
          item={cta}
          onEdit={() => (cta ? openEdit(cta) : openCreate("shared", "cta", 0))}
          onTogglePublish={() => cta && togglePublish(cta)}
        />
      )}

      {/* FRIENDLY CONTEXT-AWARE MODAL */}
      {modalMode && draft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2D3436]/60 p-4 backdrop-blur-xs">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto no-scrollbar rounded-[2rem] border border-[#2D3436]/10 bg-white p-6 shadow-warm-lg sm:p-8">
            <div className="flex items-center justify-between border-b border-[#2D3436]/8 pb-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#E91E63]">
                  {modalMode === "create" ? "Add New" : "Edit Section"}
                </span>
                <h3 className="font-[family-name:var(--font-fredoka)] text-xl font-semibold text-[#2D3436]">
                  {CATEGORY_LABELS[draft.category]}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setModalMode(null);
                  setDraft(null);
                }}
                className="rounded-xl bg-[#FFF8F5] p-2 text-[#78909C] hover:text-[#E91E63]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-5 space-y-4">
              {renderFriendlyFields(draft, setDraft)}

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#2D3436]/8 pt-4">
                <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-[#2D3436]">
                  <input
                    type="checkbox"
                    checked={draft.published}
                    onChange={(e) =>
                      setDraft({ ...draft, published: e.target.checked })
                    }
                    className="h-4 w-4 accent-[#E91E63]"
                  />
                  <span>Show live on public website</span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setModalMode(null);
                      setDraft(null);
                    }}
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

function renderFriendlyFields(
  draft: SectionDraft,
  setDraft: (next: SectionDraft) => void,
) {
  const set = <K extends keyof SectionDraft>(key: K, val: SectionDraft[K]) =>
    setDraft({ ...draft, [key]: val });

  switch (draft.category) {
    case "hero":
      return (
        <>
          <TextField
            label="Top Location Badge"
            value={draft.badge}
            onChange={(v) => set("badge", v)}
            placeholder="Montessori Implemented Pre-school & Daycare • Pichara, Biratnagar-11"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <TextField
                label="Main Headline *"
                required
                value={draft.title}
                onChange={(v) => set("title", v)}
              />
            </div>
            <TextField
              label="Highlighted Word (Green)"
              value={draft.subtitle}
              onChange={(v) => set("subtitle", v)}
              placeholder="Montessori"
            />
          </div>
          <TextAreaField
            label="Welcome Description"
            required
            value={draft.description}
            onChange={(v) => set("description", v)}
          />
          <ImageUploadField
            label="Hero Classroom Background Photo"
            value={draft.imageUrl}
            onChange={(v) => set("imageUrl", v)}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <TextField
              label="Primary Button Text"
              value={draft.primaryCtaLabel}
              onChange={(v) => set("primaryCtaLabel", v)}
            />
            <SelectField
              label="Primary Button Destination"
              value={draft.primaryCtaHref}
              options={DESTINATION_LINKS}
              onChange={(v) => set("primaryCtaHref", v)}
            />
            <TextField
              label="WhatsApp Button Text"
              value={draft.secondaryCtaLabel}
              onChange={(v) => set("secondaryCtaLabel", v)}
            />
          </div>
        </>
      );

    case "philosophy":
      return (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              label="Small Section Tag"
              value={draft.badge}
              onChange={(v) => set("badge", v)}
            />
            <TextField
              label="Section Heading *"
              required
              value={draft.title}
              onChange={(v) => set("title", v)}
            />
          </div>
          <TextAreaField
            label="Main Philosophy Paragraph *"
            required
            value={draft.description}
            onChange={(v) => set("description", v)}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              label="Highlighted Pull-Quote"
              value={draft.subtitle}
              onChange={(v) => set("subtitle", v)}
            />
            <TextField
              label="Quote Attribution"
              value={draft.quoteAuthor}
              onChange={(v) => set("quoteAuthor", v)}
            />
            <TextField
              label="Highlight Stat (e.g. 1:8)"
              value={draft.statValue}
              onChange={(v) => set("statValue", v)}
            />
            <TextField
              label="Stat Label"
              value={draft.statLabel}
              onChange={(v) => set("statLabel", v)}
            />
          </div>
          <ImageUploadField
            label="Main Philosophy Photo (Left Tall)"
            value={draft.imageUrl}
            onChange={(v) => set("imageUrl", v)}
          />
          <ImageUploadField
            label="Secondary Mosaic Photo (Top Right)"
            value={draft.secondaryImageUrl}
            onChange={(v) => set("secondaryImageUrl", v)}
          />
        </>
      );

    case "care-grid":
      return (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              label="Small Tag (e.g. Safety First)"
              value={draft.badge}
              onChange={(v) => set("badge", v)}
            />
            <TextField
              label="Card Title *"
              required
              value={draft.title}
              onChange={(v) => set("title", v)}
            />
            <SelectField
              label="Click Destination Page"
              value={draft.href}
              options={DESTINATION_LINKS}
              onChange={(v) => set("href", v)}
            />
            <NumberField
              label="Display Order"
              value={draft.sortOrder}
              onChange={(v) => set("sortOrder", v)}
            />
          </div>
          <AccentSwatchPicker
            value={draft.accent}
            onChange={(v) => set("accent", v)}
          />
          <ImageUploadField
            label="Card Photo"
            value={draft.imageUrl}
            onChange={(v) => set("imageUrl", v)}
          />
          <TextAreaField
            label="Short Card Description *"
            required
            rows={2}
            value={draft.description}
            onChange={(v) => set("description", v)}
          />
        </>
      );

    case "story":
      return (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              label="Small Tag"
              value={draft.badge}
              onChange={(v) => set("badge", v)}
            />
            <TextField
              label="Story Heading *"
              required
              value={draft.title}
              onChange={(v) => set("title", v)}
            />
          </div>
          <TextAreaField
            label="Story Text *"
            required
            rows={4}
            value={draft.description}
            onChange={(v) => set("description", v)}
          />
          <TextField
            label="Italic Montessori Quote"
            value={draft.subtitle}
            onChange={(v) => set("subtitle", v)}
          />
          <ImageUploadField
            label="Campus Feature Photo"
            value={draft.imageUrl}
            onChange={(v) => set("imageUrl", v)}
          />
          <TextField
            label="Logo Box Caption"
            value={draft.logoCaption}
            onChange={(v) => set("logoCaption", v)}
          />
          <div className="grid grid-cols-1 gap-4 rounded-2xl bg-[#FFF8F5] p-4 sm:grid-cols-2">
            <div className="space-y-3">
              <TextField
                label="Vision Box Heading"
                value={draft.visionTitle}
                onChange={(v) => set("visionTitle", v)}
              />
              <TextAreaField
                label="Vision Statement"
                rows={3}
                value={draft.visionText}
                onChange={(v) => set("visionText", v)}
              />
            </div>
            <div className="space-y-3">
              <TextField
                label="Mission Box Heading"
                value={draft.missionTitle}
                onChange={(v) => set("missionTitle", v)}
              />
              <TextAreaField
                label="Mission Statement"
                rows={3}
                value={draft.missionText}
                onChange={(v) => set("missionText", v)}
              />
            </div>
          </div>
        </>
      );

    case "value":
      return (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              label="Value Title *"
              required
              value={draft.title}
              onChange={(v) => set("title", v)}
            />
            <SelectField
              label="Icon"
              value={draft.iconName}
              options={ICON_OPTIONS}
              onChange={(v) => set("iconName", v)}
            />
          </div>
          <AccentSwatchPicker
            value={draft.accent}
            onChange={(v) => set("accent", v)}
          />
          <NumberField
            label="Display Order"
            value={draft.sortOrder}
            onChange={(v) => set("sortOrder", v)}
          />
          <TextAreaField
            label="Description *"
            required
            value={draft.description}
            onChange={(v) => set("description", v)}
          />
        </>
      );

    case "pillar":
      return (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              label="Pillar Title *"
              required
              value={draft.title}
              onChange={(v) => set("title", v)}
            />
            <TextField
              label="Short Subtitle"
              value={draft.subtitle}
              onChange={(v) => set("subtitle", v)}
            />
            <SelectField
              label="Icon"
              value={draft.iconName}
              options={ICON_OPTIONS}
              onChange={(v) => set("iconName", v)}
            />
            <NumberField
              label="Display Order"
              value={draft.sortOrder}
              onChange={(v) => set("sortOrder", v)}
            />
          </div>
          <AccentSwatchPicker
            value={draft.accent}
            onChange={(v) => set("accent", v)}
          />
          <TextAreaField
            label="Description *"
            required
            value={draft.description}
            onChange={(v) => set("description", v)}
          />
          <TextAreaField
            label="Classroom Activities (one per line)"
            rows={4}
            value={draft.activitiesText}
            onChange={(v) => set("activitiesText", v)}
            placeholder={"Pouring & spooning trays\nDressing frames & folding"}
          />
        </>
      );

    case "routine":
      return (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              label="Time Slot * (e.g. 9:00 AM – 9:30 AM)"
              required
              value={draft.badge || draft.subtitle}
              onChange={(v) =>
                setDraft({ ...draft, badge: v, subtitle: v })
              }
            />
            <TextField
              label="Activity Name *"
              required
              value={draft.title}
              onChange={(v) => set("title", v)}
            />
            <SelectField
              label="Icon"
              value={draft.iconName}
              options={ICON_OPTIONS}
              onChange={(v) => set("iconName", v)}
            />
            <NumberField
              label="Display Order"
              value={draft.sortOrder}
              onChange={(v) => set("sortOrder", v)}
            />
          </div>
          <AccentSwatchPicker
            value={draft.accent}
            onChange={(v) => set("accent", v)}
          />
          <TextAreaField
            label="What Happens During This Block *"
            required
            value={draft.description}
            onChange={(v) => set("description", v)}
          />
        </>
      );

    case "admission-step":
      return (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <TextField
              label="Step # (e.g. 01)"
              required
              value={draft.badge}
              onChange={(v) => set("badge", v)}
            />
            <div className="sm:col-span-2">
              <TextField
                label="Step Title *"
                required
                value={draft.title}
                onChange={(v) => set("title", v)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectField
              label="Icon"
              value={draft.iconName}
              options={ICON_OPTIONS}
              onChange={(v) => set("iconName", v)}
            />
            <NumberField
              label="Display Order"
              value={draft.sortOrder}
              onChange={(v) => set("sortOrder", v)}
            />
          </div>
          <AccentSwatchPicker
            value={draft.accent}
            onChange={(v) => set("accent", v)}
          />
          <TextAreaField
            label="Step Description *"
            required
            value={draft.description}
            onChange={(v) => set("description", v)}
          />
        </>
      );

    case "age-row":
      return (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              label="Program Name *"
              required
              value={draft.title}
              onChange={(v) => set("title", v)}
            />
            <TextField
              label="Age Range * (e.g. 2.5 – 3.5 Years)"
              required
              value={draft.badge}
              onChange={(v) => set("badge", v)}
            />
            <TextField
              label="Session Timing"
              value={draft.subtitle}
              onChange={(v) => set("subtitle", v)}
              placeholder="9:00 AM – 3:00 PM (Care till 5 PM)"
            />
            <NumberField
              label="Display Order"
              value={draft.sortOrder}
              onChange={(v) => set("sortOrder", v)}
            />
          </div>
          <AccentSwatchPicker
            value={draft.accent}
            onChange={(v) => set("accent", v)}
          />
          <TextField
            label="Eligibility Note"
            value={draft.description}
            onChange={(v) => set("description", v)}
          />
        </>
      );

    case "admission-req":
      return (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              label="Document Name *"
              required
              value={draft.title}
              onChange={(v) => set("title", v)}
            />
            <NumberField
              label="Display Order"
              value={draft.sortOrder}
              onChange={(v) => set("sortOrder", v)}
            />
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-[#2D3436]">
            <input
              type="checkbox"
              checked={draft.requiredDoc}
              onChange={(e) => set("requiredDoc", e.target.checked)}
              className="h-4 w-4 accent-[#E91E63]"
            />
            <span>Required document (uncheck if optional)</span>
          </label>
          <TextAreaField
            label="Details for Parents *"
            required
            rows={2}
            value={draft.description}
            onChange={(v) => set("description", v)}
          />
        </>
      );

    case "faq":
      return (
        <>
          <TextField
            label="Parent Question *"
            required
            value={draft.title}
            onChange={(v) => set("title", v)}
          />
          <TextAreaField
            label="Answer *"
            required
            rows={4}
            value={draft.description}
            onChange={(v) => set("description", v)}
          />
          <NumberField
            label="Display Order"
            value={draft.sortOrder}
            onChange={(v) => set("sortOrder", v)}
          />
        </>
      );

    case "cta":
      return (
        <>
          <TextField
            label="Top Badge"
            value={draft.badge}
            onChange={(v) => set("badge", v)}
          />
          <TextField
            label="Banner Headline *"
            required
            value={draft.title}
            onChange={(v) => set("title", v)}
          />
          <TextAreaField
            label="Banner Description *"
            required
            value={draft.description}
            onChange={(v) => set("description", v)}
          />
        </>
      );
  }
}

function SpotlightBlock({
  label,
  helper,
  item,
  onEdit,
  onTogglePublish,
}: {
  label: string;
  helper: string;
  item?: AdminPageSection;
  onEdit: () => void;
  onTogglePublish: () => void;
}) {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-[#2D3436]/8 bg-white p-6 shadow-warm">
      <div>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="font-[family-name:var(--font-fredoka)] text-lg font-semibold text-[#2D3436]">
              {label}
            </h3>
            <p className="mt-0.5 text-xs text-[#78909C]">{helper}</p>
          </div>
          {item && (
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                item.published
                  ? "bg-[#26A69A]/15 text-[#26A69A]"
                  : "bg-[#78909C]/15 text-[#78909C]"
              }`}
            >
              {item.published ? "Live" : "Hidden"}
            </span>
          )}
        </div>

        {item ? (
          <div className="mt-4 flex items-start gap-3 rounded-2xl bg-[#FFF8F5] p-3.5">
            {item.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-16 w-20 shrink-0 rounded-xl border border-[#2D3436]/10 bg-white object-cover"
              />
            )}
            <div className="min-w-0">
              <p className="line-clamp-2 text-sm font-semibold text-[#2D3436]">
                {item.title}
              </p>
              <p className="mt-1 line-clamp-2 text-xs text-[#78909C]">
                {item.description}
              </p>
            </div>
          </div>
        ) : (
          <EmptyHint text="Not configured yet. Click Setup Section below." />
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#2D3436]/8 pt-4">
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#E91E63] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#E91E63]/90"
        >
          {item ? (
            <>
              <Pencil className="h-3.5 w-3.5" />
              <span>Edit {label}</span>
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" />
              <span>Setup Section</span>
            </>
          )}
        </button>

        {item && (
          <button
            type="button"
            onClick={onTogglePublish}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#26A69A]/25 bg-white px-4 py-2 text-xs font-semibold text-[#26A69A] hover:bg-[#26A69A]/10"
          >
            {item.published ? (
              <>
                <EyeOff className="h-3.5 w-3.5" />
                <span>Hide Section</span>
              </>
            ) : (
              <>
                <Eye className="h-3.5 w-3.5" />
                <span>Show Live</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function EmptyHint({ text }: { text: string }) {
  return (
    <p className="mt-4 rounded-2xl bg-[#FFF8F5] p-5 text-center text-xs text-[#78909C]">
      {text}
    </p>
  );
}
