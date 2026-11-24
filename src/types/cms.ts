export type BrandAccent =
  "magenta" | "orange" | "teal" | "coral" | "olive" | "blue";

export type IconName =
  | "heart"
  | "shield"
  | "sparkles"
  | "users"
  | "sun"
  | "book"
  | "palette"
  | "music"
  | "sprout"
  | "clock"
  | "smile"
  | "award"
  | "compass"
  | "blocks"
  | "handHeart"
  | "messageCircle"
  | "calendarCheck"
  | "fileCheck"
  | "partyPopper"
  | "utensils"
  | "trees"
  | "camera"
  | "apple"
  | "bed";

export interface SiteConfig {
  schoolName: string;
  shortName: string;
  schoolType: string;
  tagline: string;
  subTagline: string;
  logoPath: string;
  establishedYear: string;
  address: {
    street: string;
    ward: string;
    city: string;
    province: string;
    country: string;
    fullAddress: string;
    landmark: string;
  };
  contact: {
    primaryPhone: string;
    secondaryPhone: string;
    whatsappNumber: string;
    whatsappDisplay: string;
    email: string;
    admissionsEmail: string;
  };
  hours: {
    days: string;
    regularClassTime: string;
    afterClassCareTime: string;
    daycareTime: string;
    schoolTime: string;
    officeTime: string;
    closedOn: string;
  };
  social: {
    facebookUrl: string;
    facebookHandle: string;
    instagramUrl: string;
    instagramHandle: string;
  };
  googleMapsEmbedUrl: string;
  googleMapsLinkUrl: string;
  heroStats: Array<{
    value: string;
    label: string;
    accent: BrandAccent;
  }>;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  iconName: IconName;
  accent: BrandAccent;
}

export interface CareTrackItem {
  id: string;
  title: string;
  badge: string;
  timing: string;
  ageRange: string;
  description: string;
  features: string[];
  iconName: IconName;
  accent: BrandAccent;
  image: string;
  imageAlt: string;
}

export interface ProgramItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  ageGroup: string;
  ageEligibility: string;
  duration: string;
  classSize: string;
  ratio: string;
  schedule: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  curriculumAreas: string[];
  accent: BrandAccent;
  image: string;
  imageAlt: string;
}

export interface TestimonialItem {
  id: string;
  parentName: string;
  relation: string;
  childName: string;
  program: string;
  quote: string;
  rating: number;
  location: string;
  accent: BrandAccent;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  qualification: string;
  experience: string;
  bio: string;
  quote: string;
  image: string;
  accent: BrandAccent;
}

export interface ValueItem {
  id: string;
  title: string;
  description: string;
  iconName: IconName;
  accent: BrandAccent;
}

export interface FacilityItem {
  id: string;
  title: string;
  description: string;
  iconName: IconName;
  accent: BrandAccent;
  image: string;
  imageAlt: string;
}

export interface DetailedFacilityItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  iconName: IconName;
  accent: BrandAccent;
  image: string;
  imageAlt: string;
}

export interface WeeklyMenuItem {
  id: string;
  day: string;
  morningSnack: string;
  hotLunch: string;
  afternoonBooster: string;
  accent: BrandAccent;
}

export interface LearningPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  activities: string[];
  iconName: IconName;
  accent: BrandAccent;
}

export interface RoutineItem {
  id: string;
  time: string;
  activity: string;
  description: string;
  iconName: IconName;
  accent: BrandAccent;
}

export type GalleryCategory =
  "all" | "montessori" | "outdoor" | "art" | "events";

export interface GalleryItem {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, "all">;
  categoryLabel: string;
  description: string;
  imageUrl: string;
  date: string;
  aspect?: "tall" | "wide" | "square";
}

export interface AdmissionStep {
  stepNumber: string;
  title: string;
  description: string;
  iconName: IconName;
  accent: BrandAccent;
}

export interface AdmissionRequirement {
  id: string;
  label: string;
  detail: string;
  required: boolean;
}

export interface AgeEligibilityRow {
  id: string;
  program: string;
  ageRange: string;
  cutOffNote: string;
  sessionTiming: string;
  accent: BrandAccent;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface PopupNotificationItem {
  id: string;
  badge?: string;
  title: string;
  message: string;
  imageUrl?: string;
  imageAlt?: string;
  ctaLabel?: string;
  ctaHref?: string;
  accent: BrandAccent;
}

export type NoticeCategory =
  | "all"
  | "notice"
  | "exam"
  | "offer"
  | "event"
  | "holiday";

export interface NoticeItem {
  id: string;
  title: string;
  category: Exclude<NoticeCategory, "all">;
  summary: string;
  content: string;
  noticeDate: string;
  attachmentUrl?: string;
  attachmentType?: "image" | "pdf" | "file";
  attachmentName?: string;
  accent: BrandAccent;
  highlightOnHome: boolean;
  createdAt: string;
}
