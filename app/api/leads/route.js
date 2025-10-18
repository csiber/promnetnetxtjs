import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { join } from "path";

export const runtime = "nodejs";

const leadsPath = join(process.cwd(), "data", "leads.json");

const ensureStoreExists = async () => {
  const dir = join(process.cwd(), "data");

  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    console.error("Nem sikerült létrehozni a data könyvtárat", error);
  }

  try {
    await fs.access(leadsPath);
  } catch {
    await fs.writeFile(leadsPath, JSON.stringify([]));
  }
};

const sanitizeString = (value) =>
  value
    .toString()
    .replace(/[\r\n]+/g, " ")
    .trim();

export async function POST(request) {
  try {
    const body = await request.json();
    const requiredFields = ["name", "email", "message"];

    for (const field of requiredFields) {
      if (!body[field] || !sanitizeString(body[field])) {
        return NextResponse.json(
          { error: `Hiányzó mező: ${field}` },
          { status: 400 }
        );
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Kérlek, adj meg érvényes e-mail címet." },
        { status: 400 }
      );
    }

    await ensureStoreExists();

    const payload = {
      id: crypto.randomUUID(),
      name: sanitizeString(body.name),
      email: sanitizeString(body.email).toLowerCase(),
      phone: body.phone ? sanitizeString(body.phone) : null,
      company: body.company ? sanitizeString(body.company) : null,
      industry: body.industry ? sanitizeString(body.industry) : null,
      budget: body.budget ? sanitizeString(body.budget) : null,
      timeline: body.timeline ? sanitizeString(body.timeline) : null,
      message: sanitizeString(body.message),
      features: Array.isArray(body.features)
        ? [...new Set(body.features.map((item) => sanitizeString(item)))].slice(0, 10)
        : [],
      source: body.source ? sanitizeString(body.source) : "web",
      service: body.service ? sanitizeString(body.service) : null,
      createdAt: new Date().toISOString(),
    };

    const leadsContent = await fs.readFile(leadsPath, "utf-8");
    const leads = JSON.parse(leadsContent);
    leads.push(payload);
    await fs.writeFile(leadsPath, JSON.stringify(leads, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead mentési hiba", error);
    return NextResponse.json(
      { error: "Váratlan hiba történt, kérlek próbáld újra később." },
      { status: 500 }
    );
  }
}
