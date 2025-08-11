"use client";

import { useSession } from "@/lib/auth-client";
import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OnboardingPage() {
  const { data, error, isPending } = useSession();
  const [newUser, setNewUser] = useState<
    | (string & {
        __tableName: "users";
      })
    | null
  >(null);
  const createNewUser = useMutation(api.users.create);

  useEffect(() => {
    if (data?.user) {
      createNewUser({
        name: data.user.name,
        authId: data.user.id,
        email: data.user.email,
      })
        .then((result) => {
          console.log("User created:", result);
          setNewUser(result);
        })
        .catch((err) => {
          console.error("Error creating user:", err);
        });
    }
  }, [data?.user, createNewUser]);

  if (isPending) {
    console.log("loading ...");
    return <div>Loading ...</div>;
  }

  if (error) {
    console.warn("Error fetching session: ", error.message);
    return (
      <div>
        <h2>
          Error fetching the user session. Please check your network or reload
          the page to try again
        </h2>
      </div>
    );
  }

  if (!data) {
    console.log("Not authenticated");
    return (
      <div>
        <h2>Please reload the page to fetch the user and session data</h2>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1>Hello {newUser ? "New User Onboarded" : "Creating User..."}</h1>
      <p>
        Thanks for onboarding, you can now continue to the{" "}
        <Link className="text-blue-600" href={"/dashboard"}>
          Dashboard
        </Link>
      </p>
    </div>
  );
}
