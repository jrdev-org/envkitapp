"use client";

import { signOut } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
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
      className="flex cursor-pointer items-center gap-3 px-4 py-2 text-sm text-red-500"
    >
      <LogOut className="h-4 w-4" /> Sign Out
    </button>
  );
}
