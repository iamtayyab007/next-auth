import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function POST(req: NextRequest) {
  const { token } = await req.json();
  const user = await User.findOne({ forgotPasswordToken: token });
  if (!user) {
    return NextResponse.json({ message: "Invalid Token", status: 500 });
  }

  user.forgotPasswordTokenExpiry = await user.save();
  try {
  } catch (error: any) {
    return NextResponse.json({ status: 500, error: error.message });
  }
}
