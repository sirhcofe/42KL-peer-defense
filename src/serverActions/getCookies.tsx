"use server";

import { cookies } from "next/headers";

export async function getCookies(key: string) {
  const accessToken = cookies().get("access_token")?.value;
  if (accessToken) return accessToken as string;
  return "" as string;
}

export async function clearCookies() {
  cookies().delete("access_token");
}
