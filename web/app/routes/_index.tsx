import type { MetaFunction } from "@remix-run/node";
import { Form, Link, useOutletContext } from "@remix-run/react";
import React from "react";
import { LogoutButton } from "~/components/LogoutButton";
import { ContextType } from "~/types/data";
import "../styles/index.css";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const context = useOutletContext<ContextType>();

  return (
    <div>
      <h1>Salsa Remix</h1>
      <div>
        <p>Included and configured libraries:</p>
        <ul>
          <li>
            <a href="https://vitejs.dev/">vitejs</a>
          </li>
          <li>
            <a href="https://zod.dev/"> zod</a>
          </li>
          <li>
            <a href="https://remix-forms.seasoned.cc/get-started">
              remix-forms
            </a>
          </li>
        </ul>
      </div>
      <div>
        <p>Routes:</p>
        <ul>
          {context.user ? (
            <li>
              <LogoutButton />
            </li>
          ) : (
            <React.Fragment>
              <li>
                <Link to="/auth/register">Register</Link>
              </li>
              <li>
                <Link to="/auth/login">Login</Link>
              </li>
            </React.Fragment>
          )}
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
