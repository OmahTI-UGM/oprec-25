import Image from "next/image";

const Hero = () => {
  return (
    <>
      <main className="w-screen overflow-x-hidden bg-custom-black lg:max-w-[80vw]">
        {/* <div className="flex h-screen items-center justify-center">
          <Image
            src="/assets/components/Loading.gif"
            alt=""
            width={0}
            height={0}
            className="w-[25vh]"
          />
        </div> */}
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
