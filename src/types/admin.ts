export interface AdminSiteSettings {
  id: string;
  schoolName: string;
  shortName: string;
  schoolType: string;
  tagline: string;
  subTagline: string;
  logoUrl: string;
  establishedYear: string;
  street: string;
  ward: string;
  city: string;
  province: string;
  country: string;
  fullAddress: string;
  landmark: string;
  primaryPhone: string;
  secondaryPhone: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  email: string;
  admissionsEmail: string;
  openDays: string;
  regularClassTime: string;
  afterClassCareTime: string;
  daycareTime: string;
  closedOn: string;
  daycareAvailable: boolean;
  foodProvided: boolean;
  cctvMonitoring: boolean;
  montessoriImplemented: boolean;
  facebookUrl: string;
  facebookHandle: string;
  instagramUrl: string;
  instagramHandle: string;
  googleMapsEmbedUrl: string;
  googleMapsLinkUrl: string;
  heroStats: unknown;
}

export interface AdminProgram {
  id: string;
  slug: string;
  programType: string;
  badge: string | null;
  title: string;
  subtitle: string;
  ageGroup: string;
  ageEligibility: string | null;
  timing: string;
  duration: string | null;
  classSize: string | null;
  ratio: string | null;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  curriculumAreas: string[];
  iconName: string;
  accent: string;
  imageUrl: string;
  imageAlt: string;
  sortOrder: number;
  published: boolean;
}

export interface AdminFacility {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  iconName: string;
  accent: string;
  imageUrl: string;
  imageAlt: string;
  showOnHome: boolean;
  sortOrder: number;
  published: boolean;
}

export interface AdminGalleryImage {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  description: string;
  imageUrl: string;
  dateLabel: string;
  aspect: string;
  sortOrder: number;
  published: boolean;
}

export interface AdminTestimonial {
  id: string;
  parentName: string;
  relation: string;
  childName: string;
  program: string;
  quote: string;
  rating: number;
  location: string;
  accent: string;
  sortOrder: number;
  published: boolean;
}

export interface AdminTeamMember {
  id: string;
  name: string;
  role: string;
  qualification: string;
  experience: string;
  bio: string;
  quote: string;
  imageUrl: string;
  accent: string;
  sortOrder: number;
  published: boolean;
}

export interface AdminFoodMenu {
  id: string;
  day: string;
  morningSnack: string;
  hotLunch: string;
  afternoonBooster: string;
  accent: string;
  sortOrder: number;
  published: boolean;
}

export interface AdminPageSection {
  id: string;
  page: string;
  sectionKey: string;
  category: string;
  badge: string | null;
  title: string;
  subtitle: string | null;
  description: string;
  imageUrl: string | null;
  imageAlt: string | null;
  iconName: string;
  accent: string;
  metadata: Record<string, unknown> | null;
  sortOrder: number;
  published: boolean;
}

export interface AdminContactInquiry {
  id: string;
  parentName: string;
  phone: string;
  email: string | null;
  childName: string | null;
  childAge: string | null;
  program: string | null;
  preferredCare: string | null;
  preferredDate: string | null;
  message: string | null;
  status: string;
  published: boolean;
  createdAt: string;
}

export interface AdminInitialData {
  settings: AdminSiteSettings | null;
  programs: AdminProgram[];
  facilities: AdminFacility[];
  gallery: AdminGalleryImage[];
  testimonials: AdminTestimonial[];
  team: AdminTeamMember[];
  menu: AdminFoodMenu[];
  sections: AdminPageSection[];
  inquiries: AdminContactInquiry[];
}
