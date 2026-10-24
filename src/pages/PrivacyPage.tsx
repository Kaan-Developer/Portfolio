import { useSite } from "../hooks/useSite";
import Footer from "../components/sections/Footer";

const PrivacyPage = () => {
  const site = useSite();
  const { privacy } = site;

  return (
    <main className="min-h-screen bg-bg px-6 py-8 text-ink md:px-10 md:py-12">
      <article lang={privacy.language} className="mx-auto max-w-2xl">
        <header className="mt-20 border-b border-border pb-8">
          <p className="text-sm font-medium text-muted">{site.name}</p>
          <h1 className="mt-3 text-balance font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            {privacy.title}
          </h1>
          <p className="mt-5 leading-7 text-muted">{privacy.introduction}</p>
          <p className="mt-4 text-sm text-muted">
            {privacy.updatedLabel}{" "}
            <time dateTime={privacy.updatedAt}>{privacy.updatedDate}</time>
          </p>
        </header>

        <div className="space-y-8 py-8 [&_h2]:text-xl [&_h2]:font-semibold [&_p]:mt-3 [&_p]:leading-7 [&_p]:text-muted [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-primary">
          {privacy.sections.map((section) => (
            <section key={section.id} aria-labelledby={section.id}>
              <h2 id={section.id}>{section.title}</h2>
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={paragraphIndex}>
                  {paragraph.map((part, partIndex) => {
                    if (typeof part === "string") return part;
                    if (part.type === "name") return site.name;
                    if (part.type === "email") {
                      return (
                        <a key={partIndex} href={`mailto:${site.contact.email}`}>
                          {site.contact.email}
                        </a>
                      );
                    }
                    return (
                      <a key={partIndex} href={part.href}>
                        {part.text}
                      </a>
                    );
                  })}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
      <Footer />
    </main>
  );
};

export default PrivacyPage;
