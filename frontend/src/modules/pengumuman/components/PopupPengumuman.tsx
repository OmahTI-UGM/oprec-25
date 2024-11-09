import { X, CalendarDays } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type PopupPengumumanProps = {
  className?: string;
  status: "terima" | "tolak";
  category?: string;
};

export default function PopupPengumuman({
  className,
  status,
  category,
}: PopupPengumumanProps) {
  const getImageSrc = (category: string) => {
    switch (category) {
      case "Front End":
        return "/assets/logo/FRONTEND.png";
      case "Back End":
        return "/assets/logo/BACKEND.png";
      case "Competitive Programming":
        return "/assets/logo/CP.png";
      case "Cyber Security":
        return "/assets/logo/CYSEC.png";
      case "UI/UX":
        return "/assets/logo/UX.png";
      case "Game Development":
        return "/assets/logo/GAMEDEV.png";
      case "Data Science & Artificial Intelligence":
        return "/assets/logo/DSAI.png";
      case "Mobile Apps":
        return "/assets/logo/MOBAPPS.png";
      default:
        return "/assets/logo/himakom.png";
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="text-base" size="lg" variant="white">
          Buka Pengumuman
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="h-auto w-[99vw] scale-95 rounded-lg bg-custom-gray-dark p-0 xxs:w-[80vw] xs:w-[55vw] md:w-[40vw] lg:w-[38vw] xl:w-[30vw]">
        <div className="h-14 rounded-t-lg bg-custom-black sm:h-20 lg:h-24" />

        <div className="absolute left-1/2 top-[25px] -translate-x-1/2 sm:top-[35px] lg:top-[40px]">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white bg-custom-black p-3 sm:h-20 sm:w-20 sm:p-4 lg:h-28 lg:w-28 lg:p-6">
            {status === "tolak" ? (
              <X className="h-10 w-10 text-white sm:h-12 sm:w-12 lg:h-16 lg:w-16" />
            ) : (
              <Image
                src={getImageSrc(category || "")}
                alt="Category Logo"
                width={298}
                height={113}
                className="h-6 w-auto sm:h-8 lg:h-12"
              />
            )}
          </div>
        </div>

        <div className="mt-6 px-4 text-center *: *:text-custom-silver sm:mt-8 lg:mt-16">
          {status === "tolak" ? (
            <>
              <p className="mb-10 sm:mb-12 lg:mb-14 text-[0.9rem]">
                Maaf kamu belum diterima dalam <br /> periode rekruitmen ini
              </p>
              <p className="text-[0.9rem]">Jangan menyerah dan tetap semangat!</p>
            </>
          ) : (
            <>
              <p className="text-[0.9rem]">Kamu berhasil diterima di divisi</p>
              <h2 className="mb-6 text-2xl font-bold sm:mb-8 md:mb-10 lg:mb-12">
                {category}
              </h2>
              <p className="text-[0.9rem]">Jangan lupa untuk bergabung dengan grup</p>
            </>
          )}
        </div>

        <div className="flex flex-col-reverse items-center justify-center gap-2 p-4 pt-0 xxs:flex-row sm:px-4 lg:flex-row lg:pt-2">
          {status === "tolak" ? (
            <AlertDialogAction asChild>
              <Button size={`lg`} className="w-full text-[0.9rem]">
                Selesai
              </Button>
            </AlertDialogAction>
          ) : (
            <>
              <AlertDialogCancel className="mt-0" asChild>
                <Button
                  variant="outline"
                  size={`lg`}
                  className="w-full text-[0.9rem] lg:w-1/2"
                >
                  Kembali
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button size={`lg`} className="w-full text-[0.9rem] lg:w-1/2">Grup</Button>
              </AlertDialogAction>
            </>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
