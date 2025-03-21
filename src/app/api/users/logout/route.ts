import { connectDB } from "@/dbConfig/dbConfig";

import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(res: NextResponse) {
  const response = NextResponse.json({
    message: "User logout successfully",
    success: true,
  });
  response.cookies.set("token", "", {
    httpOnly: true,
    expires: Date.now(),
  });
  return response;
}
