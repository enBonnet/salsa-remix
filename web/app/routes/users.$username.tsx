import { LoaderFunction, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { LogoutButton } from "~/components/LogoutButton";
import { getUserByUsername } from "~/models/user.server";
import { getUserData } from "~/services/session.server";
import { UserType } from "~/types/data";

export const loader: LoaderFunction = async ({ params, request }) => {
  const userData = await getUserData(request);
  const user = await getUserByUsername(params.username);

  return json({
    user,
    isCurrentUser: userData?.user?.id === user.id,
  });
};

type LoaderData = {
  user: UserType;
  isCurrentUser: boolean;
};

export default function UsernamePage() {
  const { user, isCurrentUser } = useLoaderData<LoaderData>();

  if (!user) {
    return <div>Invalid user</div>;
  }

  return (
    <div>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>

      {isCurrentUser ? (
        <div>
          <Link to={`/users/${user.username}/edit`}>Edit</Link>
          <LogoutButton />
        </div>
      ) : null}

      <div>
        <Outlet context={{ user }} />
      </div>
    </div>
  );
}
