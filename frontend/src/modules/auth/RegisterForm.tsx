"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import ButtonLink from "@/components/ui/ButtonLink";
import { ArrowLeft, Info, LoaderCircle, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface FormData {
  username: string;
  email: string;
  password: string;
  NIM: string;
}

const RegisterForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setError(null);
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
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
      setError(err.message || "Failed to register user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <ErrorToast message={error} onClick={() => setError(null)} />}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-sm flex-col gap-4 rounded-lg"
      >
        <div className="space-y-2">
          <label
            className={`${errors.username && "text-red-500"}`}
            htmlFor="username"
          >
            Name
          </label>
          <input
            type="text"
            className={`w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-custom-gray-light focus:border-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-blue ${errors.username && "border border-red-500"}`}
            {...register("username", { required: true })}
          />
          {errors.username && (
            <p className="flex gap-1.5 text-sm text-red-500">
              <Info size={10} className="shrink-0 mt-1" /> Name must have at least 1 character.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            className={`${errors.email && "text-red-500"}`}
            htmlFor="email"
          >
            Email address
          </label>
          <input
            type="text"
            className={`w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-custom-gray-light focus:border-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-blue ${errors.email && "border border-red-500"}`}
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && (
            <p className="flex gap-1.5 text-sm text-red-500">
              <Info size={10} className="shrink-0 mt-1" /> Invalid email address.
            </p>
          )}
        </div>

        <div className="relative space-y-2">
          <label
            className={`${errors.password && "text-red-500"}`}
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            className={`w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-custom-gray-light focus:border-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-blue ${errors.password && "border border-red-500"}`}
            {...register("password", {
              required: true,
              pattern:
                /^(?=.*[a-z])(?=.*\d)[a-z\d!@#$%^&*()_+[\]{}|\\;',./:<>?`~"-]{8,}$/,
            })}
          />
          {errors.password && (
            <p className="flex gap-1.5 text-sm text-red-500">
              <Info size={10} className="shrink-0 mt-1" /> Password must have at least 8 characters and
              contain one number.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className={`${errors.NIM && "text-red-500"}`} htmlFor="NIM">
            NIM
          </label>
          <input
            type="text"
            className={`w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-custom-gray-light focus:border-custom-blue focus:outline-none focus:ring-1 focus:ring-custom-blue ${errors.NIM && "border border-red-500"}`}
            {...register("NIM", {
              required: true,
              pattern: /^\d{2}\/\d{6}\/[A-Z]{2}\/\d{5}$/i,
            })}
          />
          {errors.NIM && (
            <p className="flex gap-1.5 text-sm text-red-500">
              <Info size={10} className="shrink-0 mt-1" /> Invalid NIM format.
            </p>
          )}
        </div>
        <Button
          type="submit"
          variant={`white`}
          size={`lg`}
          className="mt-2 w-full text-base"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <LoaderCircle className="animate-spin" size={20} />
            </div>
          ) : (
            "Sign up"
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
    <div className="flex w-full max-w-sm  items-center justify-between rounded-lg border-2 p-4 border-red-800 bg-red-900/30 font-medium text-custom-silver">
      <span>{message}</span>
      <X
        size={18}
        onClick={onClick}
        className="cursor-pointer text-custom-silver"
      />
    </div>
  );
};

export default RegisterForm;
