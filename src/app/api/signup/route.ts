import { connectToDataBase } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from 'next/server';
import User from "@/models/User";
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from '@/utils/jwt';

export async function POST(req: NextRequest) {
  try {
    await connectToDataBase();

    const { email, password, confirmpassword } = await req.json();
    console.log(`Received data: `, email, password, confirmpassword);

    if (password !== confirmpassword) {
      return new NextResponse("Passwords do not match", { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse("User already exists", { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    const accessToken = generateAccessToken({ email });
    const refreshToken = generateRefreshToken({ email });

    const response = new NextResponse(JSON.stringify({ accessToken, refreshToken }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

    response.cookies.set('accessToken', accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    response.cookies.set('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    return response;
  } catch (err: any) {
    console.log("Error in signup route:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
