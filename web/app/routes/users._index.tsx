import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getUsers } from "~/models/user.server";

export const loader = async () => {
  return json({ users: await getUsers() });
};

export default function UsersPage() {
  const { users } = useLoaderData();

  if (users.length <= 0) {
    return <div>No users yet</div>;
  }

  return (
    <div>
      <ul>
        {users?.map((user) => {
          return (
            <li key={user.id}>
              <Link to={`/users/${user.username}`}>
                {user.id}, {user.username}, {user.email}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
