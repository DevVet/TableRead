import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  return Response.json({ name: "John Doe" }, { status: 200 });
};

export const POST = async (req: NextRequest) => {
  const { first, last } = await req.json();
  return NextResponse.json({ name: `${first} ${last}` });
};
