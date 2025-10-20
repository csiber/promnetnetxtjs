export const runtime = "edge";

export async function GET() {
  return Response.json({
    status: "ok",
    environment: process.env.NEXT_PUBLIC_APP_ENV ?? "production",
    timestamp: new Date().toISOString(),
  });
}
