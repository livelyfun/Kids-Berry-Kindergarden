import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function parseJsonStringArray(val: unknown): string[] {
  if (Array.isArray(val)) {
    return val.map((v) => String(v).trim()).filter(Boolean);
  }
  if (typeof val === "string") {
    return val
      .split(/\r?\n|,/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function parseIntSafe(val: unknown, fallback = 0): number {
  const n = Number(val);
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
}

function parseJsonObjectOrNull(
  val: unknown,
): Prisma.InputJsonValue | typeof Prisma.JsonNull | undefined {
  if (val === undefined) return undefined;
  if (val === null || val === "") return Prisma.JsonNull;
  if (typeof val === "string") {
    try {
      return JSON.parse(val) as Prisma.InputJsonValue;
    } catch {
      return undefined;
    }
  }
  return val as Prisma.InputJsonValue;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function revalidateSite() {
  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/programs");
  revalidatePath("/facilities");
  revalidatePath("/gallery");
  revalidatePath("/admissions");
  revalidatePath("/contact");
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ resource: string }> },
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { resource } = await context.params;

  try {
    switch (resource) {
      case "settings": {
        const settings = await prisma.siteSettings.findUnique({
          where: { id: "default" },
        });
        return NextResponse.json({ data: settings });
      }
      case "programs": {
        const items = await prisma.program.findMany({
          orderBy: [{ programType: "asc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
        });
        return NextResponse.json({ data: items });
      }
      case "facilities": {
        const items = await prisma.facility.findMany({
          orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        });
        return NextResponse.json({ data: items });
      }
      case "gallery": {
        const items = await prisma.galleryImage.findMany({
          orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        });
        return NextResponse.json({ data: items });
      }
      case "testimonials": {
        const items = await prisma.testimonial.findMany({
          orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        });
        return NextResponse.json({ data: items });
      }
      case "team": {
        const items = await prisma.teamMember.findMany({
          orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        });
        return NextResponse.json({ data: items });
      }
      case "menu": {
        const items = await prisma.foodMenu.findMany({
          orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        });
        return NextResponse.json({ data: items });
      }
      case "sections": {
        const items = await prisma.pageSection.findMany({
          orderBy: [{ page: "asc" }, { category: "asc" }, { sortOrder: "asc" }],
        });
        return NextResponse.json({ data: items });
      }
      case "inquiries": {
        const items = await prisma.contactInquiry.findMany({
          orderBy: { createdAt: "desc" },
        });
        return NextResponse.json({ data: items });
      }
      case "popups": {
        const items = await prisma.popupNotification.findMany({
          orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        });
        return NextResponse.json({ data: items });
      }
      default:
        return NextResponse.json(
          { error: `Unknown resource: ${resource}` },
          { status: 404 },
        );
    }
  } catch (error) {
    console.error(`GET /api/admin/${resource} error:`, error);
    return NextResponse.json(
      { error: "Database query failed." },
      { status: 500 },
    );
  }
}

export async function POST(
  request: Request,
  context: { params: Promise<{ resource: string }> },
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { resource } = await context.params;
  const body = await request.json();

  try {
    let created: unknown;

    switch (resource) {
      case "programs": {
        const title = String(body.title || "").trim();
        if (!title) {
          return NextResponse.json(
            { error: "Title is required." },
            { status: 400 },
          );
        }
        const baseSlug = slugify(String(body.slug || title)) || `prog-${Date.now()}`;
        const existingSlug = await prisma.program.findUnique({
          where: { slug: baseSlug },
        });
        const uniqueSlug = existingSlug
          ? `${baseSlug}-${Date.now().toString().slice(-4)}`
          : baseSlug;

        created = await prisma.program.create({
          data: {
            slug: uniqueSlug,
            programType: String(body.programType || "ACADEMIC"),
            badge: body.badge ? String(body.badge) : null,
            title,
            subtitle: String(body.subtitle || ""),
            ageGroup: String(body.ageGroup || ""),
            ageEligibility: body.ageEligibility
              ? String(body.ageEligibility)
              : null,
            timing: String(body.timing || "9:00 AM – 3:00 PM"),
            duration: body.duration ? String(body.duration) : null,
            classSize: body.classSize ? String(body.classSize) : null,
            ratio: body.ratio ? String(body.ratio) : null,
            shortDescription: String(body.shortDescription || ""),
            fullDescription: String(
              body.fullDescription || body.shortDescription || "",
            ),
            highlights: parseJsonStringArray(body.highlights),
            curriculumAreas: parseJsonStringArray(body.curriculumAreas),
            iconName: String(body.iconName || "blocks"),
            accent: String(body.accent || "magenta"),
            imageUrl: String(body.imageUrl || "/images/program-nursery.jpg"),
            imageAlt: String(body.imageAlt || title),
            sortOrder: parseIntSafe(body.sortOrder, 0),
            published: Boolean(body.published),
          },
        });
        break;
      }

      case "facilities": {
        const title = String(body.title || "").trim();
        if (!title) {
          return NextResponse.json(
            { error: "Title is required." },
            { status: 400 },
          );
        }
        created = await prisma.facility.create({
          data: {
            badge: String(body.badge || "Facility"),
            title,
            subtitle: String(body.subtitle || ""),
            description: String(body.description || ""),
            highlights: parseJsonStringArray(body.highlights),
            iconName: String(body.iconName || "shield"),
            accent: String(body.accent || "magenta"),
            imageUrl: String(body.imageUrl || "/images/hero-classroom.jpg"),
            imageAlt: String(body.imageAlt || title),
            showOnHome:
              body.showOnHome === undefined ? true : Boolean(body.showOnHome),
            sortOrder: parseIntSafe(body.sortOrder, 0),
            published: Boolean(body.published),
          },
        });
        break;
      }

      case "gallery": {
        const title = String(body.title || "").trim();
        const imageUrl = String(body.imageUrl || "").trim();
        if (!title || !imageUrl) {
          return NextResponse.json(
            { error: "Title and Image URL are required." },
            { status: 400 },
          );
        }
        const category = String(body.category || "montessori");
        const labelMap: Record<string, string> = {
          montessori: "Montessori Classroom",
          outdoor: "Outdoor & Play",
          art: "Art & Creativity",
          events: "Celebrations & Events",
        };
        created = await prisma.galleryImage.create({
          data: {
            title,
            category,
            categoryLabel: String(
              body.categoryLabel || labelMap[category] || "Campus Life",
            ),
            description: String(body.description || ""),
            imageUrl,
            dateLabel: String(body.dateLabel || "Campus Life"),
            aspect: String(body.aspect || "square"),
            sortOrder: parseIntSafe(body.sortOrder, 0),
            published: Boolean(body.published),
          },
        });
        break;
      }

      case "testimonials": {
        const parentName = String(body.parentName || "").trim();
        const quote = String(body.quote || "").trim();
        if (!parentName || !quote) {
          return NextResponse.json(
            { error: "Parent name and quote are required." },
            { status: 400 },
          );
        }
        created = await prisma.testimonial.create({
          data: {
            parentName,
            relation: String(body.relation || "Parent"),
            childName: String(body.childName || ""),
            program: String(body.program || "Montessori"),
            quote,
            rating: Math.min(5, Math.max(1, parseIntSafe(body.rating, 5))),
            location: String(body.location || "Biratnagar-11"),
            accent: String(body.accent || "magenta"),
            sortOrder: parseIntSafe(body.sortOrder, 0),
            published: Boolean(body.published),
          },
        });
        break;
      }

      case "team": {
        const name = String(body.name || "").trim();
        const role = String(body.role || "").trim();
        if (!name || !role) {
          return NextResponse.json(
            { error: "Name and role are required." },
            { status: 400 },
          );
        }
        created = await prisma.teamMember.create({
          data: {
            name,
            role,
            qualification: String(body.qualification || ""),
            experience: String(body.experience || ""),
            bio: String(body.bio || ""),
            quote: String(body.quote || ""),
            imageUrl: String(body.imageUrl || "/images/team-1.jpg"),
            accent: String(body.accent || "magenta"),
            sortOrder: parseIntSafe(body.sortOrder, 0),
            published: Boolean(body.published),
          },
        });
        break;
      }

      case "menu": {
        const day = String(body.day || "").trim();
        if (!day) {
          return NextResponse.json(
            { error: "Day is required." },
            { status: 400 },
          );
        }
        created = await prisma.foodMenu.create({
          data: {
            day,
            morningSnack: String(body.morningSnack || ""),
            hotLunch: String(body.hotLunch || ""),
            afternoonBooster: String(
              body.afternoonBooster || "Daily Hot Milk + Fresh Seasonal Fruits",
            ),
            accent: String(body.accent || "magenta"),
            sortOrder: parseIntSafe(body.sortOrder, 0),
            published: Boolean(body.published),
          },
        });
        break;
      }

      case "sections": {
        const title = String(body.title || "").trim();
        const category = String(body.category || "benefit").trim();
        const page = String(body.page || "home").trim();
        if (!title) {
          return NextResponse.json(
            { error: "Title is required." },
            { status: 400 },
          );
        }
        const rawKey = String(
          body.sectionKey || `${page}-${category}-${slugify(title)}-${Date.now()}`,
        ).trim();
        const existingKey = await prisma.pageSection.findUnique({
          where: { sectionKey: rawKey },
        });
        const sectionKey = existingKey ? `${rawKey}-${Date.now()}` : rawKey;

        created = await prisma.pageSection.create({
          data: {
            page,
            sectionKey,
            category,
            badge: body.badge ? String(body.badge) : null,
            title,
            subtitle: body.subtitle ? String(body.subtitle) : null,
            description: String(body.description || ""),
            imageUrl: body.imageUrl ? String(body.imageUrl) : null,
            imageAlt: body.imageAlt ? String(body.imageAlt) : null,
            iconName: String(body.iconName || "sparkles"),
            accent: String(body.accent || "magenta"),
            metadata: parseJsonObjectOrNull(body.metadata),
            sortOrder: parseIntSafe(body.sortOrder, 0),
            published: Boolean(body.published),
          },
        });
        break;
      }

      case "popups": {
        const title = String(body.title || "").trim();
        const message = String(body.message || "").trim();
        if (!title || !message) {
          return NextResponse.json(
            { error: "Title and message are required." },
            { status: 400 },
          );
        }
        created = await prisma.popupNotification.create({
          data: {
            badge: body.badge ? String(body.badge).trim() || null : null,
            title,
            message,
            imageUrl: body.imageUrl ? String(body.imageUrl).trim() || null : null,
            imageAlt: body.imageAlt
              ? String(body.imageAlt).trim() || title
              : title,
            ctaLabel: body.ctaLabel
              ? String(body.ctaLabel).trim() || null
              : null,
            ctaHref: body.ctaHref ? String(body.ctaHref).trim() || null : null,
            accent: String(body.accent || "magenta"),
            sortOrder: parseIntSafe(body.sortOrder, 0),
            published: Boolean(body.published),
          },
        });
        break;
      }

      default:
        return NextResponse.json(
          { error: `POST not supported for resource: ${resource}` },
          { status: 400 },
        );
    }

    revalidateSite();
    return NextResponse.json({ ok: true, data: created }, { status: 201 });
  } catch (error) {
    console.error(`POST /api/admin/${resource} error:`, error);
    return NextResponse.json(
      { error: "Failed to create item." },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ resource: string }> },
) {
  return handleUpdate(request, context);
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ resource: string }> },
) {
  return handleUpdate(request, context);
}

async function handleUpdate(
  request: Request,
  context: { params: Promise<{ resource: string }> },
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { resource } = await context.params;
  const body = await request.json();

  try {
    if (resource === "account") {
      const currentPassword = String(body.currentPassword || "");
      const newPassword = String(body.newPassword || "");
      const newUsername =
        typeof body.username === "string" ? body.username.trim() : "";

      const user = await prisma.user.findUnique({
        where: { id: session.userId },
      });
      if (!user) {
        return NextResponse.json({ error: "User not found." }, { status: 404 });
      }
      const matches = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!matches) {
        return NextResponse.json(
          { error: "Current password is incorrect." },
          { status: 400 },
        );
      }

      const updateData: { username?: string; passwordHash?: string; name?: string } = {};
      if (newUsername && newUsername !== user.username) {
        updateData.username = newUsername;
      }
      if (typeof body.name === "string" && body.name.trim()) {
        updateData.name = body.name.trim();
      }
      if (newPassword) {
        if (newPassword.length < 6) {
          return NextResponse.json(
            { error: "New password must be at least 6 characters." },
            { status: 400 },
          );
        }
        updateData.passwordHash = await bcrypt.hash(newPassword, 12);
      }

      await prisma.user.update({
        where: { id: user.id },
        data: updateData,
      });

      return NextResponse.json({ ok: true });
    }

    if (resource === "settings") {
      const updated = await prisma.siteSettings.update({
        where: { id: "default" },
        data: {
          ...(body.schoolName !== undefined && { schoolName: String(body.schoolName) }),
          ...(body.shortName !== undefined && { shortName: String(body.shortName) }),
          ...(body.schoolType !== undefined && { schoolType: String(body.schoolType) }),
          ...(body.tagline !== undefined && { tagline: String(body.tagline) }),
          ...(body.subTagline !== undefined && { subTagline: String(body.subTagline) }),
          ...(body.logoUrl !== undefined && { logoUrl: String(body.logoUrl) }),
          ...(body.establishedYear !== undefined && {
            establishedYear: String(body.establishedYear),
          }),
          ...(body.street !== undefined && { street: String(body.street) }),
          ...(body.ward !== undefined && { ward: String(body.ward) }),
          ...(body.city !== undefined && { city: String(body.city) }),
          ...(body.province !== undefined && { province: String(body.province) }),
          ...(body.country !== undefined && { country: String(body.country) }),
          ...(body.fullAddress !== undefined && { fullAddress: String(body.fullAddress) }),
          ...(body.landmark !== undefined && { landmark: String(body.landmark) }),
          ...(body.primaryPhone !== undefined && {
            primaryPhone: String(body.primaryPhone),
          }),
          ...(body.secondaryPhone !== undefined && {
            secondaryPhone: String(body.secondaryPhone),
          }),
          ...(body.whatsappNumber !== undefined && {
            whatsappNumber: String(body.whatsappNumber),
          }),
          ...(body.whatsappDisplay !== undefined && {
            whatsappDisplay: String(body.whatsappDisplay),
          }),
          ...(body.email !== undefined && { email: String(body.email) }),
          ...(body.admissionsEmail !== undefined && {
            admissionsEmail: String(body.admissionsEmail),
          }),
          ...(body.openDays !== undefined && { openDays: String(body.openDays) }),
          ...(body.regularClassTime !== undefined && {
            regularClassTime: String(body.regularClassTime),
          }),
          ...(body.afterClassCareTime !== undefined && {
            afterClassCareTime: String(body.afterClassCareTime),
          }),
          ...(body.daycareTime !== undefined && { daycareTime: String(body.daycareTime) }),
          ...(body.closedOn !== undefined && { closedOn: String(body.closedOn) }),
          ...(body.daycareAvailable !== undefined && {
            daycareAvailable: Boolean(body.daycareAvailable),
          }),
          ...(body.foodProvided !== undefined && {
            foodProvided: Boolean(body.foodProvided),
          }),
          ...(body.cctvMonitoring !== undefined && {
            cctvMonitoring: Boolean(body.cctvMonitoring),
          }),
          ...(body.montessoriImplemented !== undefined && {
            montessoriImplemented: Boolean(body.montessoriImplemented),
          }),
          ...(body.facebookUrl !== undefined && { facebookUrl: String(body.facebookUrl) }),
          ...(body.facebookHandle !== undefined && {
            facebookHandle: String(body.facebookHandle),
          }),
          ...(body.instagramUrl !== undefined && {
            instagramUrl: String(body.instagramUrl),
          }),
          ...(body.instagramHandle !== undefined && {
            instagramHandle: String(body.instagramHandle),
          }),
          ...(body.googleMapsEmbedUrl !== undefined && {
            googleMapsEmbedUrl: String(body.googleMapsEmbedUrl),
          }),
          ...(body.googleMapsLinkUrl !== undefined && {
            googleMapsLinkUrl: String(body.googleMapsLinkUrl),
          }),
          ...(body.heroStats !== undefined && { heroStats: body.heroStats }),
        },
      });
      revalidateSite();
      return NextResponse.json({ ok: true, data: updated });
    }

    const id = String(body.id || "").trim();
    if (!id) {
      return NextResponse.json({ error: "Item id is required." }, { status: 400 });
    }

    let updated: unknown;

    switch (resource) {
      case "programs": {
        updated = await prisma.program.update({
          where: { id },
          data: {
            ...(body.programType !== undefined && {
              programType: String(body.programType),
            }),
            ...(body.badge !== undefined && {
              badge: body.badge ? String(body.badge) : null,
            }),
            ...(body.title !== undefined && { title: String(body.title) }),
            ...(body.subtitle !== undefined && { subtitle: String(body.subtitle) }),
            ...(body.ageGroup !== undefined && { ageGroup: String(body.ageGroup) }),
            ...(body.ageEligibility !== undefined && {
              ageEligibility: body.ageEligibility
                ? String(body.ageEligibility)
                : null,
            }),
            ...(body.timing !== undefined && { timing: String(body.timing) }),
            ...(body.duration !== undefined && {
              duration: body.duration ? String(body.duration) : null,
            }),
            ...(body.classSize !== undefined && {
              classSize: body.classSize ? String(body.classSize) : null,
            }),
            ...(body.ratio !== undefined && {
              ratio: body.ratio ? String(body.ratio) : null,
            }),
            ...(body.shortDescription !== undefined && {
              shortDescription: String(body.shortDescription),
            }),
            ...(body.fullDescription !== undefined && {
              fullDescription: String(body.fullDescription),
            }),
            ...(body.highlights !== undefined && {
              highlights: parseJsonStringArray(body.highlights),
            }),
            ...(body.curriculumAreas !== undefined && {
              curriculumAreas: parseJsonStringArray(body.curriculumAreas),
            }),
            ...(body.iconName !== undefined && { iconName: String(body.iconName) }),
            ...(body.accent !== undefined && { accent: String(body.accent) }),
            ...(body.imageUrl !== undefined && { imageUrl: String(body.imageUrl) }),
            ...(body.imageAlt !== undefined && { imageAlt: String(body.imageAlt) }),
            ...(body.sortOrder !== undefined && {
              sortOrder: parseIntSafe(body.sortOrder, 0),
            }),
            ...(body.published !== undefined && {
              published: Boolean(body.published),
            }),
          },
        });
        break;
      }

      case "facilities": {
        updated = await prisma.facility.update({
          where: { id },
          data: {
            ...(body.badge !== undefined && { badge: String(body.badge) }),
            ...(body.title !== undefined && { title: String(body.title) }),
            ...(body.subtitle !== undefined && { subtitle: String(body.subtitle) }),
            ...(body.description !== undefined && {
              description: String(body.description),
            }),
            ...(body.highlights !== undefined && {
              highlights: parseJsonStringArray(body.highlights),
            }),
            ...(body.iconName !== undefined && { iconName: String(body.iconName) }),
            ...(body.accent !== undefined && { accent: String(body.accent) }),
            ...(body.imageUrl !== undefined && { imageUrl: String(body.imageUrl) }),
            ...(body.imageAlt !== undefined && { imageAlt: String(body.imageAlt) }),
            ...(body.showOnHome !== undefined && {
              showOnHome: Boolean(body.showOnHome),
            }),
            ...(body.sortOrder !== undefined && {
              sortOrder: parseIntSafe(body.sortOrder, 0),
            }),
            ...(body.published !== undefined && {
              published: Boolean(body.published),
            }),
          },
        });
        break;
      }

      case "gallery": {
        const category =
          body.category !== undefined ? String(body.category) : undefined;
        const labelMap: Record<string, string> = {
          montessori: "Montessori Classroom",
          outdoor: "Outdoor & Play",
          art: "Art & Creativity",
          events: "Celebrations & Events",
        };
        updated = await prisma.galleryImage.update({
          where: { id },
          data: {
            ...(body.title !== undefined && { title: String(body.title) }),
            ...(category !== undefined && {
              category,
              categoryLabel: String(
                body.categoryLabel || labelMap[category] || "Campus Life",
              ),
            }),
            ...(body.description !== undefined && {
              description: String(body.description),
            }),
            ...(body.imageUrl !== undefined && { imageUrl: String(body.imageUrl) }),
            ...(body.dateLabel !== undefined && {
              dateLabel: String(body.dateLabel),
            }),
            ...(body.aspect !== undefined && { aspect: String(body.aspect) }),
            ...(body.sortOrder !== undefined && {
              sortOrder: parseIntSafe(body.sortOrder, 0),
            }),
            ...(body.published !== undefined && {
              published: Boolean(body.published),
            }),
          },
        });
        break;
      }

      case "testimonials": {
        updated = await prisma.testimonial.update({
          where: { id },
          data: {
            ...(body.parentName !== undefined && {
              parentName: String(body.parentName),
            }),
            ...(body.relation !== undefined && { relation: String(body.relation) }),
            ...(body.childName !== undefined && {
              childName: String(body.childName),
            }),
            ...(body.program !== undefined && { program: String(body.program) }),
            ...(body.quote !== undefined && { quote: String(body.quote) }),
            ...(body.rating !== undefined && {
              rating: Math.min(5, Math.max(1, parseIntSafe(body.rating, 5))),
            }),
            ...(body.location !== undefined && { location: String(body.location) }),
            ...(body.accent !== undefined && { accent: String(body.accent) }),
            ...(body.sortOrder !== undefined && {
              sortOrder: parseIntSafe(body.sortOrder, 0),
            }),
            ...(body.published !== undefined && {
              published: Boolean(body.published),
            }),
          },
        });
        break;
      }

      case "team": {
        updated = await prisma.teamMember.update({
          where: { id },
          data: {
            ...(body.name !== undefined && { name: String(body.name) }),
            ...(body.role !== undefined && { role: String(body.role) }),
            ...(body.qualification !== undefined && {
              qualification: String(body.qualification),
            }),
            ...(body.experience !== undefined && {
              experience: String(body.experience),
            }),
            ...(body.bio !== undefined && { bio: String(body.bio) }),
            ...(body.quote !== undefined && { quote: String(body.quote) }),
            ...(body.imageUrl !== undefined && { imageUrl: String(body.imageUrl) }),
            ...(body.accent !== undefined && { accent: String(body.accent) }),
            ...(body.sortOrder !== undefined && {
              sortOrder: parseIntSafe(body.sortOrder, 0),
            }),
            ...(body.published !== undefined && {
              published: Boolean(body.published),
            }),
          },
        });
        break;
      }

      case "menu": {
        updated = await prisma.foodMenu.update({
          where: { id },
          data: {
            ...(body.day !== undefined && { day: String(body.day) }),
            ...(body.morningSnack !== undefined && {
              morningSnack: String(body.morningSnack),
            }),
            ...(body.hotLunch !== undefined && { hotLunch: String(body.hotLunch) }),
            ...(body.afternoonBooster !== undefined && {
              afternoonBooster: String(body.afternoonBooster),
            }),
            ...(body.accent !== undefined && { accent: String(body.accent) }),
            ...(body.sortOrder !== undefined && {
              sortOrder: parseIntSafe(body.sortOrder, 0),
            }),
            ...(body.published !== undefined && {
              published: Boolean(body.published),
            }),
          },
        });
        break;
      }

      case "sections": {
        updated = await prisma.pageSection.update({
          where: { id },
          data: {
            ...(body.page !== undefined && { page: String(body.page) }),
            ...(body.category !== undefined && { category: String(body.category) }),
            ...(body.badge !== undefined && {
              badge: body.badge ? String(body.badge) : null,
            }),
            ...(body.title !== undefined && { title: String(body.title) }),
            ...(body.subtitle !== undefined && {
              subtitle: body.subtitle ? String(body.subtitle) : null,
            }),
            ...(body.description !== undefined && {
              description: String(body.description),
            }),
            ...(body.imageUrl !== undefined && {
              imageUrl: body.imageUrl ? String(body.imageUrl) : null,
            }),
            ...(body.imageAlt !== undefined && {
              imageAlt: body.imageAlt ? String(body.imageAlt) : null,
            }),
            ...(body.iconName !== undefined && { iconName: String(body.iconName) }),
            ...(body.accent !== undefined && { accent: String(body.accent) }),
            ...(body.metadata !== undefined && {
              metadata: parseJsonObjectOrNull(body.metadata),
            }),
            ...(body.sortOrder !== undefined && {
              sortOrder: parseIntSafe(body.sortOrder, 0),
            }),
            ...(body.published !== undefined && {
              published: Boolean(body.published),
            }),
          },
        });
        break;
      }

      case "inquiries": {
        updated = await prisma.contactInquiry.update({
          where: { id },
          data: {
            ...(body.status !== undefined && { status: String(body.status) }),
            ...(body.published !== undefined && {
              published: Boolean(body.published),
            }),
          },
        });
        break;
      }

      case "popups": {
        updated = await prisma.popupNotification.update({
          where: { id },
          data: {
            ...(body.badge !== undefined && {
              badge: body.badge ? String(body.badge).trim() || null : null,
            }),
            ...(body.title !== undefined && { title: String(body.title).trim() }),
            ...(body.message !== undefined && {
              message: String(body.message).trim(),
            }),
            ...(body.imageUrl !== undefined && {
              imageUrl: body.imageUrl ? String(body.imageUrl).trim() || null : null,
            }),
            ...(body.imageAlt !== undefined && {
              imageAlt: body.imageAlt ? String(body.imageAlt).trim() || null : null,
            }),
            ...(body.ctaLabel !== undefined && {
              ctaLabel: body.ctaLabel ? String(body.ctaLabel).trim() || null : null,
            }),
            ...(body.ctaHref !== undefined && {
              ctaHref: body.ctaHref ? String(body.ctaHref).trim() || null : null,
            }),
            ...(body.accent !== undefined && { accent: String(body.accent) }),
            ...(body.sortOrder !== undefined && {
              sortOrder: parseIntSafe(body.sortOrder, 0),
            }),
            ...(body.published !== undefined && {
              published: Boolean(body.published),
            }),
          },
        });
        break;
      }

      default:
        return NextResponse.json(
          { error: `Update not supported for resource: ${resource}` },
          { status: 400 },
        );
    }

    revalidateSite();
    return NextResponse.json({ ok: true, data: updated });
  } catch (error) {
    console.error(`PATCH /api/admin/${resource} error:`, error);
    return NextResponse.json(
      { error: "Failed to update item." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ resource: string }> },
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { resource } = await context.params;
  const { searchParams } = new URL(request.url);
  let id = searchParams.get("id") || "";
  if (!id) {
    try {
      const body = await request.json();
      id = String(body?.id || "");
    } catch {
      id = "";
    }
  }

  if (!id) {
    return NextResponse.json({ error: "Item id is required." }, { status: 400 });
  }

  try {
    switch (resource) {
      case "programs":
        await prisma.program.delete({ where: { id } });
        break;
      case "facilities":
        await prisma.facility.delete({ where: { id } });
        break;
      case "gallery":
        await prisma.galleryImage.delete({ where: { id } });
        break;
      case "testimonials":
        await prisma.testimonial.delete({ where: { id } });
        break;
      case "team":
        await prisma.teamMember.delete({ where: { id } });
        break;
      case "menu":
        await prisma.foodMenu.delete({ where: { id } });
        break;
      case "sections":
        await prisma.pageSection.delete({ where: { id } });
        break;
      case "inquiries":
        await prisma.contactInquiry.delete({ where: { id } });
        break;
      case "popups":
        await prisma.popupNotification.delete({ where: { id } });
        break;
      default:
        return NextResponse.json(
          { error: `Delete not supported for resource: ${resource}` },
          { status: 400 },
        );
    }

    revalidateSite();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(`DELETE /api/admin/${resource} error:`, error);
    return NextResponse.json(
      { error: "Failed to delete item." },
      { status: 500 },
    );
  }
}
