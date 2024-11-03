import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";

interface PenugasanData {
  deskripsiPenugasan: string;
  toolsPenugasan: string;
  linkPenugasan: string;
}

const Penugasan = ({
  data,
}: {
  data: {
    himakom: boolean;
    penugasan: PenugasanData;
  };
}) => {
  return (
    <div className="h-auto rounded-lg bg-custom-gray-dark p-4 xl:ml-0 xl:h-full xl:w-[30%]">
      <h1
        className={`${data.himakom == true ? "text-custom-blue" : "text-custom-orange"} mb-4`}
      >
        Penugasan
      </h1>

      {/* Nanti penugasan pake react markdown */}
      <div className="mt-2 space-y-3">
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold">Brief Penugasan</h1>
          <div className="w-full text-justify text-[0.9rem] leading-relaxed">
            {data.penugasan.deskripsiPenugasan}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-base font-semibold">Tools</h1>
          <div className="w-full text-justify text-[0.9rem] leading-relaxed">
            {data.penugasan.toolsPenugasan}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="font-semibold">Keperluan</h1>
          <Link
            href={data.penugasan.linkPenugasan}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size={`lg`} className="w-full text-base">
              <Download className="mr-2 h-5 w-5" /> Download Keperluan
            </Button>
          </Link>
        </div>

        <div className="space-y-1">
          <h1 className="font-semibold">Pengumpulan</h1>
          <h2 className="text-[0.9rem]">
            Pengumpulan berupa link Google Drive / GitHub
          </h2>
          <input
            type="text"
            placeholder="Ketik Link"
            className="focus:border-nonee w-full appearance-none rounded-sm bg-[#535362] p-2 text-left focus:outline-none focus:ring-2 focus:ring-custom-blue"
          />
          <Button size={`lg`} className="w-full text-base">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Penugasan;
