const pizzaFlavorOptions = [
  { id: "jamon-queso", name: "Jamón y Queso", nameEn: "Ham and Cheese", namePt: "Presunto e Queijo", addPrice: 0, isDefault: true },
  { id: "pepperoni", name: "Pepperoni", nameEn: "Pepperoni", namePt: "Pepperoni", addPrice: 0 }
];

const naturalFlavors = [
  ["Fresa-Hierbabuena", "Strawberry-Mint", "Morango-Hortelã"],
  ["Mora-Fresa-Arándano", "Blackberry-Strawberry-Blueberry", "Amora-Morango-Mirtilo"],
  ["Mango-Fresa-Maracuyá", "Mango-Strawberry-Passionfruit", "Manga-Morango-Maracujá"],
  ["Guanábana", "Soursop", "Graviola"],
  ["Melón", "Cantaloupe", "Melão"],
  ["Mora", "Blackberry", "Amora"],
  ["Sandía", "Watermelon", "Melancia"],
  ["Piña", "Pineapple", "Abacaxi"],
  ["Fresa", "Strawberry", "Morango"],
  ["Cas", "Cas (Costa Rican sour guava)", "Cas (Goiaba azeda da Costa Rica)"]
];

function naturalFlavorOptions() {
  return naturalFlavors.map(([flavor, flavorEn, flavorPt], index) => ({
    id: `sabor-${flavor.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name: flavor,
    nameEn: flavorEn,
    namePt: flavorPt,
    addPrice: 0,
    isDefault: index === 0
  }));
}

function pizzaSizeOptions(matrix) {
  return [
    { id: "personal", name: "Personal (4 porciones)", nameEn: "Personal (4 slices)", namePt: "Individual (4 fatias)", addPrice: 0, isDefault: true },
    { id: "pequena", name: "Pequeña (6 porciones)", nameEn: "Small (6 slices)", namePt: "Pequena (6 fatias)", addPrice: matrix.pequena - matrix.personal },
    { id: "mediana", name: "Mediana (8 porciones)", nameEn: "Medium (8 slices)", namePt: "Média (8 fatias)", addPrice: matrix.mediana - matrix.personal },
    { id: "grande", name: "Grande (12 porciones)", nameEn: "Large (12 slices)", namePt: "Grande (12 fatias)", addPrice: matrix.grande - matrix.personal }
  ];
}

const pizzaExtras = [
  { id: "extra-queso", name: "Extra queso mozzarella", nameEn: "Extra mozzarella cheese", namePt: "Extra queijo muçarela", price: 500 },
  { id: "extra-jamon", name: "Extra jamón", nameEn: "Extra ham", namePt: "Extra presunto", price: 500 },
  { id: "extra-pepperoni", name: "Extra pepperoni", nameEn: "Extra pepperoni", namePt: "Extra pepperoni", price: 500 },
  { id: "extra-pina", name: "Extra piña", nameEn: "Extra pineapple", namePt: "Extra abacaxi", price: 500 },
  { id: "extra-portobello", name: "Extra hongos portobello", nameEn: "Extra portobello mushrooms", namePt: "Extra cogumelos portobello", price: 500 },
  { id: "extra-pollo", name: "Extra pollo", nameEn: "Extra chicken", namePt: "Extra frango", price: 500 },
  { id: "extra-chile", name: "Extra chile dulce", nameEn: "Extra bell pepper", namePt: "Extra pimentão doce", price: 500 },
  { id: "extra-cebolla", name: "Extra cebolla", nameEn: "Extra onion", namePt: "Extra cebola", price: 500 },
  { id: "extra-aceitunas", name: "Extra aceitunas", nameEn: "Extra olives", namePt: "Extra azeitonas", price: 500 },
  { id: "extra-bolonesa", name: "Extra carne boloñesa", nameEn: "Extra ground beef bolognese", namePt: "Extra carne à bolonhesa", price: 500 }
];

function pizza(id, name, nameEn, namePt, description, descriptionEn, descriptionPt, matrix, image) {
  return {
    id,
    name,
    nameEn,
    namePt,
    description,
    descriptionEn,
    descriptionPt,
    basePrice: matrix.personal,
    options: pizzaSizeOptions(matrix),
    extras: pizzaExtras,
    image: image || null
  };
}

function calzoneSizeOptions(matrix) {
  return [
    { id: "personal", name: "Personal (4 porciones)", nameEn: "Personal (4 slices)", namePt: "Individual (4 fatias)", addPrice: 0, isDefault: true },
    { id: "pequeno", name: "Pequeño (6 porciones)", nameEn: "Small (6 slices)", namePt: "Pequeno (6 fatias)", addPrice: matrix.pequena - matrix.personal },
    { id: "mediano", name: "Mediano (8 porciones)", nameEn: "Medium (8 slices)", namePt: "Médio (8 fatias)", addPrice: matrix.mediana - matrix.personal }
  ];
}

function calzone(id, name, nameEn, namePt, description, descriptionEn, descriptionPt, matrix, image) {
  return {
    id,
    name,
    nameEn,
    namePt,
    description,
    descriptionEn,
    descriptionPt,
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
    namePt: "Pizzas",
    shortName: "Pizzas",
    shortNameEn: "Pizzas",
    shortNamePt: "Pizzas",
    icon: "🍕",
    color: "red",
    image: null,
    items: [
      pizza(
        "p-jamon-queso",
        "Jamón y Queso",
        "Ham and Cheese",
        "Presunto e Queijo",
        "Jamón de cerdo de alta calidad, queso mozzarella junto con nuestra única Salsa Pomodoro de tomate pera.",
        "High-quality pork ham and mozzarella cheese, with our signature homemade pear-tomato Pomodoro sauce.",
        "Presunto de porco de alta qualidade e queijo muçarela, com nosso exclusivo molho Pomodoro de tomate pera.",
        tierA,
        "/assets/menu/p_jamon_queso.webp"
      ),
      pizza(
        "p-pepperoni",
        "Pepperoni",
        "Pepperoni",
        "Pepperoni",
        "Sabroso pepperoni, queso mozzarella junto con nuestra única Salsa Pomodoro de tomate pera.",
        "Tasty pepperoni and mozzarella cheese, with our signature homemade pear-tomato Pomodoro sauce.",
        "Saboroso pepperoni e queijo muçarela, com nosso exclusivo molho Pomodoro de tomate pera.",
        tierA,
        "/assets/menu/p_pepperoni.webp"
      ),
      pizza(
        "p-hawaiana",
        "Hawaiana",
        "Hawaiian",
        "Havaiana",
        "Sabroso jamón de alta calidad, piña, queso mozzarella junto con nuestra única Salsa Pomodoro de tomate pera.",
        "Tasty high-quality ham, pineapple and mozzarella cheese, with our signature homemade pear-tomato Pomodoro sauce.",
        "Saboroso presunto de alta qualidade, abacaxi e queijo muçarela, com nosso exclusivo molho Pomodoro de tomate pera.",
        tierB,
        "/assets/menu/p_hawaiana.webp"
      ),
      pizza(
        "p-jamon-hongos",
        "Jamón y Hongos",
        "Ham and Mushrooms",
        "Presunto e Cogumelos",
        "Jamón de cerdo de alta calidad, queso mozzarella, hongos portobello junto con nuestra única Salsa Pomodoro de tomate pera.",
        "High-quality pork ham, mozzarella cheese and portobello mushrooms, with our signature homemade pear-tomato Pomodoro sauce.",
        "Presunto de porco de alta qualidade, queijo muçarela e cogumelos portobello, com nosso exclusivo molho Pomodoro de tomate pera.",
        tierB,
        "/assets/menu/p_jamon_hongos.webp"
      ),
      pizza(
        "p-pollo-bbq",
        "Pollo BBQ",
        "BBQ Chicken",
        "Frango BBQ",
        "Delicioso pollo arreglado, queso mozzarella, jamón, junto con nuestra única Salsa Pomodoro de tomate pera.",
        "Delicious seasoned chicken, mozzarella cheese and ham, with our signature homemade pear-tomato Pomodoro sauce.",
        "Delicioso frango temperado, queijo muçarela e presunto, com nosso exclusivo molho Pomodoro de tomate pera.",
        tierB,
        "/assets/menu/p_pollo_bbq.webp"
      ),
      pizza(
        "p-vegetariana",
        "Vegetariana",
        "Vegetarian",
        "Vegetariana",
        "Sabrosos hongos portobello, queso mozzarella, chile, cebolla, aceitunas, junto con nuestra única Salsa Pomodoro de tomate pera.",
        "Tasty portobello mushrooms, mozzarella cheese, bell pepper, onion and olives, with our signature homemade pear-tomato Pomodoro sauce.",
        "Saborosos cogumelos portobello, queijo muçarela, pimentão, cebola e azeitonas, com nosso exclusivo molho Pomodoro de tomate pera.",
        tierB,
        "/assets/menu/p_vegetariana.webp"
      ),
      pizza(
        "p-exotica",
        "Exótica",
        "Exotic",
        "Exótica",
        "Sabroso pepperoni, queso mozzarella, chile, cebolla, hongos portobello junto con nuestra única Salsa Pomodoro de tomate pera.",
        "Tasty pepperoni, mozzarella cheese, bell pepper, onion and portobello mushrooms, with our signature homemade pear-tomato Pomodoro sauce.",
        "Saboroso pepperoni, queijo muçarela, pimentão, cebola e cogumelos portobello, com nosso exclusivo molho Pomodoro de tomate pera.",
        tierB,
        "/assets/menu/p_exotica.webp"
      ),
      pizza(
        "p-suprema",
        "Suprema",
        "Supreme",
        "Suprema",
        "Sabrosa carne boloñesa, queso mozzarella, chile, cebolla, junto con nuestra única Salsa Pomodoro de tomate pera.",
        "Tasty ground beef bolognese, mozzarella cheese, bell pepper and onion, with our signature homemade pear-tomato Pomodoro sauce.",
        "Saborosa carne à bolonhesa, queijo muçarela, pimentão e cebola, com nosso exclusivo molho Pomodoro de tomate pera.",
        tierB,
        "/assets/menu/p_suprema.webp"
      ),
      pizza(
        "p-meat-lover",
        "Meat Lover",
        "Meat Lover",
        "Amante de Carne",
        "Pepperoni, jamón, carne boloñesa, hongos portobello, queso mozzarella, chile, cebolla, junto con nuestra única Salsa Pomodoro de tomate pera.",
        "Pepperoni, ham, ground beef bolognese, portobello mushrooms, mozzarella cheese, bell pepper and onion, with our signature homemade pear-tomato Pomodoro sauce.",
        "Pepperoni, presunto, carne à bolonhesa, cogumelos portobello, queijo muçarela, pimentão e cebola, com nosso exclusivo molho Pomodoro de tomate pera.",
        tierC,
        "/assets/menu/p_meat_lover.webp"
      ),
      pizza(
        "p-break-pizza",
        "Break Pizza",
        "Break Pizza",
        "Break Pizza",
        "Rico pepperoni, jamón, pollo, carne boloñesa, queso mozzarella, chile, cebolla, junto con nuestra sabrosa Salsa Pomodoro de tomate pera.",
        "Delicious pepperoni, ham, chicken, ground beef bolognese, mozzarella cheese, bell pepper and onion, with our tasty homemade pear-tomato Pomodoro sauce.",
        "Delicioso pepperoni, presunto, frango, carne à bolonhesa, queijo muçarela, pimentão e cebola, com nosso saboroso molho Pomodoro de tomate pera.",
        tierC,
        "/assets/menu/p_break_pizza.webp"
      )
    ]
  },
  {
    id: "cat-calzone",
    name: "Calzone",
    nameEn: "Calzone",
    namePt: "Calzone",
    shortName: "Calzone",
    shortNameEn: "Calzone",
    shortNamePt: "Calzone",
    icon: "🥙",
    color: "orange",
    image: null,
    items: [
      calzone(
        "cz-pepperoni",
        "Calzone Pepperoni",
        "Pepperoni Calzone",
        "Calzone de Pepperoni",
        "Masa horneada hasta dorar, espolvoreada con parmesano. Rellena de sabroso pepperoni, queso mozzarella y nuestra Salsa Pomodoro.",
        "Baked dough dusted with parmesan. Filled with tasty pepperoni, mozzarella cheese and our Pomodoro sauce.",
        "Massa assada até dourar, polvilhada com parmesão. Recheada com saboroso pepperoni, queijo muçarela e nosso Molho Pomodoro.",
        tierA,
        "/assets/menu/cz_break.webp"
      ),
      calzone(
        "cz-jamon-queso",
        "Calzone Jamón y Queso",
        "Ham and Cheese Calzone",
        "Calzone de Presunto e Queijo",
        "Masa horneada hasta dorar, espolvoreada con parmesano. Rellena de jamón de cerdo, queso mozzarella y nuestra Salsa Pomodoro.",
        "Baked dough dusted with parmesan. Filled with pork ham, mozzarella cheese and our Pomodoro sauce.",
        "Massa assada até dourar, polvilhada com parmesão. Recheada com presunto de porco, queijo muçarela e nosso Molho Pomodoro.",
        tierA,
        "/assets/menu/cz_break.webp"
      ),
      calzone(
        "cz-supremo",
        "Calzone Supremo",
        "Supreme Calzone",
        "Calzone Supremo",
        "Masa horneada hasta dorar, espolvoreada con parmesano. Rellena de carne boloñesa, chile dulce, cebolla, queso mozzarella y Salsa Pomodoro.",
        "Baked dough dusted with parmesan. Filled with ground beef bolognese, bell pepper, onion, mozzarella cheese and Pomodoro sauce.",
        "Massa assada até dourar, polvilhada com parmesão. Recheada com carne à bolonhesa, pimentão doce, cebola, queijo muçarela e Molho Pomodoro.",
        tierB,
        "/assets/menu/cz_break.webp"
      )
    ]
  },
  {
    id: "cat-combos",
    name: "Combos Coca-Cola",
    nameEn: "Coca-Cola Combos",
    namePt: "Combos Coca-Cola",
    shortName: "Combos",
    shortNameEn: "Combos",
    shortNamePt: "Combos",
    icon: "🎉",
    color: "yellow",
    image: null,
    items: [
      {
        id: "c-pequeno",
        name: "Combo Pequeño",
        nameEn: "Small Combo",
        namePt: "Combo Pequeno",
        description: "Pizza pequeña de Jamón y Queso o Pepperoni + refresco de 600 ml.",
        descriptionEn: "Small Ham and Cheese or Pepperoni pizza + 600 ml soda.",
        descriptionPt: "Pizza pequena de Presunto e Queijo ou Pepperoni + refrigerante de 600 ml.",
        basePrice: 4500,
        options: pizzaFlavorOptions,
        extras: [{ id: "upgrade-suprema", name: "Cambiar la pizza a Suprema", nameEn: "Upgrade the pizza to Supreme", namePt: "Trocar a pizza por Suprema", price: 500 }],
        image: "/assets/menu/c_pequeno.webp"
      },
      {
        id: "c-mediano",
        name: "Combo Mediano",
        nameEn: "Medium Combo",
        namePt: "Combo Médio",
        description: "Pizza mediana de Jamón y Queso o Pepperoni + refresco de 1.5 L.",
        descriptionEn: "Medium Ham and Cheese or Pepperoni pizza + 1.5 L soda.",
        descriptionPt: "Pizza média de Presunto e Queijo ou Pepperoni + refrigerante de 1.5 L.",
        basePrice: 7500,
        options: pizzaFlavorOptions,
        extras: [{ id: "upgrade-suprema", name: "Cambiar la pizza a Suprema", nameEn: "Upgrade the pizza to Supreme", namePt: "Trocar a pizza por Suprema", price: 500 }],
        image: "/assets/menu/c_mediano.webp"
      },
      {
        id: "c-familiar",
        name: "Combo Familiar",
        nameEn: "Family Combo",
        namePt: "Combo Família",
        description: "Pizza grande de Jamón y Queso o Pepperoni + pan de ajo + refresco de 2.5 L.",
        descriptionEn: "Large Ham and Cheese or Pepperoni pizza + garlic bread + 2.5 L soda.",
        descriptionPt: "Pizza grande de Presunto e Queijo ou Pepperoni + pão de alho + refrigerante de 2.5 L.",
        basePrice: 13000,
        options: pizzaFlavorOptions,
        extras: [{ id: "upgrade-suprema", name: "Cambiar la pizza a Suprema", nameEn: "Upgrade the pizza to Supreme", namePt: "Trocar a pizza por Suprema", price: 1000 }],
        image: "/assets/menu/c_familiar.webp"
      }
    ]
  },
  {
    id: "cat-otros-antojos",
    name: "Otros Antojos",
    nameEn: "Other Cravings",
    namePt: "Outros Desejos",
    shortName: "Antojos",
    shortNameEn: "Cravings",
    shortNamePt: "Desejos",
    icon: "🍝",
    color: "lime",
    image: null,
    items: [
      {
        id: "oa-espagueti",
        name: "Espagueti Supremo",
        nameEn: "Supreme Spaghetti",
        namePt: "Espaguete Supremo",
        description:
          "Nuestra sabrosa Salsa Pomodoro, carne boloñesa, chile dulce, cebolla, hongo portobello y gratinado con queso. Incluye una orden de pan de ajo supremo.",
        descriptionEn:
          "Our tasty homemade Pomodoro sauce, ground beef bolognese, bell pepper, onion, portobello mushroom and melted cheese gratin. Includes one order of supreme garlic bread.",
        descriptionPt:
          "Nosso saboroso Molho Pomodoro, carne à bolonhesa, pimentão doce, cebola, cogumelo portobello e gratinado com queijo. Inclui uma porção de pão de alho supremo.",
        basePrice: 3500,
        options: [
          { id: "pequeno", name: "Pequeño", nameEn: "Small", namePt: "Pequeno", addPrice: 0, isDefault: true },
          { id: "grande", name: "Grande", nameEn: "Large", namePt: "Grande", addPrice: 1000 }
        ],
        extras: [],
        image: "/assets/menu/oa_espagueti.webp"
      },
      {
        id: "oa-portobello",
        name: "Portobello Supremo",
        nameEn: "Supreme Portobello",
        namePt: "Portobello Supremo",
        description:
          "Hongo portobello relleno de una salsa especial de la casa y queso mozzarella. Acompañado de pan de ajo y una cama de queso parmesano. Tamaño único.",
        descriptionEn:
          "Portobello mushroom stuffed with the house's special sauce and mozzarella cheese. Served with garlic bread and a bed of parmesan cheese. One size only.",
        descriptionPt:
          "Cogumelo portobello recheado com molho especial da casa e queijo muçarela. Acompanhado de pão de alho e uma cama de queijo parmesão. Tamanho único.",
        basePrice: 4000,
        options: [{ id: "unico", name: "Tamaño único", nameEn: "One size", namePt: "Tamanho único", addPrice: 0, isDefault: true }],
        extras: [
          { id: "prot-bolonesa", name: "Agregar carne boloñesa", nameEn: "Add ground beef bolognese", namePt: "Adicionar carne à bolonhesa", price: 400 },
          { id: "prot-pollo", name: "Agregar pollo", nameEn: "Add chicken", namePt: "Adicionar frango", price: 400 },
          { id: "prot-tocineta", name: "Agregar tocineta", nameEn: "Add bacon", namePt: "Adicionar bacon", price: 400 }
        ],
        image: "/assets/menu/oa_portobello.webp"
      }
    ]
  },
  {
    id: "cat-postres",
    name: "Postres",
    nameEn: "Desserts",
    namePt: "Sobremesas",
    shortName: "Postres",
    shortNameEn: "Desserts",
    shortNamePt: "Sobremesas",
    icon: "🍰",
    color: "brown",
    image: null,
    items: [
      {
        id: "po-focaccia-dulce",
        name: "Focaccia Dulce",
        nameEn: "Sweet Focaccia",
        namePt: "Focaccia Doce",
        description:
          "Focaccia horneada con dulce de leche, fresas, banano, leche condensada y chocolate. Pensada para compartir.",
        descriptionEn:
          "Baked focaccia with dulce de leche, strawberries, banana, condensed milk and chocolate. Made to share.",
        descriptionPt:
          "Focaccia assada com doce de leite, morangos, banana, leite condensado e chocolate. Feita para compartilhar.",
        basePrice: 3500,
        options: [
          { id: "pequena", name: "Pequeña", nameEn: "Small", namePt: "Pequena", addPrice: 0, isDefault: true },
          { id: "grande", name: "Grande", nameEn: "Large", namePt: "Grande", addPrice: 1500 }
        ],
        extras: [],
        image: "/assets/menu/po_focaccia.webp"
      },
      {
        id: "po-cheesecake",
        name: "Cheesecake",
        nameEn: "Cheesecake",
        namePt: "Cheesecake",
        description: "Cremoso, base de galleta.",
        descriptionEn: "Creamy, with a cookie crust.",
        descriptionPt: "Cremoso, com base de biscoito.",
        basePrice: 1500,
        options: [{ id: "porcion", name: "Porción", nameEn: "Portion", namePt: "Porção", addPrice: 0, isDefault: true }],
        extras: [],
        image: "/assets/menu/po_cheesecake.webp"
      },
      {
        id: "po-flan",
        name: "Flan",
        nameEn: "Flan",
        namePt: "Pudim",
        description: "Flan tradicional con caramelo.",
        descriptionEn: "Traditional flan with caramel.",
        descriptionPt: "Pudim tradicional com caramelo.",
        basePrice: 1500,
        options: [{ id: "porcion", name: "Porción", nameEn: "Portion", namePt: "Porção", addPrice: 0, isDefault: true }],
        extras: [],
        image: "/assets/menu/po_flan.webp"
      },
      {
        id: "po-pie-limon",
        name: "Pie de Limón",
        nameEn: "Key Lime Pie",
        namePt: "Torta de Limão",
        description: "Base de galleta, crema de limón fresca y merengue dorado.",
        descriptionEn: "Cookie crust, fresh lime cream and golden meringue.",
        descriptionPt: "Base de biscoito, creme de limão fresco e merengue dourado.",
        basePrice: 1500,
        options: [{ id: "porcion", name: "Porción", nameEn: "Portion", namePt: "Porção", addPrice: 0, isDefault: true }],
        extras: [],
        image: "/assets/menu/po_pie_limon.webp"
      },
      {
        id: "po-tres-leches",
        name: "Tres Leches",
        nameEn: "Tres Leches Cake",
        namePt: "Bolo Três Leites",
        description: "Bizcocho empapado en tres leches con chantilly y fresa fresca.",
        descriptionEn: "Sponge cake soaked in three milks with whipped cream and fresh strawberry.",
        descriptionPt: "Pão de ló umedecido em três leites com chantilly e morango fresco.",
        basePrice: 1500,
        options: [{ id: "porcion", name: "Porción", nameEn: "Portion", namePt: "Porção", addPrice: 0, isDefault: true }],
        extras: [],
        image: "/assets/menu/po_tres_leches.webp"
      }
    ]
  },
  {
    id: "cat-bebidas",
    name: "Bebidas",
    nameEn: "Drinks",
    namePt: "Bebidas",
    shortName: "Bebidas",
    shortNameEn: "Drinks",
    shortNamePt: "Bebidas",
    icon: "🥤",
    color: "blue",
    image: null,
    items: [
      {
        id: "rg-te-frio",
        section: "Naturales",
        sectionEn: "Fresh Drinks",
        sectionPt: "Sucos Naturais",
        name: "Vaso Té Frío",
        nameEn: "Iced Tea Glass",
        namePt: "Copo de Chá Gelado",
        description: "Vaso de té frío.",
        descriptionEn: "Iced tea glass.",
        descriptionPt: "Copo de chá gelado.",
        basePrice: 400,
        options: [{ id: "vaso", name: "Vaso", nameEn: "Glass", namePt: "Copo", addPrice: 0, isDefault: true }],
        extras: [],
        image: "/assets/menu/rn_natural.webp"
      },
      {
        id: "rg-gaseosas",
        section: "Gaseosas",
        sectionEn: "Sodas",
        sectionPt: "Refrigerantes",
        name: "Bebida Gaseosa",
        nameEn: "Soda",
        namePt: "Refrigerante",
        description: "Bebida gaseosa en tu tamaño preferido. Selecciona el sabor abajo.",
        descriptionEn: "Soda in your favorite size. Select flavor below.",
        descriptionPt: "Refrigerante no seu tamanho favorito. Escolha o sabor abaixo.",
        basePrice: 0,
        options: [
          { id: "350ml", name: "350 ml", nameEn: "350 ml", namePt: "350 ml", addPrice: 900, isDefault: true },
          { id: "600ml", name: "600 ml", nameEn: "600 ml", namePt: "600 ml", addPrice: 1300 },
          { id: "15l", name: "1.5 L", nameEn: "1.5 L", namePt: "1.5 L", addPrice: 1800 },
          { id: "25l", name: "2.5 L", nameEn: "2.5 L", namePt: "2.5 L", addPrice: 2500 },
          { id: "3l", name: "3.0 L", nameEn: "3.0 L", namePt: "3.0 L", addPrice: 3000 }
        ],
        extras: [
          { id: "sab-coca-cola", name: "Sabor: Coca-Cola Original", nameEn: "Flavor: Coca-Cola Original", namePt: "Sabor: Coca-Cola Original", price: 0 },
          { id: "sab-coca-zero", name: "Sabor: Coca-Cola Zero", nameEn: "Flavor: Coca-Cola Zero", namePt: "Sabor: Coca-Cola Zero", price: 0 },
          { id: "sab-fanta-naranja", name: "Sabor: Fanta Naranja", nameEn: "Flavor: Fanta Orange", namePt: "Sabor: Fanta Laranja", price: 0 },
          { id: "sab-fanta-uva", name: "Sabor: Fanta Uva", nameEn: "Flavor: Fanta Grape", namePt: "Sabor: Fanta Uva", price: 0 },
          { id: "sab-fresca", name: "Sabor: Fresca", nameEn: "Flavor: Fresca", namePt: "Sabor: Fresca", price: 0 },
          { id: "sab-sprite", name: "Sabor: Sprite", nameEn: "Flavor: Sprite", namePt: "Sabor: Sprite", price: 0 },
          { id: "sab-ginger-ale", name: "Sabor: Ginger Ale", nameEn: "Flavor: Ginger Ale", namePt: "Sabor: Ginger Ale", price: 0 }
        ],
        image: "/assets/menu/rg_coca.webp"
      },
      {
        id: "rn-agua",
        section: "Naturales",
        sectionEn: "Fresh Drinks",
        sectionPt: "Sucos Naturais",
        name: "Refresco Natural en Agua",
        nameEn: "Fresh Fruit Drink in Water",
        namePt: "Suco Natural com Água",
        description: "Elige tu sabor favorito, preparado en agua.",
        descriptionEn: "Choose your favorite flavor, made with water.",
        descriptionPt: "Escolha seu sabor favorito, preparado com água.",
        basePrice: 1300,
        options: naturalFlavorOptions(),
        extras: []
      },
      {
        id: "rn-leche",
        section: "Naturales",
        sectionEn: "Fresh Drinks",
        sectionPt: "Sucos Naturais",
        name: "Refresco Natural en Leche",
        nameEn: "Fresh Fruit Drink in Milk",
        namePt: "Suco Natural com Leite",
        description: "Elige tu sabor favorito, preparado en leche.",
        descriptionEn: "Choose your favorite flavor, made with milk.",
        descriptionPt: "Escolha seu sabor favorito, preparado com leite.",
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
    categoryNamePt: category.namePt,
    categoryIcon: category.icon,
    categoryColor: category.color,
    categoryImage: category.image
  }))
);
