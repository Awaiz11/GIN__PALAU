import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

export function FadeUp({ children, className = "", delay = 0, y = 32 }: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: reducedMotion ? 0 : 0.85, ease: EASE, delay }}
    >{children}</motion.div>
  );
}

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="section-label !text-sm md:!text-base !tracking-widest !font-medium">
      <span className="section-index">{index}</span>
      <span className="label-hairline" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}