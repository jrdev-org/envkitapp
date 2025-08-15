"use client";

import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";

export const ProjectDetails = ({ params }: { params: { id: string } }) => {
  const projectId = params.id as Id<"projects">;
  const data = useQuery(api.variables.getProjectAndVars, { projectId });

  // Single call to fetch both project and variables

  if (data === undefined) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Project not found</div>;
  }

  console.log(data);

  const { project, variables } = data;

  return (
    <div>
      <h2>{project.name}</h2>

      {variables.length === 0 ? (
        <h3>No variables for this project yet!</h3>
      ) : (
        <>
          <h3>Variables</h3>
          <ul>
            {variables.map((variable) => (
              <li key={variable._id}>
                {variable.name}: {variable.value}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
