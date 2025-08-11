"use client";

import { Navigation as Navbar } from "@/components/nav";
import { useSession } from "@/lib/auth-client";
import {
  Activity,
  FolderOpen,
  Key,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !data?.session) {
      router.push("/auth/sign-in");
      return;
    }
  }, [isPending, data, router]);

  const links = [
    {
      url: "/dashboard",
      icon: LayoutDashboard,
      name: "dashboard",
    },
    {
      url: "/dashboard/projects",
      icon: FolderOpen,
      name: "projects",
    },
    {
      url: "/dashboard/team",
      icon: Users,
      name: "team",
    },
    {
      url: "/dashboard/settings",
      icon: Settings,
      name: "settings",
    },
    {
      url: "/dashboard/api-keys",
      icon: Key,
      name: "api keys",
    },
    {
      url: "/dashboard/activity-log",
      icon: Activity,
      name: "activity",
    },
  ];

  if (isPending) {
    return <div>Loading...</div>; // Or a more appropriate loader
  }

  if (!data?.session) {
    return (
      <div>
        <h2>
          You might not be authenticated, please head to{" "}
          <Link className="text-blue-900" href={"/auth/sign-in"}>
            auth
          </Link>
        </h2>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 text-black">
      <Navbar session={data} />
      <div className="flex h-full">
        <aside className="flex w-64 flex-col gap-3 bg-white shadow-md">
          {links.map((link, index) => (
            <Link href={link.url} key={index + 2} className="bg-gray-200 p-4">
              {/* <span>{link.icon}</span> */}
              {link.name}
            </Link>
          ))}
        </aside>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
