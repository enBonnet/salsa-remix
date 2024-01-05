import { z } from "zod";
import { makeDomainFunction } from "domain-functions";
import { type ActionFunction } from "@remix-run/node";
import { formAction } from "~/form-action.server";
import { Form } from "~/form";
import { Link } from "@remix-run/react";

const schema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
});

const mutation = makeDomainFunction(schema)(async (values) =>
  console.log(values)
);

export const action: ActionFunction = async ({ request }) =>
  formAction({
    request,
    schema,
    mutation,
    successPath: "/auth/success",
  });

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
