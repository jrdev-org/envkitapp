"use client";

import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { z } from "zod";

export const StageEnum = z.enum(["development", "staging", "production"]);

export const VariableSchema = z.object({
  name: z
    .string({
      required_error: "Name required — telepathy isn’t supported yet 🧠",
      invalid_type_error: "Nice try, but that’s not even a string 👀",
    })
    .trim()
    .min(1, "Blank? Really? Even your keyboard is judging you 😒")
    .regex(
      /^[A-Z0-9_]+$/,
      "ENV variable names must be SCREAMING_IN_ALL_CAPS — stop whispering in lowercase 🙄",
    )
    .max(
      50,
      "Calm down Hemingway — 50 characters is plenty for a variable name 📝",
    ),

  value: z
    .string({
      required_error:
        "Every variable needs a value — don’t leave it hanging 🤷‍♂️",
      invalid_type_error: "This value’s not even a string, try again 📏",
    })
    .trim()
    .min(
      1,
      "An empty value? That’s like an empty piñata — deeply disappointing 🎉",
    )
    .max(
      100,
      "Easy there, novel-writer — keep it under 100 characters or I’m charging rent 🏠",
    ),

  stage: StageEnum.default("production"),
});

interface VariableFormProps {
  projectId: Id<"projects">;
}

export function VariableForm({ projectId }: VariableFormProps) {
  const createNewVariable = useMutation(api.variables.create);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const rawData = {
      name: formData.get("name"),
      value: formData.get("value"),
      stage: formData.get("stage") ?? undefined,
    };

    const parsed = VariableSchema.safeParse(rawData);

    if (!parsed.success) {
      console.error(parsed.error.format());
      alert(parsed.error.errors.map((err) => err.message).join("\n"));
      return;
    }

    try {
      const newVarId = await createNewVariable({
        projectId,
        name: parsed.data.name,
        value: parsed.data.value,
        stage: parsed.data.stage, // will be defaulted to "production" if undefined
      });
      alert(`Variable created with ID: ${newVarId}`);
      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error creating variable: ", error.message);
        alert(`Error creating variable: ${error.message}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 bg-gray-300 p-4">
      <input
        className="rounded border bg-gray-100 p-2 focus:bg-blue-200"
        type="text"
        placeholder="e.g DATABASE_URL"
        name="name"
      />
      <input
        className="min-w-[400px] rounded border bg-gray-100 p-2 focus:bg-blue-200"
        type="text"
        name="value"
        placeholder="e.g postgresql://user:password@localhost:5431/testdb?schema=public"
      />
      <select
        name="stage"
        className="rounded border bg-gray-100 p-2 focus:bg-blue-200"
        defaultValue="production"
      >
        <option value="development">development</option>
        <option value="staging">staging</option>
        <option value="production">production</option>
      </select>
      <button
        type="submit"
        className="cursor-pointer rounded bg-gray-700 p-2 font-semibold text-white hover:bg-gray-900"
      >
        Add variable
      </button>
    </form>
  );
}
