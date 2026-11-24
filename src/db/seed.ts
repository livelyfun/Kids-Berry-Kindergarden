import bcrypt from "bcryptjs";
import { count } from "drizzle-orm";
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
  KEY_BENEFITS,
  LEARNING_PILLARS,
  PROGRAMS,
  SITE_CONFIG,
  TEAM_MEMBERS,
  TESTIMONIALS,
  WEEKLY_MENU,
} from "../data/site-data";
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
  users,
} from "./index";

async function main() {
  const initialUsername = (
    process.env.ADMIN_INITIAL_USERNAME || "kidsadmin"
  ).trim();
  const initialPassword =
    process.env.ADMIN_INITIAL_PASSWORD || "kidsadmin@123";
  const passwordHash = await bcrypt.hash(initialPassword, 12);

  // 1. Admin User
  await db
    .insert(users)
    .values({
      username: initialUsername,
      passwordHash,
      name: "Kids Berry Administrator",
      role: "ADMIN",
    })
    .onConflictDoUpdate({
      target: users.username,
      set: { passwordHash },
    });

  // 2. SiteSettings
  await db
    .insert(siteSettings)
    .values({
      id: "default",
      schoolName: SITE_CONFIG.schoolName,
      shortName: SITE_CONFIG.shortName,
      schoolType: SITE_CONFIG.schoolType,
      tagline: SITE_CONFIG.tagline,
      subTagline: SITE_CONFIG.subTagline,
      logoUrl: SITE_CONFIG.logoPath,
      establishedYear: SITE_CONFIG.establishedYear,
      street: SITE_CONFIG.address.street,
      ward: SITE_CONFIG.address.ward,
      city: SITE_CONFIG.address.city,
      province: SITE_CONFIG.address.province,
      country: SITE_CONFIG.address.country,
      fullAddress: SITE_CONFIG.address.fullAddress,
      landmark: SITE_CONFIG.address.landmark,
      primaryPhone: SITE_CONFIG.contact.primaryPhone,
      secondaryPhone: SITE_CONFIG.contact.secondaryPhone,
      whatsappNumber: SITE_CONFIG.contact.whatsappNumber,
      whatsappDisplay: SITE_CONFIG.contact.whatsappDisplay,
      email: SITE_CONFIG.contact.email,
      admissionsEmail: SITE_CONFIG.contact.admissionsEmail,
      openDays: SITE_CONFIG.hours.days,
      regularClassTime: SITE_CONFIG.hours.regularClassTime,
      afterClassCareTime: SITE_CONFIG.hours.afterClassCareTime,
      daycareTime: SITE_CONFIG.hours.daycareTime,
      closedOn: SITE_CONFIG.hours.closedOn,
      daycareAvailable: true,
      foodProvided: true,
      cctvMonitoring: true,
      montessoriImplemented: true,
      facebookUrl: SITE_CONFIG.social.facebookUrl,
      facebookHandle: SITE_CONFIG.social.facebookHandle,
      instagramUrl: SITE_CONFIG.social.instagramUrl,
      instagramHandle: SITE_CONFIG.social.instagramHandle,
      googleMapsEmbedUrl: SITE_CONFIG.googleMapsEmbedUrl,
      googleMapsLinkUrl: SITE_CONFIG.googleMapsLinkUrl,
      heroStats: SITE_CONFIG.heroStats,
    })
    .onConflictDoNothing();

  // 3. Programs: Care Tracks
  for (let i = 0; i < CARE_TRACKS.length; i++) {
    const track = CARE_TRACKS[i];
    await db
      .insert(programs)
      .values({
        slug: track.id,
        programType: "CARE_TRACK",
        badge: track.badge,
        title: track.title,
        subtitle: track.badge,
        ageGroup: track.ageRange,
        ageEligibility: track.ageRange,
        timing: track.timing,
        duration: track.timing,
        classSize: "Small Supervised Group",
        ratio: "Caring Montessori Ratios",
        shortDescription: track.description,
        fullDescription: track.description,
        highlights: track.features,
        curriculumAreas: track.features,
        iconName: track.iconName,
        accent: track.accent,
        imageUrl: track.image,
        imageAlt: track.imageAlt,
        sortOrder: i + 1,
        published: true,
      })
      .onConflictDoNothing();
  }

  // 4. Programs: Academic
  for (let i = 0; i < PROGRAMS.length; i++) {
    const prog = PROGRAMS[i];
    await db
      .insert(programs)
      .values({
        slug: prog.slug,
        programType: "ACADEMIC",
        badge: prog.ageGroup,
        title: prog.title,
        subtitle: prog.subtitle,
        ageGroup: prog.ageGroup,
        ageEligibility: prog.ageEligibility,
        timing: prog.schedule,
        duration: prog.duration,
        classSize: prog.classSize,
        ratio: prog.ratio,
        shortDescription: prog.shortDescription,
        fullDescription: prog.fullDescription,
        highlights: prog.highlights,
        curriculumAreas: prog.curriculumAreas,
        iconName: "blocks",
        accent: prog.accent,
        imageUrl: prog.image,
        imageAlt: prog.imageAlt,
        sortOrder: i + 1,
        published: true,
      })
      .onConflictDoNothing();
  }

  // 5. Facilities
  const [facCount] = await db.select({ value: count() }).from(facilities);
  if ((facCount?.value ?? 0) === 0) {
    for (let i = 0; i < DETAILED_FACILITIES.length; i++) {
      const fac = DETAILED_FACILITIES[i];
      await db.insert(facilities).values({
        badge: fac.badge,
        title: fac.title,
        subtitle: fac.subtitle,
        description: fac.description,
        highlights: fac.highlights,
        iconName: fac.iconName,
        accent: fac.accent,
        imageUrl: fac.image,
        imageAlt: fac.imageAlt,
        showOnHome: i < 4,
        sortOrder: i + 1,
        published: true,
      });
    }
  }

  // 6. Gallery
  const [galCount] = await db.select({ value: count() }).from(galleryImages);
  if ((galCount?.value ?? 0) === 0) {
    for (let i = 0; i < GALLERY_ITEMS.length; i++) {
      const g = GALLERY_ITEMS[i];
      await db.insert(galleryImages).values({
        title: g.title,
        category: g.category,
        categoryLabel: g.categoryLabel,
        description: g.description,
        imageUrl: g.imageUrl,
        dateLabel: g.date,
        aspect: g.aspect || "square",
        sortOrder: i + 1,
        published: true,
      });
    }
  }

  // 7. Testimonials
  const [testCount] = await db.select({ value: count() }).from(testimonials);
  if ((testCount?.value ?? 0) === 0) {
    for (let i = 0; i < TESTIMONIALS.length; i++) {
      const t = TESTIMONIALS[i];
      await db.insert(testimonials).values({
        parentName: t.parentName,
        relation: t.relation,
        childName: t.childName,
        program: t.program,
        quote: t.quote,
        rating: t.rating,
        location: t.location,
        accent: t.accent,
        sortOrder: i + 1,
        published: true,
      });
    }
  }

  // 8. Team
  const [teamCount] = await db.select({ value: count() }).from(teamMembers);
  if ((teamCount?.value ?? 0) === 0) {
    for (let i = 0; i < TEAM_MEMBERS.length; i++) {
      const m = TEAM_MEMBERS[i];
      await db.insert(teamMembers).values({
        name: m.name,
        role: m.role,
        qualification: m.qualification,
        experience: m.experience,
        bio: m.bio,
        quote: m.quote,
        imageUrl: m.image,
        accent: m.accent,
        sortOrder: i + 1,
        published: true,
      });
    }
  }

  // 9. Food Menu
  const [menuCount] = await db.select({ value: count() }).from(foodMenus);
  if ((menuCount?.value ?? 0) === 0) {
    for (let i = 0; i < WEEKLY_MENU.length; i++) {
      const item = WEEKLY_MENU[i];
      await db.insert(foodMenus).values({
        day: item.day,
        morningSnack: item.morningSnack,
        hotLunch: item.hotLunch,
        afternoonBooster: item.afternoonBooster,
        accent: item.accent,
        sortOrder: i + 1,
        published: true,
      });
    }
  }

  // 10. Page Sections
  const sectionsList: Array<{
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
    metadata: unknown;
    sortOrder: number;
    published: boolean;
  }> = [
    {
      page: "home",
      sectionKey: "home-hero",
      category: "hero",
      badge: "Montessori Implemented Pre-school & Daycare • Pichara, Biratnagar-11",
      title: "Where Little Minds Grow with Montessori Joy & Care",
      subtitle: "Montessori",
      description:
        "A warm, 24/7 CCTV-monitored pre-school and loving daycare in Pichara, Biratnagar-11 — offering regular classes (9 AM – 3 PM), after-class care (3 PM – 5 PM), and fresh weekly meals with daily hot milk & fruits.",
      imageUrl: "/images/hero-classroom.jpg",
      imageAlt:
        "Happy children learning with wooden Montessori materials and their caring teacher at Kids Berry Kindergarten School",
      iconName: "sparkles",
      accent: "magenta",
      metadata: {
        primaryCtaLabel: "Schedule a Campus Visit",
        primaryCtaHref: "/contact",
        secondaryCtaLabel: "WhatsApp Admissions",
      },
      sortOrder: 1,
      published: true,
    },
    {
      page: "home",
      sectionKey: "home-philosophy",
      category: "philosophy",
      badge: "Our Montessori Philosophy",
      title: "Where Hands Explore, Hearts Feel Safe & Curiosity Blossoms",
      subtitle:
        "Help me to do it myself — when a child feels genuinely cared for, learning unfolds joyfully every single day.",
      description:
        "At Kids Berry Kindergarten School in Pichara, Biratnagar-11, we honor childhood as an unhurried, wonder-filled journey. Guided by Montessori principles, children choose tactile wooden materials, practice real-life independence, and build social confidence without rote academic pressure.",
      imageUrl: "/images/about-story.jpg",
      imageAlt:
        "Montessori teacher kneeling to guide preschoolers with wooden rings",
      iconName: "heart",
      accent: "orange",
      metadata: {
        secondaryImageUrl: "/images/gallery-art.jpg",
        secondaryImageAlt:
          "Little hands painting colorful watercolor flowers at Kids Berry art table",
        statValue: "1:8",
        statLabel: "Loving Educator–Child Ratio",
        quoteAuthor: "Montessori Implemented Pre-school & Daycare",
      },
      sortOrder: 2,
      published: true,
    },
    {
      page: "about",
      sectionKey: "about-story",
      category: "story",
      badge: "Our Story & Philosophy",
      title: "Nurturing Curious Minds & Supporting Modern Families",
      subtitle:
        "Help me to do it myself — authentic Montessori discovery meets genuine peace of mind.",
      description:
        "Kids Berry Kindergarten School was founded in Pichara, Biratnagar-11 to create a preschool parents can trust wholeheartedly: a place where authentic Montessori learning meets practical peace of mind. We prepare clean, sunlit classrooms with natural wooden materials while providing CCTV monitoring, freshly cooked weekly meals with daily hot milk and fruits, and dependable care until 5:00 PM.",
      imageUrl: "/images/hero-classroom.jpg",
      imageAlt:
        "Sunlit Montessori classroom with happy young children and caring teacher",
      iconName: "heart",
      accent: "magenta",
      metadata: {
        visionTitle: "Our Vision",
        visionText:
          "To inspire healthy, confident, curious young learners in Biratnagar who feel deeply safe and excited to explore every day.",
        missionTitle: "Our Mission",
        missionText:
          "To unite Montessori pre-school discovery with loving Daycare, nutritious daily meals, and transparent CCTV-monitored safety.",
        logoCaption:
          "Our emblem shows caring hands cradling little children beneath a warm home roof—a daily promise of safety, care, and gentle guidance.",
      },
      sortOrder: 1,
      published: true,
    },
    {
      page: "shared",
      sectionKey: "shared-cta",
      category: "cta",
      badge: "Admissions Open • Regular & Daycare",
      title:
        "Come Visit Kids Berry Kindergarten School in Pichara, Biratnagar-11",
      subtitle: "Schedule a Campus Tour Today",
      description:
        "Tour our CCTV-monitored Montessori classrooms, inspect our clean kitchen & weekly food menu, and speak with our warm educators.",
      imageUrl: null,
      imageAlt: null,
      iconName: "calendarCheck",
      accent: "magenta",
      metadata: null,
      sortOrder: 1,
      published: true,
    },
    {
      page: "home",
      sectionKey: "home-care-grid-1",
      category: "care-grid",
      badge: "Safety First",
      title: "24/7 CCTV Safe Campus",
      subtitle: "Continuous visibility",
      description:
        "HD CCTV across classrooms & play zones with verified guardian pickup.",
      imageUrl: "/images/hero-classroom.jpg",
      imageAlt: "CCTV-monitored sunlit Montessori classroom",
      iconName: "camera",
      accent: "magenta",
      metadata: { href: "/facilities" },
      sortOrder: 1,
      published: true,
    },
    {
      page: "home",
      sectionKey: "home-care-grid-2",
      category: "care-grid",
      badge: "Healthy Kitchen",
      title: "Weekly Meals + Milk & Fruits",
      subtitle: "Nutritious food provided",
      description:
        "Fresh Sunday–Friday school meals plus warm milk & seasonal fruits daily.",
      imageUrl: "/images/program-nursery.jpg",
      imageAlt: "Happy nursery learners at clean classroom tables",
      iconName: "apple",
      accent: "orange",
      metadata: { href: "/facilities#weekly-menu" },
      sortOrder: 2,
      published: true,
    },
    {
      page: "home",
      sectionKey: "home-care-grid-3",
      category: "care-grid",
      badge: "Montessori Method",
      title: "Montessori Implemented",
      subtitle: "Hands-on discovery",
      description:
        "Hands-on wooden kits, phonics & math beads nurturing joyful independence.",
      imageUrl: "/images/about-story.jpg",
      imageAlt: "Teacher guiding children with Montessori materials",
      iconName: "blocks",
      accent: "blue",
      metadata: { href: "/programs#learning-approach" },
      sortOrder: 3,
      published: true,
    },
    {
      page: "home",
      sectionKey: "home-care-grid-4",
      category: "care-grid",
      badge: "Extended Support",
      title: "Daycare & After-Care (3–5 PM)",
      subtitle: "Flexible care hours",
      description:
        "Seamless daycare & after-class care after 9 AM–3 PM regular hours.",
      imageUrl: "/images/program-playgroup.jpg",
      imageAlt: "Soft padded daycare sensory play space",
      iconName: "bed",
      accent: "teal",
      metadata: { href: "/programs#care-timings" },
      sortOrder: 4,
      published: true,
    },
    {
      page: "home",
      sectionKey: "home-care-grid-5",
      category: "care-grid",
      badge: "Hygienic Spaces",
      title: "Clean Rooms & Play Garden",
      subtitle: "Healthy spaces",
      description:
        "Daily sanitized rooms, RO purified water & shaded grass play garden.",
      imageUrl: "/images/gallery-outdoor.jpg",
      imageAlt: "Shaded green outdoor garden playground",
      iconName: "trees",
      accent: "olive",
      metadata: { href: "/facilities" },
      sortOrder: 5,
      published: true,
    },
    {
      page: "home",
      sectionKey: "home-care-grid-6",
      category: "care-grid",
      badge: "Joyful Childhood",
      title: "Creative Arts & Celebrations",
      subtitle: "Cultural & artistic joy",
      description:
        "Daily painting, storytelling, music & warm Nepali cultural festivals.",
      imageUrl: "/images/gallery-festival.jpg",
      imageAlt: "Children celebrating cultural festival day at school",
      iconName: "palette",
      accent: "coral",
      metadata: { href: "/gallery" },
      sortOrder: 6,
      published: true,
    },
  ];

  for (let i = 0; i < KEY_BENEFITS.length; i++) {
    const b = KEY_BENEFITS[i];
    sectionsList.push({
      page: "home",
      sectionKey: `benefit-${b.id}`,
      category: "benefit",
      badge: "Benefit",
      title: b.title,
      subtitle: null,
      description: b.description,
      imageUrl: null,
      imageAlt: null,
      iconName: b.iconName,
      accent: b.accent,
      metadata: null,
      sortOrder: i + 1,
      published: true,
    });
  }

  for (let i = 0; i < CORE_VALUES.length; i++) {
    const v = CORE_VALUES[i];
    sectionsList.push({
      page: "about",
      sectionKey: `value-${v.id}`,
      category: "value",
      badge: "Core Value",
      title: v.title,
      subtitle: null,
      description: v.description,
      imageUrl: null,
      imageAlt: null,
      iconName: v.iconName,
      accent: v.accent,
      metadata: null,
      sortOrder: i + 1,
      published: true,
    });
  }

  for (let i = 0; i < LEARNING_PILLARS.length; i++) {
    const p = LEARNING_PILLARS[i];
    sectionsList.push({
      page: "programs",
      sectionKey: `pillar-${p.id}`,
      category: "pillar",
      badge: `Pillar 0${i + 1}`,
      title: p.title,
      subtitle: p.subtitle,
      description: p.description,
      imageUrl: null,
      imageAlt: null,
      iconName: p.iconName,
      accent: p.accent,
      metadata: { activities: p.activities },
      sortOrder: i + 1,
      published: true,
    });
  }

  for (let i = 0; i < DAILY_ROUTINE.length; i++) {
    const r = DAILY_ROUTINE[i];
    sectionsList.push({
      page: "programs",
      sectionKey: `routine-${r.id}`,
      category: "routine",
      badge: r.time,
      title: r.activity,
      subtitle: r.time,
      description: r.description,
      imageUrl: null,
      imageAlt: null,
      iconName: r.iconName,
      accent: r.accent,
      metadata: null,
      sortOrder: i + 1,
      published: true,
    });
  }

  for (let i = 0; i < ADMISSION_STEPS.length; i++) {
    const s = ADMISSION_STEPS[i];
    sectionsList.push({
      page: "admissions",
      sectionKey: `admission-step-${s.stepNumber}`,
      category: "admission-step",
      badge: s.stepNumber,
      title: s.title,
      subtitle: `Step ${s.stepNumber}`,
      description: s.description,
      imageUrl: null,
      imageAlt: null,
      iconName: s.iconName,
      accent: s.accent,
      metadata: null,
      sortOrder: i + 1,
      published: true,
    });
  }

  for (let i = 0; i < ADMISSION_REQUIREMENTS.length; i++) {
    const req = ADMISSION_REQUIREMENTS[i];
    sectionsList.push({
      page: "admissions",
      sectionKey: `admission-${req.id}`,
      category: "admission-req",
      badge: req.required ? "Required" : "Optional",
      title: req.label,
      subtitle: null,
      description: req.detail,
      imageUrl: null,
      imageAlt: null,
      iconName: "fileCheck",
      accent: req.required ? "teal" : "orange",
      metadata: { required: req.required },
      sortOrder: i + 1,
      published: true,
    });
  }

  for (let i = 0; i < AGE_ELIGIBILITY.length; i++) {
    const row = AGE_ELIGIBILITY[i];
    sectionsList.push({
      page: "admissions",
      sectionKey: `age-${row.id}`,
      category: "age-row",
      badge: row.ageRange,
      title: row.program,
      subtitle: row.sessionTiming,
      description: row.cutOffNote,
      imageUrl: null,
      imageAlt: null,
      iconName: "users",
      accent: row.accent,
      metadata: null,
      sortOrder: i + 1,
      published: true,
    });
  }

  for (let i = 0; i < ADMISSION_FAQS.length; i++) {
    const faq = ADMISSION_FAQS[i];
    sectionsList.push({
      page: "admissions",
      sectionKey: faq.id,
      category: "faq",
      badge: "FAQ",
      title: faq.question,
      subtitle: null,
      description: faq.answer,
      imageUrl: null,
      imageAlt: null,
      iconName: "messageCircle",
      accent: "teal",
      metadata: null,
      sortOrder: i + 1,
      published: true,
    });
  }

  for (const section of sectionsList) {
    await db
      .insert(pageSections)
      .values({
        page: section.page,
        sectionKey: section.sectionKey,
        category: section.category,
        badge: section.badge,
        title: section.title,
        subtitle: section.subtitle,
        description: section.description,
        imageUrl: section.imageUrl,
        imageAlt: section.imageAlt,
        iconName: section.iconName,
        accent: section.accent,
        metadata: section.metadata,
        sortOrder: section.sortOrder,
        published: section.published,
      })
      .onConflictDoNothing();
  }

  // 11. Initial Popup
  const [popCount] = await db.select({ value: count() }).from(popupNotifications);
  if ((popCount?.value ?? 0) === 0) {
    await db.insert(popupNotifications).values({
      badge: "Admissions Open",
      title: "Admissions Open for the New Montessori Session!",
      message:
        "Enroll your little one at Kids Berry Kindergarten School in Pichara, Biratnagar-11. Regular Classes (9:00 AM – 3:00 PM), Daycare, After-Class Care (3:00 PM – 5:00 PM), 24/7 CCTV safety, and fresh weekly meals with daily hot milk & fruits.",
      imageUrl: "/images/hero-classroom.jpg",
      imageAlt: "Kids Berry Kindergarten School Montessori classroom",
      ctaLabel: "Book a Campus Visit",
      ctaHref: "/admissions",
      accent: "magenta",
      sortOrder: 1,
      published: true,
    });
  }

  // 12. Initial Notices
  const [notCount] = await db.select({ value: count() }).from(notices);
  if ((notCount?.value ?? 0) === 0) {
    await db.insert(notices).values([
      {
        title: "New Academic Session Admissions Open (Playgroup to UKG)",
        category: "notice",
        summary:
          "Applications are now open for Regular Montessori Classes (9:00 AM – 3:00 PM), Daycare, and After-Class Care (3:00 PM – 5:00 PM) at Pichara, Biratnagar-11.",
        content:
          "Dear Parents,\n\nWe are delighted to announce that admissions for the upcoming academic session are now open across Playgroup, Nursery, Junior KG (LKG), and Senior KG (UKG).\n\nFamilies may visit our Pichara, Biratnagar-11 campus Sunday through Friday to tour our CCTV-monitored Montessori classrooms, inspect our clean kitchen & weekly food menu, and meet our teachers.",
        noticeDate: "Nov 24, 2026",
        attachmentUrl: "/images/hero-classroom.jpg",
        attachmentType: "image",
        attachmentName: "Kids Berry Montessori Classroom Overview",
        accent: "magenta",
        highlightOnHome: true,
        sortOrder: 1,
        published: true,
      },
      {
        title: "Second Terminal Assessment & Montessori Progress Showcase",
        category: "exam",
        summary:
          "Stress-free observational assessments and parent-educator progress review schedule for Nursery, Junior KG, and Senior KG students.",
        content:
          "At Kids Berry Kindergarten School, young learners are assessed gently through hands-on Montessori materials, phonics reading readiness, and creative activity observation rather than high-pressure written exams.\n\nSchedule Highlights:\n• Playgroup & Nursery: Activity-based milestone observation throughout the week\n• Junior KG (LKG): Phonics sounds, counting beads & practical life showcase\n• Senior KG (UKG): Reading fluency, Montessori golden bead math & story presentation\n• Parent Progress Meet: Friday 1:00 PM – 3:00 PM at respective classrooms.",
        noticeDate: "Dec 05, 2026",
        attachmentUrl: null,
        attachmentType: null,
        attachmentName: null,
        accent: "teal",
        highlightOnHome: true,
        sortOrder: 2,
        published: true,
      },
      {
        title: "Early Bird Sibling & Full-Day Daycare Enrollment Offer",
        category: "offer",
        summary:
          "Special fee concession on admission registration for families enrolling before month-end or registering siblings for Regular Class + Daycare.",
        content:
          "We are pleased to extend a warm family support offer for new admissions and working parents in Biratnagar:\n\n• Sibling Privilege: 15% registration discount when enrolling a second child.\n• Full-Day Care Bundle: Preferential monthly package when pairing Regular Montessori Class (9 AM – 3 PM) with After-Class Care (3 PM – 5 PM).\n• Always Included: Fresh Sunday–Friday school meals plus daily warm milk & fresh seasonal fruits at zero extra tiffin hassle.\n\nVisit our front desk or message us on WhatsApp to claim this offer during your campus visit.",
        noticeDate: "Limited Time Offer",
        attachmentUrl: null,
        attachmentType: null,
        attachmentName: null,
        accent: "orange",
        highlightOnHome: true,
        sortOrder: 3,
        published: true,
      },
    ]);
  }

  console.log("Kids Berry Drizzle seed completed successfully.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  });
