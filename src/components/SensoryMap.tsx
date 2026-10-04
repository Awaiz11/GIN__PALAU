import { useId } from "react";
import { motion } from "framer-motion";
import { FLAVOR_LABELS, type Cocktail } from "../data/cocktails";
import { EASE } from "./Reveal";

function point(index: number, value: number, radius = 112) {
  const angle = ((index * 60 - 90) * Math.PI) / 180;
  return [200 + Math.cos(angle) * radius * value / 5, 180 + Math.sin(angle) * radius * value / 5];
}

function polygon(values: number[]) {
  return values.map((value, index) => point(index, value).map((coordinate) => coordinate.toFixed(2)).join(",")).join(" ");
}

export default function SensoryMap({ cocktail }: { cocktail: Cocktail }) {
  const id = useId();
  return (
    <div className="sensory-chart">
      <svg viewBox="0 0 400 360" role="img" aria-labelledby={`${id}-title ${id}-description`}>
        <title id={`${id}-title`}>Mapa sensorial de {cocktail.title}</title>
        <desc id={`${id}-description`}>Perfil ilustrativo, de uno a cinco: {FLAVOR_LABELS.map((label, index) => `${label} ${cocktail.profile[index]}`).join(", ")}.</desc>
        <g aria-hidden="true">
          {[1, 2, 3, 4, 5].map((level) => <polygon key={level} points={polygon(Array(6).fill(level))} fill="none" stroke={level === 5 ? "#534635" : "#29251f"} strokeWidth=".8" />)}
          {FLAVOR_LABELS.map((label, index) => {
            const [x, y] = point(index, 5);
            const [labelX, labelY] = point(index, 5, 149);
            return <g key={label}><line x1="200" y1="180" x2={x} y2={y} stroke="#30291f" strokeWidth=".7" /><text x={labelX} y={labelY + 3} textAnchor="middle" fill="#b9a88d" fontSize="8" letterSpacing="1.1" fontFamily="Manrope, sans-serif">{label.toUpperCase()}</text></g>;
          })}
          <motion.polygon points={polygon(cocktail.profile)} initial={{ opacity: 0 }} animate={{ points: polygon(cocktail.profile), opacity: 1 }} transition={{ duration: .7, ease: EASE }} fill="#c8a66c" fillOpacity=".17" stroke="#c8a66c" strokeWidth="1.4" />
          {cocktail.profile.map((value, index) => {
            const [cx, cy] = point(index, value);
            return <motion.circle key={index} initial={false} animate={{ cx, cy }} transition={{ duration: .7, ease: EASE }} r="2.5" fill="#c8a66c" />;
          })}
          <circle cx="200" cy="180" r="2" fill="#c8a66c" fillOpacity=".6" />
        </g>
      </svg>
      <p className="chart-caption"><span />{cocktail.title}<span className="chart-scale">PERFIL ILUSTRATIVO / 1&ndash;5</span></p>
    </div>
  );
}