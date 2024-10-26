import Container from "./Container";
import Title from "./Title";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <>
      <section className="flex w-full px-8 justify-between items-center py-2 bg-custom-black">
        <Title />
        <div className="flex space-x-[1vw]">
          <Button>
            Masuk
          </Button>
          <Button>
            Admin
          </Button>
        </div>
    </section>
    </>
  );
}