// import { NextRequest, NextResponse } from 'next/server';
// import { verifyAccessToken } from '@/utils/jwt';

// export function authMiddleware(req: NextRequest) {
//   const authHeader = req.headers.get('authorization');
//   if (!authHeader) {
//     return new NextResponse("Unauthorized", { status: 401 });
//   }

//   const token = authHeader.split(' ')[1];
//   if (!token) {
//     return new NextResponse("Unauthorized", { status: 401 });
//   }

//   try {
//     const decoded = verifyAccessToken(token);
//     req.user = decoded;
//     return NextResponse.next();
//   } catch (error) {
//     return new NextResponse("Unauthorized", { status: 401 });
//   }
// }
