import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, MapPin, RotateCcw, X } from "lucide-react";
import { Link } from "react-router-dom";
import {
  CATEGORY_LABELS,
  COCKTAILS,
  filterByAlcohol,
  type AlcoholFilter,
  type Cocktail,
  type CocktailCategory,
} from "../data/cocktails";
import useDialog from "../hooks/useDialog";
import CocktailArt from "./CocktailArt";
import SensoryMap from "./SensoryMap";
import { EASE, FadeUp, SectionLabel } from "./Reveal";

const QUESTIONS = [
  { title: "\u00bfQuieres alcohol?", options: [{ value: "with", label: "Con alcohol" }, { value: "without", label: "Sin alcohol" }] },
  { title: "\u00bfQu\u00e9 perfil te apetece?", options: [{ value: "citrus", label: "C\u00edtrico" }, { value: "fruit", label: "Frutal" }, { value: "spice", label: "Especiado" }, { value: "smoke", label: "Ahumado" }] },
  { title: "\u00bfCon qu\u00e9 intensidad?", options: [{ value: "light", label: "Suave" }, { value: "balanced", label: "Equilibrada" }, { value: "bold", label: "Intensa" }] },
  { title: "\u00bfC\u00f3mo prefieres disfrutarlo?", options: [{ value: "ice", label: "Sobre hielo" }, { value: "coupe", label: "En una copa" }, { value: "surprise", label: "Sorpr\u00e9ndeme" }] },
];

const PROFILE_INDICES: Record<string, number> = { citrus: 1, fruit: 2, spice: 3, smoke: 4 };
const INTENSITIES: Record<string, number> = { light: 2, balanced: 3, bold: 5 };

function recommend(answers: string[]) {
  const profileIndex = PROFILE_INDICES[answers[1]] ?? 1;
  const intensity = INTENSITIES[answers[2]] ?? 3;
  const candidates = COCKTAILS.filter((cocktail) => cocktail.alcohol === (answers[0] === "with"));
  const score = (cocktail: Cocktail) => {
    const serveBonus = answers[3] === "coupe" ? (cocktail.glassStyle === "coupe" ? 2 : 0) : answers[3] === "ice" ? (cocktail.glassStyle !== "coupe" ? 2 : 0) : 0;
    return cocktail.profile[profileIndex] * 2 - Math.abs(cocktail.profile[5] - intensity) * 1.5 + serveBonus;
  };
  return [...candidates].sort((first, second) => score(second) - score(first))[0];
}

function DiscoveryQuiz({ onSelect }: { onSelect: (cocktail: Cocktail) => void }) {
  const [answers, setAnswers] = useState<string[]>([]);
  const questionRef = useRef<HTMLHeadingElement>(null);
  const interacted = useRef(false);
  const step = answers.length;
  const result = step === QUESTIONS.length ? recommend(answers) : null;
  const choose = (value: string) => {
    interacted.current = true;
    // Outgoing animated buttons must not advance the next question on a double click.
    setAnswers((previous) => previous.length === step && step < QUESTIONS.length ? [...previous, value] : previous);
  };

  return (
    <section id="descubridor" className="section-shell section-spacing menu-quiz bg-black">
      <FadeUp><SectionLabel index="01">El descubridor</SectionLabel></FadeUp>
      <div className="quiz-layout">
        <FadeUp><h2 className="display-heading">Descubre tu<br /><em>maravilla ideal.</em></h2><p className="body-copy !text-sm md:!text-base !text-white/80">Cuatro preguntas. Un viaje.<br />Una recomendaci&oacute;n a tu medida.</p></FadeUp>
        <FadeUp className="quiz-control" delay={0.1}>
          <div className="quiz-progress"><span className="!text-[10px] md:!text-xs !tracking-widest">{result ? "TU MARAVILLA IDEAL" : `PASO ${step + 1} / 4`}</span><div className="quiz-progress-track"><motion.span animate={{ width: `${((step + (result ? 0 : 1)) / 4) * 100}%` }} transition={{ duration: .4 }} /></div></div>
          <div className="quiz-live" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .2 }} onAnimationComplete={() => { if (interacted.current) questionRef.current?.focus({ preventScroll: true }); }}>
                {result ? (
                  <>
                    <p className="quiz-result-location !text-xs md:!text-sm !tracking-widest">{result.location}</p>
                    <h3 ref={questionRef} tabIndex={-1} className="quiz-question quiz-result-title !text-2xl md:!text-3xl">{result.title}</h3>
                    <p className="quiz-result-description !text-sm md:!text-base !text-white/80">{result.description}</p>
                    <button className="button-outline !text-[10px] md:!text-[12px] lg:!text-sm !tracking-widest !px-4 !py-2 !h-auto" onClick={() => onSelect(result)}>Descubrir mi maravilla <ArrowUpRight size={14} /></button>
                    <button className="quiz-back !text-[10px] md:!text-xs !tracking-widest" onClick={() => setAnswers([])}><RotateCcw size={12} /> Volver a empezar</button>
                  </>
                ) : (
                  <>
                    <h3 ref={questionRef} tabIndex={-1} className="quiz-question !text-2xl md:!text-3xl">{QUESTIONS[step].title}</h3>
                    <div className="quiz-options">{QUESTIONS[step].options.map((option) => <button className="!text-xs md:!text-sm !tracking-widest" key={option.value} onClick={() => choose(option.value)}>{option.label}<ArrowRight size={14} strokeWidth={1.2} /></button>)}</div>
                    {step > 0 && <button className="quiz-back !text-[10px] md:!text-xs !tracking-widest" onClick={() => setAnswers((previous) => previous.slice(0, -1))}><ArrowLeft size={12} /> Pregunta anterior</button>}
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function CocktailModal({ cocktail, onClose }: { cocktail: Cocktail; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [detail, setDetail] = useState<"allergens" | "preparation" | null>(null);
  useDialog(true, ref, onClose);
  const facts = [
    ["Method", cocktail.method],
    ["Glass", cocktail.glass],
    ["Ice", cocktail.ice],
    ["Garnish", cocktail.garnish],
  ];

  return createPortal(
    <motion.div
      className="dialog-backdrop cocktail-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .25 }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <motion.div
        ref={ref}
        className="cocktail-sheet bg-zinc-950 border border-white/10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cocktail-modal-title"
        aria-describedby="cocktail-modal-description"
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: .35, ease: EASE }}
      >
        <button className="dialog-close icon-button" aria-label="Cerrar ficha tecnica" onClick={onClose}><X size={22} strokeWidth={1.4} /></button>
        <div className="sheet-grid">
          <div className="sheet-information">
            <p className="eyebrow !text-xs md:!text-sm !tracking-widest">{cocktail.roman} / FICHA T&Eacute;CNICA</p>
            <h2 id="cocktail-modal-title" className="sheet-title">{cocktail.title}</h2>
            <p className="sheet-location !text-xs md:!text-sm !tracking-widest"><MapPin size={14} strokeWidth={1.4} />{cocktail.location}{cocktail.houseCreation && <span> / CREACI&Oacute;N DE LA CASA</span>}</p>
            <p id="cocktail-modal-description" className="sheet-description !text-sm md:!text-base !text-white/80">{cocktail.description}</p>
            <h3 className="sheet-subheading !text-sm md:!text-base !tracking-widest">Ingredientes</h3>
            <ul className="ingredients-list !text-sm md:!text-base !text-white/80">{cocktail.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}</ul>
            <dl className="sheet-facts">{facts.map(([label, value]) => <div key={label}><dt className="!text-[10px] md:!text-xs !tracking-widest !text-[#c8a66c]">{label}</dt><dd className="!text-xs md:!text-sm !text-white/80 !mt-2">{value}</dd></div>)}</dl>
            <div className="sheet-actions">
              <button className={`button-outline !text-[10px] md:!text-[12px] lg:!text-sm !tracking-widest !px-4 !py-2 !h-auto ${detail === "allergens" ? "is-active" : ""}`} aria-expanded={detail === "allergens"} aria-controls="cocktail-extra-details" onClick={() => setDetail(detail === "allergens" ? null : "allergens")}>Ver al&eacute;rgenos <ChevronDown size={14} /></button>
              <button className={`button-outline !text-[10px] md:!text-[12px] lg:!text-sm !tracking-widest !px-4 !py-2 !h-auto ${detail === "preparation" ? "is-active" : ""}`} aria-expanded={detail === "preparation"} aria-controls="cocktail-extra-details" onClick={() => setDetail(detail === "preparation" ? null : "preparation")}>Ver preparaci&oacute;n <ChevronDown size={14} /></button>
            </div>
            <div id="cocktail-extra-details">
              <AnimatePresence initial={false} mode="wait">
                {detail && (
                  <motion.div className="sheet-extra" key={detail} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .25 }}>
                    {detail === "allergens" ? <div><p className="sheet-subheading !text-sm md:!text-base !tracking-widest">Informaci&oacute;n orientativa</p><ul>{cocktail.allergens.map((allergen) => <li key={allergen} className="!text-sm md:!text-base !text-white/80">{allergen}</li>)}</ul><p className="!text-sm md:!text-base !text-white/70 !mt-4">Informa al equipo de cualquier alergia. Esta ficha de ejemplo no sustituye la informaci&oacute;n confirmada del establecimiento.</p></div> : <ol>{cocktail.preparation.map((instruction, index) => <li key={instruction} className="!text-sm md:!text-base !text-white/80"><span className="!text-lg md:!text-xl">0{index + 1}</span>{instruction}</li>)}</ol>}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="sheet-visual">
            <CocktailArt cocktail={cocktail} />
            <div className="bartender-speech"><p className="eyebrow !text-xs md:!text-sm !tracking-widest">Bartender speech</p><blockquote className="!text-sm md:!text-base !text-white/80">&ldquo;{cocktail.speech}&rdquo;</blockquote></div>
          </div>
        </div>
        <p className="sheet-note !text-xs md:!text-sm !text-white/70">Ficha editorial de ejemplo. Ingredientes, preparaci&oacute;n y al&eacute;rgenos pendientes de validaci&oacute;n por el establecimiento.</p>
      </motion.div>
    </motion.div>,
    document.body,
  );
}

export default function Menu() {
  const reducedMotion = useReducedMotion();
  const [alcoholFilter, setAlcoholFilter] = useState<AlcoholFilter>("all");
  const [mapCocktailId, setMapCocktailId] = useState(COCKTAILS[0].id);
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null);
  const visibleCocktails = filterByAlcohol(COCKTAILS, alcoholFilter);
  const mapCocktail = visibleCocktails.find((cocktail) => cocktail.id === mapCocktailId) ?? visibleCocktails[0];
  const categories: CocktailCategory[] = ["wonders", "classics", "mocktails"];

  const changeFilter = (filter: AlcoholFilter) => {
    setAlcoholFilter(filter);
    const next = filterByAlcohol(COCKTAILS, filter);
    if (!next.some((cocktail) => cocktail.id === mapCocktailId)) setMapCocktailId(next[0].id);
  };

  return (
    <>
      <section className="hero menu-hero bg-black">
        <motion.img className="hero-image" src="/images/gin-palau-menu.jpg" alt="Un coctel de mezcal en cristal tallado, con citricos y humo aromatico" fetchPriority="high" initial={{ scale: reducedMotion ? 1 : 1.06 }} animate={{ scale: 1 }} transition={{ duration: 2.6, ease: EASE }} />
        <div className="hero-shade" />
        <div className="film-grain" aria-hidden="true" />
        <motion.div className="section-shell hero-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <motion.p className="eyebrow hero-eyebrow !text-xs md:!text-sm !tracking-widest" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .1, ease: EASE }}><span />GIN PALAU / CARTA DE AUTOR</motion.p>
          <h1 className="menu-hero-title" aria-label="The 7 Wonders + 1"><span className="masked-line"><motion.span initial={{ y: reducedMotion ? 0 : "110%" }} animate={{ y: 0 }} transition={{ duration: 1.2, delay: .15, ease: EASE }}>The 7</motion.span></span><span className="masked-line"><motion.span initial={{ y: reducedMotion ? 0 : "110%" }} animate={{ y: 0 }} transition={{ duration: 1.2, delay: .3, ease: EASE }}><em>Wonders</em><span className="wonders-plus"> + 1</span></motion.span></span></h1>
          <motion.p className="hero-copy body-copy !text-sm md:!text-base !text-white/80" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: .5, ease: EASE }}>Un viaje sensorial servido en cada creaci&oacute;n. Siete destinos y una octava maravilla: la tuya.</motion.p>
          <motion.div className="hero-buttons" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: .65, ease: EASE }}><a className="button-gold !text-[10px] md:!text-[12px] lg:!text-sm !tracking-widest !font-medium !px-4 !py-2 !h-auto" href="#creaciones">Explorar las creaciones <ArrowDown size={14} strokeWidth={1.5} /></a><a className="text-link !text-[10px] md:!text-[12px] lg:!text-sm !tracking-widest !font-medium" href="#descubridor">Encuentra tu maravilla <ArrowUpRight size={14} strokeWidth={1.5} /></a></motion.div>
        </motion.div>
      </section>

      <DiscoveryQuiz onSelect={setSelectedCocktail} />

      <section id="mapa" className="section-shell section-spacing menu-sensory bg-black">
        <FadeUp><SectionLabel index="02">Los sentidos</SectionLabel></FadeUp>
        
        <FadeUp className="mt-8">
          <div className="text-center mb-12">
            <h2 className="display-heading mb-4">Mapa<br /><em>sensorial.</em></h2>
            <p className="body-copy !text-sm md:!text-base !text-white/80 max-w-xl mx-auto">Selecciona una maravilla y observa la silueta dorada de su perfil de sabor.</p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            {categories.map((category) => {
              const cocktails = visibleCocktails.filter((c) => c.category === category);
              if (!cocktails.length) return null;
              return (
                <div key={category} className="mb-8">
                  <h3 className="text-xs text-[#c5a880]/70 tracking-widest uppercase text-center mb-4 mt-8">
                    {CATEGORY_LABELS[category]}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {cocktails.map((cocktail) => {
                      const isActive = mapCocktailId === cocktail.id;
                      return (
                        <button
                          key={cocktail.id}
                          onClick={() => setMapCocktailId(cocktail.id)}
                          className={`px-5 py-2.5 rounded-full border bg-transparent text-xs tracking-widest text-white/70 uppercase cursor-pointer hover:border-white/30 transition-all ${
                            isActive
                              ? "!border-[#c5a880] !text-[#c5a880]"
                              : "border-white/10"
                          }`}
                        >
                          {cocktail.roman ? `${cocktail.roman} ${cocktail.title}` : cocktail.title}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-20 items-center max-w-6xl mx-auto">
            <div className="flex justify-center items-center w-full">
              <div className="sensory-visual w-full max-w-md mx-auto">
                <SensoryMap cocktail={mapCocktail} />
              </div>
            </div>
            
            <div className="text-left flex flex-col items-start lg:pl-8">
              <p className="text-xs text-[#c5a880]/80 tracking-widest uppercase mb-2">
                {CATEGORY_LABELS[mapCocktail.category]} &mdash; {mapCocktail.location}
              </p>
              <h3 className="text-4xl lg:text-5xl font-serif text-amber-50 mb-4">
                {mapCocktail.title}
              </h3>
              <p className="text-base lg:text-lg text-white/80 italic mb-8">
                {mapCocktail.description}
              </p>
              <button
                onClick={() => setSelectedCocktail(mapCocktail)}
                className="px-8 py-3.5 bg-[#c5a880] hover:bg-[#b3956d] text-black text-sm font-semibold tracking-widest rounded-full hover:scale-105 transition-all"
              >
                VER FICHA T&Eacute;CNICA
              </button>
            </div>
          </div>
        </FadeUp>
      </section>

      <section id="creaciones" className="section-shell section-spacing menu-creations bg-black">
        <FadeUp><SectionLabel index="03">La carta</SectionLabel></FadeUp>
        <FadeUp className="creations-heading"><div><h2 className="display-heading">Las <em>creaciones.</em></h2><p className="body-copy !text-sm md:!text-base !text-white/70">Cada destino tiene una historia. Cada copa, su manera de contarla.</p></div><p className="menu-list-status !text-lg md:!text-xl" role="status">{visibleCocktails.length} creaciones <span className="!text-[10px] md:!text-xs !tracking-widest !font-medium">{alcoholFilter === "without" ? "SIN ALCOHOL" : alcoholFilter === "with" ? "CON ALCOHOL" : "POR DESCUBRIR"}</span></p></FadeUp>
        <div className="menu-groups">
          {categories.map((category) => {
            const cocktails = visibleCocktails.filter((cocktail) => cocktail.category === category);
            if (!cocktails.length) return null;
            return (
              <div className="menu-category" key={category}>
                <h3 className="category-label !text-xs md:!text-sm !tracking-widest"><span />{CATEGORY_LABELS[category]}</h3>
                {cocktails.map((cocktail) => (
                  <FadeUp key={cocktail.id} y={18}>
                    <div 
                      className="w-full flex flex-row items-center justify-between py-6 border-b border-white/10 cursor-pointer hover:bg-white/5 transition-colors group"
                      onClick={() => setSelectedCocktail(cocktail)}
                    >
                      <div className="flex items-center gap-4 md:gap-7 flex-1">
                        <span className="cocktail-roman w-[30px] md:w-[40px] lg:w-[50px] shrink-0">{cocktail.roman}</span>
                        <div className="flex flex-col flex-1 cocktail-row-copy">
                          <div className="flex flex-row items-baseline gap-3">
                            <h4>{cocktail.title}</h4>
                            <span className="text-xs md:text-sm tracking-widest text-white/50 uppercase">{cocktail.location}</span>
                          </div>
                          <p className="!text-sm !text-white/70 !italic !mt-1 leading-[1.8]">{cocktail.description}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right ml-4">
                        <span className="whitespace-nowrap text-xs md:text-sm tracking-widest text-[#c8a66c] group-hover:text-[#dfbe86] transition-colors uppercase flex items-center gap-2">
                          Ficha t&eacute;cnica <ArrowRight size={14} strokeWidth={1.3} />
                        </span>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            );
          })}
        </div>
        <p className="menu-editorial-note !text-xs md:!text-sm !text-white/70">Selecci&oacute;n inspirada en la <a href="https://carta.lerocherbcn.com/" target="_blank" rel="noopener noreferrer">carta de Le Rocher <ArrowUpRight size={14} /></a>. La Octava Maravilla es una adaptaci&oacute;n para Gin Palau. Las recetas, al&eacute;rgenos y perfiles sensoriales son ejemplos editoriales y deben validarse con el equipo antes de publicarse como informaci&oacute;n de servicio.</p>
        <FadeUp className="menu-ending"><p>El siguiente destino<br /><em>es nuestra barra.</em></p><Link to="/#visita" className="text-link !text-[10px] md:!text-[12px] lg:!text-sm !tracking-widest !font-medium">Vive la experiencia <ArrowUpRight size={16} /></Link></FadeUp>
      </section>

      <AnimatePresence>
        {selectedCocktail && <CocktailModal key={selectedCocktail.id} cocktail={selectedCocktail} onClose={() => setSelectedCocktail(null)} />}
      </AnimatePresence>
    </>
  );
}