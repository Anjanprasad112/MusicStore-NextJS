import { NextRequest, NextResponse } from 'next/server';
import { verifyRefreshToken, generateAccessToken } from '@/utils/jwt';

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (!refreshToken) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const payload = verifyRefreshToken(refreshToken);
    const newAccessToken = generateAccessToken({ email: payload.email });

    const response = new NextResponse(JSON.stringify({ accessToken: newAccessToken }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

    response.cookies.set('accessToken', newAccessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    return response;
  } catch (error) {
    console.log("Error refreshing token:", error);
    return new NextResponse("Unauthorized", { status: 401 });
  }
}
