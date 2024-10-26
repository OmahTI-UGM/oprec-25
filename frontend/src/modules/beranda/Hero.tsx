import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section className="h-[80vh] bg-custom-black w-full border-2 border-b-white">
        {/* <div className="flex h-screen items-center justify-center">
          <Image
            src="/assets/components/Loading.gif"
            alt=""
            width={0}
            height={0}
            className="w-[25vh]"
          />
        </div> */}
        <div className="flex h-screen items-center justify-center text-3xl flex-col">
          <h1 className="text-center text-custom-lavender">Ini LANDING PAGE BOSSSSSSSS</h1>
            <Link href="/dashboard" className="p-4 border border-white">
            dashborad 
          </Link>
        </div>
        
      </section>
    </>
  );
};

export default Hero;
