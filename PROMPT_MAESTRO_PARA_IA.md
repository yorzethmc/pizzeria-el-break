# Prompt maestro para la IA constructora

Usa este prompt cuando quieras pedirle a una IA que construya el proyecto.

```text
Quiero que construyas desde cero una aplicacion web de pre-order para un negocio.

IMPORTANTE:
- La primera version debe ser un solo archivo llamado index.html.
- Todo debe estar dentro de ese archivo: HTML, CSS y JavaScript.
- No uses React, Vite, Next.js, backend, base de datos ni dependencias externas.
- No construyas una landing page. La primera pantalla debe ser la experiencia real para hacer pedidos.
- Usa datos simulados de productos dentro del JavaScript.
- Usa localStorage para guardar pedidos en el navegador.

Antes de escribir codigo, lee estos archivos del proyecto:
- README.md
- ESPECIFICACION_FUNCIONAL.md
- PROTOCOLO_AUTOGESTION_IA.md
- referencia/ESTRUCTURA_FINAL_ESPERADA.md

Durante el trabajo debes autogestionarte:
- Actualiza bitacora/PROGRESO.md con lo que haces.
- Actualiza bitacora/PROBLEMAS.md si encuentras errores, dudas o bloqueos.
- Actualiza bitacora/CORRECCIONES.md cada vez que corrijas algo.
- Actualiza bitacora/DECISIONES.md cuando tomes una decision tecnica o de diseno.

Flujo de cliente:
1. El cliente ve la lista de productos disponibles para pre-order.
2. El cliente elige productos y cantidades.
3. El cliente escribe solamente:
   - Nombre completo.
   - Direccion de entrega.
4. El cliente confirma el pedido.
5. La app muestra una confirmacion con resumen del pedido.

El formulario no debe pedir telefono, email, metodo de pago ni notas adicionales en esta primera version.

La app debe incluir:
- Catalogo de productos.
- Selector de cantidad por producto.
- Carrito o resumen de productos elegidos.
- Formulario simple de cliente.
- Validaciones claras.
- Confirmacion del pedido.
- Guardado de pedidos en localStorage.
- Panel administrativo simple dentro del mismo HTML para ver pedidos guardados.
- Boton para limpiar pedidos de prueba.
- Estados visuales claros para errores, exito, carrito vacio y pedidos guardados.
- Diseno profesional, limpio y responsive para telefono y computadora.

Requisitos de calidad:
- Codigo ordenado.
- Nombres claros de funciones y variables.
- Comentarios solo cuando ayuden.
- Sin texto de relleno innecesario.
- Sin dependencias externas obligatorias.
- Debe funcionar abriendo index.html directamente en el navegador.

Al finalizar:
1. Explica brevemente que construiste.
2. Indica como abrir index.html.
3. Indica que archivos de bitacora actualizaste.
4. Menciona cualquier problema pendiente si existe.
```

