import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: "Invalid Token", status: 500 });
    }

    user.isVerified = true;
    user.isVerifyToken = null;
    user.isVerifyTokenExpiry = null;
    await user.save();

    return NextResponse.json({
      message: "Email verfied successfully",
      success: true,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ status: 500, error: error.message });
  }
}
