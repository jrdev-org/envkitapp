"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Terminal, Shield, Check, X, Loader2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";

interface DeviceInfo {
  deviceId: string;
  cliVersion: string;
}

export default function CLIAuthClient({
  deviceInfo,
  port,
}: {
  deviceInfo: DeviceInfo;
  port: number;
}) {
  const router = useRouter();
  const { data, isPending } = useSession();
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [authStatus, setAuthStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isPending && !data?.session) {
      router.push(
        `/auth/sign-in?redirect_url=${encodeURIComponent(window.location.href)}`,
      );
    }
  }, [isPending, data, router]);

  const handleAuthorize = async () => {
    if (!data?.user) {
      setErrorMessage("You must be signed in to authorize the CLI");
      setAuthStatus("error");
      return;
    }

    setIsAuthorizing(true);
    setAuthStatus("idle");
    setErrorMessage("");

    try {
      // Instead of calling the CLI server directly from the browser (CORS issue),
      // we call our own Next.js API route, which will run on the server.
      const res = await fetch(`/api/cli/authorize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: data.session.token,
          deviceId: deviceInfo.deviceId,
          port,
        }),
      });

      if (!res.ok) {
        throw new Error(`Authorization failed: ${res.statusText}`);
      }

      setAuthStatus("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Authorization failed",
      );
      setAuthStatus("error");
    } finally {
      setIsAuthorizing(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Terminal className="mx-auto mb-2 h-8 w-8 text-blue-600" />
          <CardTitle>Authorize EnvKit CLI</CardTitle>
          <CardDescription>
            A CLI is requesting access to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Device Info */}
          <div>
            <h3 className="text-sm font-semibold">Device Information</h3>
            <div className="rounded-lg bg-gray-50 p-3 text-sm">
              <div className="flex justify-between">
                <span>Device ID:</span>
                <code>{deviceInfo.deviceId}</code>
              </div>
              <div className="flex justify-between">
                <span>Version:</span>
                <Badge variant="secondary">{deviceInfo.cliVersion}</Badge>
              </div>
            </div>
          </div>

          {/* User Info */}
          {data?.user && (
            <div>
              <h3 className="text-sm font-semibold">Authorizing as</h3>
              <div className="flex items-center space-x-3 rounded-lg bg-blue-50 p-3">
                {data.user.image && (
                  <img
                    src={data.user.image}
                    alt={data.user.name || "User"}
                    className="h-10 w-10 rounded-full"
                  />
                )}
                <div>
                  <div className="font-medium">
                    {data.user.name || "Unknown User"}
                  </div>
                  <div className="text-sm">{data.user.email}</div>
                </div>
              </div>
            </div>
          )}

          {/* Status Messages */}
          {authStatus === "success" && (
            <div className="flex items-center space-x-2 rounded-lg bg-green-50 p-3 text-green-600">
              <Check className="h-5 w-5" />
              <span>
                Authorization successful!
                <br />
                You can now close this window
              </span>
            </div>
          )}
          {authStatus === "error" && (
            <div className="flex items-center space-x-2 rounded-lg bg-red-50 p-3 text-red-600">
              <X className="h-5 w-5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="flex-1"
              disabled={authStatus == "success"}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAuthorize}
              disabled={isAuthorizing || authStatus === "success"}
              className="flex-1"
            >
              {isAuthorizing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Authorizing...
                </>
              ) : authStatus === "success" ? (
                <>
                  <Check className="h-4 w-4" />
                  Authorized
                </>
              ) : (
                "Authorize CLI"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
