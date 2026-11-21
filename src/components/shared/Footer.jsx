import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const links = [
  { label: "Home", href: "/" },
  { label: "All Equipment", href: "/all-equipment" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Login", href: "/sign-in" },
  { label: "Register", href: "/Register" },
];

const socials = [
  { label: "X", href: "https://x.com", icon: FaXTwitter },
  { label: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
  { label: "LinkedIn", href: "https://linkedin.com", icon: FaLinkedinIn },
  { label: "GitHub", href: "https://github.com/yeasinkhan08", icon: FaGithub },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Image
            src="/images/logo-light.png"
            alt="Rentivo"
            width={246}
            height={76}
            className="h-10 w-auto object-contain dark:hidden"
          />
          <Image
            src="/images/logo.png"
            alt=""
            aria-hidden="true"
            width={246}
            height={76}
            className="hidden h-10 w-auto object-contain dark:block"
          />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            A transparent and secure marketplace where equipment owners and
            customers meet.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Quick links</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition hover:text-sky-600 dark:hover:text-sky-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Follow us</h3>
          <div className="mt-4 flex gap-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-10 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition hover:border-sky-500 hover:text-sky-600 dark:hover:text-sky-300"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Rentivo. All rights reserved.
      </div>
    </footer>
  );
}
