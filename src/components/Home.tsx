import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowDown, ArrowUpRight, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { EASE, FadeUp, SectionLabel } from "./Reveal";

const RITUAL = [
  { title: "La copa", text: "Cristal fino, copa bal\u00f3n y la temperatura justa. El primer gesto prepara todos los que vienen despu\u00e9s." },
  { title: "El hielo", text: "Una esfera compacta que enfr\u00eda sin diluir. Porque el agua tambi\u00e9n es parte de una buena receta." },
  { title: "Los bot\u00e1nicos", text: "Enebro, c\u00edtricos reci\u00e9n cortados y el aroma preciso. Cada ginebra tiene su propio ritual. Nada queda al azar." },
];

export default function Home({ onReserve }: { onReserve: () => void }) {
  const reducedMotion = useReducedMotion();
  const [ritualStep, setRitualStep] = useState<number | null>(0);
  const [eventExpanded, setEventExpanded] = useState(false);
  const reveal: Variants = {
    hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
  };

  return (
    <>
      <section id="inicio" className="hero home-hero bg-black">
        <motion.img
          className="hero-image"
          src="/images/gin-palau-hero.jpg"
          alt="Gin tonic con hielo esferico, limon y romero, iluminado en tonos dorados"
          fetchPriority="high"
          initial={{ scale: reducedMotion ? 1 : 1.07 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.6, ease: EASE }}
        />
        <div className="hero-shade" />
        <div className="film-grain" aria-hidden="true" />
        <motion.div
          className="section-shell hero-content"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.13, delayChildren: 0.15 } } }}
        >
          <motion.p variants={reveal} className="eyebrow hero-eyebrow !text-xs md:!text-sm !tracking-widest"><span />BARCELONA. UNA CASA, MIL HISTORIAS.</motion.p>
          <motion.h1 variants={reveal} className="hero-name">Le Rocher<span className="hero-period">.</span></motion.h1>
          <motion.p variants={reveal} className="hero-tagline">El arte del gin tonic.</motion.p>
          <motion.p variants={reveal} className="hero-copy body-copy !text-sm md:!text-base !text-white/80">Cocteler&iacute;a de autor, conversaciones sin prisa y noches que merecen recordarse. Desde 2014, en el coraz&oacute;n del Eixample.</motion.p>
          <motion.div variants={reveal} className="hero-buttons">
            <Link to="/menu" className="button-gold !text-xs md:!text-sm !tracking-widest !font-medium">Descubrir la carta <ArrowUpRight size={16} strokeWidth={1.5} /></Link>
            <Link to="/#historia" className="text-link !text-xs md:!text-sm !tracking-widest !font-medium">Nuestra historia <ArrowUpRight size={14} strokeWidth={1.3} /></Link>
          </motion.div>
        </motion.div>
        <a href="#historia" className="hero-scroll !text-xs md:!text-sm !tracking-widest">
          <motion.span animate={reducedMotion ? {} : { y: [0, 5, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}><ArrowDown size={18} strokeWidth={1.2} /></motion.span>
          HAY M&Aacute;S POR DESCUBRIR
        </a>
      </section>

      <section id="historia" className="section-shell section-spacing home-story bg-black">
        <FadeUp><SectionLabel index="01">La casa</SectionLabel></FadeUp>
        <div className="story-grid">
          <FadeUp className="story-visual">
            <div className="image-frame story-image">
              <motion.img src="/images/gin-palau-interior.jpg" alt="Una barra de madera, luz calida y una cuidada seleccion de ginebras" loading="lazy" initial={{ scale: reducedMotion ? 1 : 1.08 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, ease: EASE }} />
            </div>
            <p className="photo-caption">UN REFUGIO EN EL CORAZ&Oacute;N DE BARCELONA.</p>
          </FadeUp>
          <FadeUp className="story-copy" delay={0.12}>
            <p className="eyebrow !text-xs md:!text-sm !tracking-widest">ALGO M&Aacute;S QUE UNA COPA</p>
            <h2 className="display-heading">Una noche<br /><em>&uacute;nica.</em></h2>
            <p className="body-copy !text-sm md:!text-base !text-white/80">Un ambiente elegante y cercano, pensado para disfrutar sin prisas y hacer de cada visita un momento especial.</p>
            <p className="body-copy story-second-paragraph !text-sm md:!text-base !text-white/80">Nacimos de una idea sencilla: una buena copa merece el mismo cuidado que una buena conversaci&oacute;n. Por eso mezclamos creatividad, t&eacute;cnica y producto. Y dejamos que la noche siga su propio ritmo.</p>
            <Link className="text-link !text-xs md:!text-sm !tracking-widest !font-medium" to="/#ritual">Descubre nuestro ritual <ArrowUpRight size={15} /></Link>
          </FadeUp>
        </div>
      </section>

      <section id="ritual" className="section-shell section-spacing home-ritual bg-black">
        <FadeUp><SectionLabel index="02">El ritual</SectionLabel></FadeUp>
        <div className="ritual-grid">
          <FadeUp className="ritual-copy">
            <h2 className="display-heading">La diferencia<br />est&aacute; en<br /><em>los detalles.</em></h2>
            <p className="body-copy">Tres gestos. Un oficio. La coreograf&iacute;a silenciosa detr&aacute;s de tu pr&oacute;xima copa.</p>
            <div className="ritual-steps">
              {RITUAL.map((step, index) => (
                <div className={`ritual-step ${ritualStep === index ? "is-open" : ""}`} key={step.title}>
                  <button aria-expanded={ritualStep === index} aria-controls={`ritual-detail-${index}`} onClick={() => setRitualStep(ritualStep === index ? null : index)}>
                    <span className="ritual-number">0{index + 1}</span>
                    <span className="ritual-title">{step.title}</span>
                    {ritualStep === index ? <Minus size={15} strokeWidth={1} /> : <Plus size={15} strokeWidth={1} />}
                  </button>
                  <AnimatePresence initial={false}>
                    {ritualStep === index && (
                      <motion.div id={`ritual-detail-${index}`} className="ritual-detail" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}><p>{step.text}</p></motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp className="ritual-visual" delay={0.12}>
            <div className="image-frame ritual-image">
              <motion.img
                src="https://images.pexels.com/photos/15473888/pexels-photo-15473888.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
                alt="Un bartender sirve un destilado sobre hielo con precision"
                loading="lazy"
                onError={(event) => {
                  if (!event.currentTarget.src.endsWith("/gin-palau-interior.jpg")) event.currentTarget.src = "/images/gin-palau-interior.jpg";
                }}
                initial={{ scale: reducedMotion ? 1 : 1.08 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: EASE }}
              />
            </div>
            <p className="photo-caption">LA PERFECCI&Oacute;N NO SE ALCANZA. SE SIRVE.</p>
          </FadeUp>
        </div>
      </section>

      <section id="eventos" className="section-shell section-spacing home-events bg-black">
        <FadeUp><SectionLabel index="03">Pr&oacute;ximos eventos</SectionLabel></FadeUp>
        <FadeUp className="events-heading"><h2 className="display-heading">Noches que<br /><em>dejan huella.</em></h2><p className="body-copy">Talento invitado, encuentros inesperados y una misma pasi&oacute;n por la buena cocteler&iacute;a.</p></FadeUp>
        <FadeUp className="event-listing">
          <div className="event-date"><span>05</span><span>OCTUBRE 2026</span><span className="!text-[10px] md:!text-[11px] !tracking-widest">LUNES</span></div>
          <div className="event-copy"><p className="eyebrow !text-xs md:!text-sm !tracking-widest">LE ROCHER BARTENDER EVENT</p><h3>The Last Pour</h3><p className="!text-sm !text-white/80 !mt-2">Una noche para la industria. Bartenders, c&oacute;cteles y buenas conversaciones.</p></div>
          <button className="button-outline event-details-button !text-[10px] md:!text-[12px] lg:!text-sm !tracking-widest !font-medium !px-4 !py-2 !h-auto" onClick={() => setEventExpanded(!eventExpanded)} aria-expanded={eventExpanded} aria-controls="event-information">{eventExpanded ? "Cerrar detalles" : "Ver detalles"}{eventExpanded ? <Minus size={14} /> : <ArrowUpRight size={14} />}</button>
        </FadeUp>
        <AnimatePresence initial={false}>
          {eventExpanded && (
            <motion.div id="event-information" className="event-information" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }}>
              <div><p className="eyebrow !text-xs md:!text-sm !tracking-widest">UNA NOCHE PARA COMPARTIR BARRA</p><p className="body-copy !text-sm md:!text-base !text-white/80">Un encuentro de bartenders, profesionales y amigos en Le Rocher Cocktail Bar. Apertura a las 19:00, inicio a las 20:00. Carrer de l&apos;Avenir 44, Barcelona.</p><p className="event-source-note !text-xs md:!text-sm !text-white/60">La disponibilidad y las entradas se consultan en la web del organizador.</p><a className="text-link !text-xs md:!text-sm !tracking-widest !font-medium" href="https://thelastpour.lerocherbcn.com/" target="_blank" rel="noopener noreferrer">Visitar la web del evento <ArrowUpRight size={15} /></a></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section id="visita" className="home-visit bg-black">
        <img src="/images/gin-palau-interior.jpg" className="visit-background" alt="" loading="lazy" />
        <div className="visit-shade" />
        <FadeUp className="section-shell visit-content">
          <p className="eyebrow !text-xs md:!text-sm !tracking-widest">TU PR&Oacute;XIMA BUENA NOCHE</p>
          <h2 className="display-heading">Vive la<br /><em>experiencia.</em></h2>
          <p className="body-copy !text-sm md:!text-base !text-white/80">Ven con tiempo. Las buenas copas no entienden de prisas.</p>
          <div className="hero-buttons"><button onClick={onReserve} className="button-gold !text-[10px] md:!text-[12px] lg:!text-sm !tracking-widest !font-medium !px-4 !py-2 !h-auto">Reservar mesa <ArrowUpRight size={14} strokeWidth={1.5} /></button><a className="text-link !text-[10px] md:!text-[12px] lg:!text-sm !tracking-widest !font-medium" href="https://www.google.com/maps/search/?api=1&query=Carrer+de+Mallorca+352+Barcelona" target="_blank" rel="noopener noreferrer">C&oacute;mo llegar <ArrowUpRight size={14} strokeWidth={1.3} /></a></div>
        </FadeUp>
      </section>
    </>
  );
}