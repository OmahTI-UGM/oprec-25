"use client"
import { useState } from "react";
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
  existingPenugasan
}: {
  data: {
    himakom: boolean;
    slug: string;
    penugasan: PenugasanData;
  }, 
  existingPenugasan: any; // Adjust type as necessary
}) => {
  // State to hold the input value for link submission
  const [link, setLink] = useState("");
  const [existingLink, setExistingLink] = useState(existingPenugasan?.link);
  // Function to handle submission of the new link
  const handlePengumpulan = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/divisi/${data.slug}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link, comment:" " }), // Use the link from state
        credentials: "include",
      });

      // Optionally handle the response
      if (!res.ok) {
        throw new Error("Failed to submit the link");
      }

      // Reset the input field after successful submission
      setLink("");
    } catch (err) {
      console.error(err);
    }
  };

  // Function to handle updating penugasanData
  const handleUpdatePenugasan = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/divisi/${existingPenugasan._id}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({link: existingLink, comment:" "}), // Send the penugasanData for updating
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to update penugasan data");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-auto rounded-lg bg-custom-gray-dark p-4 xl:ml-0 xl:h-full xl:w-[30%]">
      <h1
        className={`${data.himakom ? "text-custom-blue" : "text-custom-orange"} mb-4`}
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
          {existingPenugasan ? (
            <>
            <input
              type="text"
              placeholder="Update Tugas"
              value={existingLink} // Bind the input value to state
              onChange={(e) => setExistingLink(e.target.value)} // Update state on input change
              className="focus:border-none w-full appearance-none rounded-sm bg-[#535362] p-2 text-left focus:outline-none focus:ring-2 focus:ring-custom-blue"
            />
            <Button size={`lg`} className="w-full text-base" onClick={handleUpdatePenugasan}>
              Update Penugasan Data
            </Button>
          </>
        ):
        <>
          <input
              type="text"
              value={link} // Bind the input value to state
              onChange={(e) => setLink(e.target.value)} // Update state on input change
              className="focus:border-none w-full appearance-none rounded-sm bg-[#535362] p-2 text-left focus:outline-none focus:ring-2 focus:ring-custom-blue"
            />
          <Button size={`lg`} className="w-full text-base" onClick={handlePengumpulan}>
              Submit
          </Button>
        </>
        }
          
        </div>
      </div>
    </div>
  );
};

export default Penugasan;
