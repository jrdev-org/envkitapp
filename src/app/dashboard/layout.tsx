import { Navigation as Navbar } from "@/components/nav";
import { auth } from "@/lib/auth";
import {
  Activity,
  FolderOpen,
  Key,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
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

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="h-screen bg-gray-100 text-black">
      <Navbar session={session} />
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
