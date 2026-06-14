export const polloSauceExtras = [
  { id: "salsa-bbq", name: "Salsa BBQ", price: 500 },
  { id: "salsa-bufalo", name: "Salsa bufalo", price: 500 },
  { id: "salsa-ranch", name: "Salsa ranch", price: 500 },
  { id: "salsa-mostaza-miel", name: "Salsa mostaza miel", price: 500 },
  { id: "salsa-tartara", name: "Salsa tartara", price: 500 },
  { id: "salsa-rosada", name: "Salsa rosada", price: 500 },
  { id: "salsa-queso", name: "Salsa queso", price: 500 },
  { id: "envase-adicional", name: "Envase adicional", price: 200 }
];

export const burgerExtras = [
  { id: "extra-tocineta", name: "Extra tocineta", price: 300 },
  { id: "extra-jamonada", name: "Extra jamonada", price: 300 }
];

export const menuCategories = [
  {
    id: "pollo",
    name: "Pollo",
    shortName: "Pollo",
    icon: "🍗",
    color: "red",
    image: "/assets/menu/pollo.png",
    items: [
      {
        id: "pechuga-ala",
        name: "Porcion de Pechuga y Ala",
        description: "Pechuga y ala de pollo frito.",
        basePrice: 2000,
        options: [
          { id: "sencilla", name: "Sencilla", addPrice: 0, isDefault: true }
        ],
        extras: polloSauceExtras
      },
      {
        id: "cuarto-muslo",
        name: "Porcion de Cuarto y Muslo",
        description: "Cuarto y muslo de pollo frito.",
        basePrice: 1900,
        options: [
          { id: "sencilla", name: "Sencilla", addPrice: 0, isDefault: true }
        ],
        extras: polloSauceExtras
      },
      {
        id: "piezas-pollo",
        name: "Piezas de pollo",
        description: "Ordenes familiares y alitas empanizadas.",
        basePrice: 3600,
        options: [
          { id: "4-piezas", name: "4 piezas de pollo", addPrice: 0, isDefault: true },
          { id: "8-alas", name: "8 alas empanizadas", addPrice: 200 },
          { id: "20-alas", name: "20 alas empanizadas", addPrice: 2400 },
          { id: "8-alas-salsa", name: "8 alas con salsa por aparte", addPrice: 400 },
          { id: "20-alas-salsa", name: "20 alas con salsa por aparte", addPrice: 2800 }
        ],
        extras: polloSauceExtras
      },
      {
        id: "palomitas-pollo",
        name: "Palomitas de pollo",
        description: "Palomitas sencillas o con salsa.",
        basePrice: 1000,
        options: [
          { id: "sencillas", name: "Sencillas", addPrice: 0, isDefault: true },
          { id: "salsa-aparte", name: "Con salsa por aparte", addPrice: 800 },
          { id: "tartara-jalapeno", name: "Con salsa tartara y jalapeno", addPrice: 850 }
        ],
        extras: polloSauceExtras
      },
      {
        id: "wrapp-pollo",
        name: "Wrapp de pollo",
        description: "Wrapp de pollo con papas.",
        basePrice: 2600,
        options: [
          { id: "con-papas", name: "Con papas", addPrice: 0, isDefault: true }
        ],
        extras: polloSauceExtras
      }
    ]
  },
  {
    id: "hamburguesas",
    name: "Hamburguesas",
    shortName: "Burgers",
    icon: "🍔",
    color: "orange",
    image: "/assets/menu/hamburguesas.png",
    items: [
      {
        id: "hamburguesa-pollo",
        name: "Hamburguesa de pollo",
        description: "Hamburguesa de pollo con opciones pequenas, sencillas y papudas.",
        basePrice: 950,
        options: [
          { id: "pequena", name: "1 hamburguesa pequena", addPrice: 0, isDefault: true },
          { id: "sencilla", name: "Sencilla", addPrice: 650 },
          { id: "en-salsa", name: "En salsa", addPrice: 950 },
          { id: "papa-pequena", name: "Sencilla + papa pequena", addPrice: 1050 },
          { id: "papas-fritas", name: "Sencilla + papas fritas", addPrice: 1050 },
          { id: "papuda", name: "Papuda", addPrice: 1250 },
          { id: "papuda-jamon-queso-tocineta", name: "Papuda con jamon, queso y tocineta", addPrice: 1750 },
          { id: "gemelitas", name: "Gemelitas de pollo (2 pequenas)", addPrice: 950 }
        ],
        extras: burgerExtras
      },
      {
        id: "hamburguesa-carne",
        name: "Hamburguesa de carne",
        description: "Hamburguesa de carne con opciones pequenas, papudas y desmechada.",
        basePrice: 950,
        options: [
          { id: "pequena", name: "1 hamburguesa pequena", addPrice: 0, isDefault: true },
          { id: "sencilla", name: "Sencilla", addPrice: 950 },
          { id: "doble-torta", name: "Doble torta sencilla", addPrice: 1650 },
          { id: "papuda", name: "Papuda", addPrice: 1350 },
          { id: "papuda-jamon-queso-tocineta", name: "Papuda con jamon, queso y tocineta", addPrice: 1850 },
          { id: "gemelitas", name: "Gemelitas de carne (2 pequenas)", addPrice: 1050 },
          { id: "desmechada", name: "Carne desmechada", addPrice: 1900 },
          { id: "desmechada-papas", name: "Carne desmechada + papas fritas", addPrice: 2400 }
        ],
        extras: burgerExtras
      }
    ]
  },
  {
    id: "arroces",
    name: "Arroces enteros",
    shortName: "Arroces",
    icon: "🍚",
    color: "brown",
    image: "/assets/menu/arroces.png",
    items: [
      {
        id: "arroz-cantones",
        name: "Arroz cantones",
        description: "Arroces enteros con diferentes acompanamientos.",
        basePrice: 2700,
        options: [
          { id: "regular", name: "Regular", addPrice: 0, isDefault: true },
          { id: "especial-arreglado", name: "Especial arreglado", addPrice: 600 },
          { id: "2-alitas", name: "Con 2 alitas", addPrice: 500 },
          { id: "4-alitas", name: "Con 4 alitas", addPrice: 1300 },
          { id: "cuarto-muslo", name: "Con porcion cuarto y muslo", addPrice: 1500 },
          { id: "filet-pescado", name: "Con filet de pescado empanizado", addPrice: 1200 },
          { id: "con-camarones", name: "Arroz con camarones", addPrice: 900 },
          { id: "camarones-con-arroz", name: "Camarones con arroz", addPrice: 1800 }
        ],
        extras: []
      }
    ]
  },
  {
    id: "papas",
    name: "Papas",
    shortName: "Papas",
    icon: "🍟",
    color: "yellow",
    image: "/assets/menu/papas.png",
    items: [
      {
        id: "papas-fritas",
        name: "Papas fritas",
        description: "Papas fritas en diferentes tamanos y preparaciones.",
        basePrice: 850,
        options: [
          { id: "pequena", name: "Papa pequena (140 gramos)", addPrice: 0, isDefault: true },
          { id: "grande", name: "Papa frita grande (230 gramos)", addPrice: 550 },
          { id: "pequena-queso", name: "Papa pequena banada con salsa queso", addPrice: 100 },
          { id: "grande-queso", name: "Papa frita grande banada con salsa queso", addPrice: 1150 }
        ],
        extras: polloSauceExtras.filter((extra) => extra.id !== "envase-adicional")
      },
      {
        id: "papas-arregladas",
        name: "Papas arregladas",
        description: "Papas cargadas y salchipapas.",
        basePrice: 2300,
        options: [
          { id: "salchipapa", name: "Salchipapa", addPrice: 0, isDefault: true },
          { id: "papas-arregladas", name: "Papas arregladas", addPrice: 500 },
          { id: "papas-emi", name: "Papas Emi", addPrice: 500 }
        ],
        extras: polloSauceExtras.filter((extra) => extra.id !== "envase-adicional")
      }
    ]
  },
  {
    id: "antojitos",
    name: "Antojitos",
    shortName: "Antojitos",
    icon: "🌮",
    color: "green",
    image: "/assets/menu/antojitos.png",
    items: [
      {
        id: "pescado-camarones",
        name: "Pescado y camarones",
        description: "Antojitos de pescado y camarones.",
        basePrice: 2000,
        options: [
          { id: "gallo-pescado", name: "Gallo de pescado empanizado", addPrice: 0, isDefault: true },
          { id: "filet-pescado", name: "Filet de pescado empanizado", addPrice: 2000 },
          { id: "nuggets-pescado", name: "Nuggets de pescado con papas y salsa", addPrice: 1500 },
          { id: "20-camarones", name: "20 camarones empanizados", addPrice: 2700 }
        ],
        extras: polloSauceExtras.filter((extra) => extra.id !== "envase-adicional")
      },
      {
        id: "tacos",
        name: "Tacos",
        description: "Tacos con tortilla de maiz, repollo y salsa.",
        basePrice: 1600,
        options: [
          { id: "taco-sencillo", name: "Taco sencillo", addPrice: 0, isDefault: true },
          { id: "taco-papudo", name: "Taco papudo con papas fritas", addPrice: 300 }
        ],
        extras: polloSauceExtras.filter((extra) => extra.id !== "envase-adicional")
      },
      {
        id: "torta-carne",
        name: "Torta de carne casera arreglada",
        description: "Torta de carne con repollo y salsas.",
        basePrice: 1350,
        options: [
          { id: "arreglada", name: "Arreglada", addPrice: 0, isDefault: true }
        ],
        extras: polloSauceExtras.filter((extra) => extra.id !== "envase-adicional")
      },
      {
        id: "yuca-frita",
        name: "Yuca frita",
        description: "Yuca frita pequena o grande.",
        basePrice: 500,
        options: [
          { id: "yuca-pequena", name: "Yuca frita pequena", addPrice: 0, isDefault: true },
          { id: "yuca-grande", name: "Yuca frita grande (8 unidades)", addPrice: 500 }
        ],
        extras: polloSauceExtras.filter((extra) => extra.id !== "envase-adicional")
      },
      {
        id: "palitos-queso",
        name: "Palitos de queso",
        description: "Palitos de queso acompanados con salsa queso.",
        basePrice: 1900,
        options: [
          { id: "sencillo", name: "Sencillo con salsa queso", addPrice: 0, isDefault: true },
          { id: "con-papas", name: "Con papas fritas", addPrice: 400 }
        ],
        extras: polloSauceExtras.filter((extra) => extra.id !== "envase-adicional")
      },
      {
        id: "ceviche-pescado",
        name: "Ceviche de pescado",
        description: "Ceviche con tostadas.",
        basePrice: 1000,
        options: [
          { id: "pequeno", name: "Pequeno 8 OZ + tostadas", addPrice: 0, isDefault: true },
          { id: "entero", name: "Entero + tostadas", addPrice: 3000 }
        ],
        extras: []
      }
    ]
  },
  {
    id: "combos",
    name: "Combos",
    shortName: "Combos",
    icon: "🍱",
    color: "lime",
    image: "/assets/menu/infantiles.png",
    items: [
      {
        id: "combo-pollo-frito",
        name: "Combo de pollo frito",
        description: "Combos de pollo frito con papas.",
        basePrice: 2650,
        options: [
          { id: "cuarto-muslo-papas", name: "Combo cuarto y muslo + papas", addPrice: 0, isDefault: true },
          { id: "pechuga-ala-papas", name: "Combo pechuga y ala + papas", addPrice: 100 }
        ],
        extras: polloSauceExtras
      },
      {
        id: "combo-infantil",
        name: "Combo infantil",
        description: "Combos pequenos con papas y refresco de 350ml.",
        basePrice: 2300,
        options: [
          { id: "alitas", name: "#1: 2 alitas empanizadas + papas + refresco", addPrice: 0, isDefault: true },
          { id: "hamburguesa", name: "#2: hamburguesa pequena + papas + refresco", addPrice: 100 }
        ],
        extras: burgerExtras
      }
    ]
  },
  {
    id: "bebidas",
    name: "Bebidas",
    shortName: "Bebidas",
    icon: "🥤",
    color: "blue",
    image: "/assets/menu/bebidas-extras.png",
    items: [
      {
        id: "pepsi",
        name: "Pepsi",
        description: "Refresco Pepsi.",
        basePrice: 1900,
        options: [
          { id: "25-litros", name: "2.5L", addPrice: 0, isDefault: true }
        ],
        extras: []
      },
      {
        id: "mundial-pina",
        name: "Mundial pina",
        description: "Refresco Mundial sabor pina.",
        basePrice: 850,
        options: [
          { id: "350ml", name: "350ml", addPrice: 0, isDefault: true },
          { id: "2-litros", name: "2L", addPrice: 950 }
        ],
        extras: []
      },
      {
        id: "mundial-kola",
        name: "Mundial kola",
        description: "Refresco Mundial sabor kola.",
        basePrice: 850,
        options: [
          { id: "350ml", name: "350ml", addPrice: 0, isDefault: true },
          { id: "2-litros", name: "2L", addPrice: 950 }
        ],
        extras: []
      },
      {
        id: "mundial-zarza",
        name: "Mundial zarza",
        description: "Refresco Mundial sabor zarza.",
        basePrice: 850,
        options: [
          { id: "350ml", name: "350ml", addPrice: 0, isDefault: true },
          { id: "2-litros", name: "2L", addPrice: 950 }
        ],
        extras: []
      }
    ]
  }
];

export const allMenuItems = menuCategories.flatMap((category) =>
  category.items.map((item) => ({
    ...item,
    categoryId: category.id,
    categoryName: category.name,
    categoryIcon: category.icon,
    categoryColor: category.color,
    categoryImage: category.image
  }))
);
