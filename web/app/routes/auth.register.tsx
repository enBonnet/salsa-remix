import { z } from "zod";
import { makeDomainFunction } from "domain-functions";
import { type ActionFunction } from "@remix-run/node";
import { formAction } from "~/form-action.server";
import { Form } from "~/form";
import { Link } from "@remix-run/react";

const schema = z.object({
  username: z.string().min(1),
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
