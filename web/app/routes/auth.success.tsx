import { Link } from "@remix-run/react";

export default function SuccessPage() {
  return (
    <div>
      <h1>Success!</h1>
      <Link to="/">Go back home</Link>
    </div>
  );
}
