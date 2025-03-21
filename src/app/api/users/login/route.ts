import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "user not exists", status: 400 });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return NextResponse.json(
        { error: "Check your credentials" },
        { status: 400 }
      );
    }

    const userToken = await jwt.sign(
      { userId: user._id },
      process.env.TOKEN_SECRET!,
      {
        expiresIn: "30m",
      }
    );
    const response = NextResponse.json({
      message: "User logged In successfully",
      status: 200,
    });
    response.cookies.set("token", userToken, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
