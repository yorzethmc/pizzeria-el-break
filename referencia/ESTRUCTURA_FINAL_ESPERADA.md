# Estructura final esperada

Cuando una IA construya el proyecto, la carpeta deberia quedar asi:

```text
preorder-html-instrucciones/
  index.html
  README.md
  PROMPT_MAESTRO_PARA_IA.md
  ESPECIFICACION_FUNCIONAL.md
  PROTOCOLO_AUTOGESTION_IA.md
  referencia/
    ESTRUCTURA_FINAL_ESPERADA.md
  bitacora/
    PROGRESO.md
    PROBLEMAS.md
    CORRECCIONES.md
    DECISIONES.md
```

## Contenido esperado de `index.html`

El archivo debe contener:

- HTML semantico.
- Estilos dentro de una etiqueta `<style>`.
- Logica dentro de una etiqueta `<script>`.
- Datos simulados de productos.
- Funciones para renderizar catalogo.
- Funciones para manejar cantidades.
- Funciones para validar el pedido.
- Funciones para guardar y leer pedidos de `localStorage`.
- Vista o seccion de administracion.

## Secciones sugeridas de la interfaz

- Encabezado simple con nombre del sistema.
- Catalogo de productos.
- Resumen del pedido.
- Formulario de cliente.
- Confirmacion.
- Panel administrativo.

## Productos de ejemplo

La IA puede usar productos temporales si el usuario no entrega una lista real.

Ejemplo:

```text
Producto 1: Pack Energia
Producto 2: Pack Bienestar
Producto 3: Pack Familiar
Producto 4: Producto Individual
```

Los nombres pueden cambiar despues. Lo importante es que la app permita editar facilmente el arreglo de productos.

## Reglas visuales

- Botones claros.
- Mensajes de error visibles.
- Resumen del pedido siempre facil de entender.
- Buen espacio entre elementos en movil.
- No usar colores que dificulten lectura.
- No saturar la pantalla con texto explicativo.

