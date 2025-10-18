import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BREVO_ENDPOINT = "https://api.brevo.com/v3/contacts";

export async function POST(request) {
  try {
    const body = await request.json();
    const email = body?.email?.trim();

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Érvényes e-mail címet adj meg, kérlek!" },
        { status: 400 }
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = process.env.BREVO_LIST_ID;

    if (!apiKey || !listId) {
      console.warn(
        "Newsletter subscription fallback: BREVO_API_KEY vagy BREVO_LIST_ID nincs beállítva."
      );

      return NextResponse.json(
        {
          message:
            "Feliratkozási kérelmedet megkaptam. A rendszer konfigurálása után visszaigazolom!",
        },
        { status: 200 }
      );
    }

    const response = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [Number.parseInt(listId, 10)],
        updateEnabled: true,
      }),
    });

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => null);

      const message =
        errorPayload?.message ||
        errorPayload?.error ||
        "Nem sikerült rögzíteni a feliratkozást a marketing rendszerben.";

      return NextResponse.json({ error: message }, { status: response.status });
    }

    return NextResponse.json({
      message: "Sikeres feliratkozás! Hamarosan érkeznek az újdonságok.",
    });
  } catch (error) {
    console.error("Newsletter subscription hiba:", error);

    return NextResponse.json(
      {
        error:
          "Váratlan hiba történt a feliratkozás során. Írj közvetlenül az info@promnet.hu címre, és segítek!",
      },
      { status: 500 }
    );
  }
}
