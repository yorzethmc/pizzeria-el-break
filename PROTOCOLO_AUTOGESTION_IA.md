# Protocolo de autogestion para la IA

La IA que construya este proyecto debe trabajar de forma autonoma y dejar registro de su trabajo.

## Antes de escribir codigo

1. Leer todos los documentos principales.
2. Revisar la especificacion funcional.
3. Revisar la estructura final esperada.
4. Crear o actualizar una entrada inicial en `bitacora/PROGRESO.md`.
5. Anotar cualquier duda o riesgo en `bitacora/PROBLEMAS.md`.

## Durante el trabajo

La IA debe actualizar la bitacora cada vez que complete una parte importante.

Debe registrar:

- Que se hizo.
- Que se cambio.
- Que problema aparecio.
- Como se resolvio.
- Que queda pendiente.

## Archivos de bitacora

### `bitacora/PROGRESO.md`

Usar para registrar avances.

Formato recomendado:

```md
## YYYY-MM-DD HH:mm

- Avance:
- Archivos modificados:
- Siguiente paso:
```

### `bitacora/PROBLEMAS.md`

Usar para registrar errores, dudas o bloqueos.

Formato recomendado:

```md
## YYYY-MM-DD HH:mm

- Problema:
- Impacto:
- Estado:
- Posible solucion:
```

### `bitacora/CORRECCIONES.md`

Usar para registrar ajustes hechos para arreglar fallos.

Formato recomendado:

```md
## YYYY-MM-DD HH:mm

- Error detectado:
- Correccion aplicada:
- Resultado:
```

### `bitacora/DECISIONES.md`

Usar para registrar decisiones importantes.

Formato recomendado:

```md
## YYYY-MM-DD HH:mm

- Decision:
- Motivo:
- Alternativas consideradas:
```

## Reglas de autonomia

- Si algo se puede resolver con una decision razonable, decidir y documentar.
- Si falta un dato menor, usar un valor temporal y documentarlo.
- Si una decision cambia el alcance, registrarla antes de aplicarla.
- Si hay un bloqueo real, escribirlo claramente en `bitacora/PROBLEMAS.md`.
- No pedir datos extra al cliente final dentro de la app.
- No convertir el proyecto a React en la primera version.

## Criterios de finalizacion

El trabajo se considera terminado cuando:

- Existe `index.html`.
- La app permite seleccionar productos y cantidades.
- La app pide solo nombre y direccion.
- La app guarda pedidos en `localStorage`.
- La app muestra confirmacion.
- La app incluye panel administrativo simple.
- La app es usable en telefono y escritorio.
- La bitacora fue actualizada.

