import Container from "@/components/Container";
import github from "@/../public/assets/icons/github.svg";
import x from "@/../public/assets/icons/x.svg";
import Image from "next/image";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Container
        className="flex flex-col items-center justify-center bg-custom-black"
        parentClass="min-h-screen"
      >
        {/* background gradients */}
        {/* ------------------------------------------ */}
        <div className="absolute inset-0 overflow-hidden">
          {/* DESIGN 1: mirip sidebar landing page */}
          {/* <div className="absolute inset-y-0 left-0 right-1/2 bg-custom-orange" />
          <div className="absolute inset-y-0 left-1/2 right-0 bg-custom-blue" />
          <div className="absolute inset-0 bg-gradient-to-t from-custom-black/95 to-custom-black/80" /> */}

          {/* DESIGN 2: default */}
          <div className="absolute right-[-5%] top-[-10%] h-[800px] w-[800px] rounded-full bg-custom-blue/10 blur-[120px]" />
          <div className="absolute bottom-[19%] left-[-10%] h-[600px] w-[600px] rounded-full bg-custom-orange/10 blur-[100px]" />
        </div>
        {/* ------------------------------------------ */}
        {children}
      </Container>
      <MiniFooter />
    </>
  );
};

const MiniFooter = () => {
  return (
    <footer className="flex w-full flex-col gap-6 border-t border-custom-gray-dark bg-custom-black p-6 px-[10%] text-sm text-custom-gray-light">
      <p>2024 © OmahTI</p>

      <div className="flex gap-8">
        <div className="flex gap-1">
          {/* social media */}
          <Link
            href={`https://github.com/OmahTI-UGM`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={github}
              className="h-4 text-custom-gray-light"
              alt="Github Logo"
            />
          </Link>

          <Link
            href={`https://x.com/omahti_ugm`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={x}
              className="h-4 text-custom-gray-light"
              alt="Github Logo"
            />
          </Link>
        </div>

        {/* other links */}
        <Link href="/" className="text-custom-gray-light transition-colors hover:text-white">
          Home
        </Link>
      </div>
    </footer>
  );
};

export default Layout;
