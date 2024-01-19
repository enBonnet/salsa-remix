import { type ActionFunction, json } from "@remix-run/node";
import { Link, useActionData } from "@remix-run/react";
import { makeDomainFunction } from "domain-functions";
import { performMutation } from "remix-forms";
import { z } from "zod";
import { Form } from "~/form";
import { register } from "~/models/user.server";
import { createUserSession } from "~/services/session.server";
import { DataType } from "~/types/data";

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

type ActionData = {
  success: boolean;
  data: DataType;
};

export default function RegisterPage() {
  const actionData = useActionData<ActionData>();

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
        {actionData?.data?.error?.message ? (
          <div>{actionData?.data?.error?.message}</div>
        ) : null}
      </div>
      <div>
        <Link to="/auth/login">I have an account.</Link>
      </div>
    </div>
  );
}
