"use client";

import AuthForm from "@/components/shared/AuthForm";
import { authClient } from "@/lib/auth-client";

export default function SignInForm() {
  const handleSignIn = async (data) => {
    const { data: signInResponse, error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
      callbackURL: "/",
    });

    if (error) {
      console.error("Sign in error:", error);
      throw new Error(error.message || "Sign in failed.");
    }

    console.log("Sign in successful:", signInResponse);
  };

  return <AuthForm mode="signin" onSubmit={handleSignIn} />;
}
