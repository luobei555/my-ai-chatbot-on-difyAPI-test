import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 检查请求路径是否为根路由
  if (request.nextUrl.pathname === '/') {
    // 获取cookie
    const cookies = request.cookies;
    // 检查是否存在名为 'auth' 的cookie
    if (!cookies || !cookies.patientId) {
      // 如果没有 'auth' cookie，则重定向到 '/login'
      return NextResponse.redirect(new URL('/login', request.url));
    } 
  }
  //if (request.nextUrl.pathname.startsWith('/api'))
  //  return NextResponse.redirect(new URL('/login', request.url))
}