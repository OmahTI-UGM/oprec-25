import Image from "next/image";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";

const Title = () => {
  return (
    <>
      <div className="flex items-center gap-[13px]">
        <div className="relative aspect-square size-[35px]">
          <Image
            alt="Logo"
            className="object-cover"
            src="https://img.freepik.com/free-psd/3d-illustration-bald-person-with-glasses_23-2149436184.jpg?w=826&t=st=1729060915~exp=1729061515~hmac=dc911f470a5362d31529331c2e5ba014647fd3219c2e050b0d34e03a59d6002e"
            fill
          />
        </div>
        <h1 className="text-wrap font-semibold leading-snug">
          <AnimatedGradientText className="bg-transparent font-semibold p-0 border-none outline-none">
            <span className="animate-gradient inline bg-gradient-to-r from-custom-peach via-custom-lavender to-custom-peach bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent">
              Open Recruitment
            </span>{" "}
          </AnimatedGradientText>
          <br className="block sm:hidden" />
          Makomti 2024
        </h1>
      </div>
    </>
  );
};

export default Title;
