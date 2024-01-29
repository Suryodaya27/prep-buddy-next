import { NextResponse} from 'next/server';
import cookie from 'cookie'; // you might need to install the 'cookie' package

const REDIRECT_PATH =  process.env.REDIRECT_PATH || 'http://localhost:3000/auth';
export function middleware(req) {
    const token = req.cookies.get("token")

  const { pathname } = req.nextUrl;
  const protectedRoutes = ['/', '/saved_questions'];

  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(REDIRECT_PATH);
  }

  return NextResponse.next();
}