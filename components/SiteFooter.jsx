import Link from "next/link";
import { currentRelease } from "@/lib/release-note";

const contactLinks = [
  { href: "mailto:info@promnet.hu", label: "info@promnet.hu" },
  { href: "tel:+36205494107", label: "+36 20 549 4107" },
  { href: "https://www.linkedin.com/in/csaba-polyak-3497b0133/", label: "LinkedIn", external: true },
];

export default function SiteFooter() {
  return (
    <footer className="pn-footer">
      <div className="pn-footer-inner">
        <div>
          <span className="pn-footer-logo">
            Prom<span style={{ color: "var(--accent)" }}>NET</span>
          </span>
          <p className="pn-footer-copy">
            © {new Date().getFullYear()} PromNET – Polyák Csaba e.v.
          </p>
          <p className="pn-footer-copy" style={{ marginTop: ".25rem", opacity: .6 }}>
            v{currentRelease.version} — {currentRelease.date}
          </p>
        </div>
        <div className="pn-footer-links">
          {contactLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/dashboard/privacy">Adatvédelem</Link>
        </div>
      </div>
    </footer>
  );
}
