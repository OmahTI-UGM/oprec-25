import { CalendarDays } from "lucide-react";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type PopupTerimaProps = {
  className?: string;
  category: string;
};

export default function PopupTerima({ className, category }: PopupTerimaProps) {
  const getImageSrc = (category: string) => {
    switch (category) {
      case 'Front End':
        return '/assets/logo/FRONTEND.png';
      case 'Back End':
        return '/assets/logo/BACKEND.png';
      case 'Competitive Programming':
        return '/assets/logo/CP.png';
      case 'Cyber Security':
        return '/assets/logo/CYSEC.png';
      case 'UI/UX':
        return '/assets/logo/UX.png';
      case 'Game Development':
        return '/assets/logo/GAMEDEV.png';
      case 'Data Science & Artificial Intelligent':
        return '/assets/logo/DSAI.png'
      case 'Mobile Apps':
        return '/assets/logo/MOBAPPS.png'
      default:
        return '/assets/logo/himakom.png';
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="text-base" size={`lg`} variant={`white`}>Buka Pengumuman</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-lg bg-custom-gray-dark p-0 w-[80vw] xxs:w-[70vw] xs:w-[50vw] md:w-[35vw] lg:w-[38vw] xl:w-[30vw] 2xl:w-[25vw] h-auto scale-95">
        <div className="h-14 sm:h-20 lg:h-24 bg-custom-black rounded-t-lg" />
        
        <div className="absolute left-1/2 -translate-x-1/2 top-[25px] sm:top-[35px] lg:top-[40px]">
          <div className="relative bg-custom-black rounded-full p-3 sm:p-4 lg:p-6 border border-white w-16 sm:w-20 lg:w-28 h-16 sm:h-20 lg:h-28 flex items-center justify-center">
            <Image
              src={getImageSrc(category)}
              alt="OmahTI Logo"
              width={298}
              height={113}
              className="h-6 sm:h-8 lg:h-12 w-auto"
            />
          </div>
        </div>

        <div className="text-center mt-6 sm:mt-8 lg:mt-16 px-4">
          <p className="text-white text-xxs sm:text-xs lg:text-sm mb-1">Kamu berhasil diterima di divisi</p>
          <h2 className="text-white text-md xs:text-lg sm:text-xl lg:text-2xl font-bold mb-6 lg:mb-12">{category}</h2>
          <p className="text-white text-xxs sm:text-xs lg:text-sm">Jangan lupa untuk bergabung dengan grup</p>
        </div>
        
        <div className="flex flex-col-reverse xxs:flex-row lg:flex-row justify-center items-center gap-2 p-4 pt-0 lg:pt-4 sm:px-4">
          <AlertDialogCancel className="mt-0" asChild>
            <Button variant={"outline"} className="w-full lg:w-1/2 h-8 sm:h-10 text-xs sm:text-sm lg:text-base">
              Kembali
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button className="w-full lg:w-1/2 h-8 sm:h-10 text-xs sm:text-sm lg:text-base">
              Grup
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
