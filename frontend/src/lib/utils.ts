import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Octagon, MessageSquare, MailWarning } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// MAX ENROLLMENT
export const MAX_ENROLLMENTS = 4;


// LINIMASA / RECRUITMENT TIMELINE
// --------------------------------------------------------------------
export const LINIMASA_DETAIL = [
  {
    title: "Pilih Divisi",
    date: "10 Nov - 17 Nov",
    description:
      "Memilih 2 divisi Himakom (Opsional) dan 2 divisi OmahTI (Opsional)",
  },
  {
    title: "Penugasan",
    date: "10 Nov - 17 Nov",
    description: "Melakukan penugasan sesuai masing-masing divisi",
  },
  {
    title: "Wawancara",
    date: "18 Nov - 23 Nov",
    description:
      "Wawancara Himakomd dan OmahTI sesuai divisi dan waktu yang telah dipilih",
  },
  {
    title: "Pengumuman",
    date: "4 Desember",
    description: "Hasil Pengumuman OmahTI dan Himakom",
  },
];
// --------------------------------------------------------------------

// FAQ QUESTIONS AND ANSWERS
// --------------------------------------------------------------------
export const OMAHTI_FAQ = [
  {
    question: "Apa itu OmahTI?",
    answer: "Sample answer",
  },
  {
    question: "Siapa CEO OmahTI?",
    answer: "Puff Daddy",
  },
  {
    question: "Siapa yang ada di dunia ini yang cita-citanya menjadi orang yang kaya raya sehingga tidak perlu pusing memikirkan esok hari?",
    answer: "saya bang",
  },
];
export const HIMAKOM_FAQ = [
  {
    question: "Apa itu Himakom?",
    answer: "Sample answer",
  },
  {
    question: "Siapa Himakom Biji?",
    answer: "Muhammad Ilham Rajo Sikumbang",
  },
  {
    question: "Kak jadi aku mahasiswa baru ilmu komputer jadi aku sekarang angkatan 2024, kalo menurut kakak lebih bagus omahti apa himakom ya kak? please bantu jawab kak soalnya aku bimbang.",
    answer: "retoris",
  },
];
// --------------------------------------------------------------------