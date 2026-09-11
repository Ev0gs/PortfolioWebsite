import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "motion/react"
import { Menu, X } from "lucide-react"
import Logo from "@/components/Logo.tsx"
import LangSwitcher from "@/components/LangSwitcher.tsx"
import { useTranslation } from "react-i18next"

const Navbar = () => {
    const { t } = useTranslation()
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [hoveredLink, setHoveredLink] = useState<string | null>(null)

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 40)
        window.addEventListener("scroll", handler)
        return () => window.removeEventListener("scroll", handler)
    }, [])

    const links = [
        { label: t("nav.about"),    id: "about" },
        { label: t("nav.skills"),   id: "skills" },
        { label: t("nav.services"), id: "services" },
        { label: t("nav.projects"), id: "projects" },
        { label: t("nav.contact"),  id: "contact" },
    ]

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
        setMobileOpen(false)
        window.dispatchEvent(new Event("navclick"))
    }

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            style={{
                background: scrolled ? "rgba(7,9,26,0.92)" : "transparent",
                backdropFilter: scrolled ? "blur(12px)" : "none",
                borderBottom: scrolled ? "1px solid rgba(0,212,255,0.1)" : "none",
            }}
        >
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <button
                    aria-label="Scroll to top"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="cursor-pointer"
                >
                    <Logo size={40} />
                </button>

                {/* Desktop */}
                <ul
                    className="hidden md:flex items-center gap-8"
                    onMouseLeave={() => setHoveredLink(null)}
                >
                    {links.map((l) => (
                        <li key={l.id} className="relative">
                            <button
                                onClick={() => scrollTo(l.id)}
                                onMouseEnter={() => setHoveredLink(l.id)}
                                className="text-sm tracking-wide transition-colors duration-200 pb-1 cursor-pointer"
                                style={{
                                    color: hoveredLink === l.id ? "#00D4FF" : "#A8B4D4",
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontWeight: 500,
                                }}
                            >
                                {l.label}
                            </button>

                            <AnimatePresence>
                                {hoveredLink === l.id && (
                                    <motion.span
                                        className="absolute left-0 bottom-0 h-px w-full"
                                        style={{ background: "#00D4FF" }}
                                        initial={{ scaleX: 0, opacity: 0 }}
                                        animate={{ scaleX: 1, opacity: 1 }}
                                        exit={{ scaleX: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </AnimatePresence>
                        </li>
                    ))}
                </ul>

                <div className="hidden md:flex items-center gap-3">
                    <LangSwitcher />
                </div>

                <button
                    aria-label="Open menu"
                    className="md:hidden"
                    style={{ color: "#00D4FF" }}
                    onClick={() => setMobileOpen((o) => !o)}
                >
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
                        style={{ background: "rgba(7,9,26,0.97)" }}
                    >
                        {links.map((l) => (
                            <button
                                key={l.id}
                                onClick={() => scrollTo(l.id)}
                                className="text-left text-base"
                                style={{ color: "#A8B4D4", fontFamily: "'DM Sans', sans-serif" }}
                            >
                                {l.label}
                            </button>
                        ))}
                        <LangSwitcher />
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar