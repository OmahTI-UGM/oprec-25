import Link from "next/link";
import himakom from "@/logos/himakom.svg";
import omahti from "@/logos/omahti.svg";
import Image from "next/image";
import RegisterForm from "@/modules/auth/RegisterForm";

export default function LoginPage() {
  return (
    <>
      <div className="relative flex w-full max-w-md flex-col items-center rounded-lg border border-custom-silver/15 bg-custom-black p-4 pt-20">
        <Logos />
        <h1 className="mt-4 text-center text-3xl font-semibold text-white">
          Welcome to OPREC MAKOMTI
        </h1>

        {/* form component */}
        <RegisterForm />

        {/* redirect to sign up if user doesn't have an account */}
        <RedirectBox />
      </div>
    </>
  );
}

const Logos = () => (
  <div className="z-20 flex items-center gap-2">
    <Image src={himakom} alt="Logo Himakom" />
    <Image src={omahti} alt="Logo OmahTI" />
  </div>
);

const RedirectBox = () => (
  <div className="mt-8 flex w-full items-center justify-center rounded-sm  bg-custom-gray-dark/50 p-2">
    <span className="font-medium">
      Already have an account?{" "}
      <Link href="/auth/login" className="text-blue-500 hover:underline">
        Sign In 
      </Link>
    </span>
  </div>
);
