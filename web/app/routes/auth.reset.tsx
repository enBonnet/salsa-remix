import { z } from "zod";
import { makeDomainFunction } from "domain-functions";
import {
  type ActionFunction,
  type LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";
import { Link, useActionData, useLoaderData } from "@remix-run/react";
import { performMutation } from "remix-forms";
import { Form } from "~/form";
import { resetPassword } from "~/models/user.server";
import { createUserSession } from "~/services/session.server";
import { DataType } from "~/types/data";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) return redirect("/");

  return json({
    code,
  });
};

type LoaderData = {
  code: string;
};

const schema = z.object({
  password: z.string().min(1),
  passwordConfirmation: z.string().min(1),
  code: z.string().min(1),
});

export type ResetParams = z.infer<typeof schema>;

const mutation = makeDomainFunction(schema)(async (values) => {
  if (values.password !== values.passwordConfirmation) {
    return { error: { message: "Confirm your password" } };
  }

  return resetPassword({
    password: values.password,
    passwordConfirmation: values.passwordConfirmation,
    code: values.code,
  });
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
      "/"
    );
  }

  return json(result);
};

type ActionData = {
  success: boolean;
  data: {
    ok?: boolean;
    error?: {
      message: string;
    };
  };
};

export default function ResetPage() {
  const loaderData = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();

  return (
    <div>
      <div>Reset password</div>
      <Form
        schema={schema}
        hiddenFields={["code"]}
        values={{ code: loaderData.code }}
        inputTypes={{
          password: "password",
          passwordConfirmation: "password",
        }}
      />
      {actionData?.data?.ok ? <div>Password updated</div> : null}
      {actionData?.data?.error?.message ? (
        <div>{actionData?.data?.error?.message}</div>
      ) : null}
      <div>
        <Link to="/auth/login">I remembered my password.</Link>
      </div>
    </div>
  );
}
