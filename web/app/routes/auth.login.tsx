import { z } from "zod";
import { makeDomainFunction } from "domain-functions";
import { type ActionFunction, json } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { performMutation } from "remix-forms";
import { Form } from "~/form";
import { login } from "~/models/user.server";
import { createUserSession } from "~/services/session.server";

const schema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
});

const mutation = makeDomainFunction(schema)(async (values) => {
  return login({
    identifier: values.email,
    password: values.password,
  });
});

export const action: ActionFunction = async ({ request }) => {
  const result = await performMutation({
    request,
    schema,
    mutation,
  });

  if (!result.success) return json(result, 400);

  return createUserSession(
    { jwt: result.data.jwt, user: result.data.user },
    "/"
  );
};

export default function LoginPage() {
  return (
    <div>
      <div>Login</div>
      <Form
        schema={schema}
        inputTypes={{
          email: "email",
          password: "password",
        }}
      />
      <div>
        <Link to="/auth/register">I want to register my account.</Link>
      </div>
      <div>
        <Link to="/auth/recovery">I forgot my password.</Link>
      </div>
    </div>
  );
}
