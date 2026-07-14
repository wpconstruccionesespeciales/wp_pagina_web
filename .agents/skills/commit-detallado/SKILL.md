---
name: commit-detallado
description: "Pautas e instrucciones detalladas en español para realizar commits de Git semánticos, claros y consistentes utilizando el estándar de Conventional Commits."
---

# Guía de Commits de Git Detallados en Español

Esta skill define las directrices obligatorias para estructurar y redactar mensajes de commit de Git claros, descriptivos y semánticos en español dentro de este repositorio. Se basa en la especificación de **Conventional Commits**.

---

## 1. Estructura General del Mensaje

Todo commit detallado debe seguir la siguiente estructura de tres partes (separadas por líneas en blanco):

```text
<tipo>(<alcance>): <descripción corta en imperativo o presente>

[Cuerpo opcional pero recomendado: Explicación detallada del cambio, el "por qué" y el contexto]

[Pie opcional: Referencias a tareas o issues, ej. "Cierra #12" o "Co-authored-by: ..."]
```

### Reglas Clave:
1.  **Línea de Asunto:** Debe tener un máximo de 50 a 60 caracteres. No debe terminar con punto final.
2.  **Idioma:** Todo el mensaje (tanto asunto como cuerpo y pie) debe redactarse enteramente en **español**.
3.  **Capitalización:** El asunto se escribe completamente en minúsculas (a menos que se citen nombres de variables o archivos exactos).

---

## 2. Tipos de Commits Semánticos

Se debe clasificar el commit usando uno de los siguientes tipos normalizados:

*   **`feat`**: Implementación de una nueva característica o funcionalidad de cara al usuario.
    *   *Ejemplo:* `feat(seo): agregar componente de metadatos dinamicos`
*   **`fix`**: Corrección de un bug, error o mal comportamiento.
    *   *Ejemplo:* `fix(404): solucionar contraste de texto en vista notfound`
*   **`docs`**: Modificaciones exclusivas en archivos de documentación (README, especificaciones, skills).
    *   *Ejemplo:* `docs(skills): crear skill de commits detallados`
*   **`style`**: Cambios estéticos o de formato que no alteran el comportamiento del código (espaciado, indentación, comillas, punto y coma).
    *   *Ejemplo:* `style(notfound): formatear clases tailwind para mejorar lectura`
*   **`refactor`**: Reestructuración de código existente que no añade funcionalidad ni corrige bugs.
    *   *Ejemplo:* `refactor(seo): unificar utilidades de inyeccion en head`
*   **`perf`**: Cambios de código enfocados exclusivamente en la mejora del rendimiento o tiempos de carga.
    *   *Ejemplo:* `perf(imagenes): optimizar imagenes de prensa a webp`
*   **`test`**: Creación o actualización de pruebas unitarias, de integración o de extremo a extremo.
    *   *Ejemplo:* `test(routing): agregar pruebas para redireccion 404`
*   **`chore`**: Tareas rutinarias de mantenimiento, actualización de dependencias, configuración de herramientas de desarrollo (Vite, Tailwind, ESLint).
    *   *Ejemplo:* `chore(deps): actualizar framer-motion a la ultima version`

---

## 3. Redacción del Alcance (Scope)

El alcance entre paréntesis `(<alcance>)` indica la sección del proyecto que se ha modificado. Ejemplos de alcances comunes en este proyecto:
*   `seo`: Cambios transversales de metadatos o tags del head.
*   `wmu`: Modificaciones en las páginas o lógica de arquitectura modular.
*   `notfound` / `404`: Cambios en la vista de error.
*   `componente`: Modificación en un componente reutilizable específico.

---

## 4. Estructuración del Cuerpo del Commit (Detallado)

Para commits que realicen cambios estructurales significativos, el **cuerpo** es obligatorio. Debe redactarse siguiendo estos criterios:

1.  **Explicar el Por Qué:** Centrarse en el contexto del cambio, el problema que resuelve y las razones técnicas de las decisiones tomadas (no explicar el "cómo", ya que eso se lee en el código).
2.  **Formato:** Mantener las líneas con un límite de 72 caracteres para evitar truncamiento en la terminal.
3.  **Estilo de viñetas:** Se pueden utilizar guiones (`-`) para detallar múltiples sub-tareas completadas.

### Ejemplo de Commit Detallado Correcto:

```text
feat(seo): integrar metadatos y marcado schema de negocio local

Se implemento el componente SEO para manejar de forma reactiva las metaetiquetas del head en la aplicacion React. Se inyecto el esquema JSON-LD de tipo HomeAndConstructionBusiness en el Home para mejorar el SEO local en la region del Litoral.

- Creado el componente utilitario src/components/SEO.jsx
- Reemplazada la gestion manual de document.title por etiquetas dinamicas
- Vinculado el logotipo oficial WP.png al marcado estructurado de Schema
- Comprobado que compila sin errores en la ejecucion del build de Vite
```
