# Plantilla: Sistema de Pre-order Interactivo

Esta es una plantilla básica (skeleton) de una aplicación web para tomar pedidos de pre-order. 

## Objetivo

Proporcionar una estructura genérica que pueda ser adaptada a cualquier proyecto, negocio o tienda. El sistema permite mostrar un menú organizado por categorías, productos base, opciones obligatorias y extras adicionales.

Al cliente solo se le pide:
- Nombre completo.
- Dirección de entrega.
- Detalles del pedido.

## Características

- Sin backend (funciona solo con frontend HTML/JS/CSS o React/Vite).
- Envía el pedido listo a través de WhatsApp.
- Persistencia temporal o envío directo.
- Arquitectura por capas (Categoría > Producto Base > Opciones > Extras).

## Personalización

Para adaptar esta plantilla a tu negocio, edita los siguientes archivos:
- `src/menuData.js`: Para cambiar las categorías, productos, precios y opciones.
- `src/App.jsx`: Para configurar tu número de WhatsApp y nombre del negocio.
- `index.html`: Para ajustar el título de la página.

## Ejecutar el Proyecto

```bash
npm install
npm run dev
```
