"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Boxes, Menu, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const THEME_KEY = "rentivo-theme";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "All Equipment", href: "/all-equipment" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Contact Us", href: "/Contact-us" },
  { label: "About us", href: "/about-us" },
];

function isActive(pathname, href) {
  if (!pathname) return false;
  const current = pathname.toLowerCase();
  return href === "/"
    ? current === "/"
    : current.startsWith(href.toLowerCase());
}

function Brand({ withTagline = false }) {
  return (
    <Link
      href="/"
      className="group flex shrink-0 items-center gap-2.5"
      aria-label="Rentivo home"
    >
      <span className="relative grid size-9 place-items-center rounded-xl bg-linear-to-br from-sky-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/20 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
        <Boxes className="size-5" strokeWidth={2.2} />
        <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-amber-400 ring-2 ring-background" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-tight">
          RENTI
          <span className="bg-linear-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent dark:from-sky-400 dark:to-indigo-300">
            VO
          </span>
        </span>
        {withTagline && (
          <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Rent with confidence
          </span>
        )}
      </span>
    </Link>
  );
}

function ThemeToggle({ className }) {
  function toggleTheme() {
    const root = document.documentElement;
    const shouldBeDark = !root.classList.contains("dark");

    root.classList.toggle("dark", shouldBeDark);
    root.style.colorScheme = shouldBeDark ? "dark" : "light";

    try {
      localStorage.setItem(THEME_KEY, shouldBeDark ? "dark" : "light");
    } catch {
      // Storage can be unavailable (e.g. private mode); the theme still applies.
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      title="Toggle color theme"
      className={cn(
        "size-9 rounded-full border-border/70 bg-background/60 shadow-sm transition-all hover:rotate-12 hover:border-primary/40 hover:bg-muted",
        className,
      )}
    >
      <Sun className="hidden dark:block" />
      <Moon className="block dark:hidden" />
    </Button>
  );
}

function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/70 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Brand withTagline />
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 lg:flex">
          {navLinks.map((link) => (
            <div
              key={link.href}
              className="h-8 w-24 rounded-full bg-muted/70"
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="size-9 rounded-full bg-muted/70" />
          <div className="hidden h-9 w-20 rounded-full bg-muted/70 sm:block" />
          <div className="hidden h-9 w-28 rounded-full bg-muted/70 sm:block" />
        </div>
      </div>
    </header>
  );
}

function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border/80 bg-background/90 shadow-sm shadow-slate-950/5 backdrop-blur-xl"
          : "border-border/50 bg-background/70 backdrop-blur-md",
      )}
    >
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Brand withTagline />

        <nav
          aria-label="Main navigation"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex"
        >
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-secondary text-foreground shadow-xs"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                )}
              >
                {link.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 inset-x-0 mx-auto h-0.5 w-6 rounded-full bg-linear-to-r from-sky-500 to-indigo-600"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <span
            aria-hidden="true"
            className="mx-1 hidden h-6 w-px bg-border sm:block"
          />

          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<Link href="/sign-in" />}
            className="hidden rounded-full px-4 text-sm font-medium sm:inline-flex"
          >
            Login
          </Button>
          <Button
            size="sm"
            nativeButton={false}
            render={<Link href="/Register" />}
            className="hidden rounded-full bg-linear-to-r from-sky-600 to-indigo-600 px-4 text-sm font-medium text-white shadow-md shadow-indigo-500/20 transition-all hover:from-sky-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30 sm:inline-flex dark:from-sky-500 dark:to-indigo-500"
          >
            Register
            <ArrowUpRight />
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation menu"
                  className="size-9 rounded-full lg:hidden"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[min(88vw,22rem)] gap-0 p-0"
            >
              <SheetHeader className="border-b border-border/60 px-5 py-5 pr-14">
                <SheetTitle className="flex items-center gap-2.5">
                  <span className="grid size-9 place-items-center rounded-xl bg-linear-to-br from-sky-500 to-indigo-600 text-white shadow-md shadow-indigo-500/25">
                    <Boxes className="size-5" strokeWidth={2.2} />
                  </span>
                  <span className="text-lg font-bold tracking-tight">
                    RENTI
                    <span className="bg-linear-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent dark:from-sky-400 dark:to-indigo-300">
                      VO
                    </span>
                  </span>
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Browse Rentivo or access your account.
                </SheetDescription>
              </SheetHeader>

              <nav
                aria-label="Mobile navigation"
                className="flex flex-1 flex-col gap-1 overflow-y-auto p-4"
              >
                {navLinks.map((link) => {
                  const active = isActive(pathname, link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                        active
                          ? "bg-secondary text-foreground shadow-xs"
                          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                      )}
                    >
                      {link.label}
                      {active && (
                        <span
                          aria-hidden="true"
                          className="size-1.5 rounded-full bg-primary"
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <SheetFooter className="gap-2 border-t border-border/60 p-4">
                <Button
                  variant="outline"
                  nativeButton={false}
                  render={<Link href="/sign-in" />}
                  onClick={() => setMobileOpen(false)}
                  className="w-full rounded-full"
                >
                  Login
                </Button>
                <Button
                  nativeButton={false}
                  render={<Link href="/Register" />}
                  onClick={() => setMobileOpen(false)}
                  className="w-full rounded-full bg-linear-to-r from-sky-600 to-indigo-600 text-white shadow-md shadow-indigo-500/20 hover:from-sky-500 hover:to-indigo-500 dark:from-sky-500 dark:to-indigo-500"
                >
                  Register
                  <ArrowUpRight />
                </Button>
                <div className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
                  <span>Appearance</span>
                  <ThemeToggle />
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default function Navber() {
  return (
    <Suspense fallback={<HeaderSkeleton />}>
      <Header />
    </Suspense>
  );
}
