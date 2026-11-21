"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const content = {
  signin: {
    title: "Welcome back",
    description: "Sign in to manage your rentals and bookings.",
    submit: "Sign in",
    switchText: "New to Rentivo?",
    switchLabel: "Create an account",
    switchHref: "/Register",
  },
  signup: {
    title: "Create your account",
    description: "Join Rentivo and rent equipment with confidence.",
    submit: "Create account",
    switchText: "Already have an account?",
    switchLabel: "Sign in",
    switchHref: "/sign-in",
  },
};

const roles = [
  { value: "customer", label: "Customer", icon: "👤" },
  { value: "owner", label: "Owner", icon: "🏗️" },
];

function Field({
  id,
  label,
  type = "text",
  placeholder,
  icon: Icon,
  autoComplete,
  required,
  trailing,
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>

      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        )}

        <Input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          className={cn("h-10", Icon && "pl-9", trailing && "pr-10")}
        />

        {trailing}
      </div>
    </div>
  );
}

export default function AuthForm({ mode = "signin", onSubmit, onGoogle }) {
  const isSignUp = mode === "signup";
  const config = content[mode] || content.signin;

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (isSignUp && data.password !== data.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }

    if (isSignUp && !data.terms) {
      setErrorMessage("Please accept the terms and conditions.");
      toast.error("Please accept the terms and conditions.");
      return;
    }

    // remove fields the auth handlers do not need
    delete data.confirmPassword;
    delete data.terms;
    delete data.remember;

    try {
      setLoading(true);

      if (!onSubmit) {
        throw new Error("Authentication handler is missing.");
      }

      await onSubmit(data);

      toast.success(
        isSignUp ? "Account created successfully!" : "Signed in successfully!",
      );
      form.reset();
    } catch (error) {
      const message =
        error.message || "Something went wrong. Please try again.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    if (onGoogle) onGoogle();
  };

  const passwordToggle = (
    <button
      type="button"
      onClick={() => setShowPassword((value) => !value)}
      aria-label={showPassword ? "Hide password" : "Show password"}
      className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
    >
      {showPassword ? (
        <EyeOff className="size-4" />
      ) : (
        <Eye className="size-4" />
      )}
    </button>
  );

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      {/* Background effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 size-[32rem] -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/images/logo-light.png"
            alt="Rentivo"
            width={246}
            height={76}
            className="h-16 w-auto object-contain dark:hidden"
          />
          <Image
            src="/images/logo.png"
            alt="Rentivo"
            aria-hidden="true"
            width={246}
            height={76}
            className="hidden h-16 w-auto object-contain dark:block"
          />
        </div>

        {/* Auth Card */}
        <div className="rounded-2xl border border-border/70 bg-card/90 p-6 shadow-2xl shadow-blue-950/20 backdrop-blur sm:p-8">
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {config.title}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {config.description}
            </p>
          </div>

          {/* Auth Tabs */}
          <div className="mt-6 grid grid-cols-2 gap-1 rounded-xl border border-border/60 bg-muted/40 p-1">
            <Link
              href="/sign-in"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-9 rounded-lg text-sm",
                !isSignUp &&
                  "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
            >
              Sign in
            </Link>
            <Link
              href="/Register"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-9 rounded-lg text-sm",
                isSignUp &&
                  "bg-primary text-primary-foreground hover:bg-primary/90",
              )}
            >
              Sign up
            </Link>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Account type (must stay inside the form so the role is submitted) */}
            {isSignUp && (
              <div className="space-y-2">
                <Label>Account type</Label>

                <div className="grid grid-cols-2 gap-2">
                  {roles.map((role) => (
                    <label key={role.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value={role.value}
                        defaultChecked={role.value === "customer"}
                        className="peer sr-only"
                      />
                      <div className="rounded-xl border border-border/70 bg-muted/30 px-2 py-3 text-center text-xs font-medium text-muted-foreground transition hover:border-sky-500/50 peer-checked:border-sky-500 peer-checked:bg-sky-500/10 peer-checked:text-sky-500">
                        <span className="mb-1 block text-lg">{role.icon}</span>
                        {role.label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Full Name */}
            {isSignUp && (
              <Field
                id="name"
                label="Full name"
                placeholder="Jordan Smith"
                icon={User}
                autoComplete="name"
                required
              />
            )}

            {/* Email */}
            <Field
              id="email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              autoComplete="email"
              required
            />

            {/* Photo URL */}
            {isSignUp && (
              <Field
                id="image"
                label="Photo URL"
                type="url"
                placeholder="https://example.com/photo.jpg"
                icon={ImageIcon}
                required
              />
            )}

            {/* Password */}
            <Field
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              icon={Lock}
              autoComplete={isSignUp ? "new-password" : "current-password"}
              required
              trailing={passwordToggle}
            />

            {/* Confirm Password */}
            {isSignUp && (
              <Field
                id="confirmPassword"
                label="Confirm password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                icon={Lock}
                autoComplete="new-password"
                required
                trailing={passwordToggle}
              />
            )}

            {/* Terms / Remember */}
            <div className="flex items-center gap-2">
              <Checkbox
                id={isSignUp ? "terms" : "remember"}
                name={isSignUp ? "terms" : "remember"}
                value="yes"
                required={isSignUp}
              />
              <Label
                htmlFor={isSignUp ? "terms" : "remember"}
                className="text-xs font-normal text-muted-foreground"
              >
                {isSignUp
                  ? "I agree to the terms and conditions"
                  : "Remember me"}
              </Label>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-2.5 text-center text-xs text-red-600 dark:text-red-400">
                {errorMessage}
              </p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-xl bg-linear-to-r from-sky-500 to-blue-600 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:from-sky-400 hover:to-blue-500"
            >
              {loading ? "Please wait..." : config.submit}
              {!loading && <ArrowRight className="size-4" />}
            </Button>

            {/* Divider */}
            <div className="relative my-1">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/60" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-2 text-xs text-muted-foreground">
                  or continue with
                </span>
              </div>
            </div>

            {/* Google Button */}
            <Button
              type="button"
              onClick={handleGoogle}
              variant="outline"
              className="h-11 w-full rounded-xl border-border/70 bg-background/40 text-sm font-semibold"
            >
              <FcGoogle className="size-5" />
              Continue with Google
            </Button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {config.switchText}{" "}
            <Link
              href={config.switchHref}
              className="font-semibold text-sky-600 hover:underline dark:text-sky-300"
            >
              {config.switchLabel}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
