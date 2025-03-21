import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/Utils/getDataFromToken";

connectDB();

export async function POST(req: NextRequest) {
  // extract data from token
  const userID = await getDataFromToken(req);
  const user = await User.findOne({ _id: userID }).select("-password  ");
  if (!user) {
    return NextResponse.json({ error: "no user found", status: 400 });
  }

  return NextResponse.json({ message: "user found", data: user });
}
