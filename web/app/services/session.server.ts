import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { isProduction, userSessionSecret } from "~/contants";

const getUserSession = (request: Request) => {
  return getSession(request.headers.get("Cookie"));
};

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

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

// function to get user data from session
export const getUserData = async (request: Request): Promise<any | null> => {
  const session = await getUserSession(request);
  const userData = session.get("userData");

  if (!userData) return null;
  return userData;
};

// function to remove user data from session, logging user out
export const logout = async (request: Request) => {
  const session = await getUserSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
