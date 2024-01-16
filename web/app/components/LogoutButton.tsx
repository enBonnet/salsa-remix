import { Form } from "@remix-run/react";

export const LogoutButton = () => {
  return (
    <Form action="/auth/logout" method="post" className="logout">
      <button className="link" type="submit">
        Logout
      </button>
    </Form>
  );
};
