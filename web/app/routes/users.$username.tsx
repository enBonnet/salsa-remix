import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserByUsername } from "~/models/user.server";

export const loader: LoaderFunction = async ({ params }) => {
  const user = await getUserByUsername(params.username);

  return json({
    user,
  });
};

export default function UsernamePage() {
  const { user } = useLoaderData();

  if (!user) {
    return <div>Invalid user</div>;
  }

  return (
    <div>
      {user.username}, {user.email}
    </div>
  );
}
