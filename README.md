# Proyecto: Objetos Perdidos

## Resumen
La propuesta consiste en desarrollar una página que permita registrar, consultar y gestionar reportes de objetos perdidos y encontrados de manera rápida y accesible. Mediante la publicación de fotografías, descripciones y ubicaciones aproximadas, los usuarios podrán identificar coincidencias entre artículos reportados como perdidos y aquellos encontrados por otros miembros de la comunidad.

## ¿Cuál es el problema?

* **Lo que pasa ahora:** Cuando pierdes algo, tienes que ir a preguntar a vigilancia, a las oficinas o a la cafetería, y casi siempre nadie sabe nada. Es un desorden.
* **Lo que afecta:** Muchos terminan perdiendo cosas importantes como llaves, documentos o hasta laptops. También le hacemos perder tiempo a la gente que trabaja en la escuela atendiendo a todos los que preguntan lo mismo.
* **La idea:** Una plataforma donde puedas subir una foto y descripción de lo que perdiste o de lo que encontraste. Así, si alguien ya lo subió, se hace "match" y es más fácil localizarlo. 

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
