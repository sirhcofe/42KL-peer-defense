import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { urlConfig, envConfig } from './uiConfig/intraConfig';
export async function middleware(request: NextRequest) {
  let accessToken = request.cookies.get('access_token')?.value;
  const code = request.nextUrl.searchParams.get("code");
  const intraAuthorizeURL = `${urlConfig.authorizeURL}?client_id=${envConfig.client_id}&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code`
  const response = NextResponse.redirect(new URL('/', request.url));
  if (code)
  {
    response.cookies.set("access_token", code);
    return response
  }
  else if (!accessToken)
    return NextResponse.redirect(intraAuthorizeURL);
};