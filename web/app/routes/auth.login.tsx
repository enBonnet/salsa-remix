import { type ActionFunction, json } from "@remix-run/node";
import { Link, useActionData } from "@remix-run/react";
import { makeDomainFunction } from "domain-functions";
import { performMutation } from "remix-forms";
import { z } from "zod";
import { Form } from "~/form";
import { login } from "~/models/user.server";
import { createUserSession } from "~/services/session.server";
import { type DataType } from "~/types/data";

const schema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
});

export type LoginInputs = z.infer<typeof schema>;

const mutation = makeDomainFunction(schema)(async (values) => {
  return login({
    identifier: values.email,
    password: values.password,
  });
});

type ActionData = {
  success: boolean;
  data: DataType;
};

export const action: ActionFunction = async ({ request }) => {
  const result = await performMutation<typeof schema, DataType>({
    request,
    schema,
    mutation,
  });

  if (!result.success) return json(result, 400);

  if (result.success && result.data?.jwt) {
    return createUserSession(
      { jwt: result.data.jwt, user: result.data.user },
      "/",
    );
  }

  return json(result);
};

export default function LoginPage() {
  const actionData = useActionData<ActionData>();
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
      {actionData?.data?.error?.message ? (
        <div>{actionData?.data?.error?.message}</div>
      ) : null}
      <div>
        <Link to="/auth/register">I want to register my account.</Link>
      </div>
      <div>
        <Link to="/auth/forgot">I forgot my password.</Link>
      </div>
    </div>
  );
}
