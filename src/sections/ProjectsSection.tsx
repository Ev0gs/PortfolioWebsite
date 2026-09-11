import {useRef, useState} from "react";
import {motion, useInView} from "motion/react";
import {ArrowRight, BookMarked, ExternalLink, Play, Zap} from "lucide-react";
import SectionLabel from "../components/SectionLabel.tsx";
import HoloScan from "@/components/HoloScan.tsx";
import {useTilt} from "@/hooks/useTilt.ts";
import { useTranslation } from "react-i18next"
import ProjectModal from "@/components/ProjectModal.tsx";

interface Project {
    // Card
    id: string
    title: string
    type: string
    tag: string
    tagColor: string
    desc: string
    image: string
    links: { github: string | null; live: string | null; video?: string | null }
    featured: boolean
    // Modal
    longDesc?: string
    stack?: string[]
    highlights?: string[]
    role?: string
    period?: string
}

function ProjectCard({ project, delay, index, onSelect }: {
    project: Project
    delay: number
    index: number
    onSelect: (project: Project) => void
}) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-60px" })
    const [hovered, setHovered] = useState(false)
    const { t } = useTranslation()
    const { ref: tiltRef, rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt(12)

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay }}
            onClick={() => onSelect(project)}
            className="h-full cursor-pointer"
        >
            <div style={{ perspective: "800px" }} className="h-full">
                <motion.div
                    ref={tiltRef}
                    className="h-full"
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => {
                        handleMouseLeave()
                        setHovered(false)
                    }}
                >
                    <HoloScan
                        color={project.tagColor}
                        duration={3 + index * 0.4}
                        className="flex flex-col h-full"
                        style={{
                            background: "#0D1130",
                            border: `1px solid ${hovered ? project.tagColor + "44" : "rgba(0,212,255,0.1)"}`,
                            borderRadius: "6px",
                            transition: "border-color 0.3s, box-shadow 0.3s",
                            boxShadow: hovered ? `0 0 30px ${project.tagColor}18` : "none",
                        }}
                    >
                        <div className="relative h-60 overflow-hidden">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500"
                                style={{
                                    filter: "none",
                                    transform: hovered ? "scale(1.05)" : "scale(1)",
                                }}
                                loading="lazy"
                            />
                            <div
                                className="absolute inset-0"
                                style={{ background: "linear-gradient(to bottom, transparent 40%, #0D1130 100%)" }}
                            />
                            {project.featured && (
                                <div
                                    className="absolute top-3 right-3 text-xs px-2 py-1 flex items-center gap-1"
                                    style={{
                                        background: "rgba(0,212,255,0.15)",
                                        border: "1px solid rgba(0,212,255,0.4)",
                                        color: "#00D4FF",
                                        borderRadius: "3px",
                                        fontFamily: "'JetBrains Mono', monospace",
                                    }}
                                >
                                    <Zap size={10} /> {t("projects.featured")}
                                </div>
                            )}
                            <span
                                className="absolute bottom-3 left-4 text-xs px-2 py-0.5 rounded"
                                style={{
                                    background: `${project.tagColor}20`,
                                    color: project.tagColor,
                                    border: `1px solid ${project.tagColor}40`,
                                    fontFamily: "'JetBrains Mono', monospace",
                                }}
                            >
                                {project.tag}
                            </span>
                        </div>

                        <div className="flex flex-col flex-1 p-5">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <p
                                        className="text-xs mb-1"
                                        style={{ color: "#6B7A9E", fontFamily: "'JetBrains Mono', monospace" }}
                                    >
                                        {project.type}
                                    </p>
                                    <h3
                                        className="text-xl font-bold"
                                        style={{ color: "#E2E8F8", fontFamily: "'Rajdhani', sans-serif" }}
                                    >
                                        {project.title}
                                    </h3>
                                </div>
                            </div>
                            <p
                                className="text-sm leading-relaxed mb-5 flex-1"
                                style={{ color: "#6B7A9E", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                            >
                                {project.desc}
                            </p>
                            <div className="flex gap-3 mt-auto">
                                {project.links.github && (
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={project.links.github}
                                    className="flex items-center gap-1.5 text-xs transition-colors duration-200 hover:text-[#00D4FF]"
                                    style={{ color: "#A8B4D4", fontFamily: "'DM Sans', sans-serif" }}
                                    >
                                    <BookMarked size={14} /> {t("projects.source")}
                                    </a>
                                    )}
                                {project.links.live && (
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={project.links.live}
                                    className="flex items-center gap-1.5 text-xs transition-colors duration-200 hover:text-[#00D4FF]"
                                    style={{ color: "#A8B4D4", fontFamily: "'DM Sans', sans-serif" }}
                                    >
                                    <ExternalLink size={14} /> {t("projects.liveDemo")}
                                    </a>
                                    )}
                                {project.links.video && (
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={project.links.video}
                                        className="flex items-center gap-1.5 text-xs transition-colors duration-200 hover:text-[#00D4FF]"
                                        style={{ color: "#A8B4D4", fontFamily: "'DM Sans', sans-serif" }}
                                    >
                                        <Play size={14} /> {t("projects.videoDemo")}
                                    </a>
                                )}
                            </div>
                        </div>
                    </HoloScan>
                </motion.div>
            </div>
        </motion.div>
    )
}

const ProjectsSection = () => {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: "-80px" })
    const { t } = useTranslation()
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

    const PROJECTS: Project[] = [
        {
            id: "wax",
            title: "WAX",
            type: t("projects.items.wax.type"),
            tag: "React Native / Expo / Supabase",
            tagColor: "#F5A623",
            desc: t("projects.items.wax.desc"),
            image: "/wax.png",
            links: { github: "https://github.com/Ev0gs/WaxApp", live: null },
            featured: false,
            period: "2025 — Present",
            role: t("projects.items.wax.role"),
            longDesc: t("projects.items.wax.longDesc"),
            stack: ["React Native", "Expo", "TypeScript", "Supabase", "PostgreSQL", "REST API"],
            highlights: [
                t("projects.items.wax.h1"),
                t("projects.items.wax.h2"),
                t("projects.items.wax.h3"),
            ],
        },
        {
            id: "portfolio",
            title: "Portfolio",
            type: t("projects.items.portfolio.type"),
            tag: "React / Vite / TailwindCSS",
            tagColor: "#00D4FF",
            desc: t("projects.items.portfolio.desc"),
            image: "/portfolio.png",
            links: { github: "https://github.com/Ev0gs/PortfolioWebsite", live: "https://pierrelatorse.com" },
            featured: false,
            period: "2025 — Present",
            role: t("projects.items.portfolio.role"),
            longDesc: t("projects.items.portfolio.longDesc"),
            stack: ["React", "Vite", "TypeScript", "TailwindCSS", "Motion", "anime.js", "i18next", "EmailJS", "shadcn/ui", "lucide-animated"],
            highlights: [
                t("projects.items.portfolio.h1"),
                t("projects.items.portfolio.h2"),
                t("projects.items.portfolio.h3"),
            ],
        },
        {
            id: "nexus-engine",
            title: "NexusEngine",
            type: t("projects.items.nexusengine.type"),
            tag: "C++ / OpenGL",
            tagColor: "#7B2FFF",
            desc: t("projects.items.nexusengine.desc"),
            image: "/nexusengine.png",
            links: { github: "https://github.com/Ev0gs/NexusEngine", live: null, video: "https://www.dropbox.com/scl/fi/7ojhavpwus1lo7xi9tbvw/NexusEngine_GameplayDemo-2026.mp4?rlkey=qsnowt3m6e9i55ekqvks70o8q&st=1r8qbreq&raw=1" },
            featured: false,
            period: "2024 — Present",
            role: t("projects.items.nexusengine.role"),
            longDesc: t("projects.items.nexusengine.longDesc"),
            stack: ["C++17", "OpenGL 3.3+", "GLFW", "GLM", "stb_image", "ECS", "Custom Physics"],
            highlights: [
                t("projects.items.nexusengine.h1"),
                t("projects.items.nexusengine.h2"),
                t("projects.items.nexusengine.h3"),
            ],
        },
        {
            id: "daimon",
            title: "Daimon",
            type: t("projects.items.daimon.type"),
            tag: "Unity / C#",
            tagColor: "#FF3B5C",
            desc: t("projects.items.daimon.desc"),
            image: "/daimon.png",
            links: { github: null, live: "https://saizucorp.itch.io/daimon", video: "https://www.dropbox.com/scl/fi/g48ktvmelo3f3j7lplczn/Daimon_Technical_Demo-2024.mp4?rlkey=thzkue7m6vbitge51pm9vbk54&st=iwiin13c&raw=1" },
            featured: false,
            period: "2025 — Present",
            role: t("projects.items.daimon.role"),
            longDesc: t("projects.items.daimon.longDesc"),
            stack: ["Unity", "C#", "Git"],
            highlights: [
                t("projects.items.daimon.h1"),
                t("projects.items.daimon.h2"),
                t("projects.items.daimon.h3"),
            ],
        },
        {
            id: "eokko",
            title: "Eokko",
            type: t("projects.items.eokko.type"),
            tag: "Next.js / TypeScript",
            tagColor: "#00D4FF",
            desc: t("projects.items.eokko.desc"),
            image: "/eokko.png",
            links: { github: null, live: "https://eokko.com" },
            featured: false,
            period: "2024 — 2025",
            role: t("projects.items.eokko.role"),
            longDesc: t("projects.items.eokko.longDesc"),
            stack: ["Next.js", "React", "TypeScript", "MongoDB", "Kubernetes", "Docker", "GitLab CI/CD", "Node.js", "WebSockets"],
            highlights: [
                t("projects.items.eokko.h1"),
                t("projects.items.eokko.h2"),
                t("projects.items.eokko.h3"),
            ],
        },
        {
            id: "timetoplay",
            title: "TimeToPlay",
            type: t("projects.items.timetoplay.type"),
            tag: "Unity / C#",
            tagColor: "#00FF9C",
            desc: t("projects.items.timetoplay.desc"),
            image: "/timetoplay.png",
            links: { github: null, live: "https://www.time-to-play.fr/", video: "https://www.dropbox.com/scl/fi/bt6fccicxbby1a2y5532k/TimeToPlay_Demo-2025.mp4?rlkey=rgvstpw1uqv9d2acqeq2fpp9b&st=l8jsbqvw&raw=1"},
            featured: false,
            period: "2024 — 2025",
            role: t("projects.items.timetoplay.role"),
            longDesc: t("projects.items.timetoplay.longDesc"),
            stack: ["Unity", "C#", "PlayFab", "Android", "iOS", "Agile / Scrum", "Codecks", "Git"],
            highlights: [
                t("projects.items.timetoplay.h1"),
                t("projects.items.timetoplay.h2"),
                t("projects.items.timetoplay.h3"),
            ],
        },
        {
            id: "virtual-lab",
            title: "Virtual Lab",
            type: t("projects.items.virtuallab.type"),
            tag: "Unity / VR",
            tagColor: "#FFB800",
            desc: t("projects.items.virtuallab.desc"),
            image: "/virtuallab.png",
            links: { github: null, live: null, video: "https://www.dropbox.com/scl/fi/72d6aytxvk4ugaqrw3m2w/Virtual-Lab-0.6.7-2024.mp4?rlkey=vmvu8ew5h1x1r7twxca2t3fqs&st=gtutq0ic&raw=1"},
            featured: false,
            period: "2024",
            role: t("projects.items.virtuallab.role"),
            longDesc: t("projects.items.virtuallab.longDesc"),
            stack: ["Unity", "C#", "Meta XR SDK", "Meta Quest 2 & 3", "VR Standalone", "Git"],
            highlights: [
                t("projects.items.virtuallab.h1"),
                t("projects.items.virtuallab.h2"),
                t("projects.items.virtuallab.h3"),
            ],
        },
        {
            id: "archiviz-vr",
            title: "ArchivizVR",
            type: t("projects.items.archivizvr.type"),
            tag: "Unreal Engine 5 / VR",
            tagColor: "#FF3B5C",
            desc: t("projects.items.archivizvr.desc"),
            image: "/archivizvr.png",
            links: { github: "https://gitlab.com/evogs/scissors-in-the-plug/archiviz-vr", live: null },
            featured: false,
            period: "2023",
            role: t("projects.items.archivizvr.role"),
            longDesc: t("projects.items.archivizvr.longDesc"),
            stack: ["Unreal Engine 5.1", "Blueprints", "C++", "Meta Quest 2", "VR Standalone", "Git"],
            highlights: [
                t("projects.items.archivizvr.h1"),
                t("projects.items.archivizvr.h2"),
                t("projects.items.archivizvr.h3"),
            ],
        },
        {
            id: "findux",
            title: "FindUX",
            type: t("projects.items.findux.type"),
            tag: "Vue.js / Django",
            tagColor: "#7B2FFF",
            desc: t("projects.items.findux.desc"),
            image: "/findux.png",
            links: { github: null, live: null },
            featured: false,
            period: "2022",
            role: t("projects.items.findux.role"),
            longDesc: t("projects.items.findux.longDesc"),
            stack: ["Vue.js", "Django", "Python", "GitLab CI/CD", "Ansible", "Linux", "REST API", "Git"],
            highlights: [
                t("projects.items.findux.h1"),
                t("projects.items.findux.h2"),
                t("projects.items.findux.h3"),
            ],
        },
    ]

    const selectedProject = selectedProjectId
        ? PROJECTS.find((p) => p.id === selectedProjectId) ?? null
        : null

    return (
        <section id="projects" className="relative py-28 px-6" style={{ zIndex: 1 }}>
            <div className="max-w-6xl mx-auto">
                {/* Titre */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <SectionLabel text={t("projects.label")} />
                    <h2
                        className="text-4xl md:text-5xl font-bold mb-14"
                        style={{ fontFamily: "'Rajdhani', sans-serif", color: "#E2E8F8" }}
                    >
                        {t("projects.title")}{" "}
                        <span style={{ color: "#7B2FFF" }}>{t("projects.titleHighlight")}</span>
                    </h2>
                </motion.div>

                {/* Grille de projets */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {PROJECTS.map((p, i) => (
                        <ProjectCard
                            key={p.id}
                            project={p}
                            delay={i * 0.08}
                            index={i}
                            onSelect={(project) => setSelectedProjectId(project.id)}
                        />
                    ))}
                </div>

                {/* Lien GitHub */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-16 flex justify-center"
                >
                <a
                    href="https://github.com/Ev0gs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm transition-all duration-200 hover:gap-3"
                    style={{ color: "#00D4FF", fontFamily: "'DM Sans', sans-serif" }}
                    >
                    {t("projects.viewAll")} <ArrowRight size={15} />
                </a>
            </motion.div>
        </div>

        {/* Modale */}
        <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProjectId(null)}
        />
</section>
)
}

export default ProjectsSection
