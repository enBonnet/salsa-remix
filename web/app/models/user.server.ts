import qs from "qs";
import { apiUrl } from "~/contants";

export async function getUsers() {
  const profiles = await fetch(`${apiUrl}/users`);
  const res = await profiles.json();

  return res;
}

export async function getUserByUsername(username: string | undefined) {
  const query = qs.stringify(
    {
      filters: {
        username: {
          $eq: username,
        },
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const profile = await fetch(`${apiUrl}/users?${query}`);
  const res = await profile.json();

  return res[0];
}

type LoginParams = {
  identifier: string;
  password: string;
};

export async function login(data: LoginParams) {
  const local = await fetch(`${apiUrl}/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await local.json();
  return res;
}
