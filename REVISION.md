# Revisión del 3 de noviembre de 2026

Se contrastó el sitio con la consigna pegada por el usuario. Los dos HTML de tarea y autoevaluación mencionados no estaban disponibles; esa comparación queda pendiente.

| Requisito | Resultado |
| --- | --- |
| Tres páginas con DOCTYPE, idioma español, head/body, UTF-8 y viewport | Comprobado |
| Títulos y descripciones distintos, CSS común, menú relativo uniforme | Comprobado |
| Un main y un h1 por página, jerarquía h1/h2/h3 y pie con nombre y matrícula | Comprobado |
| Inicio: dos section, article con novedad real y fecha válida, aside, details/summary | Comprobado |
| Ocho recursos de texto con significado y cita verificable con blockquote/cite | Comprobado; fuente enlazada en la portada |
| Catálogo con cinco productos, ilustraciones locales, alt y figure/figcaption | Comprobado; figure/figcaption están en la portada |
| ul con sublista en li, ol start=1, dl con tres términos | Comprobado |
| Tabla con caption, thead/tbody/tfoot y scope col/row | Comprobado |
| Cinco filas, rowspan=3 y colspan=2 con distribución de tres columnas | Comprobado |
| Datos de productos sin precios ni existencias inventados | Comprobado: solo usos generales |
| Iframe relacionado, con title y fuente que permite incrustación | Comprobado en navegador; guía local |
| Audio/video con controls y source | Pendiente: falta material confirmado |
| Address con datos confirmados | Responsable y matrícula incluidos; correo y teléfono pendientes |
| Enlaces externo seguro, ancla interna y descarga de archivo real | Comprobado |
| Enlaces mailto y tel | Pendientes: faltan los datos reales |
| Formulario: dos fieldset/legend y siete tipos de input pedidos | Comprobado; además radio y checkbox |
| Radios con name común, select/optgroup, textarea, submit | Comprobado |
| Labels asociados, nombres de campos, ids únicos, required y validaciones adicionales | Comprobado; minlength, maxlength, min, max y pattern |
| Formulario estático sin envío ni almacenamiento y sin confirmación falsa | Comprobado en navegador; submit cancelado, sin peticiones de red |
| Diseño móvil, tarjetas en columna, tabla desplazable, hover y foco visibles | CSS revisado y navegación a 390/1280 px comprobada; capturas móviles guardadas |
| README con nueve familias y justificaciones de etiquetas realmente utilizadas | Comprobado |
| Al menos cinco commits reales | Realizados por etapas, incluyendo la conservación del archivo original |
| GitHub Pages y enlaces de Moodle | Instrucciones en README; publicación y comprobación remota pendientes |

## Validador W3C

Se enviaron los documentos finales mediante POST a `https://validator.w3.org/nu/?out=json`, con tipo `text/html; charset=utf-8`.

- `index.html`: lista de mensajes vacía; sin errores ni advertencias.
- `servicios.html`: lista de mensajes vacía; sin errores ni advertencias.
- `contacto.html`: lista de mensajes vacía; sin errores ni advertencias.
- `guia.html`: lista de mensajes vacía; sin errores ni advertencias.

Las respuestas JSON están guardadas en los archivos `validacion-*.html.json`. Validar la sintaxis no significa que todos los requisitos de la rúbrica estén completos: faltan los datos de contacto y el audio/video.

## Comprobaciones locales

`python verificar.py` revisó archivos enlazados, anclas, IDs únicos, imágenes con alt, labels/names, h1 y main. También consultó el validador.

`python comprobar_navegador.py` utilizó Edge en modo sin ventana con Playwright y un servidor local temporal. Comprobó las tres páginas a 1280 y 390 px, imágenes cargadas, iframe, apertura de details, formulario vacío rechazado, cantidad cero rechazada, formulario válido sin envío ni peticiones de red y descarga de `catalogo.txt`. No se observaron errores JavaScript. Las capturas móviles se guardan en `revision/`.

La primera prueba del iframe esperó su contenido antes de desplazar la vista hacia él. Como usa carga diferida, se corrigió la prueba para mostrar el iframe antes de comprobarlo. La ejecución final pasó.

Para repetir la prueba de navegador hace falta Python con Playwright instalado y Microsoft Edge. Esas herramientas solo se usan para revisión; el sitio funciona sin ellas.

No se ha publicado el sitio ni probado desde GitHub Pages. Los enlaces externos se identifican en el código; se consultó la fuente de la cita y la documentación oficial de Pages, pero no se hizo una auditoría de todos los destinos externos.
