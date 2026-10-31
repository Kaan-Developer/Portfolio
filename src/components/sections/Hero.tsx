import { useSite } from "../../hooks/useSite";
import Button from "../ui/Button";
import Pattern from "../ui/Pattern";
import Reveal from "../ui/Reveal";
import Heroİmage from "../../assets/images/portfolioHero.png";

const Hero = () => {
  const site = useSite();

  return (
    <section
      id="home"
      className="grid w-full grid-cols-1 items-center lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] relative min-h-screen gap-10 lg:gap-12 overflow-hidden"
    >
      <Pattern />

      <Reveal className="relative z-10 flex flex-col items-start justify-center gap-4">
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-black lg:text-7xl">
            {site.name}
            <p className="mt-3 text-4xl font-medium text-primary lg:text-6xl">{site.role}</p>
          </h1>

          <p className="text-base text-muted md:text-lg">
            {site.littleDesc}
          </p>
        </div>

        <div className="flex flex-row md:flex-row gap-2">
          <Button arrow link="#projects" variant="blue">
            {site.buttons.projectBtn}
          </Button>

          <Button arrow link="#contact" variant="outline">
            {site.buttons.contactBtn}
          </Button>
        </div>
      </Reveal>

      <div className="relative z-10">
        <figure
  className="
    min-w-0 w-full overflow-hidden
    rounded-2xl border border-[#c7c9cc]
    bg-[#dee1e6] shadow-medium
  "
>
  {/* Dekoratif tarayıcı çubuğu */}
  <div
    aria-hidden="true"
    className="
      flex items-center gap-4
      border-b border-[#c7c9cc] px-4 py-3
    "
  >
    <div className="flex shrink-0 gap-1.5">
      <span className="size-2 rounded-full bg-[#ff5f57]" />
      <span className="size-2 rounded-full bg-[#febc2e]" />
      <span className="size-2 rounded-full bg-[#28c840]" />
    </div>

    <span
      className="
        min-w-0 flex-1 truncate rounded-md
        bg-white px-3 py-1 text-center text-xs text-muted
      "
    >
      Proje önizlemesi
    </span>
  </div>

  {/* Gerçek projenin ekran görüntüsü */}
  <img
    src={Heroİmage}
    alt="Öne çıkan projenin masaüstü arayüzü"
    className="aspect-[16/10] w-full bg-bg object-contain object-top"
  />
</figure>
      </div>
    </section>
  );
};

export default Hero;
