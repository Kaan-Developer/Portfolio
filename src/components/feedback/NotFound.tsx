import { Link } from "react-router-dom";
import { useSite } from "../../hooks/useSite";

const NotFound = () => {
  const { notFound } = useSite();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-bg px-6 text-center text-ink">
      <p className="text-[96px] font-extrabold leading-none tracking-tight text-primary md:text-[144px]">
        404
      </p>
      <h1 className="text-4xl font-bold">{notFound.title}</h1>
      <p className="text-muted">{notFound.description}</p>
      <Link
        to="/"
        className="rounded-full bg-ink px-6 py-3 text-white focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        {notFound.backToHome}
      </Link>
    </main>
  );
};

export default NotFound;
