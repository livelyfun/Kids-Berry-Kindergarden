import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface SubmittedDoc {
  key: string;
  label: string;
  url: string;
  fileType: "image" | "pdf" | "file";
  fileName: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const childName =
      typeof body?.childName === "string" ? body.childName.trim() : "";
    const childDob =
      typeof body?.childDob === "string" ? body.childDob.trim() : "";
    const childAge =
      typeof body?.childAge === "string" ? body.childAge.trim() : "";
    const program =
      typeof body?.program === "string" ? body.program.trim() : "";
    const parentName =
      typeof body?.parentName === "string" ? body.parentName.trim() : "";
    const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
    const address =
      typeof body?.address === "string" ? body.address.trim() : "";

    if (!childName || (!childAge && !childDob) || !program || !parentName || !phone || !address) {
      return NextResponse.json(
        {
          error:
            "Please fill in all required child, program, parent name, phone, and address fields.",
        },
        { status: 400 },
      );
    }

    const rawDocs = Array.isArray(body?.documents) ? body.documents : [];
    const documents: SubmittedDoc[] = rawDocs
      .map((item: unknown): SubmittedDoc | null => {
        if (!item || typeof item !== "object") return null;
        const d = item as Record<string, unknown>;
        const url = typeof d.url === "string" ? d.url.trim() : "";
        if (!url) return null;
        const rawType = typeof d.fileType === "string" ? d.fileType : "file";
        const fileType: "image" | "pdf" | "file" =
          rawType === "image" || rawType === "pdf" ? rawType : "file";
        return {
          key: typeof d.key === "string" ? d.key.trim() : "document",
          label: typeof d.label === "string" ? d.label.trim() : "Document",
          url,
          fileType,
          fileName:
            typeof d.fileName === "string" ? d.fileName.trim() : "Document",
        };
      })
      .filter((d: SubmittedDoc | null): d is SubmittedDoc => Boolean(d));

    const created = await prisma.admissionApplication.create({
      data: {
        childName,
        childDob,
        childAge: childAge || childDob,
        childGender:
          typeof body?.childGender === "string" ? body.childGender.trim() : "",
        program,
        preferredCare:
          typeof body?.preferredCare === "string" && body.preferredCare.trim()
            ? body.preferredCare.trim()
            : "Regular Class (9:00 AM – 3:00 PM)",
        transportRequired: Boolean(body?.transportRequired),
        mealsRequired:
          body?.mealsRequired === undefined ? true : Boolean(body.mealsRequired),
        previousSchool:
          typeof body?.previousSchool === "string"
            ? body.previousSchool.trim() || null
            : null,
        medicalNotes:
          typeof body?.medicalNotes === "string"
            ? body.medicalNotes.trim() || null
            : null,
        parentName,
        relation:
          typeof body?.relation === "string" && body.relation.trim()
            ? body.relation.trim()
            : "Parent",
        phone,
        secondaryPhone:
          typeof body?.secondaryPhone === "string"
            ? body.secondaryPhone.trim() || null
            : null,
        email:
          typeof body?.email === "string" ? body.email.trim() || null : null,
        address,
        message:
          typeof body?.message === "string"
            ? body.message.trim() || null
            : null,
        documents: documents as unknown as object[],
        status: "NEW",
        published: false,
      },
    });

    revalidatePath("/admissions");
    return NextResponse.json({ ok: true, id: created.id }, { status: 201 });
  } catch (error) {
    console.error("Admission submission error:", error);
    return NextResponse.json(
      {
        error:
          "Unable to submit admission application right now. Please try again or contact us via WhatsApp.",
      },
      { status: 500 },
    );
  }
}
