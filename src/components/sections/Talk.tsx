import { useSite } from "../../hooks/useSite";
import Button from "../ui/Button";

const Talk = () => {
  const { talk } = useSite();

  return (
    <section id="contact" aria-labelledby="talk-title" className="py-14 md:py-20">
      <h2
        id="talk-title"
        className="max-w-5xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-black md:text-6xl lg:text-7xl"
      >
        {talk.title}{" "}
        <span className="text-primary">{talk.titleHighlight}</span>
      </h2>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
        {talk.description}
      </p>

      <div className="flex items-center gap-2 pt-4">
        <Button link="/contact" arrow >{talk.emailButton}</Button>
        <Button link="" arrow >{talk.linkedinButton}</Button>
      </div>
    </section>
  );
};

export default Talk;
