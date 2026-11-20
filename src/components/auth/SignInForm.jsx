"use client";

import { useRouter } from "next/navigation";
import AuthForm from "@/components/shared/AuthForm";
import { authClient } from "@/lib/auth-client";

export default function SignInForm() {
  const router = useRouter();

  const handleSignIn = async (data) => {
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
    });

    if (error) {
      throw new Error(error.message || "Sign in failed.");
    }

    router.push("/");
    router.refresh();
  };

  const handleGoogle = () =>
    authClient.signIn.social({ provider: "google", callbackURL: "/" });

  return (
    <AuthForm mode="signin" onSubmit={handleSignIn} onGoogle={handleGoogle} />
  );
}
