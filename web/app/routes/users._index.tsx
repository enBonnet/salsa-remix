import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getUsers } from "~/models/user.server";
import { DataType, UserType } from "~/types/data";

export const loader = async () => {
  return json({ users: await getUsers() });
};

type LoaderData = {
  users?: UserType[];
};

export default function UsersPage() {
  const { users } = useLoaderData<LoaderData>();

  if (users?.length && users?.length <= 0) {
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
