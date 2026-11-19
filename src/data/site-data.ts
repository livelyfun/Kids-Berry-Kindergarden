import type {
  AdmissionRequirement,
  AdmissionStep,
  AgeEligibilityRow,
  BenefitItem,
  CareTrackItem,
  DetailedFacilityItem,
  FAQItem,
  FacilityItem,
  GalleryItem,
  LearningPillar,
  ProgramItem,
  RoutineItem,
  SiteConfig,
  TeamMember,
  TestimonialItem,
  ValueItem,
  WeeklyMenuItem,
} from "@/types/cms";

/**
 * ============================================================================
 * CMS-READY DATA LAYER — Kids Berry Kindergarten School
 * ----------------------------------------------------------------------------
 * All content below mirrors headless CMS collections & singletons.
 * Swap the getter functions at the bottom for async CMS/API calls later.
 * ============================================================================
 */

export const SITE_CONFIG: SiteConfig = {
  schoolName: "Kids Berry Kindergarten School",
  shortName: "Kids Berry",
  schoolType: "Montessori Implemented Pre-school + Daycare",
  tagline: "Montessori Implemented Pre-school & Loving Daycare in Biratnagar",
  subTagline:
    "A safe, CCTV-monitored Montessori pre-school and daycare in Pichara, Biratnagar-11 — offering regular classes (9:00 AM – 3:00 PM), after-class care (3:00 PM – 5:00 PM), and nutritious school meals with daily hot milk and fresh fruits.",
  logoPath: "/images/kids-berry-logo.jpg",
  establishedYear: "2020",
  address: {
    street: "Pichara, Biratnagar-11",
    ward: "Biratnagar-11, Pichara",
    city: "Biratnagar",
    province: "Koshi Province",
    country: "Nepal",
    fullAddress: "Pichara, Biratnagar-11, Nepal",
    landmark: "Peaceful residential campus near Pichara Chowk, Biratnagar-11",
  },
  contact: {
    primaryPhone: "+977 21-590123",
    secondaryPhone: "+977 980-1234567",
    whatsappNumber: "9779801234567",
    whatsappDisplay: "+977 980-1234567",
    email: "hello@kidsberrykindergarten.edu.np",
    admissionsEmail: "admissions@kidsberrykindergarten.edu.np",
  },
  hours: {
    days: "Sunday – Friday",
    regularClassTime: "9:00 AM – 3:00 PM",
    afterClassCareTime: "3:00 PM – 5:00 PM",
    daycareTime: "9:00 AM – 5:00 PM",
    schoolTime: "9:00 AM – 3:00 PM (Regular Class)",
    officeTime: "3:00 PM – 5:00 PM (After-Class Care & Daycare)",
    closedOn: "Saturday & Public Holidays",
  },
  social: {
    facebookUrl: "https://facebook.com",
    facebookHandle: "@KidsBerryBiratnagar",
    instagramUrl: "https://instagram.com",
    instagramHandle: "@kidsberry.biratnagar",
  },
  googleMapsEmbedUrl:
    "https://www.google.com/maps?q=Pichara,+Biratnagar-11,+Nepal&output=embed",
  googleMapsLinkUrl:
    "https://www.google.com/maps/search/?api=1&query=Pichara+Biratnagar-11+Nepal",
  heroStats: [
    { value: "9AM–3PM", label: "Regular Montessori Class", accent: "magenta" },
    { value: "3PM–5PM", label: "After-Class Care & Daycare", accent: "teal" },
    { value: "CCTV", label: "Safe Campus & Meals Provided", accent: "coral" },
  ],
};

export const KEY_BENEFITS: BenefitItem[] = [
  {
    id: "montessori-preschool",
    title: "Montessori Implemented Pre-school",
    description:
      "Authentic child-paced Montessori wooden materials, practical life stations, and joyful phonics foster natural curiosity without rote stress.",
    iconName: "blocks",
    accent: "magenta",
  },
  {
    id: "daycare-aftercare",
    title: "Daycare & After-Class Care (Till 5 PM)",
    description:
      "Reliable full-day Daycare and After-Class Care from 3:00 PM – 5:00 PM give working parents flexibility while children rest, snack, and play safely.",
    iconName: "bed",
    accent: "teal",
  },
  {
    id: "cctv-safe-environment",
    title: "Safe Campus with CCTV Monitoring",
    description:
      "24/7 CCTV surveillance across classrooms, corridors, play zones, and gated entrances ensures transparent, verifiable child safety every minute.",
    iconName: "camera",
    accent: "coral",
  },
  {
    id: "nutritious-food-provided",
    title: "Nutritious Food + Daily Hot Milk & Fruits",
    description:
      "Fresh, hygienic meals prepared from our balanced weekly menu—plus warm milk and fresh seasonal fruits served to every child daily.",
    iconName: "apple",
    accent: "blue",
  },
  {
    id: "clean-play-areas",
    title: "Clean Classrooms & Play Areas",
    description:
      "Daily sanitized sunlit rooms, rounded child-height wooden furniture, soft activity mats, and a shaded outdoor garden playground.",
    iconName: "trees",
    accent: "olive",
  },
  {
    id: "caring-educators",
    title: "Warm Educators & Parent Connect",
    description:
      "Trained female Montessori educators and attentive caregivers nurture confidence, manners, and emotional security with regular parent updates.",
    iconName: "handHeart",
    accent: "magenta",
  },
];

export const CARE_TRACKS: CareTrackItem[] = [
  {
    id: "regular-class",
    title: "Regular Montessori Class",
    badge: "Core School Hours",
    timing: "9:00 AM – 3:00 PM",
    ageRange: "1.8 – 6 Years (Playgroup to UKG)",
    description:
      "Our full Montessori-implemented school day blends morning circle time, hands-on tactile discovery, creative arts, outdoor play, and freshly cooked school meals.",
    features: [
      "Full Montessori Practical Life, Sensorial, Phonics & Math work",
      "Nutritious weekly menu meals + daily hot milk & fresh fruits",
      "Outdoor garden games, storytelling & bilingual English/Nepali",
      "CCTV-monitored classrooms and verified guardian pickup",
    ],
    iconName: "blocks",
    accent: "magenta",
    image: "/images/hero-classroom.jpg",
    imageAlt:
      "Children enjoying Regular Montessori Class at Kids Berry Kindergarten School",
  },
  {
    id: "daycare-program",
    title: "Loving Daycare Program",
    badge: "Full-Day Support",
    timing: "9:00 AM – 5:00 PM",
    ageRange: "1.5 – 6 Years",
    description:
      "Designed for busy and working parents in Biratnagar seeking a warm, safe second home where toddlers and preschoolers learn, nap comfortably, eat well, and thrive.",
    features: [
      "Seamless combination of morning Montessori learning + afternoon care",
      "Cozy nap & quiet rest corner with clean personal bedding",
      "Balanced lunch, afternoon warm milk, seasonal fruits & healthy snacks",
      "Continuous attentive supervision inside CCTV-monitored rooms",
    ],
    iconName: "bed",
    accent: "teal",
    image: "/images/program-playgroup.jpg",
    imageAlt:
      "Safe Daycare mat and sensory play corner at Kids Berry Kindergarten School",
  },
  {
    id: "after-class-care",
    title: "After-Class Care",
    badge: "Extended Care",
    timing: "3:00 PM – 5:00 PM",
    ageRange: "All Enrolled Students",
    description:
      "Peace of mind when your workday extends past 3:00 PM. Children stay with familiar teachers for warm milk, fresh fruit, guided play, and relaxed story time.",
    features: [
      "Smooth 3:00 PM transition with zero rushing or disruption",
      "Daily hot milk & fresh fruit refreshment included",
      "Guided free play, puzzles, coloring & calm reading time",
      "Flexible monthly or daily enrollment option for parents",
    ],
    iconName: "clock",
    accent: "coral",
    image: "/images/about-story.jpg",
    imageAlt:
      "Teacher supervising calm afternoon activities during After-Class Care",
  },
];

export const PROGRAMS: ProgramItem[] = [
  {
    id: "playgroup",
    slug: "playgroup",
    title: "Playgroup",
    subtitle: "Gentle First Steps & Sensory Wonder",
    ageGroup: "1.8 – 2.5 Years",
    ageEligibility: "1 year 8 months to 2.5 years",
    duration: "Regular (9:00 AM – 3:00 PM) + Daycare Option",
    classSize: "Max 12 Children",
    ratio: "1:6 Ratio",
    schedule: "9:00 AM – 3:00 PM (After-care till 5:00 PM)",
    shortDescription:
      "A cozy, comforting transition from home centered on sensory play, songs, loving socialization, warm meals, and peaceful rest.",
    fullDescription:
      "Designed for first-time little learners, our Playgroup classroom feels like a soft, sunlit extension of home. Caring educators nurture emotional security while toddlers explore textures, sounds, nutritious meals, and early friendships.",
    highlights: [
      "Gentle settling-in support & warm bonding routines",
      "Soft sensory bins, wooden stacking & motor play",
      "Fresh school meals + daily warm milk & soft seasonal fruits",
      "Cozy midday rest routine & toilet-readiness guidance",
    ],
    curriculumAreas: [
      "Sensory & Tactile Discovery",
      "Gross & Fine Motor Coordination",
      "Social Comfort & Sharing",
      "Music, Rhythm & Movement",
    ],
    accent: "coral",
    image: "/images/program-playgroup.jpg",
    imageAlt:
      "Toddlers exploring wooden sensory blocks on a soft Playgroup mat",
  },
  {
    id: "nursery",
    slug: "nursery",
    title: "Nursery",
    subtitle: "Curiosity, Creativity & Early Independence",
    ageGroup: "2.5 – 3.5 Years",
    ageEligibility: "2.5 to 3.5 years",
    duration: "9:00 AM – 3:00 PM (+ 3–5 PM Care)",
    classSize: "Max 16 Children",
    ratio: "1:8 Ratio",
    schedule: "9:00 AM – 3:00 PM",
    shortDescription:
      "Hands-on Montessori practical life trays, expressive art, playful phonics sounds, outdoor garden play, and healthy group dining.",
    fullDescription:
      "In Nursery, young explorers blossom in independence. Children choose Montessori practical-life trays—pouring, sorting, buttoning—alongside rich storytelling, watercolor art, nutritious school lunches, and playful number recognition.",
    highlights: [
      "Montessori Practical Life & Sensorial stations",
      "Letter sounds through songs, sand trays & stories",
      "Daily free painting, clay modeling & collage crafts",
      "Nutritious weekly menu meals + daily hot milk & fruits",
    ],
    curriculumAreas: [
      "Practical Life & Self-Help",
      "Pre-Reading Phonics Sounds",
      "Shape, Color & Pattern Sorting",
      "Expressive Art & Role Play",
    ],
    accent: "magenta",
    image: "/images/program-nursery.jpg",
    imageAlt:
      "Nursery children painting watercolors and crafting paper flowers",
  },
  {
    id: "junior-kg",
    slug: "junior-kg",
    title: "Junior KG (LKG)",
    subtitle: "Building Language, Logic & Confidence",
    ageGroup: "3.5 – 4.5 Years",
    ageEligibility: "3.5 to 4.5 years",
    duration: "9:00 AM – 3:00 PM (+ 3–5 PM Care)",
    classSize: "Max 18 Children",
    ratio: "1:9 Ratio",
    schedule: "9:00 AM – 3:00 PM",
    shortDescription:
      "Interactive phonics blending, concrete Montessori numeracy, nature curiosity, and collaborative project play from 9 AM to 3 PM.",
    fullDescription:
      "Junior KG channels growing curiosity into joyful foundational literacy and numeracy. Through tactile beads, sandpaper letters, picture books, and nature observation, children learn by doing—never by memorizing under pressure.",
    highlights: [
      "Phonics word building & expressive English/Nepali speaking",
      "Montessori spindle boxes, number rods & quantity matching",
      "Show-and-tell confidence & collaborative block play",
      "Wholesome midday lunch + daily warm milk & fruit break",
    ],
    curriculumAreas: [
      "Phonics & Emergent Writing",
      "Concrete Numeracy & Spatial Logic",
      "Nature & Community Awareness",
      "Teamwork & Emotional Regulation",
    ],
    accent: "teal",
    image: "/images/program-lkg.jpg",
    imageAlt:
      "Junior KG children enjoying phonics letters and picture books in circle time",
  },
  {
    id: "senior-kg",
    slug: "senior-kg",
    title: "Senior KG (UKG)",
    subtitle: "School Readiness with Joy & Leadership",
    ageGroup: "4.5 – 6 Years",
    ageEligibility: "4.5 to 6 years",
    duration: "9:00 AM – 3:00 PM (+ 3–5 PM Care)",
    classSize: "Max 20 Children",
    ratio: "1:10 Ratio",
    schedule: "9:00 AM – 3:00 PM",
    shortDescription:
      "Fluent early reading, joyful math operations, inquiry projects, and confident readiness for primary school in Biratnagar.",
    fullDescription:
      "Our Senior KG graduates step into Grade 1 with sparkling curiosity, emotional maturity, and strong academic readiness. Students read short storybooks independently, explore addition and subtraction with Montessori golden beads, and lead group presentations.",
    highlights: [
      "Independent reading comprehension & creative journaling",
      "Place value, addition, subtraction & time concepts",
      "Inquiry themes: Our Earth, Healthy Living & Nepal Heritage",
      "Leadership roles, stage confidence & primary readiness",
    ],
    curriculumAreas: [
      "Fluent Reading & Creative Expression",
      "Montessori Math Operations",
      "Scientific Inquiry & Critical Thinking",
      "Leadership & Primary Readiness",
    ],
    accent: "orange",
    image: "/images/program-ukg.jpg",
    imageAlt:
      "Senior KG students working with Montessori counting beads and magnifying glasses",
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "t1",
    parentName: "Prakash & Sarita Yadav",
    relation: "Parents of Aarav",
    childName: "Aarav",
    program: "Nursery + After-Care",
    quote:
      "Regular classes till 3 PM and loving After-Class Care until 5 PM are a true blessing for working parents—plus CCTV and fresh daily meals give us total peace of mind.",
    rating: 5,
    location: "Pichara, Biratnagar-11",
    accent: "magenta",
  },
  {
    id: "t2",
    parentName: "Meera Regmi",
    relation: "Mother of Ananya",
    childName: "Ananya",
    program: "Senior KG (UKG)",
    quote:
      "True Montessori implementation without rote stress. Ananya learned phonics and addition through wooden beads and stories, and she loves the weekly school menu!",
    rating: 5,
    location: "Tintolia, Biratnagar",
    accent: "teal",
  },
  {
    id: "t3",
    parentName: "Roshan & Kriti Agrawal",
    relation: "Parents of Reyansh",
    childName: "Reyansh",
    program: "Playgroup Daycare",
    quote:
      "Spotless classrooms, warm teachers, and healthy food provided right at school—no morning tiffin rush! Reyansh loves his afternoon warm milk and fresh fruit.",
    rating: 5,
    location: "Bargachhi, Biratnagar",
    accent: "coral",
  },
  {
    id: "t4",
    parentName: "Suman & Nisha Karki",
    relation: "Parents of Aadhya",
    childName: "Aadhya",
    program: "Junior KG (LKG)",
    quote:
      "Our daughter runs excitedly to the gate every morning. The teachers' patience, clean play garden, and weekly kitchen menu make Kids Berry feel like a second home.",
    rating: 5,
    location: "Pichara, Biratnagar-11",
    accent: "orange",
  },
  {
    id: "t5",
    parentName: "Bibek & Pooja Bhattarai",
    relation: "Parents of Vivaan",
    childName: "Vivaan",
    program: "Daycare Program",
    quote:
      "Having 24/7 CCTV monitoring, verified guardian pickup, and cozy afternoon daycare rest cots gives us complete confidence while we are at work in Biratnagar.",
    rating: 5,
    location: "Traffic Chowk, Biratnagar",
    accent: "blue",
  },
  {
    id: "t6",
    parentName: "Kiran & Sapana Limbu",
    relation: "Parents of Diya",
    childName: "Diya",
    program: "Nursery",
    quote:
      "Diya became noticeably more independent—pouring water neatly, sharing politely, and singing rhymes in English and Nepali. Truly caring educators!",
    rating: 5,
    location: "Kanchanbari, Biratnagar",
    accent: "olive",
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "sunita-koirala",
    name: "Sunita Koirala",
    role: "Founder & Principal",
    qualification: "M.Ed. in Early Childhood Education, AMI Montessori Diploma",
    experience: "14+ Years in Early Years Education",
    bio: "Sunita founded Kids Berry Kindergarten School in Pichara, Biratnagar-11 with a clear promise: combine authentic Montessori learning with loving, CCTV-safe Daycare and fresh daily nutrition.",
    quote:
      "When a child feels safe, nourished, and deeply loved, joyful learning unfolds naturally.",
    image: "/images/team-1.jpg",
    accent: "magenta",
  },
  {
    id: "anisha-shrestha",
    name: "Anisha Shrestha",
    role: "Lead Montessori Educator",
    qualification: "B.Ed., Certified Montessori Directress (3–6 Years)",
    experience: "8 Years Experience",
    bio: "Anisha guides our Practical Life, Phonics, and Numeracy corners, empowering Junior and Senior KG learners to master concepts hands-on.",
    quote:
      "Every wooden block and bead tray invites a child to say, 'Look, I did it myself!'",
    image: "/images/team-2.jpg",
    accent: "teal",
  },
  {
    id: "priya-adhikari",
    name: "Priya Adhikari",
    role: "Playgroup & Daycare Coordinator",
    qualification: "Diploma in Early Childhood Care & Child Nutrition",
    experience: "6 Years Experience",
    bio: "Known for her warm smile and gentle routines, Priya oversees toddler settling-in, cozy Daycare naps, and our daily fresh milk and fruit breaks.",
    quote:
      "Little learners thrive best on unhurried warmth, healthy tummies, and familiar loving faces.",
    image: "/images/team-3.jpg",
    accent: "coral",
  },
  {
    id: "deepa-thapa",
    name: "Deepa Thapa",
    role: "Creative Arts & After-Class Care Lead",
    qualification:
      "B.A. Fine Arts & Early Childhood Storytelling Certification",
    experience: "7 Years Experience",
    bio: "Deepa leads painting, music, bilingual stories, and our engaging 3:00 PM – 5:00 PM After-Class Care afternoons filled with calm play and creativity.",
    quote:
      "Afternoons at Kids Berry feel just like cozy playtime at grandma's warm house.",
    image: "/images/team-4.jpg",
    accent: "blue",
  },
];

export const CORE_VALUES: ValueItem[] = [
  {
    id: "safety-cctv",
    title: "Verified Safety & CCTV Care",
    description:
      "24/7 CCTV-monitored classrooms, gated entryways, verified guardian pickup, and attentive staff protect every child.",
    iconName: "camera",
    accent: "magenta",
  },
  {
    id: "montessori-respect",
    title: "Authentic Montessori Spirit",
    description:
      "We honor each child's natural curiosity and independent pace with tactile materials rather than rushed rote memorization.",
    iconName: "compass",
    accent: "teal",
  },
  {
    id: "healthy-nourishment",
    title: "Whole-Child Nourishment",
    description:
      "Fresh, home-style school meals following a weekly menu—with hot milk and seasonal fruits every day—fuel growing bodies and minds.",
    iconName: "apple",
    accent: "coral",
  },
  {
    id: "family-partnership",
    title: "Warm Family Support",
    description:
      "From regular 9 AM–3 PM classes to Daycare and 3–5 PM After-Class Care, we partner closely with Biratnagar families.",
    iconName: "heart",
    accent: "olive",
  },
];

export const CAMPUS_FACILITIES: FacilityItem[] = [
  {
    id: "cctv-security",
    title: "24/7 CCTV Monitored Security",
    description:
      "HD cameras cover classrooms, play zones, dining areas, and entrance gates alongside supervised pickup verification.",
    iconName: "camera",
    accent: "magenta",
    image: "/images/hero-classroom.jpg",
    imageAlt:
      "CCTV-monitored sunlit Montessori classroom at Kids Berry Kindergarten School",
  },
  {
    id: "fresh-meals",
    title: "Weekly Menu + Daily Hot Milk & Fruits",
    description:
      "Hygienic school kitchen serving balanced freshly cooked meals plus warm milk and fresh fruit every single day.",
    iconName: "apple",
    accent: "coral",
    image: "/images/program-nursery.jpg",
    imageAlt: "Clean classroom dining and creative nursery table environment",
  },
  {
    id: "clean-classrooms",
    title: "Clean Montessori Rooms & Play Garden",
    description:
      "Daily sanitized classrooms with rounded wooden shelves, soft activity mats, and a shaded outdoor grass playground.",
    iconName: "trees",
    accent: "olive",
    image: "/images/gallery-outdoor.jpg",
    imageAlt:
      "Shaded green outdoor playground and slides at Kids Berry Kindergarten School",
  },
  {
    id: "daycare-aftercare",
    title: "Daycare & After-Class Care (3–5 PM)",
    description:
      "Cozy resting cots, clean personal bedding, and calm supervised afternoon play until 5:00 PM.",
    iconName: "bed",
    accent: "teal",
    image: "/images/program-playgroup.jpg",
    imageAlt:
      "Cozy padded mat and sensory play zone for Daycare and After-Class Care",
  },
];

export const DETAILED_FACILITIES: DetailedFacilityItem[] = [
  {
    id: "fac-cctv",
    badge: "Safety First",
    title: "Safe & Secure Environment with CCTV Monitoring",
    subtitle: "Complete campus visibility and verified child pickup",
    description:
      "Your child's safety is our highest responsibility. Every learning room, hallway, dining space, outdoor play area, and entry gate in Pichara, Biratnagar-11 is monitored by continuous CCTV surveillance.",
    highlights: [
      "24/7 CCTV camera coverage across indoor & outdoor campus zones",
      "Single gated entrance with guarded visitor sign-in log",
      "Authorized guardian ID pickup policy—no unverified handoffs",
      "Rounded child-safe classroom furniture & soft corner guards",
    ],
    iconName: "camera",
    accent: "magenta",
    image: "/images/hero-classroom.jpg",
    imageAlt:
      "Safe, CCTV-monitored Montessori learning environment with attentive teacher",
  },
  {
    id: "fac-food",
    badge: "Healthy Nutrition",
    title: "Nutritious Food Provided (Weekly Menu + Daily Hot Milk & Fruits)",
    subtitle:
      "Freshly cooked wholesome meals—no morning tiffin stress for parents",
    description:
      "Growing brains and active little bodies deserve warm, balanced nourishment. Our clean campus kitchen prepares fresh kid-friendly meals from a rotating weekly menu, complemented by warm milk and fresh seasonal fruits every day.",
    highlights: [
      "Structured Sunday–Friday weekly menu planned for young tummies",
      "Hot milk and fresh seasonal fruits served every single school day",
      "Zero junk food, artificial colors, or packaged sugary snacks",
      "Clean seated dining habits with allergy notes carefully respected",
    ],
    iconName: "apple",
    accent: "coral",
    image: "/images/program-nursery.jpg",
    imageAlt:
      "Happy preschoolers gathered around clean wooden classroom tables",
  },
  {
    id: "fac-classrooms",
    badge: "Clean & Inspiring",
    title: "Clean Montessori Classrooms & Play Areas",
    subtitle: "Sunlit learning environments sanitized daily",
    description:
      "Bright, airy rooms with low open wooden Montessori shelves invite independent exploration, while our shaded outdoor lawn and soft indoor mats encourage safe daily physical movement.",
    highlights: [
      "Daily sanitization of wooden Montessori toys, tables & floor mats",
      "Naturally lit, well-ventilated classrooms tailored to child height",
      "Shaded garden playground with age-appropriate slides & balance toys",
      "Dedicated art, music, and cozy cushioned storybook reading corners",
    ],
    iconName: "trees",
    accent: "olive",
    image: "/images/gallery-outdoor.jpg",
    imageAlt:
      "Clean outdoor playground garden with slides and balance equipment",
  },
  {
    id: "fac-daycare",
    badge: "Full-Day Comfort",
    title: "Dedicated Daycare Facilities",
    subtitle: "Warm, home-like rest and attentive care from 9:00 AM – 5:00 PM",
    description:
      "Our Daycare wing gives Biratnagar working parents reliable full-day support. Toddlers and preschoolers enjoy morning Montessori discovery followed by cozy naps, healthy nourishment, and loving companionship.",
    highlights: [
      "Quiet, temperature-comfortable rest room with individual clean bedding",
      "Dedicated caregivers assisting with hygiene, feeding & nap routines",
      "Gentle diaper/toilet-training support in coordination with parents",
      "Daily care update shared with parents at evening pickup",
    ],
    iconName: "bed",
    accent: "teal",
    image: "/images/program-playgroup.jpg",
    imageAlt: "Soft cushioned toddler and daycare play room with wooden toys",
  },
  {
    id: "fac-aftercare",
    badge: "3:00 PM – 5:00 PM",
    title: "After-Class Care (3:00 PM – 5:00 PM)",
    subtitle: "Relaxed, joyful extended afternoon supervision",
    description:
      "When regular Montessori classes conclude at 3:00 PM, children enrolled in After-Class Care transition smoothly into warm milk, fresh fruit, puzzles, outdoor games, and guided quiet activities until 5:00 PM.",
    highlights: [
      "Seamless continuation right on campus—no stressful pickup gap at 3 PM",
      "Warm milk, fresh fruit & healthy evening bite served at 3:15 PM",
      "Free creative play, building blocks, stories & calm relaxation",
      "Supervised inside familiar CCTV-monitored rooms by known teachers",
    ],
    iconName: "clock",
    accent: "orange",
    image: "/images/about-story.jpg",
    imageAlt:
      "Educator guiding children in calm afternoon activities during After-Class Care",
  },
  {
    id: "fac-hygiene",
    badge: "Health & Hygiene",
    title: "RO Purified Water, Child-Sized Washrooms & First Aid",
    subtitle: "Thoughtful everyday wellness standards",
    description:
      "Healthy habits begin with clean, welcoming facilities. From child-height sinks that teach independent handwashing to multi-stage purified drinking water, wellness is woven into every routine.",
    highlights: [
      "Multi-stage RO & UV purified drinking water always accessible",
      "Clean, non-slip child-sized washrooms assisted by female attendants",
      "Trained staff in pediatric first aid & fully stocked medical kit",
      "Regular handwashing routines before meals and after garden play",
    ],
    iconName: "shield",
    accent: "magenta",
    image: "/images/program-lkg.jpg",
    imageAlt:
      "Clean sunlit reading and wellness-oriented Montessori classroom space",
  },
];

export const WEEKLY_MENU: WeeklyMenuItem[] = [
  {
    id: "sun",
    day: "Sunday",
    morningSnack: "Warm Vegetable Oats & Apple Slices",
    hotLunch: "Soft Rice, Yellow Dal, Mild Seasonal Veg & Cucumber",
    afternoonBooster: "Daily Hot Milk + Fresh Banana & Papaya",
    accent: "magenta",
  },
  {
    id: "mon",
    day: "Monday",
    morningSnack: "Whole-Wheat Suji Halwa & Boiled Egg / Paneer",
    hotLunch: "Soft Roti, Moong Dal Khichdi & Carrot-Pea Mash",
    afternoonBooster: "Daily Hot Milk + Fresh Orange / Seasonal Fruit",
    accent: "coral",
  },
  {
    id: "tue",
    day: "Tuesday",
    morningSnack: "Steamed Poha with Peanuts & Sweet Corn",
    hotLunch: "Jeera Rice, Rajma / Lentil Curry & Sautéed Greens",
    afternoonBooster: "Daily Hot Milk + Fresh Apple & Pear Wedges",
    accent: "teal",
  },
  {
    id: "wed",
    day: "Wednesday",
    morningSnack: "Homemade Mini Vegetable Paratha & Curd",
    hotLunch: "Soft Vegetable Pulao, Raita & Roasted Pumpkin",
    afternoonBooster: "Daily Hot Milk + Fresh Banana & Grapes",
    accent: "blue",
  },
  {
    id: "thu",
    day: "Thursday",
    morningSnack: "Soft Idli / Rice Cake with Mild Dal Dip",
    hotLunch: "Rice, Creamy Masoor Dal, Mild Potato-Cauliflower",
    afternoonBooster: "Daily Hot Milk + Fresh Watermelon / Mango (Seasonal)",
    accent: "olive",
  },
  {
    id: "fri",
    day: "Friday",
    morningSnack: "Warm Semolina Porridge & Soaked Raisins",
    hotLunch: "Special Friday Paneer / Egg Fried Rice & Clear Veg Soup",
    afternoonBooster: "Daily Hot Milk + Fresh Mixed Fruit Bowl",
    accent: "magenta",
  },
];

export const LEARNING_PILLARS: LearningPillar[] = [
  {
    id: "practical-life",
    title: "Practical Life & Independence",
    subtitle: "Building coordination, care & everyday confidence",
    description:
      "Children practice real-world skills—pouring water, buttoning frames, tidying mats, and caring for classroom plants—developing focus and self-belief.",
    activities: [
      "Pouring, spooning & transferring trays",
      "Dressing frames, folding & polite table manners",
      "Watering plants & caring for shared spaces",
    ],
    iconName: "handHeart",
    accent: "coral",
  },
  {
    id: "sensorial",
    title: "Sensorial Exploration",
    subtitle: "Refining the five senses to understand the world",
    description:
      "Montessori pink towers, color tablets, sound cylinders, and texture boards train observation, comparison, and early scientific thinking.",
    activities: [
      "Dimension blocks & geometric solid sorting",
      "Color grading & tactile fabric matching",
      "Nature sensory walks & sound games",
    ],
    iconName: "sparkles",
    accent: "magenta",
  },
  {
    id: "language-literacy",
    title: "Language, Phonics & Bilingual Joy",
    subtitle: "Expressive speaking, listening & emergent reading",
    description:
      "Through multi-sensory sandpaper letters, lively phonics songs, picture books, and Nepali rhymes, children become eager speakers and storytellers.",
    activities: [
      "Jolly Phonics sounds & movable alphabet",
      "Interactive read-alouds & puppet drama",
      "Everyday conversational English & Nepali",
    ],
    iconName: "book",
    accent: "teal",
  },
  {
    id: "numeracy",
    title: "Concrete Numeracy & Logic",
    subtitle: "Touching numbers before writing equations",
    description:
      "Number rods, spindle boxes, and golden bead units let children hold quantity in their hands so math feels intuitive and exciting.",
    activities: [
      "Counting rods & tactile number recognition",
      "Patterning, measurement & sorting puzzles",
      "Playful addition & subtraction stories",
    ],
    iconName: "blocks",
    accent: "orange",
  },
  {
    id: "creative-outdoor",
    title: "Creative Arts, Music & Outdoor Play",
    subtitle: "Whole-child joy, imagination & healthy movement",
    description:
      "Daily art exploration, singing, mindfulness stretching, and active garden play nurture creativity, balance, and warm friendships.",
    activities: [
      "Watercolor painting, clay & festival crafts",
      "Rhythm instruments, dance & action songs",
      "Outdoor obstacle play & nature gardening",
    ],
    iconName: "palette",
    accent: "olive",
  },
];

export const DAILY_ROUTINE: RoutineItem[] = [
  {
    id: "r1",
    time: "9:00 AM – 9:30 AM",
    activity: "Warm Welcome, Morning Snack & Free Play",
    description:
      "Smiling teachers greet every child at our CCTV-monitored gate, followed by warm morning snacks and cozy table puzzles.",
    iconName: "smile",
    accent: "coral",
  },
  {
    id: "r2",
    time: "9:30 AM – 10:15 AM",
    activity: "Morning Circle, Rhymes & Mindfulness",
    description:
      "Weather calendar, joyful welcome songs in English & Nepali, gentle stretching, and sharing morning thoughts.",
    iconName: "music",
    accent: "magenta",
  },
  {
    id: "r3",
    time: "10:15 AM – 11:45 AM",
    activity: "Montessori Discovery Work Cycle",
    description:
      "Uninterrupted hands-on learning across Practical Life, Phonics, Sensorial trays, and Counting beads at each child's pace.",
    iconName: "blocks",
    accent: "teal",
  },
  {
    id: "r4",
    time: "11:45 AM – 12:30 PM",
    activity: "Handwashing & Wholesome Hot Lunch",
    description:
      "Freshly cooked nutritious meal served from our weekly school menu, encouraging joyful eating and polite table manners.",
    iconName: "utensils",
    accent: "blue",
  },
  {
    id: "r5",
    time: "12:30 PM – 1:45 PM",
    activity: "Cozy Rest / Quiet Time & Story Reading",
    description:
      "Restful nap time for younger Playgroup & Daycare toddlers, and quiet picture-book reading & music for older learners.",
    iconName: "bed",
    accent: "olive",
  },
  {
    id: "r6",
    time: "1:45 PM – 3:00 PM",
    activity: "Outdoor Garden Play, Art & Daily Hot Milk + Fruits",
    description:
      "Sunshine playground games, watercolor crafts, daily warm milk with fresh seasonal fruits, and 3:00 PM Regular Class dismissal.",
    iconName: "apple",
    accent: "coral",
  },
  {
    id: "r7",
    time: "3:00 PM – 5:00 PM",
    activity: "After-Class Care & Daycare Afternoon",
    description:
      "Relaxed evening refreshment, guided indoor blocks, coloring, cozy stories, and safe verified parent pickup until 5:00 PM.",
    iconName: "clock",
    accent: "magenta",
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Morning Montessori Wooden Block Discovery",
    category: "montessori",
    categoryLabel: "Montessori Classroom",
    description:
      "Little learners collaborating around our sunlit wooden table with tactile stacking blocks and sorting sets.",
    imageUrl: "/images/hero-classroom.jpg",
    date: "Montessori Work",
  },
  {
    id: "g2",
    title: "Guided Sorting & One-on-One Teacher Care",
    category: "montessori",
    categoryLabel: "Montessori Classroom",
    description:
      "Teachers kneel beside students to offer gentle encouragement during morning sensorial sorting.",
    imageUrl: "/images/about-story.jpg",
    date: "Classroom Care",
  },
  {
    id: "g3",
    title: "Sunshine Garden & Slide Adventures",
    category: "outdoor",
    categoryLabel: "Outdoor & Play",
    description:
      "Active morning movement in our shaded garden playground builds balance, teamwork, and big smiles.",
    imageUrl: "/images/gallery-outdoor.jpg",
    date: "Play Area",
  },
  {
    id: "g4",
    title: "Watercolor Flowers & Craft Morning",
    category: "art",
    categoryLabel: "Art & Creativity",
    description:
      "Young artists exploring bright magenta, coral, and teal paints with washable brushes and paper blooms.",
    imageUrl: "/images/gallery-art.jpg",
    date: "Art Studio",
  },
  {
    id: "g5",
    title: "Festival Celebration & Marigold Smiles",
    category: "events",
    categoryLabel: "Celebrations & Events",
    description:
      "Celebrating Nepali cultural traditions together with marigold garlands, colorful paper lanterns, and joyful songs.",
    imageUrl: "/images/gallery-festival.jpg",
    date: "Festival Day",
  },
  {
    id: "g6",
    title: "Toddler Nest & Daycare Sensory Mat",
    category: "montessori",
    categoryLabel: "Montessori Classroom",
    description:
      "Our youngest Playgroup & Daycare friends exploring rainbow stacking rings and smooth natural wood blocks on cushioned mats.",
    imageUrl: "/images/program-playgroup.jpg",
    date: "Playgroup & Daycare",
  },
  {
    id: "g7",
    title: "Nursery Paper Flower Workshop",
    category: "art",
    categoryLabel: "Art & Creativity",
    description:
      "Fine-motor finger strengthening disguised as cheerful watercolor painting and paper crafting.",
    imageUrl: "/images/program-nursery.jpg",
    date: "Nursery Studio",
  },
  {
    id: "g8",
    title: "Phonics & Picture Book Story Circle",
    category: "montessori",
    categoryLabel: "Montessori Classroom",
    description:
      "Junior KG children gathered on the woven rug matching wooden alphabet letters to colorful storybooks.",
    imageUrl: "/images/program-lkg.jpg",
    date: "Reading Corner",
  },
  {
    id: "g9",
    title: "Counting Beads & Little Science Magnifiers",
    category: "montessori",
    categoryLabel: "Montessori Classroom",
    description:
      "Senior KG students practicing hands-on math beads and exploring classroom specimens with magnifying glasses.",
    imageUrl: "/images/program-ukg.jpg",
    date: "Senior KG",
  },
];

export const ADMISSION_STEPS: AdmissionStep[] = [
  {
    stepNumber: "01",
    title: "Inquiry & Campus Tour",
    description:
      "Message us on WhatsApp or visit Pichara, Biratnagar-11 to inspect our CCTV-monitored classrooms, kitchen, and play garden.",
    iconName: "calendarCheck",
    accent: "magenta",
  },
  {
    stepNumber: "02",
    title: "Warm Family & Child Visit",
    description:
      "Bring your little one for a relaxed play visit so they can explore toys and meet our teachers without any formal testing.",
    iconName: "smile",
    accent: "coral",
  },
  {
    stepNumber: "03",
    title: "Choose Schedule & Submit Docs",
    description:
      "Select Regular Class (9 AM–3 PM), Daycare, or After-Class Care (3–5 PM) and submit your child's birth certificate and health details.",
    iconName: "fileCheck",
    accent: "teal",
  },
  {
    stepNumber: "04",
    title: "Welcome to Kids Berry Family",
    description:
      "Receive your weekly food menu, welcome orientation kit, and begin gentle first-day settling-in!",
    iconName: "partyPopper",
    accent: "orange",
  },
];

export const ADMISSION_REQUIREMENTS: AdmissionRequirement[] = [
  {
    id: "req-1",
    label: "Child's Birth Registration Certificate",
    detail: "1 photocopy of official Ward / Municipality birth certificate",
    required: true,
  },
  {
    id: "req-2",
    label: "Recent Passport-Size Photographs",
    detail:
      "4 color passport photos of the child + 2 photos of each parent/authorized guardian",
    required: true,
  },
  {
    id: "req-3",
    label: "Immunization & Dietary Allergy Note",
    detail:
      "Copy of vaccination card plus any food allergy notes for our weekly school meal menu",
    required: true,
  },
  {
    id: "req-4",
    label: "Parent / Guardian ID Verification",
    detail:
      "1 photocopy of citizenship card or valid government ID for safe pickup authorization",
    required: true,
  },
  {
    id: "req-5",
    label: "Previous Preschool Progress Note (Optional)",
    detail:
      "Applicable only if transferring into Junior KG or Senior KG from another school",
    required: false,
  },
];

export const AGE_ELIGIBILITY: AgeEligibilityRow[] = [
  {
    id: "age-pg",
    program: "Playgroup (+ Daycare Option)",
    ageRange: "1.8 – 2.5 Years",
    cutOffNote: "Minimum 20 months; Daycare welcomes 1.5+ yrs",
    sessionTiming: "9:00 AM – 3:00 PM (Care till 5 PM)",
    accent: "coral",
  },
  {
    id: "age-nur",
    program: "Nursery",
    ageRange: "2.5 – 3.5 Years",
    cutOffNote: "Completed 2.5 years at start of session",
    sessionTiming: "9:00 AM – 3:00 PM (Care till 5 PM)",
    accent: "magenta",
  },
  {
    id: "age-lkg",
    program: "Junior KG (LKG)",
    ageRange: "3.5 – 4.5 Years",
    cutOffNote: "Completed 3.5 years at start of session",
    sessionTiming: "9:00 AM – 3:00 PM (Care till 5 PM)",
    accent: "teal",
  },
  {
    id: "age-ukg",
    program: "Senior KG (UKG)",
    ageRange: "4.5 – 6.0 Years",
    cutOffNote: "Completed 4.5 years at start of session",
    sessionTiming: "9:00 AM – 3:00 PM (Care till 5 PM)",
    accent: "blue",
  },
];

export const ADMISSION_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Do parents need to pack tiffin or snacks from home?",
    answer:
      "No! Kids Berry Kindergarten School provides fresh, hygienic meals prepared according to a balanced weekly menu—and every child receives warm milk and fresh seasonal fruits every single day.",
  },
  {
    id: "faq-2",
    question: "What are the Regular Class and After-Class Care timings?",
    answer:
      "Regular Montessori classes run Sunday through Friday from 9:00 AM to 3:00 PM. For parents needing extended hours, After-Class Care runs from 3:00 PM to 5:00 PM, and full Daycare is available all day.",
  },
  {
    id: "faq-3",
    question: "Is the campus monitored by CCTV?",
    answer:
      "Yes. All classrooms, hallways, dining spaces, play areas, and entrances are covered by continuous CCTV monitoring alongside verified guardian pickup procedures.",
  },
  {
    id: "faq-4",
    question:
      "How do you help toddlers who are attending school for the first time?",
    answer:
      "We follow a gentle, warm settling-in week where caring teachers help toddlers build comfort with soft mats, sensory toys, and unhurried reassurance.",
  },
];

// ============================================================================
// Future CMS Adapter Getters
// Swap these synchronous returns for async CMS API calls when ready.
// ============================================================================
export function getSiteConfig(): SiteConfig {
  return SITE_CONFIG;
}

export function getKeyBenefits(): BenefitItem[] {
  return KEY_BENEFITS;
}

export function getCareTracks(): CareTrackItem[] {
  return CARE_TRACKS;
}

export function getPrograms(): ProgramItem[] {
  return PROGRAMS;
}

export function getTestimonials(): TestimonialItem[] {
  return TESTIMONIALS;
}

export function getTeamMembers(): TeamMember[] {
  return TEAM_MEMBERS;
}

export function getCoreValues(): ValueItem[] {
  return CORE_VALUES;
}

export function getCampusFacilities(): FacilityItem[] {
  return CAMPUS_FACILITIES;
}

export function getDetailedFacilities(): DetailedFacilityItem[] {
  return DETAILED_FACILITIES;
}

export function getWeeklyMenu(): WeeklyMenuItem[] {
  return WEEKLY_MENU;
}

export function getLearningPillars(): LearningPillar[] {
  return LEARNING_PILLARS;
}

export function getDailyRoutine(): RoutineItem[] {
  return DAILY_ROUTINE;
}

export function getGalleryItems(): GalleryItem[] {
  return GALLERY_ITEMS;
}

export function getAdmissionSteps(): AdmissionStep[] {
  return ADMISSION_STEPS;
}

export function getAdmissionRequirements(): AdmissionRequirement[] {
  return ADMISSION_REQUIREMENTS;
}

export function getAgeEligibility(): AgeEligibilityRow[] {
  return AGE_ELIGIBILITY;
}

export function getAdmissionFAQs(): FAQItem[] {
  return ADMISSION_FAQS;
}
