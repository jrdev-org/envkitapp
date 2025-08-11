"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await signOut({
          fetchOptions: {
            onSuccess: () => router.push("/"),
          },
        });
      }}
      className="bg-red-500 p-3 text-2xl text-white"
    >
      Logout
    </button>
  );
}
