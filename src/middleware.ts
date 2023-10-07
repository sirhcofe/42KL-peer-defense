import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { urlConfig, envConfig } from "./uiConfig/intraConfig";

export async function middleware(request: NextRequest) {
  let accessToken = request.cookies.get("access_token")?.value;
  const code = request.nextUrl.searchParams.get("code");
  const intraAuthorizeURL = `${urlConfig.authorizeURL}?client_id=${envConfig.client_id}&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code`;
  const response = NextResponse.redirect(new URL("/", envConfig.redirect_uri));
  if (code) {
    const intraTokenURL = `${urlConfig.tokenURL}?grant_type=authorization_code&client_id=${envConfig.client_id}&client_secret=${envConfig.client_secret}&code=${code}&redirect_uri=http%3A%2F%2Flocalhost%3A3000`;
    const fetchedData = await fetch(intraTokenURL, { method: "POST" })
      .then(async (res) => {
        const data = await res.json();
        return {
          name: "access_token",
          value: data.access_token,
          maxAge: data.expires_in,
        };
      })
      .catch((err) => {
        console.log("error in middleware");
        return {
          name: "",
          value: "",
          maxAge: "",
        };
      });
    response.cookies.set(fetchedData.name, fetchedData.value, {
      maxAge: fetchedData.maxAge,
    });
    return response;
  } else if (!accessToken) return NextResponse.redirect(intraAuthorizeURL);
}
