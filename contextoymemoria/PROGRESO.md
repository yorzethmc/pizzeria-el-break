# Progreso

## 2026-06-13

- Avance: Se creo la carpeta base de instrucciones para el proyecto de pre-order en un solo HTML.
- Archivos modificados: README.md, PROMPT_MAESTRO_PARA_IA.md, ESPECIFICACION_FUNCIONAL.md, PROTOCOLO_AUTOGESTION_IA.md, referencia/ESTRUCTURA_FINAL_ESPERADA.md y bitacoras iniciales.
- Siguiente paso: Una IA constructora debe leer estos documentos y crear `index.html`.

## 2026-06-13 21:21

- Avance: Se revisaron README.md, ESPECIFICACION_FUNCIONAL.md, PROMPT_MAESTRO_PARA_IA.md, PROTOCOLO_AUTOGESTION_IA.md y referencia/ESTRUCTURA_FINAL_ESPERADA.md antes de crear codigo.
- Archivos modificados: bitacora/PROGRESO.md.
- Siguiente paso: Crear `index.html` con la aplicacion completa en HTML, CSS y JavaScript.

## 2026-06-13 21:26

- Avance: El usuario cambio el alcance y pidio que la aplicacion se haga con React y que incluya imagenes generadas.
- Archivos modificados: bitacora/PROGRESO.md, bitacora/PROBLEMAS.md, bitacora/DECISIONES.md.
- Siguiente paso: Generar assets visuales y migrar la aplicacion a una estructura React/Vite.

## 2026-06-14 01:02

- Avance: Se construyo el menu interactivo de Pollos Emi en React con categorias, buscador, carrito, modos Express/Para llevar, pago condicional, envio por WhatsApp, ubicacion opcional, horario de servicio y footer de creador.
- Archivos modificados: index.html, package.json, package-lock.json, src/App.jsx, src/styles.css, src/menuData.js, public/assets/menu/*.
- Siguiente paso: Revisar con el restaurante si todos los nombres y precios transcritos del menu estan correctos.

## 2026-06-14 10:02

- Avance: Se reorganizaron bebidas y extras del menu: bebidas quedaron en categoria exclusiva por tamano/sabor, tocineta y jamonada pasaron a hamburguesas, y salsas extra pasaron a pollo.
- Archivos modificados: src/menuData.js, src/App.jsx, src/styles.css.
- Siguiente paso: Validar con el restaurante si las salsas extra y envase adicional deben mantenerse visibles para clientes.

## 2026-06-14 10:09

- Avance: Se documento la estructura actual del menu por categorias.
- Archivos modificados: CATEGORIAS_MENU.md, bitacora/PROGRESO.md.
- Siguiente paso: Usar el documento como referencia para futuras reorganizaciones del menu.

## 2026-06-14 10:42

- Avance: Se refactorizo la logica del menu a Producto Base + Opciones + Extras, con modal de configuracion, radio buttons, checkboxes y total dinamico.
- Archivos modificados: src/menuData.js, src/App.jsx, src/components/ProductCard.jsx, src/components/ProductModal.jsx, src/styles.css, CATEGORIAS_MENU.md.
- Siguiente paso: Revisar si todas las combinaciones compactadas mantienen exactamente los precios del menu fisico.

## 2026-07-31 11:21

- Avance: Se soluciono el error en la ruta del favicon en `index.html` (reemplazado `%BASE_URL%` por ruta absoluta para Vite) y se implemento el guardado del carrito en `localStorage` en `App.jsx` cumpliendo con los criterios de finalizacion del protocolo.
- Archivos modificados: `index.html`, `src/App.jsx`, `bitacora/PROGRESO.md`.
- Siguiente paso: Realizar pruebas finales del flujo de compra y validar con el cliente.
