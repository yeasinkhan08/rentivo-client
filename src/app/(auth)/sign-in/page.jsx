import AuthForm from "@/components/shared/AuthForm";

export const metadata = {
  title: "Sign in — RENTIVO",
  description: "Sign in to your Rentivo account.",
};

export default function SignInPage() {
  return <AuthForm mode="signin" />;
}
