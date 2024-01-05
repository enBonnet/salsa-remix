import type { MetaFunction } from "@remix-run/node";
import "../styles/index.css";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
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
          <li>
            <Link to="/auth/register">Register</Link>
          </li>
          <li>
            <Link to="/auth/login">Login</Link>
          </li>
          <li>
            <Link to="/auth/logout">Logout</Link>
          </li>
          <li>
            <Link to="/auth/recovery">Recovery password</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
