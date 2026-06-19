# Especificaciones del Sistema (SRC.md)
**Proyecto:** Sistema de Objetos Perdidos FCC

## 1. Funcionalidades Principales
1. **Buscador de Objetos:** Motor con barra inteligente y filtros por zona del campus, categoría y orden cronológico.
2. **Registrar Objeto Perdido:** Formulario de reporte con selector de ubicación, carga de imágenes y contacto protegido.
3. **Registrar Objeto Encontrado:** Registro de hallazgos especificando punto de resguardo, estado de custodia y evidencia visual.
4. **Notificación de un Match:** Algoritmo de cruce automático con alertas al alumno, aviso al administrador y panel de confirmación.
5. **Galería de Fotos:** Muro visual en Grid con optimización de imágenes, etiquetas de estado y fotos por defecto.

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
