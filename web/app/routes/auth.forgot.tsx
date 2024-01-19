import { type ActionFunction, json } from "@remix-run/node";
import { Link, useActionData } from "@remix-run/react";
import { makeDomainFunction } from "domain-functions";
import { performMutation } from "remix-forms";
import { z } from "zod";
import { Form } from "~/form";
import { sendResetMail } from "~/models/user.server";

const schema = z.object({
  email: z.string().min(1).email(),
});

export type ForgotParams = z.infer<typeof schema>;

const mutation = makeDomainFunction(schema)(async (values) => {
  return sendResetMail({
    email: values.email,
  });
});

export const action: ActionFunction = async ({ request }) => {
  const result = await performMutation({
    request,
    schema,
    mutation,
  });

  if (!result.success) return json(result, 400);

  return json(result);
};

type ActionData = {
  success: boolean;
  data: {
    ok: boolean;
  };
};

export default function ForgotPage() {
  const actionData = useActionData<ActionData>();

  return (
    <div>
      <div>Recovery password</div>
      <Form
        schema={schema}
        inputTypes={{
          email: "email",
        }}
      />
      {actionData?.data?.ok ? <div>Message sended</div> : null}
      <div>
        <Link to="/auth/login">I remembered my password.</Link>
      </div>
    </div>
  );
}
