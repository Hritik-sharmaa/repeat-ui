import Link from "next/link";
import { Logo } from "@/site/brand/Logo";
import { GITHUB_URL } from "@/lib/utils";

const LINKS = [
  { href: "/components", label: "Components" },
  { href: "/#install", label: "Install" },
  { href: GITHUB_URL, label: "GitHub" },
  { href: "https://www.npmjs.com/package/@hritik-sharmaa/repeat-ui", label: "npm" },
  { href: `${GITHUB_URL}/blob/main/CONTRIBUTING.md`, label: "Contribute" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" aria-label="Repeat UI home">
            <Logo />
          </Link>
          <p className="mt-3 text-sm text-muted">
            Built by{" "}
            <a
              href="https://hritik-sharma-portfolio.vercel.app/"
              className="text-fg underline decoration-line-strong underline-offset-4 hover:decoration-accent">
              Hritik Sharma
            </a>
            . Free and open source.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          {LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="transition-colors hover:text-fg">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
