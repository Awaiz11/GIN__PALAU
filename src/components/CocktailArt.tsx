import { useEffect, useState } from "react";
import type { Cocktail, GlassStyle } from "../data/cocktails";

function GlassDrawing({ style }: { style: GlassStyle }) {
  return (
    <svg className="cocktail-drawing" viewBox="0 0 320 330" fill="none" role="img" aria-label="Ilustracion dorada de una copa de coctel">
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {style === "rocks" && <>
          <path d="M89 107h142l-15 143H104L89 107Z" /><path d="M92 120h136M97 157h125M105 240h110M115 121l8 119m26-119 3 119m25-119-3 119m29-119-10 119" opacity=".5" />
          <path d="m126 154 35-12 14 36-35 12-14-36Zm34 43 31-12 12 31-32 12-11-31Z" />
          <circle cx="205" cy="103" r="32" /><circle cx="205" cy="103" r="25" opacity=".6" /><path d="m205 79 0 48m-24-24h48m-40-17 34 34m0-34-34 34" opacity=".5" />
          <path d="M100 258h120" opacity=".5" />
        </>}
        {style === "coupe" && <>
          <path d="M77 116h166c-7 57-40 87-83 87s-76-30-83-87Z" /><path d="M85 140h150M160 203v72m-39 5h78m-29-3h-20" /><path d="M99 156c14 23 34 34 59 34" opacity=".5" />
          <path d="m213 116 9-30m0 0c-17-20-32-12-21 5 12 12 24 2 21-5Z" /><path d="M200 84c-1 13 10 9 17 7" opacity=".5" />
        </>}
        {style === "highball" && <>
          <path d="M111 73h98l-9 188h-80L111 73Z" /><path d="M114 87h92M116 122h88M124 249h72" opacity=".65" /><path d="m127 126 28-8 9 28-29 9-8-29Zm33 42 28-9 9 28-28 9-9-28Zm-29 36 28-8 9 28-29 8-8-28Z" />
          <path d="m185 83 22-50" /><circle cx="115" cy="91" r="28" /><circle cx="115" cy="91" r="21" opacity=".5" /><path d="M94 90h43m-22-21v43" opacity=".5" /><path d="M125 271h70" opacity=".5" />
        </>}
        {style === "balloon" && <>
          <path d="M108 91h104c29 62 14 120-52 120S79 153 108 91Z" /><path d="M160 211v69m-40 1h80M98 151h124" /><path d="M116 190c12 11 32 16 44 15" opacity=".5" /><circle cx="161" cy="165" r="30" /><path d="M139 154c9-16 29-16 43-7" opacity=".5" />
          <path d="M175 89c-20-10-19-22-2-28s24-20 8-26M195 121l10-77m-4 35-13-9m13 0 14-6m-17 32-12-10m11-5 16-6" />
        </>}
        <path d="M124 39c-4-9 7-12 3-22M146 49c-4-9 7-12 3-22" opacity=".25" />
      </g>
    </svg>
  );
}

export default function CocktailArt({ cocktail }: { cocktail: Cocktail }) {
  const [imageFailed, setImageFailed] = useState(false);
  useEffect(() => { setImageFailed(false); }, [cocktail.id]);

  return (
    <div className="cocktail-art">
      <svg className="art-orbits" viewBox="0 0 400 400" fill="none" aria-hidden="true"><circle cx="200" cy="200" r="147" /><circle cx="200" cy="200" r="115" /><ellipse cx="200" cy="200" rx="147" ry="50" /><ellipse cx="200" cy="200" rx="70" ry="147" /><path d="M40 200h320M200 40v320M78 78l244 244M322 78 78 322" /><path d="m200 25 4 10-4 10-4-10 4-10Zm0 330 4 10-4 10-4-10 4-10Z" /></svg>
      <span className="art-roman" aria-hidden="true">{cocktail.roman}</span>
      {cocktail.image && !imageFailed ? (
        <img className="cocktail-reference-image" src={cocktail.image} alt={`Ilustraci\u00f3n de ${cocktail.title}`} onError={() => setImageFailed(true)} />
      ) : <GlassDrawing style={cocktail.glassStyle} />}
      <span className="art-signature" aria-hidden="true">LE ROCHER / CARTA DE AUTOR</span>
    </div>
  );
}