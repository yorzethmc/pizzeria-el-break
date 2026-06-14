# Especificacion funcional

## Nombre del proyecto

Sistema simple de pre-order en un solo HTML.

## Tipo de producto

Prototipo funcional local.

La aplicacion debe funcionar sin servidor. El usuario debe poder abrir `index.html` directamente en un navegador moderno.

## Usuario principal

Cliente que quiere reservar productos antes de entrega o disponibilidad final.

## Datos que se piden al cliente

Solo se deben pedir estos datos:

- Nombre completo.
- Direccion de entrega.
- Productos seleccionados.
- Cantidad por producto.

No pedir:

- Telefono.
- Email.
- Metodo de pago.
- Notas.
- Usuario o contrasena.

## Productos

La aplicacion debe tener un arreglo de productos dentro del JavaScript.

Cada producto debe tener como minimo:

- `id`
- `nombre`
- `descripcion`
- `precio`
- `disponible`
- `imagen` o representacion visual simple

Ejemplo de estructura:

```js
const productos = [
  {
    id: "producto-1",
    nombre: "Producto ejemplo",
    descripcion: "Descripcion corta del producto.",
    precio: 15000,
    disponible: true,
    imagen: "texto, emoji o gradiente visual"
  }
];
```

## Flujo del cliente

1. El cliente abre la app.
2. Ve productos disponibles para pre-order.
3. Ajusta cantidades.
4. Revisa resumen del pedido.
5. Ingresa nombre completo.
6. Ingresa direccion de entrega.
7. Confirma el pedido.
8. La app valida los datos.
9. La app guarda el pedido en `localStorage`.
10. La app muestra pantalla o bloque de confirmacion.

## Validaciones

La app debe validar:

- El nombre no puede estar vacio.
- La direccion no puede estar vacia.
- Debe haber al menos un producto seleccionado.
- Cada producto seleccionado debe tener cantidad mayor a cero.
- No permitir cantidades negativas.
- No permitir cantidades absurdas si se define un maximo.

## Pedido

Cada pedido guardado debe tener:

- `id`
- `fecha`
- `clienteNombre`
- `direccion`
- `items`
- `total`
- `estado`

Estados iniciales:

- `pendiente`
- `confirmado`
- `cancelado`

El estado inicial de un pedido nuevo debe ser `pendiente`.

## Panel administrativo simple

Dentro del mismo `index.html`, la app debe incluir una vista sencilla para revisar pedidos guardados.

El panel debe permitir:

- Ver pedidos guardados.
- Ver nombre del cliente.
- Ver direccion.
- Ver productos y cantidades.
- Ver total.
- Ver fecha.
- Cambiar estado del pedido.
- Borrar pedidos de prueba con confirmacion.

No debe requerir login en la primera version.

## Persistencia

Usar `localStorage`.

Claves sugeridas:

```text
preorder_pedidos
```

La app debe manejar correctamente el caso en que no existan pedidos guardados.

## Diseno

El diseno debe ser:

- Limpio.
- Moderno.
- Facil de usar.
- Responsive.
- Claro en telefono.
- Claro en escritorio.

La primera pantalla debe mostrar el catalogo y la accion de pedido. No hacer una pagina de marketing.

## Restricciones tecnicas

- Un solo archivo `index.html`.
- Sin frameworks.
- Sin backend.
- Sin llamadas a APIs externas.
- Sin instalacion.
- Sin build step.

