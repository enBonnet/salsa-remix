import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import "~/styles/index.css";
import { isProduction } from "./contants";
import { LoaderFunction, json } from "@remix-run/node";
import { getUserData } from "./services/session.server";
import { DataType } from "./types/data";

export const loader: LoaderFunction = async ({ request }) => {
  const userData = await getUserData(request);

  return json(userData);
};

export default function App() {
  const loaderData = useLoaderData<DataType>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet context={{ user: loaderData?.user }} />
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
