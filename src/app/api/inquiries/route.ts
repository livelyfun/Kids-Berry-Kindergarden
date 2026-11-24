import { NextResponse } from "next/server";
import { contactInquiries, db } from "@/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parentName =
      typeof body?.parentName === "string" ? body.parentName.trim() : "";
    const phone = typeof body?.phone === "string" ? body.phone.trim() : "";

    if (!parentName || !phone) {
      return NextResponse.json(
        { error: "Parent name and phone number are required." },
        { status: 400 },
      );
    }

    const [inquiry] = await db
      .insert(contactInquiries)
      .values({
        parentName,
        phone,
        email: typeof body?.email === "string" ? body.email.trim() || null : null,
        childName:
          typeof body?.childName === "string"
            ? body.childName.trim() || null
            : null,
        childAge:
          typeof body?.childAge === "string"
            ? body.childAge.trim() || null
            : null,
        program:
          typeof body?.program === "string"
            ? body.program.trim() || null
            : null,
        preferredCare:
          typeof body?.preferredCare === "string"
            ? body.preferredCare.trim() || null
            : null,
        preferredDate:
          typeof body?.preferredDate === "string"
            ? body.preferredDate.trim() || null
            : null,
        message:
          typeof body?.message === "string"
            ? body.message.trim() || null
            : null,
        status: "NEW",
        published: false,
      })
      .returning();

    return NextResponse.json({ ok: true, id: inquiry.id }, { status: 201 });
  } catch (error) {
    console.error("Inquiry submission error:", error);
    return NextResponse.json(
      { error: "Unable to save inquiry right now. Please try WhatsApp or phone." },
      { status: 500 },
    );
  }
}
