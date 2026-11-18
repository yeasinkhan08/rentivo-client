"use client";

import { Suspense, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Moon, Sun } from "lucide-react";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "All Equipment", href: "/all-equipment" },
  { label: "About us", href: "/about-us" },
  { label: "Contact Us", href: "/Contact-us" },
  { label: "How it work", href: "/how-it-works" },
];

function Logo({ className = "h-9" }) {
  const baseClass = "w-auto object-contain select-none";

  return (
    <span className="inline-flex shrink-0 items-center">
      <Image
        src="/images/logo-light.png"
        alt="Rentivo"
        width={246}
        height={76}
        loading="eager"
        fetchPriority="high"
        className={cn(baseClass, className, "dark:hidden")}
      />
      <Image
        src="/images/logo.png"
        alt=""
        aria-hidden="true"
        width={246}
        height={76}
        loading="eager"
        fetchPriority="high"
        className={cn(baseClass, className, "hidden dark:block")}
      />
    </span>
  );
}

function isActivePath(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const themeListeners = new Set();

function subscribeTheme(callback) {
  themeListeners.add(callback);
  return () => themeListeners.delete(callback);
}

function getThemeSnapshot() {
  if (typeof window === "undefined") return "dark";
  return localStorage.getItem("rentivo-theme") === "light" ? "light" : "dark";
}

function getServerThemeSnapshot() {
  return "dark";
}

function ThemeToggle({ className }) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    localStorage.setItem("rentivo-theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.style.colorScheme = next;
    window.dispatchEvent(
      new CustomEvent("rentivo-theme-change", { detail: next })
    );
    themeListeners.forEach((listener) => listener());
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className={cn(
        "size-9 rounded-lg text-muted-foreground hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-300",
        className,
      )}
    >
      {theme === "dark" ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </Button>
  );
}

function HeaderContent() {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl supports-backdrop-filter:bg-background/70">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-400/70 to-transparent"
      />
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" aria-label="Rentivo home">
          <Logo />
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "relative h-9 rounded-lg px-3 text-sm font-medium text-muted-foreground hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-300",
                  active &&
                    "bg-sky-500/10 text-sky-600 after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:rounded-full after:bg-sky-500 dark:text-sky-300 dark:after:bg-sky-400",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Link
            href="/sign-in"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "hidden h-9 rounded-lg px-3 text-sm font-medium text-muted-foreground hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-300 sm:inline-flex",
            )}
          >
            Login
          </Link>

          <Link
            href="/Register"
            className={cn(
              buttonVariants(),
              "hidden h-9 rounded-lg bg-linear-to-r from-sky-500 to-blue-600 px-4 text-sm font-semibold text-white shadow-md shadow-blue-950/30 transition hover:from-sky-400 hover:to-blue-500 sm:inline-flex",
            )}
          >
            Register <ArrowUpRight className="size-4" />
          </Link>

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Open navigation menu"
                  className="size-9 rounded-lg border-border/70 bg-background/40 lg:hidden"
                />
              }
            >
              <Menu className="size-4" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[min(88vw,22rem)] border-l border-border/70 bg-popover p-0 text-popover-foreground"
            >
              <SheetHeader className="border-b border-border/60 p-5 pr-12">
                <SheetTitle className="text-left">
                  <Logo className="h-10" />
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 space-y-1 overflow-y-auto p-4">
                <p className="px-3 pb-2 text-[10px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                  Menu
                </p>
                {navItems.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSheetOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-300",
                        active && "bg-sky-500/10 text-sky-600 dark:text-sky-300",
                      )}
                    >
                      {item.label}
                      <ArrowUpRight className="size-4 opacity-60" />
                    </Link>
                  );
                })}
              </div>

              <SheetFooter className="gap-2 border-t border-border/60 bg-popover">
                <Link
                  href="/sign-in"
                  onClick={() => setSheetOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-10 rounded-xl border-border/70 bg-transparent text-sm font-semibold",
                  )}
                >
                  Login
                </Link>
                <Link
                  href="/Register"
                  onClick={() => setSheetOpen(false)}
                  className={cn(
                    buttonVariants(),
                    "h-10 rounded-xl bg-linear-to-r from-sky-500 to-blue-600 text-sm font-semibold text-white",
                  )}
                >
                  Register <ArrowUpRight className="size-4" />
                </Link>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <div className="size-9 rounded-xl bg-muted" />
          <div className="hidden h-4 w-28 rounded bg-muted sm:block" />
        </div>
        <div className="mx-auto hidden h-3 w-96 rounded bg-muted lg:block" />
        <div className="ml-auto flex items-center gap-2">
          <div className="size-9 rounded-lg bg-muted" />
          <div className="hidden h-9 w-20 rounded-lg bg-muted sm:block" />
        </div>
      </div>
    </header>
  );
}

export default function Navber() {
  return (
    <Suspense fallback={<HeaderSkeleton />}>
      <HeaderContent />
    </Suspense>
  );
}
