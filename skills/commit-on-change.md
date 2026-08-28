# Skill: Commit Obligatorio por Cambio

> **REGLA OBLIGATORIA DEL PROYECTO:** toda feature, corrección o cambio lógico terminado debe quedar en uno o más commits locales antes de informar que está terminado.

## Objetivo

Asegurar que cada cambio lógico, feature o corrección esté aislado en uno o más commits de Git. Esta skill debe aplicarse automáticamente cada vez que el agente modifica código, configuración o documentación del proyecto.

## Instrucciones para el Agente

Cuando se realice cualquier modificación en el código, configuración o documentación, el agente debe seguir este flujo. No se debe declarar la tarea terminada sin completar el commit, salvo que el usuario pida explícitamente no hacer commits o exista un bloqueo real de Git que se informe claramente.

1. **Guardar los cambios**: Asegurarse de que todos los archivos editados estén guardados en el disco.
2. **Revisar el estado**: Ejecutar `git status`, `git diff` y `git log --oneline -10` para identificar cambios propios y ajenos.
3. **Definir el alcance**: Separar features, correcciones y cambios no relacionados en commits independientes. No incluir cambios ajenos.
4. **Probar el cambio**: Validar que el código compila y pasa las pruebas pertinentes, por ejemplo `npm run build`. Si una validación falla por una causa preexistente o externa, registrarla claramente.
5. **Staging**: Añadir solo los archivos correspondientes:
   ```bash
   git add <archivos_modificados>
   ```
6. **Revisar el staging**: Ejecutar `git diff --cached` y confirmar que no contiene secretos, archivos accidentales ni cambios ajenos.
7. **Crear el commit**: Confirmar los cambios con Conventional Commits:
   ```bash
   git commit -m "<tipo>(<alcance>): <descripción corta del cambio>"
   ```
8. **Confirmar el resultado**: Ejecutar `git status` y verificar que el commit contiene únicamente los archivos intencionados. Si quedan cambios ajenos, no modificarlos ni incluirlos.

> [!CAUTION]
> **PROHIBICIÓN DE GIT PUSH**: Bajo ninguna circunstancia el agente debe ejecutar `git push` o subir cambios a un repositorio remoto (`origin`). Todos los cambios y commits deben quedar únicamente en el entorno local. El usuario se encargará del push manualmente.

## Ejemplos de Mensajes de Commit

- `feat(contact): derivar consultas a WhatsApp`
- `fix(footer): corregir enlace de cotización`
- `docs(workflow): documentar commits obligatorios`
- `chore(deps): actualizar dependencias`
