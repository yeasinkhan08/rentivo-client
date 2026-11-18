"use client";

import AuthForm from "@/components/shared/AuthForm";
import { authClient } from "@/lib/auth-client";

export default function SignUpForm() {
  const handleSignUp = async (data) => {
    const { data: signUpResponse, error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });

    if (error) {
      console.error("Signup error:", error);
      throw new Error(error.message || "Signup failed.");
    }

    console.log("Signup successful:", signUpResponse);
  };

  return <AuthForm mode="signup" onSubmit={handleSignUp} />;
}
