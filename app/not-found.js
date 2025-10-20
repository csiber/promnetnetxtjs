import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <span className="promnet-badge">404</span>
      <h1 className="text-3xl font-semibold text-foreground">A keresett oldal nem található</h1>
      <p className="max-w-md text-sm text-muted">
        Lehet, hogy a link elavult, vagy a tartalom átkerült. Ellenőrizd az URL-t, vagy térj vissza a kezdőoldalra.
      </p>
      <Link
        href="/dashboard"
        className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground shadow-soft transition hover:bg-accent/90"
      >
        Vissza a főoldalra
      </Link>
    </main>
  );
}
