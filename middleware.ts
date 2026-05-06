import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

const handleI18nRouting = createIntlMiddleware(routing)

// Lightweight rate limit map for Edge (works per-isolate)
// For a production, distributed setup, consider swapping this with Upstash Redis
const rateLimitMap = new Map<string, { count: number; startTime: number }>();

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const ip = request.ip || request.headers.get('x-forwarded-for') || '127.0.0.1';

  // 1. Admin IP Restriction
  if (pathname.includes('/admin')) {
    const allowedIpsEnv = process.env.ADMIN_ALLOWED_IPS;
    if (allowedIpsEnv) {
      const allowedIps = allowedIpsEnv.split(',').map(i => i.trim());
      if (allowedIps.length > 0 && !allowedIps.includes(ip)) {
        return new NextResponse('403 Forbidden - Unauthorized IP', { status: 403 });
      }
    }
  }

  // 2. Rate Limiting for Auth Routes
  if (pathname.includes('/auth/login') || pathname.includes('/auth/signup') || pathname.includes('/auth/reset-password')) {
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute window
    const maxRequests = 5; // Max 5 requests per minute
    
    const record = rateLimitMap.get(ip) || { count: 0, startTime: now };
    
    if (now - record.startTime > windowMs) {
      record.count = 1;
      record.startTime = now;
    } else {
      record.count++;
    }
    
    // In Edge, Map size should be bounded to prevent memory leaks over the isolate's lifetime
    if (rateLimitMap.size > 10000) {
      rateLimitMap.clear();
    }
    
    rateLimitMap.set(ip, record);
    
    if (record.count > maxRequests) {
      return new NextResponse('429 Too Many Requests - Please try again later', { status: 429 });
    }
  }

  let response = handleI18nRouting(request)
  
  // Secure NEXT_LOCALE cookie set by next-intl
  const localeCookie = response.cookies.get('NEXT_LOCALE');
  if (localeCookie) {
    response.cookies.set({
      name: 'NEXT_LOCALE',
      value: localeCookie.value,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = handleI18nRouting(request)
          
          // Secure NEXT_LOCALE cookie again if response is re-created
          const localeCookie = response.cookies.get('NEXT_LOCALE');
          if (localeCookie) {
            response.cookies.set({
              name: 'NEXT_LOCALE',
              value: localeCookie.value,
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
            });
          }

          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set({
              name,
              value,
              ...options,
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
            })
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname
  const isAdminRoute = pathname.includes('/admin')
  const isAdminLoginRoute = pathname.includes('/admin/login')

  // Admin route protection: require admin role
  if (isAdminRoute && !isAdminLoginRoute) {
    if (!user) {
      // Not logged in → redirect to admin login
      const url = request.nextUrl.clone()
      url.pathname = pathname.replace('/admin', '/admin/login')
      return NextResponse.redirect(url)
    }

    // Check if user has admin role
    const userRole = user.user_metadata?.role
    if (userRole !== 'admin') {
      // Logged in but not admin → redirect to home
      const locale = pathname.startsWith('/ar') ? 'ar' : 'en'
      const url = request.nextUrl.clone()
      url.pathname = `/${locale}`
      return NextResponse.redirect(url)
    }
  }

  // If admin user tries to access admin login page, redirect to admin dashboard
  if (user && isAdminLoginRoute) {
    const userRole = user.user_metadata?.role
    if (userRole === 'admin') {
      const url = request.nextUrl.clone()
      url.pathname = pathname.replace('/admin/login', '/admin')
      return NextResponse.redirect(url)
    }
  }

  return response
}

export const config = {
  matcher: ['/', '/(ar|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
}
