import Image from "next/image";

const Hero = () => {
  return (
    <>
      <main className="w-screen lg:max-w-[80vw] bg-custom-black overflow-x-hidden">
        <div className="flex justify-center items-center h-[100vh]">
          <Image
            src="/assets/components/Loading.gif"
            alt=""
            width={0}
            height={0}
            className="w-[25vh]"
          />
        </div>
        <div className="flex justify-center items-center h-[100vh]">
          <h1 className="text-center text-custom-lavender">Ini Hero</h1>
        </div>
        <div className="flex justify-center items-center h-[100vh]">
          <h1 className="text-center text-custom-lavender">Ini Hero</h1>
        </div>
        <div className="flex justify-center items-center h-[100vh]">
          <h1 className="text-center text-custom-lavender">Ini Hero</h1>
        </div>
        <div className="flex justify-center items-center h-[100vh]">
          <h1 className="text-center text-custom-lavender">Ini Hero</h1>
        </div>
        <div className="flex justify-center items-center h-[100vh]">
          <h1 className="text-center text-custom-lavender">Ini Hero</h1>
        </div>
        <div className="flex justify-center items-center h-[100vh]">
          <h1 className="text-center text-custom-lavender">Ini Hero</h1>
        </div>
      </main>
    </>
  );
}

export default Hero;