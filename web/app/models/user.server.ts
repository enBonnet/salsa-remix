import qs from "qs";
import { apiUrl } from "~/contants";
import { ForgotParams } from "~/routes/auth.forgot";
import { RegisterParams } from "~/routes/auth.register";
import { ResetParams } from "~/routes/auth.reset";

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

export async function register(data: RegisterParams) {
  const register = await fetch(`${apiUrl}/auth/local/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await register.json();
  return res;
}

export async function sendResetMail(data: ForgotParams) {
  const forgot = await fetch(`${apiUrl}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await forgot.json();
  return res;
}

export async function resetPassword(data: ResetParams) {
  const reset = await fetch(`${apiUrl}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const res = await reset.json();
  return res;
}
