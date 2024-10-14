import { NextRequest, NextResponse } from "next/server";
export function middleware(req: NextRequest) {
  const token = req.cookies.get("token-sf");
  if (!token) {
    return NextResponse.redirect(new URL("/Sign", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/Informes/:path*",
    "/MiCuenta/:path*",
    "/Productos/:path*",
    "/Proveedores/:path*",
    "/Ventas/:path*",
  ],
};
