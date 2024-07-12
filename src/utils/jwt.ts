import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';
const REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY || 'your-refresh-secret-key';

interface TokenPayload {
  email: string;
}

export function generateAccessToken(payload: TokenPayload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '15m' });
}

export function generateRefreshToken(payload: TokenPayload) {
  return jwt.sign(payload, REFRESH_SECRET_KEY, { expiresIn: '7d' });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, SECRET_KEY) as TokenPayload;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET_KEY) as TokenPayload;
}
