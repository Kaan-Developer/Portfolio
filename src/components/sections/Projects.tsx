import { site } from "../../data/site";
import { projects } from "../../data/projects";

import Button from "../ui/Button";

const Projects = () => {

    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="flex flex-col items-center justify-start gap-2">
                <span className="mt-4 text-4xl text-balance font-black leading-[0.95] tracking-[-0.05em] font-semibold tracking-tight md:text-6xl">{site.projectsSection.title}</span>
                <p className="mt-5 max-w-xl text-base leading-7 text-muted md:text-xl md:leading-8">{site.projectsSection.description}</p>
            </div>

            {projects.map((project) => (
                <div>
                    <img src="" alt="" />

                    <div className="flex flex-col justify-center gap-3 px-3 pb-3 pt-5 md:p-8">
                        <span className="text-2xl lg:text-4xl text-balance">{project.title}</span>
                        <p className="text-lg lg:text-xl">{project.description}</p>

                        <span className="rounded-full p-2">{project.tech}</span>

                        <Button arrow link="" target="" variant="primary"></Button>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}

export default Projects;