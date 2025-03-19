import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/Utils/mailer";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { message: "user already exists" },
        { status: 400 }
      );
    }

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ username, email, password: hashedPassword });

    const savedUser = await newUser.save();

    console.log("", savedUser);
    //send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
