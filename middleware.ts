import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessToken } from '@/utils/jwt';

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;

  if (!accessToken) {
    // Redirect to the signup page if not authenticated
    return NextResponse.redirect(new URL('/signup', req.url));
  }

  try {
    // Verify the access token
    verifyAccessToken(accessToken);
    // Continue to the requested page
    return NextResponse.next();
  } catch (error) {
    // Redirect to the login page if token verification fails
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Specify the paths where the middleware should be applied
export const config = {
  matcher: ['/dashboard/:path*','/viewall'],
};
