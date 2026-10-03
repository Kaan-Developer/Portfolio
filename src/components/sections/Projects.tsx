import { site } from "../../data/site";;

const Projects = () => {

    return (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="flex flex-col items-center justify-start gap-2">
                <span className="mt-4 text-4xl text-balance font-black leading-[0.95] tracking-[-0.05em] font-semibold tracking-tight md:text-6xl">{site.projectsSection.title}</span>
                <p className="mt-5 max-w-xl text-base leading-7 text-muted md:text-xl md:leading-8">{site.projectsSection.description}</p>
            </div>
        </div>
        </>
    )
}

export default Projects;