import { auth } from "@/auth";
import { redirect } from "next/navigation";

export function verifyAndRedirect() {
  const session = auth();
  if (!session) {
    redirect('/br');
  }
  return session;
}