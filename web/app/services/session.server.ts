import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { isProduction, userSessionSecret } from "~/contants";

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__user_session",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
      secrets: [userSessionSecret],
      // normally you want this to be `secure: true`
      // but that doesn't work on localhost for Safari
      // https://web.dev/when-to-use-local-https/
      secure: isProduction,
    },
  });

export const createUserSession = async (userData: any, redirectTo: string) => {
  const session = await getSession();
  session.set("userData", userData);
  console.log({ session });
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};
