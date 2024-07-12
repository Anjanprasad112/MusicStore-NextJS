import { connectToDataBase } from "@/lib/dbConnect";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from '@/utils/jwt';

export async function POST(req: NextRequest) {
  try {
    await connectToDataBase();
    const { email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return new NextResponse("User not found", { status: 400 });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return new NextResponse("Incorrect Password", { status: 400 });
    }

    const accessToken = generateAccessToken({ email });
    const refreshToken = generateRefreshToken({ email });

    return new NextResponse(JSON.stringify({ accessToken, refreshToken }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.log("Error in login route:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
