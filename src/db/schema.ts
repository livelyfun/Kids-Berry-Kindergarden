import { createId } from "@paralleldrive/cuid2";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// 1. Admin User
export const users = pgTable("User", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  username: text("username").notNull().unique(),
  passwordHash: text("passwordHash").notNull(),
  name: text("name").notNull().default("Administrator"),
  role: text("role").notNull().default("ADMIN"),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});

// 2. Global Site Settings (Singleton row: id = "default")
export const siteSettings = pgTable("SiteSettings", {
  id: text("id").primaryKey().default("default"),
  schoolName: text("schoolName")
    .notNull()
    .default("Kids Berry Kindergarten School"),
  shortName: text("shortName").notNull().default("Kids Berry"),
  schoolType: text("schoolType")
    .notNull()
    .default("Montessori Implemented Pre-school + Daycare"),
  tagline: text("tagline").notNull(),
  subTagline: text("subTagline").notNull(),
  logoUrl: text("logoUrl").notNull().default("/images/kids-berry-logo.jpg"),
  establishedYear: text("establishedYear").notNull().default("2020"),

  // Location
  street: text("street").notNull().default("Pichara, Biratnagar-11"),
  ward: text("ward").notNull().default("Biratnagar-11, Pichara"),
  city: text("city").notNull().default("Biratnagar"),
  province: text("province").notNull().default("Koshi Province"),
  country: text("country").notNull().default("Nepal"),
  fullAddress: text("fullAddress")
    .notNull()
    .default("Pichara, Biratnagar-11, Nepal"),
  landmark: text("landmark").notNull(),

  // Contact
  primaryPhone: text("primaryPhone").notNull(),
  secondaryPhone: text("secondaryPhone").notNull(),
  whatsappNumber: text("whatsappNumber").notNull(),
  whatsappDisplay: text("whatsappDisplay").notNull(),
  email: text("email").notNull(),
  admissionsEmail: text("admissionsEmail").notNull(),

  // Timings & Key Business Flags
  openDays: text("openDays").notNull().default("Sunday – Friday"),
  regularClassTime: text("regularClassTime")
    .notNull()
    .default("9:00 AM – 3:00 PM"),
  afterClassCareTime: text("afterClassCareTime")
    .notNull()
    .default("3:00 PM – 5:00 PM"),
  daycareTime: text("daycareTime").notNull().default("9:00 AM – 5:00 PM"),
  closedOn: text("closedOn")
    .notNull()
    .default("Saturday & Public Holidays"),
  daycareAvailable: boolean("daycareAvailable").notNull().default(true),
  foodProvided: boolean("foodProvided").notNull().default(true),
  cctvMonitoring: boolean("cctvMonitoring").notNull().default(true),
  montessoriImplemented: boolean("montessoriImplemented")
    .notNull()
    .default(true),

  // Social & Maps
  facebookUrl: text("facebookUrl").notNull(),
  facebookHandle: text("facebookHandle").notNull(),
  instagramUrl: text("instagramUrl").notNull(),
  instagramHandle: text("instagramHandle").notNull(),
  googleMapsEmbedUrl: text("googleMapsEmbedUrl").notNull(),
  googleMapsLinkUrl: text("googleMapsLinkUrl").notNull(),
  heroStats: jsonb("heroStats").notNull(),

  updatedAt: timestamp("updatedAt", { mode: "date" })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});

// 3. PageSection (Flexible CMS blocks for Home, About, Programs, Admissions, etc.)
export const pageSections = pgTable(
  "PageSection",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    page: text("page").notNull(),
    sectionKey: text("sectionKey").notNull().unique(),
    category: text("category").notNull(),
    badge: text("badge"),
    title: text("title").notNull(),
    subtitle: text("subtitle"),
    description: text("description").notNull(),
    imageUrl: text("imageUrl"),
    imageAlt: text("imageAlt"),
    iconName: text("iconName").notNull().default("sparkles"),
    accent: text("accent").notNull().default("magenta"),
    metadata: jsonb("metadata"),
    sortOrder: integer("sortOrder").notNull().default(0),
    published: boolean("published").notNull().default(false),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("PageSection_page_category_published_idx").on(
      table.page,
      table.category,
      table.published
    ),
  ]
);

// 4. Program (Care Tracks: Regular/Daycare/After-Class Care + Academic Age Groups)
export const programs = pgTable(
  "Program",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    slug: text("slug").notNull().unique(),
    programType: text("programType").notNull().default("ACADEMIC"),
    badge: text("badge"),
    title: text("title").notNull(),
    subtitle: text("subtitle").notNull(),
    ageGroup: text("ageGroup").notNull(),
    ageEligibility: text("ageEligibility"),
    timing: text("timing").notNull(),
    duration: text("duration"),
    classSize: text("classSize"),
    ratio: text("ratio"),
    shortDescription: text("shortDescription").notNull(),
    fullDescription: text("fullDescription").notNull(),
    highlights: jsonb("highlights").notNull(),
    curriculumAreas: jsonb("curriculumAreas").notNull(),
    iconName: text("iconName").notNull().default("blocks"),
    accent: text("accent").notNull().default("magenta"),
    imageUrl: text("imageUrl").notNull(),
    imageAlt: text("imageAlt").notNull(),
    sortOrder: integer("sortOrder").notNull().default(0),
    published: boolean("published").notNull().default(false),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("Program_programType_published_idx").on(
      table.programType,
      table.published
    ),
  ]
);

// 5. Facility
export const facilities = pgTable(
  "Facility",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    badge: text("badge").notNull(),
    title: text("title").notNull(),
    subtitle: text("subtitle").notNull(),
    description: text("description").notNull(),
    highlights: jsonb("highlights").notNull(),
    iconName: text("iconName").notNull().default("shield"),
    accent: text("accent").notNull().default("magenta"),
    imageUrl: text("imageUrl").notNull(),
    imageAlt: text("imageAlt").notNull(),
    showOnHome: boolean("showOnHome").notNull().default(true),
    sortOrder: integer("sortOrder").notNull().default(0),
    published: boolean("published").notNull().default(false),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("Facility_published_idx").on(table.published),
  ]
);

// 6. GalleryImage
export const galleryImages = pgTable(
  "GalleryImage",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    title: text("title").notNull(),
    category: text("category").notNull(),
    categoryLabel: text("categoryLabel").notNull(),
    description: text("description").notNull(),
    imageUrl: text("imageUrl").notNull(),
    dateLabel: text("dateLabel").notNull().default("Campus Life"),
    aspect: text("aspect").notNull().default("square"),
    sortOrder: integer("sortOrder").notNull().default(0),
    published: boolean("published").notNull().default(false),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("GalleryImage_category_published_idx").on(
      table.category,
      table.published
    ),
  ]
);

// 7. Testimonial
export const testimonials = pgTable(
  "Testimonial",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    parentName: text("parentName").notNull(),
    relation: text("relation").notNull(),
    childName: text("childName").notNull(),
    program: text("program").notNull(),
    quote: text("quote").notNull(),
    rating: integer("rating").notNull().default(5),
    location: text("location").notNull().default("Biratnagar"),
    accent: text("accent").notNull().default("magenta"),
    sortOrder: integer("sortOrder").notNull().default(0),
    published: boolean("published").notNull().default(false),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("Testimonial_published_idx").on(table.published),
  ]
);

// 8. TeamMember
export const teamMembers = pgTable(
  "TeamMember",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name").notNull(),
    role: text("role").notNull(),
    qualification: text("qualification").notNull(),
    experience: text("experience").notNull(),
    bio: text("bio").notNull(),
    quote: text("quote").notNull(),
    imageUrl: text("imageUrl").notNull(),
    accent: text("accent").notNull().default("magenta"),
    sortOrder: integer("sortOrder").notNull().default(0),
    published: boolean("published").notNull().default(false),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("TeamMember_published_idx").on(table.published),
  ]
);

// 9. FoodMenu (Weekly Food Menu – Sunday to Friday)
export const foodMenus = pgTable(
  "FoodMenu",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    day: text("day").notNull(),
    morningSnack: text("morningSnack").notNull(),
    hotLunch: text("hotLunch").notNull(),
    afternoonBooster: text("afternoonBooster").notNull(),
    accent: text("accent").notNull().default("magenta"),
    sortOrder: integer("sortOrder").notNull().default(0),
    published: boolean("published").notNull().default(false),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("FoodMenu_published_idx").on(table.published),
  ]
);

// 10. ContactInquiry (Public Contact & Admission Tour Requests)
export const contactInquiries = pgTable("ContactInquiry", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  parentName: text("parentName").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  childName: text("childName"),
  childAge: text("childAge"),
  program: text("program"),
  preferredCare: text("preferredCare"),
  preferredDate: text("preferredDate"),
  message: text("message"),
  status: text("status").notNull().default("NEW"),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});

// 11. PopupNotification (CMS-driven website announcements / admission popups)
export const popupNotifications = pgTable(
  "PopupNotification",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    badge: text("badge"),
    title: text("title").notNull(),
    message: text("message").notNull(),
    imageUrl: text("imageUrl"),
    imageAlt: text("imageAlt"),
    ctaLabel: text("ctaLabel"),
    ctaHref: text("ctaHref"),
    accent: text("accent").notNull().default("magenta"),
    sortOrder: integer("sortOrder").notNull().default(0),
    published: boolean("published").notNull().default(false),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("PopupNotification_published_sortOrder_idx").on(
      table.published,
      table.sortOrder
    ),
  ]
);

// 12. Notice (CMS-driven Notices, Exam Details, Offers, Events & Holidays with PDF/Image media)
export const notices = pgTable(
  "Notice",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    title: text("title").notNull(),
    category: text("category").notNull().default("notice"),
    summary: text("summary").notNull(),
    content: text("content").notNull(),
    noticeDate: text("noticeDate").notNull().default(""),
    attachmentUrl: text("attachmentUrl"),
    attachmentType: text("attachmentType"),
    attachmentName: text("attachmentName"),
    accent: text("accent").notNull().default("magenta"),
    highlightOnHome: boolean("highlightOnHome").notNull().default(false),
    sortOrder: integer("sortOrder").notNull().default(0),
    published: boolean("published").notNull().default(false),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("Notice_published_highlightOnHome_sortOrder_idx").on(
      table.published,
      table.highlightOnHome,
      table.sortOrder
    ),
    index("Notice_category_published_idx").on(
      table.category,
      table.published
    ),
  ]
);

// 13. AdmissionApplication (Online Student Admission Applications & Uploaded Documents)
export const admissionApplications = pgTable(
  "AdmissionApplication",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    childName: text("childName").notNull(),
    childDob: text("childDob").notNull(),
    childAge: text("childAge").notNull(),
    childGender: text("childGender").notNull().default(""),
    program: text("program").notNull(),
    preferredCare: text("preferredCare")
      .notNull()
      .default("Regular Class (9:00 AM – 3:00 PM)"),
    transportRequired: boolean("transportRequired").notNull().default(false),
    mealsRequired: boolean("mealsRequired").notNull().default(true),
    previousSchool: text("previousSchool"),
    medicalNotes: text("medicalNotes"),

    parentName: text("parentName").notNull(),
    relation: text("relation").notNull().default("Parent"),
    phone: text("phone").notNull(),
    secondaryPhone: text("secondaryPhone"),
    email: text("email"),
    address: text("address").notNull(),
    message: text("message"),

    documents: jsonb("documents").notNull(),

    status: text("status").notNull().default("NEW"),
    published: boolean("published").notNull().default(false),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" })
      .notNull()
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("AdmissionApplication_status_createdAt_idx").on(
      table.status,
      table.createdAt
    ),
  ]
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type SiteSettings = typeof siteSettings.$inferSelect;
export type NewSiteSettings = typeof siteSettings.$inferInsert;

export type PageSection = typeof pageSections.$inferSelect;
export type NewPageSection = typeof pageSections.$inferInsert;

export type Program = typeof programs.$inferSelect;
export type NewProgram = typeof programs.$inferInsert;

export type Facility = typeof facilities.$inferSelect;
export type NewFacility = typeof facilities.$inferInsert;

export type GalleryImage = typeof galleryImages.$inferSelect;
export type NewGalleryImage = typeof galleryImages.$inferInsert;

export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;

export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;

export type FoodMenu = typeof foodMenus.$inferSelect;
export type NewFoodMenu = typeof foodMenus.$inferInsert;

export type ContactInquiry = typeof contactInquiries.$inferSelect;
export type NewContactInquiry = typeof contactInquiries.$inferInsert;

export type PopupNotification = typeof popupNotifications.$inferSelect;
export type NewPopupNotification = typeof popupNotifications.$inferInsert;

export type Notice = typeof notices.$inferSelect;
export type NewNotice = typeof notices.$inferInsert;

export type AdmissionApplication = typeof admissionApplications.$inferSelect;
export type NewAdmissionApplication = typeof admissionApplications.$inferInsert;
