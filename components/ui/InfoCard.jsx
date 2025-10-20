import Link from "next/link";
import Image from "next/image";

export default function InfoCard({
  title,
  description,
  domain,
  href,
  icon,
  iconAlt = "",
  external,
}) {
  const isExternal = external ?? href.startsWith("http");
  const ariaLabel = `${title} – ${domain}`;

  return (
    <article className="promnet-surface h-full">
      <Link
        href={href}
        aria-label={ariaLabel}
        className="flex h-full flex-col gap-4 rounded-3xl p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <div className="flex items-center gap-3">
          {typeof icon === "string" ? (
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10" title={iconAlt}>
              <Image
                src={icon}
                alt={iconAlt}
                width={40}
                height={40}
                className="h-8 w-8"
                loading="lazy"
              />
            </span>
          ) : (
            <span
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent"
              title={iconAlt}
            >
              {icon}
            </span>
          )}
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">{domain}</span>
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted">{description}</p>
        <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-accent">
          Tovább a részletekhez
          <span aria-hidden className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent text-accent-foreground">
            →
          </span>
        </span>
      </Link>
    </article>
  );
}
