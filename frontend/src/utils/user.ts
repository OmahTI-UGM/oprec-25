"use server";
import { SigninFormSchema, FormState } from "@/lib/definitions";

export async function signin(formData: FormData) {
  "use server";

  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { email, password } = validatedFields.data;

  try {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return { error: "Email and password are required" };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      },
    );

    if (!response.ok) {
      const data = await response.json();
      return { error: data.message || "Login failed" };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { error: "An unexpected error occurred" };
  }
}

export async function loginUser(prevState: FormState, formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return { error: "Email and password are required" };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      },
    );

    if (!response.ok) {
      const data = await response.json();
      return { error: data.message || "Login failed" };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { error: "An unexpected error occurred" };
  }
}
