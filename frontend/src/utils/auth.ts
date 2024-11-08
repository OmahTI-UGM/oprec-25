// utils/auth.ts
"use server";
import { cookies, headers } from "next/headers";
import { DivisiProps } from "./definitions";
import { getEnrolledDivisi } from "./fetch";

export async function getCurrentUser() {
  const headersList = headers();
  const id = headersList.get("x-user-id");
  if (!id) return null;

  return {
    id,
    NIM: headersList.get("x-user-NIM") || "",
    username: headersList.get("x-user-username") || "",
    isAdmin: headersList.get("x-user-isAdmin") || false,
    enrolledSlugOti: headersList.get("x-user-enrolledSlugOti") || "",
    enrolledSlugHima: headersList.get("x-user-enrolledSlugHima") || "",
  };
}

export async function getUrl() {
  const headersList = headers();
  
  return headersList.get('x-url') || '';
}

interface enrolledDivisionsProps {
  divisiId: DivisiProps;
  urutanPrioritas: number;
  _id: string;
}

export const hasEnrolledInClass = async (slug: string) => {
  const accessToken = cookies().get("accessToken")?.value;
  const enrolledDivisions: enrolledDivisionsProps[] = await getEnrolledDivisi(
    accessToken as string,
  );

  const enrolledSlugs = enrolledDivisions.map(
    (division) => division.divisiId.slug,
  );

  // returns a boolean
  return enrolledSlugs.includes(slug);
};

export const hasMaxEnrollment = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  const enrolledDivisions: enrolledDivisionsProps[] = await getEnrolledDivisi(
    accessToken as string,
  );

  // returns a boolean
  return enrolledDivisions.length >= 4;
};

export const hasEnrolled = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  const enrolledDivisions: enrolledDivisionsProps[] = await getEnrolledDivisi(
    accessToken as string,
  );

  const hasHimakom = enrolledDivisions.some(
    (division) => division.divisiId.himakom
  );
  const hasOmahti = enrolledDivisions.some(
    (division) => !division.divisiId.himakom
  );

  // returns an object containing booleans
  return { hasHimakom, hasOmahti };
};

export const getEnrollmentPriorities = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  const enrolledDivisions: enrolledDivisionsProps[] = await getEnrolledDivisi(
    accessToken as string,
  );

  const prioritiesTaken = enrolledDivisions.map(
    (division) => division.urutanPrioritas
  );

  const divisionsByPriority = enrolledDivisions.map(division => ({
    priority: division.urutanPrioritas,
    name: division.divisiId.judul,
    slug: division.divisiId.slug,
    himakom: division.divisiId.himakom
  })).sort((a, b) => a.priority - b.priority);

  return { prioritiesTaken, divisionsByPriority };
};