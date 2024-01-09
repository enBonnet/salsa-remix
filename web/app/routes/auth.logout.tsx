import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { logout } from "~/services/session.server";

// action to get the /sign-out request action from the sign out form
export const action: ActionFunction = async ({ request }) => {
  return logout(request);
};

// loader to redirect to "/"
export const loader: LoaderFunction = async () => {
  return redirect("/");
};
