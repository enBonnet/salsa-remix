import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";
import "~/styles/index.css";
import { isProduction } from "./contants";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isProduction) {
    return (
      <html lang="en">
        <head>
          <title>Oh no!</title>
          <Meta />
          <Links />
        </head>
        <body>
          <div>Ups something went wrong.</div>
          <Scripts />
        </body>
      </html>
    );
  }

  return <div>{JSON.stringify(error)}</div>;
}
