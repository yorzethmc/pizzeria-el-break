# Categorias actuales del menu

Este documento explica como esta organizado actualmente el menu interactivo de Pollos Emi dentro de la app.

La informacion del menu esta en:

```text
src/menuData.js
```

## Modelo de datos actual

El menu ya no usa un producto separado para cada variacion.

Ahora usa este modelo:

```text
Categoria
  Producto base
    Opciones obligatorias
    Extras opcionales
```

Ejemplo:

```text
Producto base: Porcion de Pechuga y Ala
Opcion: Sencilla
Extras: Salsa BBQ, salsa ranch, salsa queso, envase adicional, etc.
```

Cada categoria tiene:

- `id`: identificador interno.
- `name`: nombre completo que ve el cliente.
- `shortName`: nombre corto para botones.
- `icon`: icono visual.
- `color`: color de apoyo visual.
- `image`: imagen de referencia de la categoria.
- `items`: lista de productos base de esa categoria.

Cada producto base tiene:

- `id`: identificador interno.
- `name`: nombre del producto base.
- `description`: descripcion corta.
- `basePrice`: precio base.
- `options`: opciones obligatorias tipo radio button.
- `extras`: adicionales opcionales tipo checkbox.

El precio final se calcula asi:

```text
basePrice + addPrice de la opcion seleccionada + price de extras seleccionados
```

## 1. Pollo

Categoria principal para pollo frito, alitas, palomitas, wrap de pollo y adicionales relacionados con pollo.

Incluye productos base como:

- Porcion de Pechuga y Ala.
- Porcion de Cuarto y Muslo.
- Piezas de pollo.
- Palomitas de pollo.
- Wrapp de pollo.

Tambien incluye salsas extra, porque estas se usan principalmente con pollo frito:

- Salsa extra BBQ.
- Salsa extra bufalo.
- Salsa extra ranch.
- Salsa extra mostaza miel.
- Salsa extra tartara.
- Salsa extra rosada.
- Salsa extra queso.

Por ahora tambien contiene:

- Envase adicional.

## 2. Hamburguesas

Categoria para hamburguesas de pollo, hamburguesas de carne, hamburguesas pequenas, gemelitas y extras propios de hamburguesas.

Incluye productos base como:

- Hamburguesa de pollo.
- Hamburguesa de carne.

Tambien incluye extras individuales para hamburguesas:

- Extra tocineta.
- Extra jamonada.

## 3. Arroces enteros

Categoria para platos de arroz cantones y combinaciones con pollo, alitas, pescado o camarones.

Incluye producto base:

- Arroz cantones.

Sus variaciones estan en opciones, por ejemplo:

- Especial arreglado.
- Con 2 alitas.
- Con 4 alitas.
- Con porcion cuarto y muslo.
- Con filet de pescado empanizado.
- Arroz con camarones.
- Camarones con arroz.

## 4. Papas

Categoria para papas fritas y preparaciones con papas.

Incluye productos base como:

- Papas fritas.
- Papas arregladas.

## 5. Antojitos

Categoria para productos variados de comida rapida que no son pollo principal, arroz, papas o hamburguesas.

Incluye productos base como:

- Pescado y camarones.
- Tacos.
- Torta de carne casera arreglada.
- Yuca frita.
- Palitos de queso.
- Ceviche de pescado.

## 6. Combos

Categoria separada para combos. No se mezcla con antojitos ni con bebidas.

Incluye producto base:

- Combo de pollo frito.
- Combo infantil.

Sus variaciones estan en opciones:

- Combo cuarto y muslo + papas.
- Combo pechuga y ala + papas.
- #1: 2 alitas empanizadas, papas fritas y refresco de 350ml.
- #2: hamburguesa pequena de pollo o carne, papas fritas y refresco de 350ml.

## 7. Bebidas

Categoria exclusiva para refrescos.

Las bebidas estan separadas por tamano y sabor para que sea mas facil seleccionarlas.

Incluye productos base por sabor:

- Pepsi.
- Mundial pina.
- Mundial kola.
- Mundial zarza.

Los tamanos estan como opciones:

- 350ml cuando aplica.
- 2L cuando aplica.
- 2.5L para Pepsi.

## Resumen de categorias

Actualmente la app muestra estas categorias al cliente:

```text
Todo
Pollo
Hamburguesas
Arroces
Papas
Antojitos
Combos
Bebidas
```

La categoria `Todo` no existe como categoria dentro del archivo de datos. Es un filtro de la interfaz que muestra todos los productos juntos.

## Nota importante

La categoria antigua `Bebidas y extras` fue eliminada.

Los productos que estaban ahi se reorganizaron asi:

- Bebidas pasaron a `Bebidas`.
- Tocineta y jamonada pasaron a `Hamburguesas`.
- Salsas extra pasaron a `Pollo`.
- Envase adicional quedo temporalmente en `Pollo`.
