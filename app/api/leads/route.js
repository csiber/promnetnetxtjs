import { NextResponse } from "next/server";

export const runtime = "edge";

const sanitizeString = (value) =>
  value
    .toString()
    .replace(/[\r\n]+/g, " ")
    .trim();

const deliverLeadPayload = async (payload) => {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn(
      "LEADS_WEBHOOK_URL környezeti változó nincs beállítva, a lead nem került továbbításra."
    );
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(
        "Lead továbbítási hiba a webhook felé",
        response.status,
        await response.text().catch(() => "")
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("Lead webhook hívási hiba", error);
    return false;
  }
};

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

    const delivered = await deliverLeadPayload(payload);

    if (!delivered) {
      return NextResponse.json(
        {
          error:
            "A lead adatainak továbbítása nem sikerült. Kérlek, próbáld újra később.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead feldolgozási hiba", error);
    return NextResponse.json(
      { error: "Váratlan hiba történt, kérlek próbáld újra később." },
      { status: 500 }
    );
  }
}
