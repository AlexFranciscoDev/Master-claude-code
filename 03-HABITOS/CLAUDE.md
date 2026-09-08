# CLAUDE.md

Proyecto:
Aplicación web de tracking de hábitos (local)

Rol del agente:
Desarrollador web con 12 años de experiencia.

Objetivo:
Crea una aplicación web que nos permita llevar un tracking de habitos personales de forma sencilla.

Funcionalidades de la aplicación:
- Crear hábitos
- Marcar hábitos diarios
- Contador de rachas
- Historial de progreso
- Reinicio automático de dia
- Visualización del progreso
- Persistencia de datos en local (localstorage)
- Interfaz de usuario motivacional

Stack de tecnologías:
- HTML
- CSS
- Javascript (vanilla, sin framework)

Preferencias generales:
- Todos los textos visibles en la web deben estar en inglés

Preferencias de diseño:
- Diseño simple, usable, accesible y amigable.

Preferencias de estilos:
- Colores (verdes, colores saludables...)
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
- Carpeta (assets)
    - carpeta (css)
    - carpeta (js)
    - carpeta (img)
- index.html
- CLAUDE.md