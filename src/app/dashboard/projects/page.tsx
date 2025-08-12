"use client"

import { useSession } from "@/lib/auth-client";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import Link from "next/link";

export default function ProjectsPage() {
  const { data, isPending, error } = useSession()
  if (isPending) return <div>Loading...</div>;
  if (error) {
    console.log(error)
    return <div>{error.message}</div>;
  }
  if (!data?.session) return <div>Not authenticated</div>;

  const user = useQuery(api.users.getByAuthId, {
    authId: data.user.id,
  })

  if (!user) return <div>User not found. Head to <Link href="/dashboard/onboarding">dashboard</Link> to create one.</div>;

  const userProjects = useQuery(api.projects.list, {
    userId: user._id,
  })

  if (!userProjects) return <div>No projects found</div>;


  return <div className="min-h-screen p-4">
    <h1 className="text-2xl font-bold">Projects</h1>
    <ul>
      {
        userProjects.map((project) => (
          <li key={project._id} className="mb-2 border-b p-2 bg-gray-100">
            <Link className="hover:underline" href={`/dashboard/projects/${project._id}`}>{project.name}</Link>
          </li>
        ))
      }
    </ul >
  </div >;
}


