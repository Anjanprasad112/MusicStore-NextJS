import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken } from '@/utils/jwt';
import User from '@/models/User';

export async function GET(req: NextRequest) {
  const accessToken = req.headers.get('authorization')?.split(' ')[1];

  if (!accessToken) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const payload = verifyAccessToken(accessToken);
    const user = await User.findOne({ email: payload.email }).select('-password');

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log('Error verifying access token:', error);
    return new NextResponse('Unauthorized', { status: 401 });
  }
}
