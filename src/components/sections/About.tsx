import RobotCanvas from "../Robot/RobotCanvas";
import { site } from "../../data/site";

import Button from "../ui/Button";

const About = () => {

    return (
        <section
        id="about"
        className="grid min-h-screen w-full grid-cols-1 md:grid-cols-2"
      >
        <div className="flex flex-col justify-center gap-3 px-6 py-16 md:px-12">
          <span className="text-4xl font-black leading-[0.95] tracking-[-0.05em] text-black sm:text-6xl md:text-7xl lg:text-8xl">
            {site.role1}
          </span>
          <span className="text-4xl font-black leading-[0.95] tracking-[-0.05em] text-black sm:text-6xl md:text-7xl lg:text-8xl">
            {site.role2}
          </span>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
    <div className="rounded-2xl border border-border bg-white p-8 shadow-soft md:col-span-2">
      <p className="leading-relaxed text-muted">{site.about[0].description}</p>
    </div>
    </div>

    <Button name="" option=""></Button>
        </div>

        <div className="min-h-[500px] w-full">
          <RobotCanvas sceneId={2} />
        </div>
        </section>
    )
}

export default About;