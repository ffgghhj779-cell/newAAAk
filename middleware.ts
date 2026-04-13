import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

const handleI18nRouting = createIntlMiddleware(routing)

export async function middleware(request: NextRequest) {
  let response = handleI18nRouting(request)

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
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
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
