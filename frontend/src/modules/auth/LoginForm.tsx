"use client";
import { Button } from "@/components/ui/button";
import { Info, LoaderCircle, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  // router
  const router = useRouter();
  // to get backend errors ore something
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Incorrect email or password.");
      }

      router.push("/");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <ErrorToast message={error} onClick={() => setError(null)} />}

      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm p-6 rounded-lg flex flex-col gap-4">
        <div className="space-y-2">
          <label
            className={`${errors.email && "text-red-500"}`}
            htmlFor="email"
          >
            Email address
          </label>
          <input
            type="text"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            className={`w-full bg-black/10 rounded-lg border border-white/10  px-4 py-2 text-custom-silver placeholder-custom-gray-light focus:border-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-blue ${errors.email && "border border-red-500"}`}
          />
          {errors.email && (
            <p className="flex items-center gap-1.5 text-sm text-red-500">
              <Info size={10} /> Invalid email address.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <label
              className={`${errors.password && "text-red-500"}`}
              htmlFor="password"
            >
              Password
            </label>
            <Link href='/auth/register' tabIndex={-1} className="text-sm text-blue-500 hover:underline">Forgot password?</Link>
          </div>
          <input
            type="password"
            {...register("password", {
              required: true,
            })}
            className={`w-full rounded-lg border border-white/10 bg-black/10 px-4 py-2 text-white placeholder-custom-gray-light focus:border-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-blue ${errors.email && "border border-red-500"}`}
          />
          {errors.password && (
            <p className="flex items-center gap-1.5 text-sm text-red-500">
              <Info size={10} /> Invalid password.
            </p>
          )}
        </div>

        <Button type="submit" variant={`white`} size={`lg`} className="w-full mt-2 text-base">
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <LoaderCircle className="animate-spin" size={20} />
              <span>Authenticating</span>
            </div>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </>
  );
};

// toast for error
const ErrorToast = ({
  message,
  onClick,
}: {
  message: string;
  onClick: () => void;
}) => {
  return (
    <div className="mb-6 flex items-center justify-between rounded-lg border-2 border-red-800 bg-red-900/30 p-4 font-medium text-custom-silver">
      <span>{message}</span>
      <X
        size={18}
        onClick={onClick}
        className="cursor-pointer text-custom-silver"
      />
    </div>
  );
};

export default LoginForm;
