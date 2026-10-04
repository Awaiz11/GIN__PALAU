export type AlcoholFilter = "all" | "with" | "without";
export type CocktailCategory = "wonders" | "classics" | "mocktails";
export type GlassStyle = "rocks" | "coupe" | "highball" | "balloon";
export type FlavorProfile = [number, number, number, number, number, number];

export type Cocktail = {
  id: string;
  roman: string;
  title: string;
  location: string;
  description: string;
  category: CocktailCategory;
  alcohol: boolean;
  ingredients: string[];
  method: string;
  glass: string;
  ice: string;
  garnish: string;
  allergens: string[];
  preparation: string[];
  speech: string;
  profile: FlavorProfile;
  glassStyle: GlassStyle;
  image?: string;
  houseCreation?: boolean;
};

export const CATEGORY_LABELS: Record<CocktailCategory, string> = {
  wonders: "7 Maravillas del Mundo + 1",
  classics: "Los Cl\u00e1sicos Le Rocher",
  mocktails: "Mocktails \u00b7 Sin alcohol",
};

export const FLAVOR_LABELS = ["Dulce", "C\u00edtrico", "Frutal", "Especiado", "Ahumado", "Intenso"];
const ASSETS = "https://carta.lerocherbcn.com/__l5e/assets-v1/";

// Wonder copy/artwork and the original drink names come from the public reference.
// Technical details, remaining descriptions, flavor scores, and the eighth
// creation are editable examples. They are explicitly labeled in the interface.
export const COCKTAILS: Cocktail[] = [
  {
    id: "chichen-itza", roman: "I", title: "Chich\u00e9n Itz\u00e1", location: "M\u00e9xico",
    description: "Humo ritual, sangre de hibiscus y pi\u00f1a al fuego.",
    category: "wonders", alcohol: true,
    ingredients: ["Mezcal artesanal", "Infusi\u00f3n de hibiscus", "Pi\u00f1a asada", "Lima fresca", "Sirope de agave"],
    method: "Shake & fine strain", glass: "Rocks de cristal", ice: "Bloque de hielo", garnish: "Pi\u00f1a y humo arom\u00e1tico",
    allergens: ["Confirmar ingredientes del sirope y posibles trazas en barra."],
    preparation: ["Enfriar la copa y preparar un bloque de hielo.", "Agitar el mezcal, hibiscus, pi\u00f1a, lima y agave con hielo.", "Colar sobre el bloque y terminar con pi\u00f1a y humo arom\u00e1tico."],
    speech: "Cierra los ojos. El humo te lleva a la selva; la pi\u00f1a, al sol. Esta es nuestra forma de brindar por un lugar que guarda siglos de historias.",
    profile: [3, 4, 4, 2, 5, 4], glassStyle: "rocks",
    image: `${ASSETS}7caf5952-ef34-45d8-ad0e-09b645386a6c/cocktail-chichen.png`,
  },
  {
    id: "coliseo-romano", roman: "II", title: "Coliseo Romano", location: "Italia",
    description: "Bot\u00e1nicos mediterr\u00e1neos y sangre de gladiador.",
    category: "wonders", alcohol: true,
    ingredients: ["Gin mediterr\u00e1neo", "Aperitivo amargo", "Naranja sanguina", "Vermut rojo", "Romero fresco"],
    method: "Stir", glass: "Old fashioned", ice: "Esfera de hielo", garnish: "Naranja y romero",
    allergens: ["El vermut puede contener sulfitos. Confirmar marcas y trazas."],
    preparation: ["Enfriar el vaso mezclador y la copa.", "Remover los destilados con hielo hasta alcanzar la diluci\u00f3n deseada.", "Servir sobre una esfera y expresar la piel de naranja."],
    speech: "Un brindis mediterr\u00e1neo, valiente y elegante. El amargor abre la puerta; los bot\u00e1nicos y la naranja hacen que quieras quedarte.",
    profile: [2, 3, 3, 4, 1, 5], glassStyle: "rocks",
    image: `${ASSETS}90f00051-7d5c-48d1-bcf0-5ee910f34e5c/cocktail-coliseo.png`,
  },
  {
    id: "machu-picchu", roman: "III", title: "Machu Picchu", location: "Per\u00fa",
    description: "Pisco andino, ma\u00edz morado y aj\u00ed en las alturas.",
    category: "wonders", alcohol: true,
    ingredients: ["Pisco", "Cordial de ma\u00edz morado", "Lima fresca", "Sirope de aj\u00ed", "Espuma de aquafaba"],
    method: "Dry shake & shake", glass: "Copa coupette", ice: "Sin hielo al servir", garnish: "Ma\u00edz morado",
    allergens: ["La aquafaba contiene legumbres. Confirmar el agente de espuma utilizado."],
    preparation: ["Agitar primero sin hielo para formar la espuma.", "A\u00f1adir hielo y agitar de nuevo para enfriar.", "Hacer un doble colado en copa fr\u00eda y decorar."],
    speech: "Ligero como el aire de los Andes, con un peque\u00f1o destello de aj\u00ed al final. Un viaje que empieza en la primera nariz y termina muy arriba.",
    profile: [3, 5, 3, 3, 1, 3], glassStyle: "coupe",
    image: `${ASSETS}975ab98a-2a08-4141-ad06-ca6ac9771aa4/cocktail-machu.png`,
  },
  {
    id: "cristo-redentor", roman: "IV", title: "Cristo Redentor", location: "Brasil",
    description: "El agua convertida en vino tropical.",
    category: "wonders", alcohol: true,
    ingredients: ["Cacha\u00e7a", "Maracuy\u00e1", "Agua de coco", "Lima fresca", "Sirope de ca\u00f1a"],
    method: "Shake", glass: "Highball", ice: "Hielo en cubos", garnish: "Lima y fruta tropical",
    allergens: ["Confirmar preparaciones de fruta y posibles trazas."],
    preparation: ["Llenar el highball con hielo fresco.", "Agitar la cacha\u00e7a con las frutas y el sirope.", "Colar, completar con agua de coco y decorar."],
    speech: "Brasil en un sorbo: fresco, abierto y lleno de vida. La cacha\u00e7a pone el ritmo; la fruta tropical hace el resto.",
    profile: [4, 4, 5, 1, 1, 3], glassStyle: "highball",
    image: `${ASSETS}8719488d-539a-4587-9471-e1921fbc1931/cocktail-cristo.png`,
  },
  {
    id: "taj-mahal", roman: "V", title: "Taj Mahal", location: "India",
    description: "Miel dorada, cardamomo y una historia de amor eterna.",
    category: "wonders", alcohol: true,
    ingredients: ["Gin bot\u00e1nico", "Miel especiada", "Cardamomo", "Lim\u00f3n fresco", "Agua de rosas"],
    method: "Shake & fine strain", glass: "Copa coupette", ice: "Sin hielo al servir", garnish: "P\u00e9talo de rosa",
    allergens: ["La miel no es apta para una dieta vegana. Consultar los bot\u00e1nicos y trazas."],
    preparation: ["Preparar una copa bien fr\u00eda.", "Agitar la ginebra, el lim\u00f3n y la miel con hielo.", "Colar finamente, perfumar con rosas y decorar."],
    speech: "Hay historias que se cuentan despacio. Esta sabe a miel, a cardamomo y a un amor que se qued\u00f3 para siempre.",
    profile: [5, 3, 2, 5, 1, 3], glassStyle: "coupe",
    image: `${ASSETS}dd60575e-2ed8-452c-a3eb-4b8dc105e71f/cocktail-taj.png`,
  },
  {
    id: "gran-muralla", roman: "VI", title: "Gran Muralla China", location: "China",
    description: "Whisky ahumado, vermut y la grandeza de los artesanos.",
    category: "wonders", alcohol: true,
    ingredients: ["Whisky ahumado", "Vermut rojo", "T\u00e9 negro", "Bitter arom\u00e1tico"],
    method: "Stir", glass: "Old fashioned", ice: "Bloque de hielo", garnish: "Piel de naranja",
    allergens: ["El vermut puede contener sulfitos. Confirmar la composici\u00f3n del bitter."],
    preparation: ["Enfriar la copa con un bloque de hielo.", "Remover whisky, vermut, t\u00e9 y bitter en un vaso mezclador.", "Colar y terminar con los aceites de la piel de naranja."],
    speech: "Firme, profundo, construido capa a capa. El humo no lo esconde: revela el trabajo de quienes saben que las grandes cosas necesitan tiempo.",
    profile: [2, 1, 2, 4, 5, 5], glassStyle: "rocks",
    image: `${ASSETS}d586c66a-7059-44f7-90ac-61094283e4f8/cocktail-muralla.png`,
  },
  {
    id: "petra", roman: "VII", title: "Petra", location: "Jordania",
    description: "Especias, d\u00e1tiles e incienso entre monta\u00f1as rojizas.",
    category: "wonders", alcohol: true,
    ingredients: ["Ron a\u00f1ejo", "Cordial de d\u00e1tiles", "Lim\u00f3n fresco", "Especias de la casa"],
    method: "Shake", glass: "Rocks", ice: "Bloque de hielo", garnish: "D\u00e1til y aroma especiado",
    allergens: ["Consultar la mezcla de especias y posibles trazas de frutos de c\u00e1scara."],
    preparation: ["Enfriar la copa y preparar la decoraci\u00f3n.", "Agitar el ron con d\u00e1tiles, lim\u00f3n y especias.", "Colar sobre hielo y perfumar con el aroma de la casa."],
    speech: "Un camino entre roca y desierto. Primero llegan los d\u00e1tiles; despu\u00e9s, las especias. Y al final, ese perfume que te invita a seguir explorando.",
    profile: [4, 2, 3, 5, 3, 4], glassStyle: "rocks",
    image: `${ASSETS}d0debe91-978c-4486-9e16-ddcfc6742e8d/cocktail-petra.png`,
  },
  {
    id: "octava-maravilla", roman: "VIII", title: "La Octava Maravilla", location: "Barcelona",
    description: "Nuestra interpretaci\u00f3n: enebro, c\u00edtricos y el alma de la casa.",
    category: "wonders", alcohol: true, houseCreation: true,
    ingredients: ["Gin London Dry", "T\u00f3nica premium", "Lim\u00f3n de mercado", "Romero fresco"],
    method: "Build", glass: "Copa bal\u00f3n", ice: "Esfera de hielo", garnish: "Lim\u00f3n y romero",
    allergens: ["Consultar los bot\u00e1nicos de la ginebra y la composici\u00f3n de la t\u00f3nica."],
    preparation: ["Enfriar la copa bal\u00f3n y a\u00f1adir la esfera de hielo.", "Servir la ginebra y verter la t\u00f3nica con suavidad.", "Expresar el lim\u00f3n y terminar con una rama de romero."],
    speech: "La octava maravilla no est\u00e1 lejos. Est\u00e1 en esta barra, en una conversaci\u00f3n sin reloj y en esa primera copa que abre una buena noche.",
    profile: [2, 5, 3, 3, 2, 3], glassStyle: "balloon",
  },
  {
    id: "antino", roman: "I", title: "Antino", location: "Cl\u00e1sico de autor",
    description: "Elegancia bot\u00e1nica, notas c\u00edtricas y un final delicado.",
    category: "classics", alcohol: true,
    ingredients: ["Gin", "Vermut seco", "Licor de flor de sa\u00faco", "Bitter de naranja"],
    method: "Stir", glass: "Copa coupette", ice: "Sin hielo al servir", garnish: "Piel de lim\u00f3n",
    allergens: ["El vermut puede contener sulfitos. Confirmar los licores empleados."],
    preparation: ["Enfriar una copa coupette.", "Remover los ingredientes con hielo en el vaso mezclador.", "Colar y expresar los aceites de la piel de lim\u00f3n."],
    speech: "Una copa sin estridencias. El tipo de cl\u00e1sico que no necesita decir demasiado para hacerse recordar.",
    profile: [2, 4, 2, 3, 1, 4], glassStyle: "coupe",
  },
  {
    id: "mindflow", roman: "II", title: "Mindflow", location: "Cl\u00e1sico de autor",
    description: "Frescura tropical y un equilibrio que invita a dejarse llevar.",
    category: "classics", alcohol: true,
    ingredients: ["Vodka", "Cordial de fruta tropical", "Lima", "Soda"],
    method: "Shake & top", glass: "Highball", ice: "Hielo en cubos", garnish: "Lima fresca",
    allergens: ["Consultar la composici\u00f3n del cordial y posibles trazas."],
    preparation: ["Preparar un vaso alto con hielo fresco.", "Agitar vodka, cordial y lima.", "Colar sobre hielo, completar con soda y decorar."],
    speech: "A veces lo mejor es dejar que todo fluya. Fruta, frescura y una copa que acompa\u00f1a la conversaci\u00f3n sin interrumpirla.",
    profile: [3, 4, 5, 1, 1, 2], glassStyle: "highball",
  },
  {
    id: "xibalba", roman: "III", title: "Xibalb\u00e1", location: "Cl\u00e1sico de autor",
    description: "Oscuro, especiado y ahumado. Una invitaci\u00f3n a lo desconocido.",
    category: "classics", alcohol: true,
    ingredients: ["Mezcal", "Cordial de hibiscus", "Lima", "Sirope especiado"],
    method: "Shake", glass: "Rocks", ice: "Bloque de hielo", garnish: "C\u00edtrico deshidratado",
    allergens: ["Consultar los ingredientes del sirope especiado y posibles trazas."],
    preparation: ["Enfriar la copa y preparar el hielo.", "Agitar todos los ingredientes con hielo.", "Colar y decorar con un c\u00edtrico deshidratado."],
    speech: "Un paso al otro lado. El mezcal marca el camino, el hibiscus pone el color y las especias se quedan un poco m\u00e1s.",
    profile: [3, 3, 3, 5, 5, 4], glassStyle: "rocks",
  },
  {
    id: "london-mule", roman: "I", title: "London Mule", location: "Sin alcohol",
    description: "Jengibre, lima y bot\u00e1nicos. El esp\u00edritu de Londres, sin alcohol.",
    category: "mocktails", alcohol: false,
    ingredients: ["Destilado bot\u00e1nico 0,0", "Ginger beer sin alcohol", "Lima fresca"],
    method: "Build", glass: "Highball", ice: "Hielo en cubos", garnish: "Lima y jengibre",
    allergens: ["Confirmar la composici\u00f3n del destilado 0,0 y la ginger beer."],
    preparation: ["Llenar el vaso con hielo.", "A\u00f1adir el destilado 0,0 y la lima.", "Completar con ginger beer y remover suavemente."],
    speech: "Toda la chispa, ninguna prisa. Jengibre y lima para quienes saben que una gran noche no depende del alcohol.",
    profile: [2, 5, 2, 4, 1, 2], glassStyle: "highball",
  },
  {
    id: "explosion-lychee", roman: "II", title: "Explosi\u00f3n de Lychee", location: "Sin alcohol",
    description: "Lychee, flores y burbujas. Un peque\u00f1o estallido tropical.",
    category: "mocktails", alcohol: false,
    ingredients: ["Lychee", "Agua de rosas", "Lima", "Soda"],
    method: "Shake & top", glass: "Highball", ice: "Hielo en cubos", garnish: "Lychee y flor comestible",
    allergens: ["Consultar los preparados de fruta, flores y posibles trazas."],
    preparation: ["Agitar el lychee con lima y un toque de rosas.", "Colar en un vaso con hielo.", "Completar con soda y decorar."],
    speech: "La sorpresa tiene un lado delicado. Lychee, flores y burbujas: un viaje ligero que se disfruta hasta la \u00faltima gota.",
    profile: [5, 3, 5, 1, 1, 1], glassStyle: "highball",
  },
  {
    id: "flor-piedra", roman: "III", title: "Flor de Piedra", location: "Sin alcohol",
    description: "Hibiscus, frutos rojos y un delicado perfume floral.",
    category: "mocktails", alcohol: false,
    ingredients: ["Infusi\u00f3n de hibiscus", "Frutos rojos", "Lim\u00f3n", "Sirope floral"],
    method: "Shake & fine strain", glass: "Copa coupette", ice: "Sin hielo al servir", garnish: "Flor comestible",
    allergens: ["Confirmar ingredientes del sirope floral y posibles trazas."],
    preparation: ["Enfriar la copa.", "Agitar la infusi\u00f3n, frutos rojos, lim\u00f3n y sirope con hielo.", "Hacer un doble colado y decorar con una flor."],
    speech: "Incluso entre las piedras crece algo bonito. Una copa floral y fresca, hecha para detenerse un momento y disfrutar.",
    profile: [4, 4, 4, 2, 1, 2], glassStyle: "coupe",
  },
  {
    id: "clover-club", roman: "IV", title: "Clover Club", location: "Sin alcohol",
    description: "Frambuesa, lim\u00f3n y una espuma sedosa. Un cl\u00e1sico reinventado.",
    category: "mocktails", alcohol: false,
    ingredients: ["Destilado bot\u00e1nico 0,0", "Frambuesa", "Lim\u00f3n fresco", "Aquafaba"],
    method: "Dry shake & shake", glass: "Copa coupette", ice: "Sin hielo al servir", garnish: "Frambuesa",
    allergens: ["La aquafaba contiene legumbres. Si se sustituye por clara, contiene huevo. Confirmar en barra."],
    preparation: ["Agitar sin hielo para generar la espuma.", "A\u00f1adir hielo y agitar hasta enfriar.", "Colar finamente en una copa fr\u00eda y decorar con frambuesa."],
    speech: "Un cl\u00e1sico con una nueva mirada. La frambuesa conserva la alegr\u00eda y la espuma, ese final suave que hace sonre\u00edr.",
    profile: [4, 5, 4, 1, 1, 2], glassStyle: "coupe",
  },
];

export function filterByAlcohol(cocktails: Cocktail[], filter: AlcoholFilter) {
  return cocktails.filter((cocktail) => filter === "all" || (filter === "with" ? cocktail.alcohol : !cocktail.alcohol));
}