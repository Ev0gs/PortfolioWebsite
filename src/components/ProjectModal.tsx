import { motion, AnimatePresence } from "motion/react"
import {X, ExternalLink, BookMarked, Play} from "lucide-react"
import { useEffect } from "react"
import HoloScan from "./HoloScan"
import { useTranslation } from "react-i18next"

export interface Project {
    id: string
    title: string
    type: string
    tag: string
    tagColor: string
    desc: string
    image: string
    links: { github: string | null; live: string | null; video?: string | null }
    featured: boolean
    longDesc?: string
    stack?: string[]
    highlights?: string[]
    role?: string
    period?: string
}

interface ProjectModalProps {
    project: Project | null
    onClose: () => void
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
    const { t } = useTranslation()

    // Fermeture avec Escape
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [onClose])

    // Bloque le scroll du body quand la modale est ouverte
    useEffect(() => {
        if (project) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => { document.body.style.overflow = "" }
    }, [project])

    // Fermeture avec navbar
    useEffect(() => {
        const handleNavClick = () => onClose()
        window.addEventListener("navclick", handleNavClick)
        return () => window.removeEventListener("navclick", handleNavClick)
    }, [onClose])

    return (
        <AnimatePresence>
            {project && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 z-50"
                        style={{ background: "rgba(7,9,26,0.85)", backdropFilter: "blur(8px)" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modale */}
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pt-20 md:pt-28 pointer-events-none"
                    >
                        <motion.div
                            className="relative w-full max-w-3xl overflow-y-auto pointer-events-auto"
                            style={{
                                maxHeight: "calc(90vh - 80px)",
                                scrollbarWidth: "thin",
                                scrollbarColor: `${project.tagColor}40 transparent`,
                            }}
                            initial={{ opacity: 0, scale: 0.92, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 30 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <HoloScan
                                color={project.tagColor}
                                duration={4}
                                className="flex flex-col"
                                style={{
                                    background: "#0A0C1E",
                                    border: `1px solid ${project.tagColor}44`,
                                    borderRadius: "8px",
                                    boxShadow: `0 0 60px ${project.tagColor}20`,
                                }}
                            >
                                {/* Image header */}
                                <div
                                    className="relative h-56 md:h-72 overflow-hidden flex-shrink-0"
                                    style={{ borderRadius: "8px 8px 0 0" }}
                                >
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                        style={{ filter: "saturate(0.7) brightness(0.75)" }}
                                    />
                                    <div
                                        className="absolute inset-0"
                                        style={{ background: "linear-gradient(to bottom, transparent 30%, #0A0C1E 100%)" }}
                                    />

                                    {/* Tag */}
                                    <span
                                        className="absolute bottom-4 left-6 text-xs px-3 py-1"
                                        style={{
                                            background: `${project.tagColor}20`,
                                            color: project.tagColor,
                                            border: `1px solid ${project.tagColor}40`,
                                            borderRadius: "4px",
                                            fontFamily: "'JetBrains Mono', monospace",
                                        }}
                                    >
                                        {project.tag}
                                    </span>

                                    {/* Bouton fermer */}
                                    <button
                                        onClick={onClose}
                                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center transition-colors duration-200 cursor-pointer"
                                        style={{
                                            background: "rgba(7,9,26,0.8)",
                                            border: "1px solid rgba(255,255,255,0.1)",
                                            borderRadius: "4px",
                                            color: "#A8B4D4",
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.color = "#E2E8F8" }}
                                        onMouseLeave={(e) => { e.currentTarget.style.color = "#A8B4D4" }}
                                    >
                                        <X size={16} />
                                    </button>

                                    {/* Coins décoratifs */}
                                    <div
                                        className="absolute top-3 left-3 w-5 h-5 pointer-events-none"
                                        style={{ borderTop: `2px solid ${project.tagColor}`, borderLeft: `2px solid ${project.tagColor}` }}
                                    />
                                    <div
                                        className="absolute bottom-3 right-3 w-5 h-5 pointer-events-none"
                                        style={{ borderBottom: `2px solid ${project.tagColor}`, borderRight: `2px solid ${project.tagColor}` }}
                                    />
                                </div>

                                {/* Contenu */}
                                <div className="p-6 md:p-8">

                                    {/* Header infos */}
                                    <div className="flex items-start justify-between mb-2">
                                        <p
                                            className="text-xs"
                                            style={{ color: "#6B7A9E", fontFamily: "'JetBrains Mono', monospace" }}
                                        >
                                            {project.type}
                                        </p>
                                        {project.period && (
                                            <p
                                                className="text-xs"
                                                style={{ color: "#6B7A9E", fontFamily: "'JetBrains Mono', monospace" }}
                                            >
                                                {project.period}
                                            </p>
                                        )}
                                    </div>

                                    {/* Titre */}
                                    <h2
                                        className="text-3xl md:text-4xl font-bold mb-2"
                                        style={{ color: "#E2E8F8", fontFamily: "'Rajdhani', sans-serif" }}
                                    >
                                        {project.title}
                                    </h2>

                                    {/* Rôle */}
                                    {project.role && (
                                        <p
                                            className="text-sm mb-4"
                                            style={{
                                                color: project.tagColor,
                                                fontFamily: "'JetBrains Mono', monospace",
                                                fontSize: "0.7rem",
                                            }}
                                        >
                                            → {project.role}
                                        </p>
                                    )}

                                    {/* Séparateur */}
                                    <div className="w-12 h-px mb-6" style={{ background: project.tagColor }} />

                                    {/* Description courte */}
                                    <p
                                        className="text-base leading-relaxed mb-4"
                                        style={{ color: "#A8B4D4", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                                    >
                                        {project.desc}
                                    </p>

                                    {/* Description longue */}
                                    {project.longDesc && (
                                        <p
                                            className="text-sm leading-relaxed mb-8"
                                            style={{ color: "#6B7A9E", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
                                        >
                                            {project.longDesc}
                                        </p>
                                    )}

                                    {/* Points clés */}
                                    {project.highlights && project.highlights.length > 0 && (
                                        <div className="mb-8">
                                            <p
                                                className="text-xs uppercase tracking-widest mb-4"
                                                style={{ color: project.tagColor, fontFamily: "'JetBrains Mono', monospace" }}
                                            >
                                                // Key features
                                            </p>
                                            <ul className="flex flex-col gap-3">
                                                {project.highlights.map((h, i) => (
                                                    <li
                                                        key={i}
                                                        className="flex items-start gap-2 text-sm leading-relaxed"
                                                        style={{ color: "#A8B4D4", fontFamily: "'DM Sans', sans-serif" }}
                                                    >
                                                        <span
                                                            style={{ color: project.tagColor, flexShrink: 0, marginTop: "2px" }}
                                                        >
                                                            →
                                                        </span>
                                                        {h}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Stack technique */}
                                    {project.stack && project.stack.length > 0 && (
                                        <div className="mb-8">
                                            <p
                                                className="text-xs uppercase tracking-widest mb-3"
                                                style={{ color: project.tagColor, fontFamily: "'JetBrains Mono', monospace" }}
                                            >
                                                // Tech stack
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.stack.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="text-xs px-2 py-1"
                                                        style={{
                                                            background: `${project.tagColor}10`,
                                                            color: project.tagColor,
                                                            border: `1px solid ${project.tagColor}30`,
                                                            borderRadius: "3px",
                                                            fontFamily: "'JetBrains Mono', monospace",
                                                        }}
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Liens */}
                                    <div className="flex gap-4 pt-2">
                                        {/* Github */}
                                        {project.links.github && (
                                            <a
                                            href={project.links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer"
                                            style={{
                                            border: `1px solid ${project.tagColor}40`,
                                            color: project.tagColor,
                                            borderRadius: "4px",
                                            fontFamily: "'Rajdhani', sans-serif",
                                            letterSpacing: "0.08em",
                                        }}
                                            onMouseEnter={(e) => { e.currentTarget.style.background = `${project.tagColor}15` }}
                                            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent" }}
                                            >
                                            <BookMarked size={15} /> {t("projects.source")}
                                            </a>
                                            )}
                                        {/* Website */}
                                        {project.links.live && (
                                            <a
                                            href={project.links.live}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer"
                                            style={{
                                            background: project.tagColor,
                                            color: "#07091A",
                                            borderRadius: "4px",
                                            fontFamily: "'Rajdhani', sans-serif",
                                            letterSpacing: "0.08em",
                                        }}
                                            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85" }}
                                            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1" }}
                                            >
                                            <ExternalLink size={15} /> {t("projects.liveDemo")}
                                            </a>
                                            )}
                                        {project.links.video && (
                                        <a
                                            href={project.links.video}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer"
                                            style={{
                                            border: `1px solid rgba(255,255,255,0.15)`,
                                            color: "#E2E8F8",
                                            borderRadius: "4px",
                                            fontFamily: "'Rajdhani', sans-serif",
                                            letterSpacing: "0.08em",
                                        }}
                                            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)" }}
                                            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent" }}
                                            >
                                            <Play size={15} /> {t("projects.videoDemo")}
                                            </a>
                                            )}
                                    </div>
                                </div>
                            </HoloScan>
                        </motion.div>
                    </motion.div>
                </>
            )}
</AnimatePresence>
)
}

export default ProjectModal