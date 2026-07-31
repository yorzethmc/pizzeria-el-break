const pizzaFlavorOptions = [
  { id: "jamon-queso", name: "Jamón y Queso", nameEn: "Ham and Cheese", addPrice: 0, isDefault: true },
  { id: "pepperoni", name: "Pepperoni", nameEn: "Pepperoni", addPrice: 0 }
];

const naturalFlavors = [
  ["Fresa-Hierbabuena", "Strawberry-Mint"],
  ["Mora-Fresa-Arándano", "Blackberry-Strawberry-Blueberry"],
  ["Mango-Fresa-Maracuyá", "Mango-Strawberry-Passionfruit"],
  ["Guanábana", "Soursop"],
  ["Melón", "Cantaloupe"],
  ["Mora", "Blackberry"],
  ["Sandía", "Watermelon"],
  ["Piña", "Pineapple"],
  ["Fresa", "Strawberry"],
  ["Cas", "Cas (Costa Rican sour guava)"]
];

function naturalFlavorOptions() {
  return naturalFlavors.map(([flavor, flavorEn], index) => ({
    id: `sabor-${flavor.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name: flavor,
    nameEn: flavorEn,
    addPrice: 0,
    isDefault: index === 0
  }));
}

function pizzaSizeOptions(matrix) {
  return [
    { id: "personal", name: "Personal (4 porciones)", nameEn: "Personal (4 slices)", addPrice: 0, isDefault: true },
    { id: "pequena", name: "Pequeña (6 porciones)", nameEn: "Small (6 slices)", addPrice: matrix.pequena - matrix.personal },
    { id: "mediana", name: "Mediana (8 porciones)", nameEn: "Medium (8 slices)", addPrice: matrix.mediana - matrix.personal },
    { id: "grande", name: "Grande (12 porciones)", nameEn: "Large (12 slices)", addPrice: matrix.grande - matrix.personal }
  ];
}

// Precio de extra estimado (₡500 parejo) — pendiente de confirmar tarifa real con el local.
const pizzaExtras = [
  { id: "extra-queso", name: "Extra queso mozzarella", nameEn: "Extra mozzarella cheese", price: 500 },
  { id: "extra-jamon", name: "Extra jamón", nameEn: "Extra ham", price: 500 },
  { id: "extra-pepperoni", name: "Extra pepperoni", nameEn: "Extra pepperoni", price: 500 },
  { id: "extra-pina", name: "Extra piña", nameEn: "Extra pineapple", price: 500 },
  { id: "extra-portobello", name: "Extra hongos portobello", nameEn: "Extra portobello mushrooms", price: 500 },
  { id: "extra-pollo", name: "Extra pollo", nameEn: "Extra chicken", price: 500 },
  { id: "extra-chile", name: "Extra chile dulce", nameEn: "Extra bell pepper", price: 500 },
  { id: "extra-cebolla", name: "Extra cebolla", nameEn: "Extra onion", price: 500 },
  { id: "extra-aceitunas", name: "Extra aceitunas", nameEn: "Extra olives", price: 500 },
  { id: "extra-bolonesa", name: "Extra carne boloñesa", nameEn: "Extra ground beef bolognese", price: 500 }
];

function pizza(id, name, nameEn, description, descriptionEn, matrix, image) {
  return {
    id,
    name,
    nameEn,
    description,
    descriptionEn,
    basePrice: matrix.personal,
    options: pizzaSizeOptions(matrix),
    extras: pizzaExtras,
    image: image || null
  };
}

function calzoneSizeOptions(matrix) {
  return [
    { id: "personal", name: "Personal (4 porciones)", nameEn: "Personal (4 slices)", addPrice: 0, isDefault: true },
    { id: "pequeno", name: "Pequeño (6 porciones)", nameEn: "Small (6 slices)", addPrice: matrix.pequena - matrix.personal },
    { id: "mediano", name: "Mediano (8 porciones)", nameEn: "Medium (8 slices)", addPrice: matrix.mediana - matrix.personal }
  ];
}

function calzone(id, name, nameEn, description, descriptionEn, matrix, image) {
  return {
    id,
    name,
    nameEn,
    description,
    descriptionEn,
    basePrice: matrix.personal,
    options: calzoneSizeOptions(matrix),
    extras: pizzaExtras,
    image: image || null
  };
}

const tierA = { personal: 2000, pequena: 3500, mediana: 6500, grande: 9000 };
const tierB = { personal: 2500, pequena: 4000, mediana: 7000, grande: 9500 };
const tierC = { personal: 3000, pequena: 4500, mediana: 7500, grande: 10500 };

export const menuCategories = [
  {
    id: "cat-pizzas",
    name: "Pizzas",
    nameEn: "Pizzas",
    shortName: "Pizzas",
    shortNameEn: "Pizzas",
    icon: "🍕",
    color: "red",
    image: null,
    items: [
      pizza(
        "p-jamon-queso",
        "Jamón y Queso",
        "Ham and Cheese",
        "Jamón de cerdo de alta calidad, queso mozzarella junto con nuestra única Salsa Pomodoro de tomate pera.",
        "High-quality pork ham and mozzarella cheese, with our signature homemade pear-tomato Pomodoro sauce.",
        tierA,
        "/assets/menu/p_jamon_queso.webp"
      ),
      pizza(
        "p-pepperoni",
        "Pepperoni",
        "Pepperoni",
        "Sabroso pepperoni, queso mozzarella junto con nuestra única Salsa Pomodoro de tomate pera.",
        "Tasty pepperoni and mozzarella cheese, with our signature homemade pear-tomato Pomodoro sauce.",
        tierA,
        "/assets/menu/p_pepperoni.webp"
      ),
      pizza(
        "p-hawaiana",
        "Hawaiana",
        "Hawaiian",
        "Sabroso jamón de alta calidad, piña, queso mozzarella junto con nuestra única Salsa Pomodoro de tomate pera.",
        "Tasty high-quality ham, pineapple and mozzarella cheese, with our signature homemade pear-tomato Pomodoro sauce.",
        tierB,
        "/assets/menu/p_hawaiana.webp"
      ),
      pizza(
        "p-jamon-hongos",
        "Jamón y Hongos",
        "Ham and Mushrooms",
        "Jamón de cerdo de alta calidad, queso mozzarella, hongos portobello junto con nuestra única Salsa Pomodoro de tomate pera.",
        "High-quality pork ham, mozzarella cheese and portobello mushrooms, with our signature homemade pear-tomato Pomodoro sauce.",
        tierB,
        "/assets/menu/p_jamon_hongos.webp"
      ),
      pizza(
        "p-pollo-bbq",
        "Pollo BBQ",
        "BBQ Chicken",
        "Delicioso pollo arreglado, queso mozzarella, jamón, junto con nuestra única Salsa Pomodoro de tomate pera.",
        "Delicious seasoned chicken, mozzarella cheese and ham, with our signature homemade pear-tomato Pomodoro sauce.",
        tierB,
        "/assets/menu/p_pollo_bbq.webp"
      ),
      pizza(
        "p-vegetariana",
        "Vegetariana",
        "Vegetarian",
        "Sabrosos hongos portobello, queso mozzarella, chile, cebolla, aceitunas, junto con nuestra única Salsa Pomodoro de tomate pera.",
        "Tasty portobello mushrooms, mozzarella cheese, bell pepper, onion and olives, with our signature homemade pear-tomato Pomodoro sauce.",
        tierB,
        "/assets/menu/p_vegetariana.webp"
      ),
      pizza(
        "p-exotica",
        "Exótica",
        "Exotic",
        "Sabroso pepperoni, queso mozzarella, chile, cebolla, hongos portobello junto con nuestra única Salsa Pomodoro de tomate pera.",
        "Tasty pepperoni, mozzarella cheese, bell pepper, onion and portobello mushrooms, with our signature homemade pear-tomato Pomodoro sauce.",
        tierB,
        "/assets/menu/p_exotica.webp"
      ),
      pizza(
        "p-suprema",
        "Suprema",
        "Supreme",
        "Sabrosa carne boloñesa, queso mozzarella, chile, cebolla, junto con nuestra única Salsa Pomodoro de tomate pera.",
        "Tasty ground beef bolognese, mozzarella cheese, bell pepper and onion, with our signature homemade pear-tomato Pomodoro sauce.",
        tierB,
        "/assets/menu/p_suprema.webp"
      ),
      pizza(
        "p-meat-lover",
        "Meat Lover",
        "Meat Lover",
        "Pepperoni, jamón, carne boloñesa, hongos portobello, queso mozzarella, chile, cebolla, junto con nuestra única Salsa Pomodoro de tomate pera.",
        "Pepperoni, ham, ground beef bolognese, portobello mushrooms, mozzarella cheese, bell pepper and onion, with our signature homemade pear-tomato Pomodoro sauce.",
        tierC,
        "/assets/menu/p_meat_lover.webp"
      ),
      pizza(
        "p-break-pizza",
        "Break Pizza",
        "Break Pizza",
        "Rico pepperoni, jamón, pollo, carne boloñesa, queso mozzarella, chile, cebolla, junto con nuestra sabrosa Salsa Pomodoro de tomate pera.",
        "Delicious pepperoni, ham, chicken, ground beef bolognese, mozzarella cheese, bell pepper and onion, with our tasty homemade pear-tomato Pomodoro sauce.",
        tierC,
        "/assets/menu/p_break_pizza.webp"
      )
    ]
  },
  {
    id: "cat-calzone",
    name: "Calzone",
    nameEn: "Calzone",
    shortName: "Calzone",
    shortNameEn: "Calzone",
    icon: "🥙",
    color: "orange",
    image: null,
    items: [
      calzone(
        "cz-pepperoni",
        "Calzone Pepperoni",
        "Pepperoni Calzone",
        "Masa horneada hasta dorar, espolvoreada con parmesano. Rellena de sabroso pepperoni, queso mozzarella y nuestra Salsa Pomodoro.",
        "Baked dough dusted with parmesan. Filled with tasty pepperoni, mozzarella cheese and our Pomodoro sauce.",
        tierA,
        "/assets/menu/cz_break.webp"
      ),
      calzone(
        "cz-jamon-queso",
        "Calzone Jamón y Queso",
        "Ham and Cheese Calzone",
        "Masa horneada hasta dorar, espolvoreada con parmesano. Rellena de jamón de cerdo, queso mozzarella y nuestra Salsa Pomodoro.",
        "Baked dough dusted with parmesan. Filled with pork ham, mozzarella cheese and our Pomodoro sauce.",
        tierA,
        "/assets/menu/cz_break.webp"
      ),
      calzone(
        "cz-supremo",
        "Calzone Supremo",
        "Supreme Calzone",
        "Masa horneada hasta dorar, espolvoreada con parmesano. Rellena de carne boloñesa, chile dulce, cebolla, queso mozzarella y Salsa Pomodoro.",
        "Baked dough dusted with parmesan. Filled with ground beef bolognese, bell pepper, onion, mozzarella cheese and Pomodoro sauce.",
        tierB,
        "/assets/menu/cz_break.webp"
      )
    ]
  },
  {
    id: "cat-combos",
    name: "Combos Coca-Cola",
    nameEn: "Coca-Cola Combos",
    shortName: "Combos",
    shortNameEn: "Combos",
    icon: "🎉",
    color: "yellow",
    image: null,
    items: [
      {
        id: "c-pequeno",
        name: "Combo Pequeño",
        nameEn: "Small Combo",
        description: "Pizza pequeña de Jamón y Queso o Pepperoni + refresco de 600 ml.",
        descriptionEn: "Small Ham and Cheese or Pepperoni pizza + 600 ml soda.",
        basePrice: 4500,
        options: pizzaFlavorOptions,
        extras: [{ id: "upgrade-suprema", name: "Cambiar la pizza a Suprema", nameEn: "Upgrade the pizza to Supreme", price: 500 }],
        image: "/assets/menu/c_pequeno.webp"
      },
      {
        id: "c-mediano",
        name: "Combo Mediano",
        nameEn: "Medium Combo",
        description: "Pizza mediana de Jamón y Queso o Pepperoni + refresco de 1.5 L.",
        descriptionEn: "Medium Ham and Cheese or Pepperoni pizza + 1.5 L soda.",
        basePrice: 7500,
        options: pizzaFlavorOptions,
        extras: [{ id: "upgrade-suprema", name: "Cambiar la pizza a Suprema", nameEn: "Upgrade the pizza to Supreme", price: 500 }],
        image: "/assets/menu/c_mediano.webp"
      },
      {
        id: "c-familiar",
        name: "Combo Familiar",
        nameEn: "Family Combo",
        description: "Pizza grande de Jamón y Queso o Pepperoni + pan de ajo + refresco de 2.5 L.",
        descriptionEn: "Large Ham and Cheese or Pepperoni pizza + garlic bread + 2.5 L soda.",
        basePrice: 13000,
        options: pizzaFlavorOptions,
        extras: [{ id: "upgrade-suprema", name: "Cambiar la pizza a Suprema", nameEn: "Upgrade the pizza to Supreme", price: 1000 }],
        image: "/assets/menu/c_familiar.webp"
      }
    ]
  },
  {
    id: "cat-otros-antojos",
    name: "Otros Antojos",
    nameEn: "Other Cravings",
    shortName: "Antojos",
    shortNameEn: "Cravings",
    icon: "🍝",
    color: "lime",
    image: null,
    items: [
      {
        id: "oa-espagueti",
        name: "Espagueti Supremo",
        nameEn: "Supreme Spaghetti",
        description:
          "Nuestra sabrosa Salsa Pomodoro, carne boloñesa, chile dulce, cebolla, hongo portobello y gratinado con queso. Incluye una orden de pan de ajo supremo.",
        descriptionEn:
          "Our tasty homemade Pomodoro sauce, ground beef bolognese, bell pepper, onion, portobello mushroom and melted cheese gratin. Includes one order of supreme garlic bread.",
        basePrice: 3500,
        options: [
          { id: "pequeno", name: "Pequeño", nameEn: "Small", addPrice: 0, isDefault: true },
          { id: "grande", name: "Grande", nameEn: "Large", addPrice: 1000 }
        ],
        extras: [],
        image: "/assets/menu/oa_espagueti.webp"
      },
      {
        id: "oa-portobello",
        name: "Portobello Supremo",
        nameEn: "Supreme Portobello",
        description:
          "Hongo portobello relleno de una salsa especial de la casa y queso mozzarella. Acompañado de pan de ajo y una cama de queso parmesano. Tamaño único.",
        descriptionEn:
          "Portobello mushroom stuffed with the house's special sauce and mozzarella cheese. Served with garlic bread and a bed of parmesan cheese. One size only.",
        basePrice: 4000,
        options: [{ id: "unico", name: "Tamaño único", nameEn: "One size", addPrice: 0, isDefault: true }],
        extras: [
          { id: "prot-bolonesa", name: "Agregar carne boloñesa", nameEn: "Add ground beef bolognese", price: 400 },
          { id: "prot-pollo", name: "Agregar pollo", nameEn: "Add chicken", price: 400 },
          { id: "prot-tocineta", name: "Agregar tocineta", nameEn: "Add bacon", price: 400 }
        ],
        image: "/assets/menu/oa_portobello.webp"
      }
    ]
  },
  {
    id: "cat-postres",
    name: "Postres",
    nameEn: "Desserts",
    shortName: "Postres",
    shortNameEn: "Desserts",
    icon: "🍰",
    color: "brown",
    image: null,
    items: [
      {
        id: "po-focaccia-dulce",
        name: "Focaccia Dulce",
        nameEn: "Sweet Focaccia",
        description:
          "Focaccia horneada con dulce de leche, fresas, banano, leche condensada y chocolate. Pensada para compartir.",
        descriptionEn:
          "Baked focaccia with dulce de leche, strawberries, banana, condensed milk and chocolate. Made to share.",
        basePrice: 3500,
        options: [
          { id: "pequena", name: "Pequeña", nameEn: "Small", addPrice: 0, isDefault: true },
          { id: "grande", name: "Grande", nameEn: "Large", addPrice: 1500 }
        ],
        extras: [],
        image: "/assets/menu/po_focaccia.webp"
      },
      {
        id: "po-cheesecake",
        name: "Cheesecake",
        nameEn: "Cheesecake",
        description: "Cremoso, base de galleta.",
        descriptionEn: "Creamy, with a cookie crust.",
        basePrice: 1500,
        options: [{ id: "porcion", name: "Porción", nameEn: "Portion", addPrice: 0, isDefault: true }],
        extras: [],
        image: "/assets/menu/po_cheesecake.webp"
      },
      {
        id: "po-flan",
        name: "Flan",
        nameEn: "Flan",
        description: "Flan tradicional con caramelo.",
        descriptionEn: "Traditional flan with caramel.",
        basePrice: 1500,
        options: [{ id: "porcion", name: "Porción", nameEn: "Portion", addPrice: 0, isDefault: true }],
        extras: [],
        image: "/assets/menu/po_flan.webp"
      },
      {
        id: "po-pie-limon",
        name: "Pie de Limón",
        nameEn: "Key Lime Pie",
        description: "Base de galleta, crema de limón fresca y merengue dorado.",
        descriptionEn: "Cookie crust, fresh lime cream and golden meringue.",
        basePrice: 1500,
        options: [{ id: "porcion", name: "Porción", nameEn: "Portion", addPrice: 0, isDefault: true }],
        extras: [],
        image: "/assets/menu/po_pie_limon.webp"
      },
      {
        id: "po-tres-leches",
        name: "Tres Leches",
        nameEn: "Tres Leches Cake",
        description: "Bizcocho empapado en tres leches con chantilly y fresa fresca.",
        descriptionEn: "Sponge cake soaked in three milks with whipped cream and fresh strawberry.",
        basePrice: 1500,
        options: [{ id: "porcion", name: "Porción", nameEn: "Portion", addPrice: 0, isDefault: true }],
        extras: [],
        image: "/assets/menu/po_tres_leches.webp"
      }
    ]
  },
  {
    id: "cat-bebidas",
    name: "Bebidas",
    nameEn: "Drinks",
    shortName: "Bebidas",
    shortNameEn: "Drinks",
    icon: "🥤",
    color: "blue",
    image: null,
    items: [
      {
        id: "rg-te-frio",
        section: "Gaseosas",
        sectionEn: "Sodas",
        name: "Vaso Té Frío",
        nameEn: "Iced Tea Glass",
        description: "Vaso de té frío Coca-Cola.",
        descriptionEn: "Coca-Cola iced tea glass.",
        basePrice: 400,
        options: [{ id: "vaso", name: "Vaso", nameEn: "Glass", addPrice: 0, isDefault: true }],
        extras: []
      },
      {
        id: "rg-350",
        section: "Gaseosas",
        sectionEn: "Sodas",
        name: "Gaseosa 350 ml",
        nameEn: "Soda 350 ml",
        description: "Bebida Coca-Cola, presentación 350 ml.",
        descriptionEn: "Coca-Cola beverage, 350 ml.",
        basePrice: 900,
        options: [{ id: "unico", name: "350 ml", nameEn: "350 ml", addPrice: 0, isDefault: true }],
        extras: []
      },
      {
        id: "rg-600",
        section: "Gaseosas",
        sectionEn: "Sodas",
        name: "Gaseosa 600 ml",
        nameEn: "Soda 600 ml",
        description: "Bebida Coca-Cola, presentación 600 ml.",
        descriptionEn: "Coca-Cola beverage, 600 ml.",
        basePrice: 1300,
        options: [{ id: "unico", name: "600 ml", nameEn: "600 ml", addPrice: 0, isDefault: true }],
        extras: []
      },
      {
        id: "rg-15l",
        section: "Gaseosas",
        sectionEn: "Sodas",
        name: "Gaseosa 1.5 L",
        nameEn: "Soda 1.5 L",
        description: "Bebida Coca-Cola, presentación 1.5 L.",
        descriptionEn: "Coca-Cola beverage, 1.5 L.",
        basePrice: 1800,
        options: [{ id: "unico", name: "1.5 L", nameEn: "1.5 L", addPrice: 0, isDefault: true }],
        extras: []
      },
      {
        id: "rg-25l",
        section: "Gaseosas",
        sectionEn: "Sodas",
        name: "Gaseosa 2.5 L",
        nameEn: "Soda 2.5 L",
        description: "Bebida Coca-Cola, presentación 2.5 L.",
        descriptionEn: "Coca-Cola beverage, 2.5 L.",
        basePrice: 2500,
        options: [{ id: "unico", name: "2.5 L", nameEn: "2.5 L", addPrice: 0, isDefault: true }],
        extras: []
      },
      {
        id: "rn-agua",
        section: "Naturales",
        sectionEn: "Fresh Drinks",
        name: "Refresco Natural en Agua",
        nameEn: "Fresh Fruit Drink in Water",
        description: "Elige tu sabor favorito, preparado en agua.",
        descriptionEn: "Choose your favorite flavor, made with water.",
        basePrice: 1300,
        options: naturalFlavorOptions(),
        extras: []
      },
      {
        id: "rn-leche",
        section: "Naturales",
        sectionEn: "Fresh Drinks",
        name: "Refresco Natural en Leche",
        nameEn: "Fresh Fruit Drink in Milk",
        description: "Elige tu sabor favorito, preparado en leche.",
        descriptionEn: "Choose your favorite flavor, made with milk.",
        basePrice: 1500,
        options: naturalFlavorOptions(),
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
    categoryNameEn: category.nameEn,
    categoryIcon: category.icon,
    categoryColor: category.color,
    categoryImage: category.image
  }))
);
