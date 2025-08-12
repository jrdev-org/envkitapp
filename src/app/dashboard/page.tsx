"use client";

import { useSession } from "@/lib/auth-client";
import { api } from "convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { z } from "zod";

const projectSchema = z.object({
  name: z
    .string()
    .min(3, "Project name must be at least 3 characters long")
    .max(50, "Project name must be at most 50 characters long"),
});

export default function DashboardPage() {
  const router = useRouter();
  const { data, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !data?.session) {
      router.push("/auth/sign-in");
      return;
    }
  }, [isPending, data, router]);

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

  const createNewProject = useMutation(api.projects.create);
  const authId = data?.user?.id;
  const user = useQuery(api.users.getByAuthId, authId ? { authId } : "skip");
  if (user === undefined) {
    // Still loading from Convex
    return <div>Loading user…</div>;
  }
  if (user === null) {
    console.warn("No user found for authId", authId);
    return (
      <div>
        We couldn’t find your user record. Please sign out and sign in again.
      </div>
    );
  }
  function createProject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const rawData = {
      name: formData.get("name"),
    };

    const parsed = projectSchema.safeParse(rawData);

    if (!parsed.success) {
      // Show validation errors
      console.error(parsed.error.format());
      alert(parsed.error.errors.map((err) => err.message).join("\n"));
      return;
    }

    // Now parsed.data is guaranteed to be valid
    console.log("Creating project:", parsed.data.name);
    createNewProject({
      name: parsed.data.name,
      userId: user!._id,
    })
      .then((res) => {
        console.log("created project: ", res);
        return;
      })
      .catch((err) => {
        console.warn("Error creating project: ", err);
        return;
      });
  }

  return (
    <div className="min-h-screen p-6">
      <h2>Dashboard</h2>

      <h3>Create a new project</h3>
      <form className="flex gap-2" onSubmit={createProject}>
        <input
          name="name"
          placeholder="Project name"
          className="border p-1"
          required
          type="text"
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
