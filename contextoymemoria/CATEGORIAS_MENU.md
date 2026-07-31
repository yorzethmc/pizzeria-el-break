# Categorías del Menú (Plantilla)

Este documento explica cómo está organizado el menú interactivo dentro de la aplicación.

La información del menú se configura en el archivo:

```text
src/menuData.js
```

## Modelo de datos

El sistema utiliza una arquitectura por capas para definir cada producto:

```text
Categoría
  Producto base
    Opciones obligatorias
    Extras opcionales
```

Ejemplo:
```text
Producto base: Hamburguesa de la Casa
Opciones: Sencilla, Doble, Triple
Extras: Extra queso, Extra tocino
```

## Estructura de Objetos

Cada **Categoría** contiene:
- `id`: identificador interno (ej. "categoria-1").
- `name`: nombre completo visible (ej. "Categoría 1").
- `shortName`: nombre corto para botones.
- `icon`: icono visual (emoji o imagen).
- `color`: clase de color para el diseño visual.
- `items`: lista de productos base pertenecientes a la categoría.

Cada **Producto base** contiene:
- `id`: identificador interno.
- `name`: nombre del producto base.
- `description`: descripción corta para el cliente.
- `basePrice`: precio base de la configuración por defecto.
- `options`: opciones obligatorias (tipo radio button). El usuario debe elegir exactamente una.
- `extras`: adicionales opcionales (tipo checkbox). El usuario puede elegir varios o ninguno.

## Cálculo del Precio

El precio final de un producto en el carrito se calcula de la siguiente manera:

```text
Precio Final = basePrice + addPrice (de la opción) + sum(price de los extras seleccionados)
```

## Adaptación a tu negocio

Puedes modificar libremente el archivo `menuData.js` para reflejar la estructura de tu negocio. Simplemente reemplaza el arreglo `menuCategories` con tus propios datos siguiendo esta misma estructura de capas.
