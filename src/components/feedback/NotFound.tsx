import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-bg px-6 text-center text-ink">
    <p className="text-sm font-semibold text-muted">404</p>
    <h1 className="text-4xl font-bold">Page not found</h1>
    <p className="text-muted">
      The page you’re looking for doesn’t exist.
    </p>
    <Link
      to="/"
      className="rounded-full bg-ink px-6 py-3 text-white focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      Back to home
    </Link>
  </main>
);

export default NotFound;