"use client";

import { useSession } from "@/lib/auth-client";
import { convex } from "@/lib/convex-client";
import { api } from "convex/_generated/api";
import { fetchQuery } from "convex/nextjs"; // for one-off fetches
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const { data, isPending, error } = useSession();
  const [user, setUser] = useState<any>(null);
  const [userProjects, setUserProjects] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!data?.user?.id) return;
      try {
        const response = await fetch(`/api/cli/init-session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deviceId: "Some-random-device" }),
        });

        const result = await response.json();

        console.log(result);

        const userData = await fetchQuery(api.users.get, {
          authId: data.user.id,
        });
        setUser(userData);

        if (userData?._id) {
          const projects = await fetchQuery(api.projects.list, {
            userId: userData._id,
          });
          setUserProjects(projects);
        }
      } finally {
        setLoadingData(false);
      }
    }

    6;
    loadData();
  }, [data]);

  if (isPending) return <div>Loading session...</div>;
  if (error) return <div>{error.message}</div>;
  if (!data?.session) return <div>Not authenticated</div>;

  if (loadingData) return <div>Loading data...</div>;
  if (!user)
    return (
      <div>
        User not found. Head to{" "}
        <Link href="/dashboard/onboarding">dashboard</Link> to create one.
      </div>
    );

  if (!userProjects.length) return <div>No projects found</div>;

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold">Projects</h1>
      <ul>
        {userProjects.map((project) => (
          <li key={project._id} className="mb-2 border-b bg-gray-100 p-2">
            <Link
              className="hover:underline"
              href={`/dashboard/projects/${project._id}`}
            >
              {project.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
