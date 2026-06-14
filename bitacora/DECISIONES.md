# Decisiones

## 2026-06-13

- Decision: La primera version sera un solo `index.html`.
- Motivo: El usuario quiere un prototipo simple, facil de abrir y sin instalacion.
- Alternativas consideradas: React/Vite o backend con base de datos. Se descartan para la primera version.

## 2026-06-13

- Decision: El formulario pedira solamente nombre, direccion, productos y cantidades.
- Motivo: El usuario indico que no quiere pedir mas datos al cliente.
- Alternativas consideradas: Telefono, email, metodo de pago y notas. Se excluyen de la primera version.

## 2026-06-13 21:21

- Decision: Usar cuatro productos temporales editables dentro del arreglo `productos`.
- Motivo: La lista real del negocio aun no existe y la especificacion permite usar datos simulados.
- Alternativas consideradas: Dejar el catalogo vacio o pedir datos antes de construir. Se descartan para entregar un prototipo funcional.

## 2026-06-13 21:26

- Decision: Convertir el proyecto a React con Vite y usar imagenes generadas como assets locales.
- Motivo: El usuario pidio explicitamente React e imagenes generadas.
- Alternativas consideradas: Mantener el unico `index.html` original o usar placeholders CSS. Se descartan por la nueva instruccion.

## 2026-06-14 01:02

- Decision: Eliminar el lado administrativo y enviar los pedidos directamente por WhatsApp al numero de Pollos Emi.
- Motivo: El usuario indico que solo necesita el lado del cliente y que el restaurante recibira pedidos por WhatsApp.
- Alternativas consideradas: Guardar pedidos en localStorage o mantener panel interno. Se descartan para simplificar el flujo.

## 2026-06-14 01:02

- Decision: Bloquear el boton de pedido fuera del horario de servicio.
- Motivo: El usuario indico que no se deben tomar ordenes fuera de viernes, sabado y domingo en los horarios definidos.
- Alternativas consideradas: Permitir pedidos con aviso de demora. Se descarta porque el requerimiento pide no tomar ordenes.

## 2026-06-14 10:02

- Decision: Separar bebidas en una categoria propia y mover extras a las categorias donde se usan.
- Motivo: El usuario pidio que las bebidas se clasifiquen por tamano/sabor, que tocineta y jamonada sean parte de hamburguesas, y que las salsas extra sean parte de pollo frito/combos.
- Alternativas consideradas: Mantener una categoria generica de extras. Se descarta porque era menos clara para seleccionar.

## 2026-06-14 10:42

- Decision: Compactar productos repetidos usando productos base con opciones obligatorias y extras opcionales.
- Motivo: Reduce duplicacion, mejora la experiencia del cliente y permite calcular el precio final dinamicamente desde el modal.
- Alternativas consideradas: Mantener cada variacion como producto independiente. Se descarta porque hacia el menu mas largo y dificil de mantener.
