# Skill: Commit Automático por Cambio

Esta es una habilidad (skill) del proyecto para guiar a los agentes de IA en el control de versiones preciso del desarrollo.

## Objetivo
Asegurar que cada cambio lógico, feature o corrección esté perfectamente aislado en su propio commit de Git.

## Instrucciones para el Agente

Cuando se realice cualquier modificación en el código, el agente debe seguir este flujo:

1. **Guardar los cambios**: Asegurarse de que todos los archivos editados estén guardados en el disco.
2. **Revisar el estado**: Ejecutar `git status` para ver los archivos modificados.
3. **Probar el cambio**: Validar que el código compila y pasa las pruebas pertinentes (ej. `npm run build`).
4. **Staging**: Añadir los archivos correspondientes:
   ```bash
   git add <archivos_modificados>
   ```
5. **Crear el Commit**: Confirmar los cambios con un mensaje claro y conciso:
   ```bash
   git commit -m "<tipo>: <descripción corta del cambio>"
   ```

> [!CAUTION]
> **PROHIBICIÓN DE GIT PUSH**: Bajo ninguna circunstancia el agente debe ejecutar `git push` o subir cambios a un repositorio remoto (`origin`). Todos los cambios y commits deben ser guardados únicamente en el entorno local de forma local. El usuario se encargará de realizar el push a `origin` de forma manual.


## Ejemplos de Mensajes de Commit
- `feat: agregar sección de contacto en footer`
- `fix: corregir espaciado horizontal de columnas en footer`
- `docs: añadir archivo de reglas del proyecto`
- `chore: actualizar dependencias en package.json`
