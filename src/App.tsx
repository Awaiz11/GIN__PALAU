import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Menu from "./components/Menu";
import Reservation from "./components/Reservation";

function PageBehavior() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    document.title =
      pathname === "/menu"
        ? "The 7 Wonders + 1 | Le Rocher"
        : "Le Rocher Cocktail Bar | El arte del Gin Tonic";

    const frame = requestAnimationFrame(() => {
      const target = hash ? document.getElementById(hash.slice(1)) : null;
      if (target) {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);

  return null;
}

function Site() {
  const [reservationOpen, setReservationOpen] = useState(false);
  const openReservation = () => setReservationOpen(true);

  return (
    <div className="min-h-screen bg-black text-bone">
      <PageBehavior />
      <a className="skip-link" href="#main-content">Ir al contenido</a>
      <Navbar onReserve={openReservation} />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home onReserve={openReservation} />} />
          <Route path="/menu" element={<Menu />} />
          <Route
            path="*"
            element={
              <section className="not-found section-shell">
                <p className="eyebrow">404 / UN PEQUE&Ntilde;O DESV&Iacute;O</p>
                <h1 className="display-heading">Volvamos a la barra.</h1>
                <p className="body-copy">La p&aacute;gina que buscas no existe.</p>
                <Link to="/" className="button-gold">Volver al inicio</Link>
              </section>
            }
          />
        </Routes>
      </main>
      <Footer onReserve={openReservation} />
      <AnimatePresence>
        {reservationOpen && (
          <Reservation key="reservation" onClose={() => setReservationOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter><Site /></BrowserRouter>
    </MotionConfig>
  );
}
