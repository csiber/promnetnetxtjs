import Link from "next/link";
import { currentRelease } from "@/lib/release-note";

const contactLinks = [
  { href: "mailto:info@promnet.hu", label: "info@promnet.hu" },
  { href: "tel:+36205494107", label: "+36 20 549 4107" },
  { href: "https://www.linkedin.com/in/csaba-polyak-3497b0133/", label: "LinkedIn", external: true },
];

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/70 bg-card/60 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 md:flex-row md:justify-between">
        <section aria-label="Legfrissebb kiadás" className="max-w-xl space-y-4">
          <div className="promnet-badge w-fit">Verzió napló</div>
          <h2 className="text-lg font-semibold text-foreground">
            PromNET {currentRelease.version} – {currentRelease.date}
          </h2>
          <ul className="space-y-2 text-sm text-muted">
            {currentRelease.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span aria-hidden className="mt-1 inline-flex h-2 w-2 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
        <section aria-label="Kapcsolat" className="space-y-3 text-sm text-muted">
          <h2 className="text-lg font-semibold text-foreground">Kapcsolat</h2>
          <ul className="space-y-2">
            {contactLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-medium text-foreground hover:text-accent"
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} PromNET – Polyák Csaba e.v. Minden jog fenntartva.
          </p>
        </section>
      </div>
    </footer>
  );
}
