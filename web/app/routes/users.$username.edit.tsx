import {
  ActionFunction,
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { makeDomainFunction } from "domain-functions";
import { performMutation } from "remix-forms";
import { z } from "zod";
import { Form } from "~/form";
import { getUserByUsername, updateUser } from "~/models/user.server";
import { getUserData, updateUserSession } from "~/services/session.server";
import { DataType, UserType } from "~/types/data";

const schema = z.object({
  email: z.string().min(1).email(),
  username: z.string().min(1),
});

const environmentSchema = z.object({
  token: z.string({ invalid_type_error: "Missing token" }),
  userId: z.number({ invalid_type_error: "Missing user id" }),
});

type UserEdit = z.infer<typeof schema>;

export type UserEditInput = UserEdit & {
  id: number;
};

const mutation = makeDomainFunction(
  schema,
  environmentSchema,
)(async (values, environment) => {
  return updateUser(
    { email: values.email, username: values.username, id: environment.userId },
    environment.token,
  );
});

type ActionData = {
  data: DataType;
};

export const action: ActionFunction = async ({ request }) => {
  const userData = await getUserData(request);
  const result = await performMutation<typeof schema, UserType>({
    request,
    schema,
    mutation,
    environment: { token: userData?.jwt, userId: userData?.user?.id },
  });

  if (!result.success) return json(result, 400);

  if (result.success) {
    return updateUserSession(
      { jwt: userData?.jwt, user: result.data },
      `/users/${result?.data?.username}`,
    );
  }

  return json(result);
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const userData = await getUserData(request);
  const user = await getUserByUsername(params.username);

  const isCurrentUser = userData?.user?.id === user.id;

  if (!isCurrentUser) {
    return redirect("/unauthorized");
  }

  return json({
    user,
    isCurrentUser,
  });
};

type LoaderData = {
  user: UserType;
};

export default function UsernamePage() {
  const { user } = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();

  if (!user) {
    return <div>Invalid user</div>;
  }

  return (
    <div>
      <Form
        schema={schema}
        inputTypes={{
          email: "email",
        }}
      />
      {actionData?.data?.error?.message ? (
        <div>{actionData?.data?.error?.message}</div>
      ) : null}
    </div>
  );
}
