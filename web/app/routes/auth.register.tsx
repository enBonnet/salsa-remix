import { z } from "zod";
import { makeDomainFunction } from "domain-functions";
import { performMutation } from "remix-forms";
import { Link } from "@remix-run/react";
import { json, type ActionFunction } from "@remix-run/node";
import { Form } from "~/form";
import { register } from "~/models/user.server";
import { createUserSession } from "~/services/session.server";

const schema = z.object({
  username: z.string().min(1),
  email: z.string().min(1).email(),
  password: z.string().min(1),
});

export type RegisterParams = z.infer<typeof schema>;

const mutation = makeDomainFunction(schema)(async (values) => {
  return register(values);
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

export default function RegisterPage() {
  return (
    <div>
      <div>Register</div>
      <div>
        <Form
          schema={schema}
          inputTypes={{
            email: "email",
            password: "password",
          }}
        />
      </div>
      <div>
        <Link to="/auth/login">I have an account.</Link>
      </div>
    </div>
  );
}
