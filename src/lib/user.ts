import { api } from "convex/_generated/api";
import { convex } from "./convex-client";

export async function getOrCreateUser(
  authId: string,
  name: string,
  email: string,
) {
  const existing = await convex.query(api.users.get, { authId });

  if (existing) {
    return existing._id;
  }

  return await convex.mutation(api.users.create, {
    name,
    authId,
    email,
  });
}
