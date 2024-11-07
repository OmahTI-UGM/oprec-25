"use client";
import { useState } from "react";
import { SquareCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import PopupDivisiBerhasil from "./PopupDivisiBerhasil";
import Cookies from "js-cookie";
import ErrorPopup from "@/components/ErrorPopup";
type PopUpMilihProps = {
  params: string;
  hasEnrolled: boolean;
  hasMax: boolean;
  className?: string;
};

export default function PopupUrutan({ className, hasEnrolled, hasMax, params }: PopUpMilihProps) {
  const priorityNumbers = [1, 2, 3, 4];
  const [clickedButtons, setClickedButtons] = useState<number | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const handleButtonClick = (number: number) => {
    setClickedButtons(number);
  };

  const handleSubmit = async () => {
    if (clickedButtons !== null && !hasMax) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/divisi/${params}/choose`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ urutanPrioritas: clickedButtons }),
          credentials: "include",
        });
        const responseJson = await res.json();
        if (!res.ok) {
          setErrorMessage(responseJson.message);
          setShowErrorModal(true);
        } else {
          Cookies.set("accessToken", responseJson.accessToken);
          Cookies.set("refreshToken", responseJson.refreshToken);
          setShowSuccessModal(true); // Show success modal on success
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleClose = () => {
    setShowSuccessModal(false);
  }
  const handleErrorClose = () => {
    setShowErrorModal(false);
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger disabled={hasEnrolled} asChild>
          <Button className="w-full text-sm lg:text-md tracking-wide">{hasMax ? `Batas pilihan divisi tercapai` : hasEnrolled ? `Divisi terpilih` : `Pilih divisi`}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="rounded-lg bg-custom-gray-dark p-0 w-[90vw] xxs:w-[75vw] xs:w-[55vw] md:w-[40vw] lg:w-[38vw] xl:w-[30vw] 2xl:w-[25vw] h-auto scale-[80%] sm:scale-[75%] lg:scale-[72%] xl:scale-[90%]">
          <div className="h-14 sm:h-20 lg:h-24 bg-custom-black rounded-t-lg" />

          <div className="absolute left-1/2 -translate-x-1/2 top-[25px] sm:top-[35px] lg:top-[40px]">
            <div className="relative bg-custom-black rounded-full p-3 sm:p-4 lg:p-6 border border-white w-16 sm:w-20 lg:w-28 h-16 sm:h-20 lg:h-28 flex items-center justify-center">
              <SquareCheck className="h-10 sm:h-12 lg:h-16 w-10 sm:w-12 lg:w-16 text-white" />
            </div>
          </div>

          <div className="text-center mt-6 sm:mt-8 lg:mt-16 px-4">
            <p className="text-white text-sm mb-0 sm:mb-1 lg:mb-2">Konfirmasi Jadwal</p>
            <h2 className="text-white text-xl lg:text-2xl font-bold mb-0 sm:mb-1 lg:mb-2">Kamu Sudah Yakin?</h2>
            <p className="text-white text-sm mb-2">Pilihan Jadwal Tidak Dapat Dirubah</p>
          </div>

          <div className="text-center mt-2 px-4">
            <p className="text-white text-sm lg:mb-2">Urutan Prioritas</p>
            <div className="grid grid-cols-4 gap-2 sm:gap-3 pt-2">
              {priorityNumbers.map((number) => (
                <Button
                  key={number}
                  variant="outline"
                  onClick={() => handleButtonClick(number)}
                  className={`w-full h-12 sm:h-14 lg:h-16 text-sm font-medium ${
                    clickedButtons === number ? "bg-custom-gray text-custom-silver" : "text-custom-silver"
                  }`}
                >
                  {number}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col-reverse xxs:flex-row justify-center items-center gap-2 p-3 pt-0 sm:px-4">
            <AlertDialogCancel className="mt-0 w-full xxs:w-1/2" asChild>
              <Button variant={"outline"} className="w-full lg:w-1/2 h-8 sm:h-10 lg:h-12 text-sm lg:text-base">
                Batal
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction className="w-full xxs:w-1/2" asChild>
              <Button
                onClick={handleSubmit}
                className="h-8 sm:h-10 lg:h-12 text-sm lg:text-base"
              >
                Pilih
              </Button>
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success Modal */}
      {showSuccessModal && <PopupDivisiBerhasil open={showSuccessModal} onClose={handleClose}/>}
      {showErrorModal && <ErrorPopup errorMessage={errorMessage || ""} open={showErrorModal} onErrorClose={handleErrorClose}/>}
    </>
  );
}
