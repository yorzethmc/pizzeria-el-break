# Especificación Funcional

## Nombre del Proyecto
Plantilla Base - Sistema de pre-order.

## Tipo de Producto
Prototipo web funcional (Frontend Only).

## Objetivo
Proveer un esqueleto genérico para configurar menús interactivos donde el cliente seleccione productos, variaciones, extras, y envíe su pedido por WhatsApp de forma simplificada.

## Datos Solicitados al Cliente
Solo se pedirán los siguientes datos esenciales:
- Nombre completo.
- Dirección de entrega (si aplica).
- Método de pago.

## Flujo del Cliente
1. El cliente entra a la aplicación.
2. Navega por las diferentes categorías de productos.
3. Selecciona un producto y configura sus opciones obligatorias y extras.
4. Ajusta la cantidad deseada y lo agrega al carrito.
5. Revisa el resumen del pedido.
6. Ingresa sus datos (nombre, dirección).
7. Confirma el pedido.
8. La aplicación redirige a WhatsApp con un mensaje pre-formateado.

## Validaciones
La aplicación validará:
- El nombre no puede estar vacío.
- Si es pedido a domicilio, la dirección no puede estar vacía.
- Si el pago es en efectivo, el monto de pago no puede estar vacío.
- Debe haber al menos un producto en el carrito.
- El servicio respeta las ventanas de horario configuradas (SERVICE_WINDOWS en `App.jsx`).

## Diseño
- Limpio, moderno, adaptable a cualquier dispositivo móvil o de escritorio (Responsive Design).
- Fácil navegación con botones rápidos por categoría y búsqueda en tiempo real.
