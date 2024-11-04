import { useState } from "react";
import { X, Check, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ErrorPopup from "@/components/ErrorPopup";
interface ScheduleSlot {
  id: string;
  sesi: Date;
  himakom: boolean;
}

interface PopupProps {
  type: "gagal" | "berhasil" | "konfirmasi";
  className?: string;
  selectedSlot: ScheduleSlot | null; // Pass selected slot information
}

export default function Popup({ type, className, selectedSlot }: PopupProps) {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>("");

  const getContent = () => {
    switch (type) {
      case "gagal":
        return {
          icon: (
            <X className="h-10 w-10 text-white sm:h-12 sm:w-12 lg:h-16 lg:w-16" />
          ),
          title: "Isi Divisi Terlebih Dahulu",
          subtitle: "Sebelum memilih pilihan wawancara",
          headerText: "Akses Wawancara",
          buttonLabel: "Selesai",
          cancelable: false,
        };
      case "berhasil":
        return {
          icon: (
            <Check className="h-10 w-10 text-white sm:h-12 sm:w-12 lg:h-16 lg:w-16" />
          ),
          title: "Pilih Jadwal Berhasil",
          subtitle: "Sampai jumpa di hari Wawancara",
          headerText: "Konfirmasi Jadwal",
          buttonLabel: "Selesai",
          cancelable: false,
        };
      case "konfirmasi":
        return {
          icon: (
            <CalendarDays className="h-10 w-10 text-white sm:h-12 sm:w-12 lg:h-16 lg:w-16" />
          ),
          title: "Kamu Sudah Yakin?",
          subtitle: "Pilihan Jadwal Tidak Dapat Dirubah",
          headerText: "Konfirmasi Jadwal",
          buttonLabel: "Pilih",
          cancelable: true,
        };
      default:
        return null;
    }
  };

  const content = getContent();
  if (!content) return null;

  const handleConfirm = async () => {
    const hima = selectedSlot?.himakom ? "hima" : "oti";
    if (type === "konfirmasi" && selectedSlot) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/wawancara/${hima}/${selectedSlot.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              jamWawancara: selectedSlot.sesi,
            }),
            credentials: "include",
          },
        );
        const responseJSON = await response.json();
        if (response.ok) {
          console.log("Schedule confirmed successfully.");
          // Handle successful confirmation here (e.g., show success popup)
        } else {
          setErrorMessage(responseJSON.message);
          setShowErrorModal(true);
          console.error("Failed to confirm schedule.");
        }
      } catch (error) {
        console.error("Error confirming schedule:");
      }
    }
  };

  const handleErrorClose = () => {
    setShowErrorModal(false);
  }

  return (
    <AlertDialog>
      {showErrorModal && <ErrorPopup open={showErrorModal} onErrorClose={handleErrorClose} errorMessage={errorMessage || ""}/>}
      <AlertDialogTrigger asChild>
        <Button className="h-auto w-20 p-2 text-sm tracking-wide sm:w-24 sm:text-base lg:w-32">
          Pilih
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="h-auto w-[90vw] rounded-lg bg-custom-gray-dark p-0 xxs:w-[76vw] xs:w-[56vw] sm:w-[48vw] md:w-[40vw] lg:w-[38vw] xl:w-[30vw] 2xl:w-[25vw]">
        <div className="h-14 rounded-t-lg bg-custom-black sm:h-20 lg:h-24" />

        <div className="absolute left-1/2 top-[25px] -translate-x-1/2 sm:top-[35px] lg:top-[40px]">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white bg-custom-black p-3 sm:h-20 sm:w-20 sm:p-4 lg:h-28 lg:w-28 lg:p-6">
            {content.icon}
          </div>
        </div>
        <div className="text-center mt-6 sm:mt-8 lg:mt-16 px-4">
          <p className="text-white text-sm mb-0 sm:mb-1 lg:mb-2">{content.headerText}</p>
          <h2 className="text-white text-xl lg:text-2xl font-bold mb-0 sm:mb-1 lg:mb-2">{content.title}</h2>
          <p className="text-white text-sm mb-4">{content.subtitle}</p>
        </div>

        <div className="flex flex-col-reverse items-center justify-center gap-2 p-4 pt-0 xxs:flex-row sm:px-4 lg:flex-row lg:pt-4">
          {content.cancelable && (
            <AlertDialogCancel asChild>
              <Button
                variant={"outline"}
                className="mt-0 h-8 w-full text-sm sm:h-10 lg:h-12 lg:w-1/2 lg:text-base"
              >
                Batal
              </Button>
            </AlertDialogCancel>
          )}
          <AlertDialogAction asChild>
            <Button
              onClick={handleConfirm} // Trigger confirmation request
              className={`w-full ${content.cancelable ? "lg:w-1/2" : ""} h-8 text-sm sm:h-10 lg:h-12 lg:text-base`}
            >
              {content.buttonLabel}
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
