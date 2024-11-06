"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type PassresetPageProps = {
  params: {
    token: string;
  };
};

const ResetPasswordPage = ({ params }: PassresetPageProps) => {
  const { token } = params; // Get the token from the URL
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    if (!newPassword) {
      setError("Password is required");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Password reset successfully! Redirecting to login page...");
        setError("");
        setTimeout(() => {
          router.push("/auth/login"); // Redirect to login after success
        }, 2000);
      } else {
        setError(data.error || "An error occurred");
        setSuccess("");
      }
    } catch (err) {
      setError("Failed to reset password");
      setSuccess("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      <h1 className="text-3xl font-semibold text-center text-custom-blue-dark sm:text-4xl">
        Reset Your Password
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-md border-[1px] border-custom-blue-dark"
      >
        <h2 className="mb-6 text-2xl font-bold text-center text-custom-blue-dark">
          Enter New Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        {success && <p className="mb-4 text-sm text-green-500">{success}</p>}

        <div className="flex justify-center">
          <Button variant="secondary" type="submit">
            Reset Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
