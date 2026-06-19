# Especificaciones del Sistema (SRC.md)
**Proyecto:** Sistema de Objetos Perdidos FCC

## 1. Funcionalidades Principales
1. **Buscador de Objetos:** Motor con barra inteligente y filtros por zona del campus, categoría y orden cronológico.
2. **Registrar Objeto Perdido:** Formulario de reporte con selector de ubicación, carga de imágenes y contacto protegido.
3. **Registrar Objeto Encontrado:** Registro de hallazgos especificando punto de resguardo, estado de custodia y evidencia visual.
4. **Notificación de un Match:** Algoritmo de cruce automático con alertas al alumno, aviso al administrador y panel de confirmación.
5. **Galería de Fotos:** Muro visual en Grid con optimización de imágenes, etiquetas de estado y fotos por defecto.
6  **Límite de Alertas por Coincidencia: Restricción en el envío de notificaciones masivas estableciendo un tope máximo por búsqueda o día, para evitar la saturación del usuario ante objetos muy comunes (ej. múltiples botellas).

   
## 2. Experiencia de Usuario (UX)
1. **Facilidad de Uso:** Interfaz limpia e intuitiva que permite completar las acciones principales en un máximo de dos clics.
2. **Eficiencia Técnica:** Peticiones optimizadas al servidor, persistencia de sesión segura y sincronización en tiempo real.
3. **Accesibilidad:** Tipografía clara de alta legibilidad, contrastes adecuados y diseño con elementos táctiles amigables.
4. **Navegación Intuitiva:** Estructura jerárquica con botón de retorno universal, pestañas de control e indicadores de ruta claros.
5. **Enfoque Responsivo:** Arquitectura orientada a móviles (*Mobile First*) con menús colapsables y soporte gestual.

## 3. Seguridad y Confianza
1. **Autenticación:** Filtro de acceso institucional con validación estricta de contraseñas y cierre seguro de sesión.
2. **Moderación de Publicaciones:** Panel de control para el administrador con botones de reporte, bloqueo automatizado y archivado.
3. **Anonimato y Privacidad:** Protección de la identidad del alumno, encriptación de datos sensibles y muro público limpio.
4. **Control de Roles (RBAC):** Sistema de permisos jerárquicos segmentado estrictamente en Rol Alumno (0) y Rol Administrador (1).
5. **Registro de Actividad (Logs):** Bitácora automatizada de entregas, rastreo de borrados y auditoría de cambios en el servidor.
6  **Cierre de Sesión por Inactividad: Mecanismo de seguridad que expira y finaliza automáticamente la sesión del usuario tras un periodo de tiempo determinado sin interacción con el sistema.


## Matriz de Priorización (MoSCoW)

### 1. Debe tener (*Must Have*) – Esenciales para el MVP
* **Buscador Inteligente:** Motor de búsqueda con filtros por zona del campus, categoría y orden cronológico.
* **Registrar Objeto Perdido:** Formulario de reporte rápido para alumnos con carga de imágenes y contacto seguro.
* **Registrar Objeto Encontrado:** Registro de hallazgos que documente el punto de resguardo físico y la custodia.
* **Notificación de Match:** Algoritmo automático que cruza datos y envía alertas inmediatas ante una coincidencia.
* **Autenticación Institucional & RBAC:** Control de accesos mediante cuentas institucionales con roles divididos en Alumno (0) y Administrador (1).

### 2. Debería tener (*Should Have*) – Altamente recomendados
* **Galería en Grid Optimizado:** Muro visual rápido con etiquetas de estado para los artículos en resguardo.
* **Diseño Mobile First:** Interfaz completamente adaptada a smartphones con menús colapsables y navegación en dos clics.
* **Moderación de Publicaciones:** Panel de control total para que el administrador pueda bloquear o archivar reportes inapropiados.
* **Anonimato en la Red:** Protección explícita de datos de contacto y anonimato visual en el muro público.

### 3. Podría tener (*Could Have*) – Deseables / Futuras mejoras
* **Sincronización en Tiempo Real:** Actualizaciones automáticas e instantáneas en el feed de la galería sin refrescar el navegador.
* **Indicadores de Ruta Gráficos:** Mapas interactivos del campus integrados en el selector de ubicaciones del formulario.
* **Auditoría del Servidor (Logs):** Bitácora técnica avanzada y rastreo detallado de borrados accidentales o malintencionados.

### 4. No tendrá (*Won't Have*) – Fuera del alcance actual
* **Pasarela de Recompensas Monetarias:** No se gestionarán incentivos financieros ni pagos internos dentro del sistema para evitar fraudes.
* **Chat abierto entre Alumnos:** Para proteger la identidad y evitar el acoso, la comunicación se gestiona únicamente mediante datos encriptados o con el administrador intermediario.
* **Acceso a Usuarios Externos:** El sistema estará restringido exclusivamente a la comunidad universitaria con correo institucional vigente.


