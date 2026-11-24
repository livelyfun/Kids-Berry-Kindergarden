import { and, asc, desc, eq } from "drizzle-orm";
import {
  db,
  facilities,
  foodMenus,
  galleryImages,
  notices,
  pageSections,
  popupNotifications,
  programs,
  siteSettings,
  teamMembers,
  testimonials,
} from "@/db";
import {
  ADMISSION_FAQS,
  ADMISSION_REQUIREMENTS,
  ADMISSION_STEPS,
  AGE_ELIGIBILITY,
  CARE_TRACKS,
  CORE_VALUES,
  DAILY_ROUTINE,
  DETAILED_FACILITIES,
  GALLERY_ITEMS,
  LEARNING_PILLARS,
  PROGRAMS,
  SITE_CONFIG,
  TEAM_MEMBERS,
  TESTIMONIALS,
  WEEKLY_MENU,
} from "@/data/site-data";
import type {
  AdmissionRequirement,
  AdmissionStep,
  AgeEligibilityRow,
  BrandAccent,
  CareTrackItem,
  DetailedFacilityItem,
  FAQItem,
  FacilityItem,
  GalleryCategory,
  GalleryItem,
  IconName,
  LearningPillar,
  NoticeCategory,
  NoticeItem,
  PopupNotificationItem,
  ProgramItem,
  RoutineItem,
  SiteConfig,
  TeamMember,
  TestimonialItem,
  ValueItem,
  WeeklyMenuItem,
} from "@/types/cms";

const VALID_ACCENTS: BrandAccent[] = [
  "magenta",
  "orange",
  "teal",
  "coral",
  "olive",
  "blue",
];

function asAccent(val: unknown, fallback: BrandAccent = "magenta"): BrandAccent {
  if (typeof val === "string" && VALID_ACCENTS.includes(val as BrandAccent)) {
    return val as BrandAccent;
  }
  return fallback;
}

function asIcon(val: unknown, fallback: IconName = "sparkles"): IconName {
  if (typeof val === "string" && val.length > 0) {
    return val as IconName;
  }
  return fallback;
}

function asStringArray(val: unknown): string[] {
  if (Array.isArray(val)) {
    return val.map((item) => String(item)).filter(Boolean);
  }
  return [];
}

function asRecord(val: unknown): Record<string, unknown> {
  if (val && typeof val === "object" && !Array.isArray(val)) {
    return val as Record<string, unknown>;
  }
  return {};
}

export interface ExtendedSiteConfig extends SiteConfig {
  daycareAvailable: boolean;
  foodProvided: boolean;
  cctvMonitoring: boolean;
  montessoriImplemented: boolean;
}

export interface HeroSectionData {
  id: string;
  badge: string;
  title: string;
  highlightWord: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
}

export interface PhilosophySectionData {
  id: string;
  badge: string;
  title: string;
  quote: string;
  description: string;
  primaryImageUrl: string;
  primaryImageAlt: string;
  secondaryImageUrl: string;
  secondaryImageAlt: string;
  statValue: string;
  statLabel: string;
  quoteAuthor: string;
}

export interface CareGridCardData {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  accent: BrandAccent;
}

export interface AboutStoryData {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  visionTitle: string;
  visionText: string;
  missionTitle: string;
  missionText: string;
  logoCaption: string;
}

export interface SharedCtaData {
  badge: string;
  title: string;
  description: string;
}

export async function getCmsSiteConfig(): Promise<ExtendedSiteConfig> {
  try {
    const [row] = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.id, "default"))
      .limit(1);
    if (!row) {
      return {
        ...SITE_CONFIG,
        daycareAvailable: true,
        foodProvided: true,
        cctvMonitoring: true,
        montessoriImplemented: true,
      };
    }

    const heroStatsRaw = Array.isArray(row.heroStats) ? row.heroStats : [];
    const heroStats =
      heroStatsRaw.length > 0
        ? heroStatsRaw.map((item) => {
            const obj = asRecord(item);
            return {
              value: String(obj.value || ""),
              label: String(obj.label || ""),
              accent: asAccent(obj.accent, "magenta"),
            };
          })
        : SITE_CONFIG.heroStats;

    return {
      schoolName: row.schoolName,
      shortName: row.shortName,
      schoolType: row.schoolType,
      tagline: row.tagline,
      subTagline: row.subTagline,
      logoPath: row.logoUrl || "/images/kids-berry-logo.jpg",
      establishedYear: row.establishedYear,
      address: {
        street: row.street,
        ward: row.ward,
        city: row.city,
        province: row.province,
        country: row.country,
        fullAddress: row.fullAddress,
        landmark: row.landmark,
      },
      contact: {
        primaryPhone: row.primaryPhone,
        secondaryPhone: row.secondaryPhone,
        whatsappNumber: row.whatsappNumber,
        whatsappDisplay: row.whatsappDisplay,
        email: row.email,
        admissionsEmail: row.admissionsEmail,
      },
      hours: {
        days: row.openDays,
        regularClassTime: row.regularClassTime,
        afterClassCareTime: row.afterClassCareTime,
        daycareTime: row.daycareTime,
        schoolTime: `${row.regularClassTime} (Regular Class)`,
        officeTime: `${row.afterClassCareTime} (After-Class Care & Daycare)`,
        closedOn: row.closedOn,
      },
      social: {
        facebookUrl: row.facebookUrl,
        facebookHandle: row.facebookHandle,
        instagramUrl: row.instagramUrl,
        instagramHandle: row.instagramHandle,
      },
      googleMapsEmbedUrl: row.googleMapsEmbedUrl,
      googleMapsLinkUrl: row.googleMapsLinkUrl,
      heroStats,
      daycareAvailable: row.daycareAvailable,
      foodProvided: row.foodProvided,
      cctvMonitoring: row.cctvMonitoring,
      montessoriImplemented: row.montessoriImplemented,
    };
  } catch {
    return {
      ...SITE_CONFIG,
      daycareAvailable: true,
      foodProvided: true,
      cctvMonitoring: true,
      montessoriImplemented: true,
    };
  }
}

export async function getPublishedHeroSection(): Promise<HeroSectionData | null> {
  try {
    const [hero] = await db
      .select()
      .from(pageSections)
      .where(
        and(
          eq(pageSections.category, "hero"),
          eq(pageSections.published, true),
        ),
      )
      .orderBy(asc(pageSections.sortOrder))
      .limit(1);
    if (!hero) return null;
    const meta = asRecord(hero.metadata);
    return {
      id: hero.id,
      badge: hero.badge || "",
      title: hero.title,
      highlightWord: hero.subtitle || "Montessori",
      description: hero.description,
      imageUrl: hero.imageUrl || "/images/hero-classroom.jpg",
      imageAlt:
        hero.imageAlt || "Children learning at Kids Berry Kindergarten School",
      primaryCtaLabel: String(
        meta.primaryCtaLabel || "Schedule a Campus Visit",
      ),
      primaryCtaHref: String(meta.primaryCtaHref || "/contact"),
      secondaryCtaLabel: String(
        meta.secondaryCtaLabel || "WhatsApp Admissions",
      ),
    };
  } catch {
    return {
      id: "home-hero",
      badge: "Montessori Implemented Pre-school & Daycare • Pichara, Biratnagar-11",
      title: "Where Little Minds Grow with Montessori Joy & Care",
      highlightWord: "Montessori",
      description: SITE_CONFIG.subTagline,
      imageUrl: "/images/hero-classroom.jpg",
      imageAlt:
        "Happy children learning with wooden Montessori materials at Kids Berry Kindergarten School",
      primaryCtaLabel: "Schedule a Campus Visit",
      primaryCtaHref: "/contact",
      secondaryCtaLabel: "WhatsApp Admissions",
    };
  }
}

export async function getPublishedPhilosophySection(): Promise<PhilosophySectionData | null> {
  try {
    const [sec] = await db
      .select()
      .from(pageSections)
      .where(
        and(
          eq(pageSections.category, "philosophy"),
          eq(pageSections.published, true),
        ),
      )
      .orderBy(asc(pageSections.sortOrder))
      .limit(1);
    if (!sec) return null;
    const meta = asRecord(sec.metadata);
    return {
      id: sec.id,
      badge: sec.badge || "Our Montessori Philosophy",
      title: sec.title,
      quote: sec.subtitle || "",
      description: sec.description,
      primaryImageUrl: sec.imageUrl || "/images/about-story.jpg",
      primaryImageAlt: sec.imageAlt || "Kids Berry Kindergarten Philosophy",
      secondaryImageUrl: String(
        meta.secondaryImageUrl || "/images/gallery-art.jpg",
      ),
      secondaryImageAlt: String(
        meta.secondaryImageAlt || "Children painting watercolor flowers",
      ),
      statValue: String(meta.statValue || "1:8"),
      statLabel: String(meta.statLabel || "Loving Educator–Child Ratio"),
      quoteAuthor: String(
        meta.quoteAuthor || "Montessori Implemented Pre-school & Daycare",
      ),
    };
  } catch {
    return null;
  }
}

export async function getPublishedCareGridItems(): Promise<CareGridCardData[]> {
  try {
    const rows = await db
      .select()
      .from(pageSections)
      .where(
        and(
          eq(pageSections.category, "care-grid"),
          eq(pageSections.published, true),
        ),
      )
      .orderBy(asc(pageSections.sortOrder), asc(pageSections.createdAt));
    return rows.map((row) => {
      const meta = asRecord(row.metadata);
      return {
        id: row.id,
        tag: row.badge || "Kids Berry Care",
        title: row.title,
        description: row.description,
        image: row.imageUrl || "/images/hero-classroom.jpg",
        imageAlt: row.imageAlt || row.title,
        href: String(meta.href || "/facilities"),
        accent: asAccent(row.accent, "magenta"),
      };
    });
  } catch {
    return [];
  }
}

export async function getPublishedAboutStory(): Promise<AboutStoryData | null> {
  try {
    const [sec] = await db
      .select()
      .from(pageSections)
      .where(
        and(
          eq(pageSections.category, "story"),
          eq(pageSections.published, true),
        ),
      )
      .orderBy(asc(pageSections.sortOrder))
      .limit(1);
    if (!sec) return null;
    const meta = asRecord(sec.metadata);
    return {
      id: sec.id,
      badge: sec.badge || "Our Story & Philosophy",
      title: sec.title,
      subtitle: sec.subtitle || "",
      description: sec.description,
      imageUrl: sec.imageUrl || "/images/hero-classroom.jpg",
      imageAlt: sec.imageAlt || "Sunlit Montessori classroom",
      visionTitle: String(meta.visionTitle || "Our Vision"),
      visionText: String(meta.visionText || ""),
      missionTitle: String(meta.missionTitle || "Our Mission"),
      missionText: String(meta.missionText || ""),
      logoCaption: String(meta.logoCaption || ""),
    };
  } catch {
    return null;
  }
}

export async function getPublishedSharedCta(): Promise<SharedCtaData | null> {
  try {
    const [sec] = await db
      .select()
      .from(pageSections)
      .where(
        and(
          eq(pageSections.category, "cta"),
          eq(pageSections.published, true),
        ),
      )
      .orderBy(asc(pageSections.sortOrder))
      .limit(1);
    if (!sec) return null;
    return {
      badge: sec.badge || "Admissions Open • Regular & Daycare",
      title: sec.title,
      description: sec.description,
    };
  } catch {
    return {
      badge: "Admissions Open • Regular & Daycare",
      title:
        "Come Visit Kids Berry Kindergarten School in Pichara, Biratnagar-11",
      description:
        "Tour our CCTV-monitored Montessori classrooms, inspect our clean kitchen & weekly food menu, and speak with our warm educators.",
    };
  }
}

export async function getPublishedCareTracks(): Promise<CareTrackItem[]> {
  try {
    const rows = await db
      .select()
      .from(programs)
      .where(
        and(
          eq(programs.programType, "CARE_TRACK"),
          eq(programs.published, true),
        ),
      )
      .orderBy(asc(programs.sortOrder), asc(programs.createdAt));
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      badge: row.badge || "Schedule",
      timing: row.timing,
      ageRange: row.ageGroup,
      description: row.shortDescription,
      features: asStringArray(row.highlights),
      iconName: asIcon(row.iconName, "blocks"),
      accent: asAccent(row.accent, "magenta"),
      image: row.imageUrl,
      imageAlt: row.imageAlt,
    }));
  } catch {
    return CARE_TRACKS;
  }
}

export async function getPublishedPrograms(): Promise<ProgramItem[]> {
  try {
    const rows = await db
      .select()
      .from(programs)
      .where(
        and(
          eq(programs.programType, "ACADEMIC"),
          eq(programs.published, true),
        ),
      )
      .orderBy(asc(programs.sortOrder), asc(programs.createdAt));
    return rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      title: row.title,
      subtitle: row.subtitle,
      ageGroup: row.ageGroup,
      ageEligibility: row.ageEligibility || row.ageGroup,
      duration: row.duration || row.timing,
      classSize: row.classSize || "Small Group",
      ratio: row.ratio || "Caring Ratio",
      schedule: row.timing,
      shortDescription: row.shortDescription,
      fullDescription: row.fullDescription,
      highlights: asStringArray(row.highlights),
      curriculumAreas: asStringArray(row.curriculumAreas),
      accent: asAccent(row.accent, "magenta"),
      image: row.imageUrl,
      imageAlt: row.imageAlt,
    }));
  } catch {
    return PROGRAMS;
  }
}

export async function getPublishedFacilities(
  homeOnly = false,
): Promise<DetailedFacilityItem[]> {
  try {
    const rows = await db
      .select()
      .from(facilities)
      .where(
        homeOnly
          ? and(eq(facilities.published, true), eq(facilities.showOnHome, true))
          : eq(facilities.published, true),
      )
      .orderBy(asc(facilities.sortOrder), asc(facilities.createdAt));
    return rows.map((row) => ({
      id: row.id,
      badge: row.badge,
      title: row.title,
      subtitle: row.subtitle,
      description: row.description,
      highlights: asStringArray(row.highlights),
      iconName: asIcon(row.iconName, "shield"),
      accent: asAccent(row.accent, "magenta"),
      image: row.imageUrl,
      imageAlt: row.imageAlt,
    }));
  } catch {
    return DETAILED_FACILITIES;
  }
}

export async function getPublishedHomeFacilities(): Promise<FacilityItem[]> {
  const rows = await getPublishedFacilities(true);
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description,
    iconName: r.iconName,
    accent: r.accent,
    image: r.image,
    imageAlt: r.imageAlt,
  }));
}

export async function getPublishedGalleryItems(): Promise<GalleryItem[]> {
  try {
    const rows = await db
      .select()
      .from(galleryImages)
      .where(eq(galleryImages.published, true))
      .orderBy(asc(galleryImages.sortOrder), desc(galleryImages.createdAt));
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      category: (["montessori", "outdoor", "art", "events"].includes(
        row.category,
      )
        ? row.category
        : "montessori") as Exclude<GalleryCategory, "all">,
      categoryLabel: row.categoryLabel,
      description: row.description,
      imageUrl: row.imageUrl,
      date: row.dateLabel,
      aspect: (["tall", "wide", "square"].includes(row.aspect)
        ? row.aspect
        : "square") as "tall" | "wide" | "square",
    }));
  } catch {
    return GALLERY_ITEMS;
  }
}

export async function getPublishedTestimonials(): Promise<TestimonialItem[]> {
  try {
    const rows = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.published, true))
      .orderBy(asc(testimonials.sortOrder), desc(testimonials.createdAt));
    return rows.map((row) => ({
      id: row.id,
      parentName: row.parentName,
      relation: row.relation,
      childName: row.childName,
      program: row.program,
      quote: row.quote,
      rating: row.rating,
      location: row.location,
      accent: asAccent(row.accent, "magenta"),
    }));
  } catch {
    return TESTIMONIALS;
  }
}

export async function getPublishedTeamMembers(): Promise<TeamMember[]> {
  try {
    const rows = await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.published, true))
      .orderBy(asc(teamMembers.sortOrder), asc(teamMembers.createdAt));
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      role: row.role,
      qualification: row.qualification,
      experience: row.experience,
      bio: row.bio,
      quote: row.quote,
      image: row.imageUrl,
      accent: asAccent(row.accent, "magenta"),
    }));
  } catch {
    return TEAM_MEMBERS;
  }
}

export async function getPublishedWeeklyMenu(): Promise<WeeklyMenuItem[]> {
  try {
    const rows = await db
      .select()
      .from(foodMenus)
      .where(eq(foodMenus.published, true))
      .orderBy(asc(foodMenus.sortOrder), asc(foodMenus.createdAt));
    return rows.map((row) => ({
      id: row.id,
      day: row.day,
      morningSnack: row.morningSnack,
      hotLunch: row.hotLunch,
      afternoonBooster: row.afternoonBooster,
      accent: asAccent(row.accent, "magenta"),
    }));
  } catch {
    return WEEKLY_MENU;
  }
}

export async function getPublishedCoreValues(): Promise<ValueItem[]> {
  try {
    const rows = await db
      .select()
      .from(pageSections)
      .where(
        and(
          eq(pageSections.category, "value"),
          eq(pageSections.published, true),
        ),
      )
      .orderBy(asc(pageSections.sortOrder), asc(pageSections.createdAt));
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      iconName: asIcon(row.iconName, "heart"),
      accent: asAccent(row.accent, "magenta"),
    }));
  } catch {
    return CORE_VALUES;
  }
}

export async function getPublishedLearningPillars(): Promise<LearningPillar[]> {
  try {
    const rows = await db
      .select()
      .from(pageSections)
      .where(
        and(
          eq(pageSections.category, "pillar"),
          eq(pageSections.published, true),
        ),
      )
      .orderBy(asc(pageSections.sortOrder), asc(pageSections.createdAt));
    return rows.map((row) => {
      const meta = asRecord(row.metadata);
      return {
        id: row.id,
        title: row.title,
        subtitle: row.subtitle || "",
        description: row.description,
        activities: asStringArray(meta.activities),
        iconName: asIcon(row.iconName, "sparkles"),
        accent: asAccent(row.accent, "magenta"),
      };
    });
  } catch {
    return LEARNING_PILLARS;
  }
}

export async function getPublishedDailyRoutine(): Promise<RoutineItem[]> {
  try {
    const rows = await db
      .select()
      .from(pageSections)
      .where(
        and(
          eq(pageSections.category, "routine"),
          eq(pageSections.published, true),
        ),
      )
      .orderBy(asc(pageSections.sortOrder), asc(pageSections.createdAt));
    return rows.map((row) => ({
      id: row.id,
      time: row.subtitle || row.badge || "",
      activity: row.title,
      description: row.description,
      iconName: asIcon(row.iconName, "clock"),
      accent: asAccent(row.accent, "magenta"),
    }));
  } catch {
    return DAILY_ROUTINE;
  }
}

export async function getPublishedAdmissionSteps(): Promise<AdmissionStep[]> {
  try {
    const rows = await db
      .select()
      .from(pageSections)
      .where(
        and(
          eq(pageSections.category, "admission-step"),
          eq(pageSections.published, true),
        ),
      )
      .orderBy(asc(pageSections.sortOrder), asc(pageSections.createdAt));
    return rows.map((row, index) => ({
      stepNumber: row.badge || `0${index + 1}`,
      title: row.title,
      description: row.description,
      iconName: asIcon(row.iconName, "calendarCheck"),
      accent: asAccent(row.accent, "magenta"),
    }));
  } catch {
    return ADMISSION_STEPS;
  }
}

export async function getPublishedAdmissionRequirements(): Promise<
  AdmissionRequirement[]
> {
  try {
    const rows = await db
      .select()
      .from(pageSections)
      .where(
        and(
          eq(pageSections.category, "admission-req"),
          eq(pageSections.published, true),
        ),
      )
      .orderBy(asc(pageSections.sortOrder), asc(pageSections.createdAt));
    return rows.map((row) => {
      const meta = asRecord(row.metadata);
      return {
        id: row.id,
        label: row.title,
        detail: row.description,
        required: meta.required !== false,
      };
    });
  } catch {
    return ADMISSION_REQUIREMENTS;
  }
}

export async function getPublishedAgeEligibility(): Promise<
  AgeEligibilityRow[]
> {
  try {
    const rows = await db
      .select()
      .from(pageSections)
      .where(
        and(
          eq(pageSections.category, "age-row"),
          eq(pageSections.published, true),
        ),
      )
      .orderBy(asc(pageSections.sortOrder), asc(pageSections.createdAt));
    return rows.map((row) => ({
      id: row.id,
      program: row.title,
      ageRange: row.badge || "",
      cutOffNote: row.description,
      sessionTiming: row.subtitle || "",
      accent: asAccent(row.accent, "magenta"),
    }));
  } catch {
    return AGE_ELIGIBILITY;
  }
}

export async function getPublishedAdmissionFAQs(): Promise<FAQItem[]> {
  try {
    const rows = await db
      .select()
      .from(pageSections)
      .where(
        and(
          eq(pageSections.category, "faq"),
          eq(pageSections.published, true),
        ),
      )
      .orderBy(asc(pageSections.sortOrder), asc(pageSections.createdAt));
    return rows.map((row) => ({
      id: row.id,
      question: row.title,
      answer: row.description,
    }));
  } catch {
    return ADMISSION_FAQS;
  }
}

export async function getPublishedPopups(): Promise<PopupNotificationItem[]> {
  try {
    const rows = await db
      .select()
      .from(popupNotifications)
      .where(eq(popupNotifications.published, true))
      .orderBy(
        asc(popupNotifications.sortOrder),
        desc(popupNotifications.createdAt),
      );
    return rows.map((row) => ({
      id: row.id,
      badge: row.badge || undefined,
      title: row.title,
      message: row.message,
      imageUrl: row.imageUrl || undefined,
      imageAlt: row.imageAlt || row.title,
      ctaLabel: row.ctaLabel || undefined,
      ctaHref: row.ctaHref || undefined,
      accent: asAccent(row.accent, "magenta"),
    }));
  } catch {
    return [];
  }
}

const VALID_NOTICE_CATEGORIES: Array<Exclude<NoticeCategory, "all">> = [
  "notice",
  "exam",
  "offer",
  "event",
  "holiday",
];

function asNoticeCategory(val: unknown): Exclude<NoticeCategory, "all"> {
  if (
    typeof val === "string" &&
    VALID_NOTICE_CATEGORIES.includes(val as Exclude<NoticeCategory, "all">)
  ) {
    return val as Exclude<NoticeCategory, "all">;
  }
  return "notice";
}

function asAttachmentType(
  val: unknown,
): "image" | "pdf" | "file" | undefined {
  if (val === "image" || val === "pdf" || val === "file") {
    return val;
  }
  return undefined;
}

export async function getPublishedNotices(): Promise<NoticeItem[]> {
  try {
    const rows = await db
      .select()
      .from(notices)
      .where(eq(notices.published, true))
      .orderBy(asc(notices.sortOrder), desc(notices.createdAt));
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      category: asNoticeCategory(row.category),
      summary: row.summary,
      content: row.content,
      noticeDate: row.noticeDate,
      attachmentUrl: row.attachmentUrl || undefined,
      attachmentType: asAttachmentType(row.attachmentType),
      attachmentName: row.attachmentName || undefined,
      accent: asAccent(row.accent, "magenta"),
      highlightOnHome: row.highlightOnHome,
      createdAt: row.createdAt.toISOString(),
    }));
  } catch {
    return [];
  }
}

export async function getHighlightedNotices(): Promise<NoticeItem[]> {
  try {
    const rows = await db
      .select()
      .from(notices)
      .where(
        and(
          eq(notices.published, true),
          eq(notices.highlightOnHome, true),
        ),
      )
      .orderBy(asc(notices.sortOrder), desc(notices.createdAt));
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      category: asNoticeCategory(row.category),
      summary: row.summary,
      content: row.content,
      noticeDate: row.noticeDate,
      attachmentUrl: row.attachmentUrl || undefined,
      attachmentType: asAttachmentType(row.attachmentType),
      attachmentName: row.attachmentName || undefined,
      accent: asAccent(row.accent, "magenta"),
      highlightOnHome: row.highlightOnHome,
      createdAt: row.createdAt.toISOString(),
    }));
  } catch {
    return [];
  }
}
