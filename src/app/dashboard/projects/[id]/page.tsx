import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ProjectDetails } from "./project-details";
import type React from "react";
import { VariableForm } from "./form";
import type { Id } from "convex/_generated/dataModel";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const projectParams = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.session) {
    return <div>Not logged in</div>;
  }

  return (
    <div className="min-h-screen p-3">
      <VariableForm projectId={projectParams.id as Id<"projects">} />
      <ProjectDetails params={projectParams} />
    </div>
  );
}
