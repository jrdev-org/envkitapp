"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { signIn, useSession } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default function SignIn(props: { searchParams: SearchParams }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = use(props.searchParams);
  const { data, error } = useSession();

  // Get redirect URL from query params
  const redirectUrl = searchParams.redirect_url as string;
  console.log(redirectUrl);

  // Handle session fetch errors
  if (error) {
    console.warn("Error fetching session: ", error.message ?? error);
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-sm text-red-500">
          Unable to fetch session. Reload the page!
        </p>
      </div>
    );
  }

  useEffect(() => {
    if (data?.session) {
      // If user is already signed in, redirect to the intended URL or dashboard
      if (redirectUrl) {
        router.push(redirectUrl);
      } else {
        router.push("/dashboard");
      }
    }
  }, [data, router, redirectUrl]);

  const handleSignIn = async () => {
    // Determine the callback URL based on redirect parameter
    const callbackURL = redirectUrl || "/dashboard";

    await signIn.social(
      {
        provider: "github",
        callbackURL,
        errorCallbackURL:
          "/sign-in" +
          (redirectUrl
            ? `?redirect_url=${encodeURIComponent(redirectUrl)}`
            : ""),
        newUserCallbackURL: redirectUrl || "/dashboard/onboarding",
      },
      {
        onRequest: () => setLoading(true),
        onResponse: () => setLoading(false),
        onError(context) {
          console.error(
            "Sign-in error:",
            context.error?.message ?? context.error,
          );
          setLoading(false);
        },
      },
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h2 className="text-lg font-semibold md:text-xl">Sign In</h2>
          <p className="text-xs text-gray-500 md:text-sm">
            Use your GitHub account to access your dashboard
          </p>
          {redirectUrl && (
            <div className="mt-3 rounded-lg bg-blue-50 p-3">
              <p className="text-xs text-blue-700">
                🔐 You'll be redirected to authorize the CLI after signing in
              </p>
            </div>
          )}
        </div>

        <button
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded border px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
          disabled={loading}
          onClick={handleSignIn}
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
            />
          </svg>
          Sign in with GitHub
        </button>

        {/* Powered by link */}
        <p className="mt-4 text-center text-xs text-gray-800">
          Powered by{" "}
          <Link
            href="https://better-auth.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600"
          >
            better-auth
          </Link>
        </p>
      </div>
    </div>
  );
}
