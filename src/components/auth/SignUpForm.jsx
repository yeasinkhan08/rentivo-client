"use client";

import { useRouter } from "next/navigation";
import AuthForm from "@/components/shared/AuthForm";
import { authClient } from "@/lib/auth-client";

// at least one uppercase, one lowercase, minimum 6 characters
const passwordRule = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export default function SignUpForm() {
  const router = useRouter();

  const handleSignUp = async (data) => {
    if (!passwordRule.test(data.password)) {
      throw new Error(
        "Password must have an uppercase letter, a lowercase letter and at least 6 characters.",
      );
    }

    const { error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      image: data.image,
      role: data.role,
    });

    if (error) {
      throw new Error(error.message || "Signup failed.");
    }

    router.push("/");
    router.refresh();
  };

  const handleGoogle = () =>
    authClient.signIn.social({ provider: "google", callbackURL: "/" });

  return (
    <AuthForm mode="signup" onSubmit={handleSignUp} onGoogle={handleGoogle} />
  );
}
