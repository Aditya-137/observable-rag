import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file");
  console.log(file);
  return NextResponse.json({
    message: "Received file!",
  });
}