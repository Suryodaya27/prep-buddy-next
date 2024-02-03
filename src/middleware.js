import { NextResponse} from 'next/server';

const REDIRECT_PATH =  "https://prep-buddy-next.vercel.app/auth";
// const REDIRECT_PATH =  "http://localhost:3000/auth";
export function middleware(req) {
    const token = req.cookies.get("token")

  const { pathname } = req.nextUrl;
  const protectedRoutes = ['/', '/saved_questions'];

  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(REDIRECT_PATH);
  }

  return NextResponse.next();
}