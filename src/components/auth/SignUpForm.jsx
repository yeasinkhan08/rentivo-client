// src/components/auth/SignUpForm.jsx
"use client";

import AuthForm from "@/components/shared/AuthForm";
import { authClient } from "@/lib/auth-client";

const ROLES = ["customer", "owner", "admin"]; // keep for a quick guard

export default function SignUpForm() {
  const handleSignUp = async (data) => {
    // ----- quick client‑side guard (optional) -----
    if (!ROLES.includes(data.role)) {
      throw new Error("Please select a valid account type.");
    }

    // ----- send the selected role to Better Auth -----
    const { data: signUpResponse, error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role, // ← this is the new field
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
