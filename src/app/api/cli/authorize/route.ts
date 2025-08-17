import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, deviceId, port, agent } = await req.json();

  if (!userId || !deviceId) {
    return NextResponse.json(
      { error: "Missing userId or deviceId" },
      {
        status: 400,
      },
    );
  }

  try {
    //healthcheck
    console.log("Starting healthcheck");

    const res = await fetch(`http://localhost:${port}/auth`);
    const data = await res.json();
    console.log(`CLI says: ${JSON.stringify(data)}`);

    // This runs server-side, so CORS to localhost:3001 won't block it
    const cliRes = await fetch(
      `http://localhost:${port}/auth/${encodeURIComponent(userId)}/${encodeURIComponent(deviceId)}`,
      {
        method: "POST",
        headers: {
          "User-Agent": agent ?? undefined,
        },
      },
    );

    if (!cliRes.ok) {
      throw new Error(`CLI server error: ${cliRes.statusText}`);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(error instanceof Error ? error.message : "Unknown error");

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      },
    );
  }
}
