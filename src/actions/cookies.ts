"use server";

import { cookies } from "next/headers";

export async function getCookiesByKey(key: string) {
  const cookieStore = await cookies();
  const cookieKey = cookieStore.get(key);
  if (!cookieKey) {
    return null;
  }

  return cookieKey.value;
}

export async function deleteCookiesByKey(key: string) {
  (await cookies()).delete(key);
}

const setCookie = async (key: string, value: string) => {
  const cookieStore = await cookies();
  cookieStore.set(key, value);
};

const setCookiesByKey = (key: string, value: string) => {
  return setCookie(key, value);
};

export { setCookiesByKey };
