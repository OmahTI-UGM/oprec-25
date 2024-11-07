"use client";
import { LoaderCircle, LogOut as LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Logout({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to log out");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={`flex aspect-square h-12 shrink-0 items-center justify-center gap-4 rounded-sm bg-custom-gray p-2 text-white hover:bg-custom-gray/90 lg:aspect-auto lg:bg-custom-gray-dark lg:p-2 lg:hover:bg-custom-gray-dark/80 ${className}`}
      >
        <LogOutIcon className="h-5" />
        <p className="hidden lg:block">Log Out</p>
      </AlertDialogTrigger>
      <AlertDialogContent className="scale-90 rounded-lg lg:scale-100">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
          <AlertDialogDescription className="text-[0.9rem]">
            Are you sure you want to log out? You will need to sign in again to
            access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="*:text-[0.9rem]">
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <Button
            variant={`destructive`}
            size={`lg`}
            disabled={loading}
            onClick={handleLogout}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <LoaderCircle className="animate-spin" size={25} />
              </div>
            ) : (
              "Log Out"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
