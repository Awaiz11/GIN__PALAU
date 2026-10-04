import { Link } from "react-router-dom";

export function BrandSymbol({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 48" fill="none" aria-hidden="true">
      <path d="M20 2 37 24 20 46 3 24 20 2Z" stroke="currentColor" strokeWidth=".75" />
      <path d="M20 10v28M20 20c-8 0-9-6-9-6s8 0 9 6Zm0 8c8 0 9-6 9-6s-8 0-9 6Z" stroke="currentColor" strokeWidth="1" />
      <circle cx="16" cy="29" r="2" stroke="currentColor" />
      <circle cx="24" cy="16" r="2" stroke="currentColor" />
      <path d="m16 36 4 3 4-3" stroke="currentColor" strokeWidth=".75" />
    </svg>
  );
}

export default function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Gin Palau, inicio">
      <BrandSymbol className="brand-symbol" />
      <span>
        <span className="brand-name">GIN PALAU</span>
        <span className="brand-caption !text-[10px] md:!text-xs !tracking-widest">BARCELONA <span aria-hidden="true">&middot;</span> EST. 2014</span>
      </span>
    </Link>
  );
}