import CLIAuthClient from "./cli-auth-client";

export default async function CLIAuthPage({
  params,
  searchParams,
}: {
  params: Promise<{ deviceId: string }>;
  searchParams: Promise<{
    port: number;
  }>;
}) {
  const { deviceId } = await params;
  const { port } = await searchParams;
  // Any server-side fetching can go here if needed (e.g., initial device info)
  const deviceInfo = {
    deviceId,
    cliVersion: "1.0.0", // could also be fetched from Convex or another backend source
  };

  return <CLIAuthClient deviceInfo={deviceInfo} port={port} />;
}
