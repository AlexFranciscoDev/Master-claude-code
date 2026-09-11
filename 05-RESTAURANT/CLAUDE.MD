# CLAUDE.md

Proyecto:
Aplicación web de tipo buscador de películas

Rol del agente:
Desarrollador web con 12 años de experiencia.

Objetivo:
Crea una aplicación web para un restaurante donde se puedan hacer reservas y gestionar la carta. (Todo se podrá administrar en un panel de administración)

Funcionalidades de la aplicación:
- Login y registro (supabase)
- Los clientes se pueden registrar para hacer reservas
- Los clientes tienen un rol "cliente" con acceso solo a la par pública.
- Y los usuarios de la base de datos que tengan un rol "admin" (rol asignado manualmente), podrán entrar al panel de administración.
- Panel de administración privado
    - Dentro del panel se podrá:
        - Listado de reservas
        - Modificar reserva
        - Cancelar reservas
        - Gestionar la carta del restaurante
        (crud de platos, crud de secciones de la carta, cada plato irá asignado a una de estas secciones, por ejemplo (entrantes, hamburguesas, postres))
- En la parte publica:
    - Para hacer reservas necesitamos estar logueados:
        - Seleccionar fecha de reserva
        - Selección de franja horaria
        - Comprobación de disponibilidad
        - Crear reserva (necesitamos estar logueados)
        - Cancelar reserva
    - Sin necesidad de estar identificados:
        - Ver la carta y ver las diferentes páginas de la web

- En general:
    - Protección de rutas
    - Validación de solapamiento
    - Mensajes de confirmación



Información del api externa:
- El api que vamos a usar es TMDB (The Movie Database), que el api es gratis.
- La url de la documentación son estas (si no sbes como hacer algo con el api, investiga en la documentación):
https://developer.themoviedb.org/reference/getting-started
https://developer.themoviedb.org/docs/getting-started
- El API KEY para usar el api rest, lo tendrás en el fichero .env que está en la raiz del proyecto. La variable que tienes que usar es API_KEY y debes usar la libreria dotenv para acceder a ella (si no está instalada instalala).

Stack de tecnologías:
- HTML5
- CSS (con Tailwind)
- Javascript
- React
- Base de datos y backend: Supabase

Preferencias generales:
- Todos los textos visibles en la web deben estar en inglés

Preferencias de diseño:
- Basate en el documento HTML del diseño que tienes en la carpeta design del proyecto.

Preferencias de estilos:
- Colores (los del diseño)
- Uso de medidas en rem, usando un font-size base de 10px
- Uso de HTML5 y CSS3 nativo
- Uso de buenas prácticas de maquetación CSS y si es necesario usa Flexbox y CSS Grid layout
- Que la webapp sea responsive.

Preferencias de código:
- No añadas dependencias externas
- HTML debe ser semántico (header, section, footer...)
- Usa siempre let o const y no uses nunca var
- No uses alert, confirm o prompt, todo el feedback debe ser visual en el dom
- Toda alerta o ventana modal que aparezca debe tener el mismos estilo
- No uses innerHTML, todo el contenido debe ser insertado con appenChild o previamente creando un elemento con document.createElement
- Cuido con olvidar prevenir el default en los eventos submit o click
- Prioriza el código legible y mantenible.
- Prioriza que el código sea sencillo de entender.
- Si el agente duda, que revise las especificaciones del proyecto y si no que pregunte al usuario

Estructura de archivos:
- carpeta (design)
- CLAUDE.md
- Estrucutra de ficheros más adecuada para proyectos de react (lo elige el agente de IA)
