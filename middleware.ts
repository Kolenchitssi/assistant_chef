import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const path = url.pathname;
  const token = req.cookies.get('firebaseToken')?.value;

  if (!token) {
    // Нет токена — проверить путь
    if (path.startsWith('/users')) {
      return NextResponse.redirect(new URL('/auth', req.url));
    } else if (path.startsWith('/clients')) {
      return NextResponse.redirect(new URL('/', req.url));
    } else {
      // Для остальных путей или по умолчанию — редирект на /auth
      return NextResponse.redirect(new URL('/auth', req.url));
    }
  }

  // Проверка токена через API
  const verifyResponse = await fetch(
    `${req.nextUrl.origin}/api/verify-token`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (verifyResponse.ok) {
    return NextResponse.next();
  } else {
    // Токен невалиден — редирект в зависимости от пути
    if (path.startsWith('/users')) {
      return NextResponse.redirect(new URL('/auth', req.url));
    } else if (path.startsWith('/clients')) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    // Для остальных — по умолчанию
    return NextResponse.redirect(new URL('/auth', req.url));
  }
}

export const config = {
  // Защищаем маршруты, начинающиеся с /users или /clients
  matcher: ['/users/:path*', '/clients/:path*'],
};
