import acceptLanguage from "accept-language";
import { NextMiddleware, NextResponse } from "next/server";
import { cookieName, defaultLocale, supportedLocales } from "./i18n/settings";

acceptLanguage.languages(supportedLocales);

export const config = {
  // matcher: '/:lng*'
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

export const middleware: NextMiddleware = (req) => {
  let lng;
  if (req.cookies.has(cookieName))
    lng = acceptLanguage.get(req.cookies.get(cookieName)!.value);
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = defaultLocale;

  // Redirect if lng in path is not supported
  if (
    !supportedLocales.some((loc) =>
      req.nextUrl.pathname.startsWith(`/${loc}`)
    ) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
    );
  }

  if (req.headers.has("referer")) {
    // @ts-ignore
    const refererUrl = new URL(req.headers.get("referer"));
    const lngInReferer = supportedLocales.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
};
