import { NextResponse, NextRequest } from "next/server";
import { IUser } from "./interface/IUser";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const userCookies = (await cookies()).get("users")?.value;
  const user = userCookies ? (JSON.parse(userCookies) as IUser) : null;

  if (request.nextUrl.pathname.startsWith("/login")) {
    if (user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/form")) {
    if (!user) {
      console.log("Redirecting to login page");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
