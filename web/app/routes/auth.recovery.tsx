import { z } from "zod";
import { makeDomainFunction } from "domain-functions";
import { type ActionFunction } from "@remix-run/node";
import { formAction } from "~/form-action.server";
import { Form } from "~/form";
import { Link } from "@remix-run/react";

const schema = z.object({
  email: z.string().min(1).email(),
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

export default function RecoveryPage() {
  return (
    <div>
      <div>Recovery password</div>
      <div>
        <Form
          schema={schema}
          inputTypes={{
            email: "email",
          }}
        />
      </div>
      <div>
        <Link to="/auth/login">I remembered my password.</Link>
      </div>
    </div>
  );
}
