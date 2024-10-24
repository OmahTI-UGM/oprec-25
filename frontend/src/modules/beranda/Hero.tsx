import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <main className="w-screen bg-custom-black w-full">
        {/* <div className="flex h-screen items-center justify-center">
          <Image
            src="/assets/components/Loading.gif"
            alt=""
            width={0}
            height={0}
            className="w-[25vh]"
          />
        </div> */}
        <div className="flex h-screen items-center justify-center text-3xl">
          <h1 className="text-center text-custom-lavender">Ini LANDING PAGE BOSSSSSSSS</h1>
        </div>
        <Link href="/dashboard" className="p-4 border border-white">
          dashborad 
        </Link>
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-center text-custom-lavender">Ini Hero</h1>
        </div>
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-center text-custom-lavender">Ini Hero</h1>
        </div>
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-center text-custom-lavender">Ini Hero</h1>
        </div>
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-center text-custom-lavender">Ini Hero</h1>
        </div>
      </main>
    </>
  );
};

export default Hero;
