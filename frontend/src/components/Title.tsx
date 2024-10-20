import Image from "next/image";

export default function Title() {
  return (
    <>
      <div className="flex items-center gap-[13px]">
        <div className="relative aspect-square size-[35px]">
          <Image
            alt="Logo"
            src="https://img.freepik.com/free-psd/3d-illustration-bald-person-with-glasses_23-2149436184.jpg?w=826&t=st=1729060915~exp=1729061515~hmac=dc911f470a5362d31529331c2e5ba014647fd3219c2e050b0d34e03a59d6002e"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h1 className="hidden text-wrap font-poppins-semibold leading-snug xl:block">
          <span className="text-custom-orange">Open</span>{" "}
          <span className="text-custom-lavender">Recruitment</span> Makomti 2024
        </h1>
        <h1 className="text-wrap font-poppins-semibold leading-snug xl:hidden">
          <span className="text-custom-orange">Op</span>
          <span className="text-custom-lavender">rec</span> Makomti 2024
        </h1>
      </div>
    </>
  );
}
