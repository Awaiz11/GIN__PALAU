import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu as MenuIcon, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Brand from "./Brand";
import { EASE } from "./Reveal";
import useDialog from "../hooks/useDialog";

const LINKS = [
  { label: "La casa", to: "/#historia" },
  { label: "Carta de autor", to: "/menu" },
  { label: "El ritual", to: "/#ritual" },
  { label: "Eventos", to: "/#eventos" },
];

export default function Navbar({ onReserve }: { onReserve: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  useDialog(open, dialogRef, () => setOpen(false));

  useEffect(() => { setOpen(false); }, [location.key]);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30);
    const resize = () => { if (window.innerWidth >= 960) setOpen(false); };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <motion.header className={`site-header ${scrolled ? "is-scrolled" : ""}`} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
        <nav className="navigation" aria-label="Navegacion principal">
          <Brand />
          <div className="desktop-links">
            {LINKS.map((link) => link.to === "/menu" ? (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => `nav-link !text-xs md:!text-sm !tracking-widest ${isActive ? "active" : ""}`}>{link.label}</NavLink>
            ) : (
              <Link key={link.to} to={link.to} className={`nav-link !text-xs md:!text-sm !tracking-widest ${location.pathname === "/" && location.hash === link.to.slice(1) ? "active" : ""}`}>{link.label}</Link>
            ))}
          </div>
          <div className="nav-actions">
            <button className="nav-reserve !text-[10px] md:!text-[12px] lg:!text-sm !tracking-widest !px-4 !py-2" onClick={onReserve}>Reservar mesa <ArrowUpRight size={14} strokeWidth={1.5} /></button>
            <button className="mobile-toggle" onClick={() => setOpen(true)} aria-label="Abrir menu" aria-expanded={open} aria-controls="mobile-navigation"><MenuIcon size={23} strokeWidth={1.4} /></button>
          </div>
        </nav>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-navigation" ref={dialogRef} role="dialog" aria-modal="true" aria-label="Menu de navegacion" tabIndex={-1} className="mobile-navigation bg-black" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <div className="mobile-nav-top">
              <Brand />
              <button className="icon-button" aria-label="Cerrar menu" onClick={() => setOpen(false)}><X size={25} strokeWidth={1.3} /></button>
            </div>
            <nav className="mobile-nav-links" aria-label="Navegacion movil">
              <Link to="/" onClick={() => setOpen(false)}>Inicio</Link>
              {LINKS.map((link, index) => (
                <motion.div key={link.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * index, duration: 0.45 }}>
                  <Link to={link.to} onClick={() => setOpen(false)}>{link.label}</Link>
                </motion.div>
              ))}
              <button onClick={() => { setOpen(false); onReserve(); }}>Reservar mesa <ArrowUpRight size={26} /></button>
            </nav>
            <p className="eyebrow mobile-nav-caption">BUENAS COPAS. BUENAS NOCHES.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}