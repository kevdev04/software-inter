# Proyecto: Objetos Perdidos

## Resumen
La propuesta consiste en desarrollar una página que permita registrar, consultar y gestionar reportes de objetos perdidos y encontrados de manera rápida y accesible. Mediante la publicación de fotografías, descripciones y ubicaciones aproximadas, los usuarios podrán identificar coincidencias entre artículos reportados como perdidos y aquellos encontrados por otros miembros de la comunidad.

## Problemática

Cuando pierdes algo, es difícil encontrar los objetos perdidos, debes buscar en todos lados, preguntar en grupos de WhatsApp, Facebook, preguntar con compañeros o secretaria académica, y muchas veces la comunicación no es eficiente, la mayoria de compañeros termina dando por peridos sus objetos extraviados.

## Impacto

Muchos terminan perdiendo cosas importantes como llaves, documentos o hasta laptops, perdiendo tiempo preguntando a la gente en grupos, a trabajadores y compañeros sin encontrar sus objetos extraviados con exito en corto tiempo.

## Solución 

Una plataforma donde puedas subir una foto y descripción de lo que perdiste o de lo que encontraste. Así, si alguien ya lo subió, se hace "match" y es más fácil localizarlo. 

## Alcance del proyecto

Durante el periodo de desarrollo se implementarán las siguientes funcionalidades principales:

Registro de reportes de objetos perdidos.
Registro de reportes de objetos encontrados.
Consulta y búsqueda de reportes.
Visualización de detalles de cada objeto.
Gestión básica de coincidencias entre reportes.
Interfaz web intuitiva y adaptable a dispositivos móviles.

## Justificación de la Metodología de Desarrollo

Para el desarrollo de este proyecto se ha seleccionado la metodología kanban. 

## ¿Por qué usamos la metodología Kanban?

Para armar esta aplicación decidimos usar Kanban porque es la forma más organizada y visual de trabajar. 

### 1. Se adapta a nuestros tiempos
A diferencia de otras formas de trabajo que te obligan a entregar avances cada semana con fechas muy estrictas, Kanban nos permite avanzar a nuestro propio ritmo. Si una semana tenemos mucho tiempo libre, avanzamos bastante; si otra semana se nos complica por cualquier imprevisto, el proyecto no se arruina, simplemente se queda pausado exactamente donde lo dejamos.

### 2. Nos ayuda a terminar lo que empezamos (Limitación del WIP)
En Kanban hay una regla muy importante: **no puedes abrir muchas tareas al mismo tiempo**. Nos pusimos un límite de máximo 2 tareas a la vez en la columna "En Proceso". Esto nos obliga a terminar bien una pantalla o una función antes de empezar a programar la siguiente, evitando que el proyecto se llene de cosas a medias que no funcionan.

### 3. Lanzar la app por partes
El problema de perder cosas en la escuela necesita una solución rápida. Kanban nos ayuda a ver qué es lo más urgente para armar una primera versión básica pero útil. En cuanto terminamos una función importante (como el formulario para subir la foto), ya la podemos agregar a la app sin tener que esperar a que todo lo demás esté listo.

### 4. Todo es muy visual
Con un tablero dividido en columnas (*Por hacer, En proceso, Hecho*), cualquiera puede entrar y ver en un segundo qué se está programando hoy, qué está pendiente y qué ya se terminó. Así no perdemos tiempo en juntas para ver cómo va el proyecto.

## Riesgos del Proyecto

### 1. Cambios en los requisitos
Descripción: Durante el desarrollo pueden surgir nuevas ideas o funcionalidades que no estaban contempladas inicialmente.

Impacto: Alto.

Consecuencia: Retrasos en las entregas y aumento de la carga de trabajo.

Mitigación: Definir claramente el alcance desde el inicio y priorizar únicamente las funcionalidades esenciales.

### 2. Tiempo insuficiente de desarrollo
Descripción: El periodo de 3 a 4 semanas es limitado para implementar todas las funcionalidades deseadas.

Impacto: Alto.

Consecuencia: Algunas características podrían quedar incompletas o requerir simplificaciones.

Mitigación: Dividir el trabajo en tareas pequeñas y priorizar un Producto Mínimo Viable (MVP).

### 3. Errores en la gestión de datos

Descripción: Fallos al registrar, almacenar o recuperar información de los objetos reportados.

Impacto: Alto.

Consecuencia: Información incorrecta o pérdida de reportes.

Mitigación: Implementar validaciones, realizar pruebas funcionales y respaldar la información


## Estructura del proyecto
* `/docs`: Archivos extra.
* `/src`: Aquí irá el código.
* `/assets`: Imágenes.
* `/data`: Datos de prueba.
* `README.md`: Este archivo.

## Stack tecnológico
* **Frontend:** Next.js 15 con TypeScript
* **Styling:** Tailwind CSS
* **Linting:** ESLint
* **Backend:** JavaScript
* **Base de datos:** MySQL

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Build

```bash
npm run build
npm start
```
