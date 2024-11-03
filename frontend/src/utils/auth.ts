// utils/auth.ts
'use server'
import { headers } from "next/headers";

export async function getCurrentUser() {
  const headersList =  headers();
  const id = headersList.get("x-user-id");
  if (!id) return null;

  return {
    id,
<<<<<<< HEAD
    NIM: headersList.get("x-user-NIM") ?? "",
    username: headersList.get("x-user-username") ?? "",
    isAdmin: headersList.get("x-user-isAdmin") ?? false,
=======
    NIM: headersList.get('x-user-NIM') || '',
    username: headersList.get('x-user-username') || '',
    isAdmin: headersList.get('x-user-isAdmin') || false,
    enrolledSlugOti: headersList.get('x-user-enrolledSlugOti') || '',
    enrolledSlugHima: headersList.get('x-user-enrolledSlugHima') || ''
>>>>>>> a6af7ce (fix: attach new headers for wawancara pukimak)
  };
}
