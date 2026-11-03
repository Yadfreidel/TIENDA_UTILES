# Tienda de Útiles Escolares

Proyecto académico de Yadfreidel Victoria Lugo, matrícula 2023-4137. Presenta cinco tipos de útiles escolares, sus usos y un formulario de práctica. No realiza ventas ni envía o almacena datos del formulario. No tiene dependencias ni necesita compilación: abre `index.html` en el navegador.

## Decisiones de diseño

Las tres páginas comparten `estilos.css`: fondo claro, encabezado azul oscuro y acento amarillo. Las tarjetas se colocan en una columna en pantallas de hasta 700 px. La tabla tiene un contenedor desplazable. El foco del teclado y el estado al pasar el cursor son visibles. Las ilustraciones SVG son locales, creadas para el proyecto y no representan productos comerciales concretos.

## Etiquetas utilizadas

Estas justificaciones son un borrador: revísalas y adáptalas con tus palabras.

| Familia | Página y sección | Etiquetas usadas | ¿Por qué esa etiqueta? |
| --- | --- | --- | --- |
| Cimientos | Las tres páginas | `html`, `head`, `meta`, `title`, `link`, `body` y declaración DOCTYPE | Identifican un documento HTML, su idioma, codificación, título y hoja de estilos. |
| Encabezados y párrafos | Presentación, catálogo y contacto | `h1`, `h2`, `h3`, `p` | Ordenan el contenido: título principal, secciones y subsecciones sin saltos. |
| Texto, citas y código | Inicio | `strong`, `em`, `mark`, `abbr`, `small`, `q`, `code`, `kbd`, `time`, `blockquote`, `cite` | Destacan importancia, énfasis, un aviso, una abreviatura, información secundaria, el lema propio, un nombre de archivo, una tecla y una fecha. La cita reproduce una frase verificada del documento HTML Living Standard; cite identifica ese documento. |
| Listas | Catálogo y guía | `ul`, `ol`, `li`, `dl`, `dt`, `dd` | Agrupan productos, ordenan pasos y definen palabras del tema. |
| Enlaces | Menús y contacto | `a` | Permiten ir a otras páginas, saltar al formulario, descargar el catálogo, consultar una fuente externa y abrir el correo o la aplicación de llamadas con mailto y tel. |
| Imágenes y multimedia | Inicio y catálogo | `img`, `figure`, `figcaption`, `iframe` | Muestran ilustraciones, su explicación y una guía local incrustada. Audio/video y source están pendientes. |
| Tablas | Catálogo, usos de productos | `table`, `caption`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td` | Relacionan productos con usos y áreas. `scope` identifica encabezados; `rowspan` reúne tres áreas iguales y `colspan` extiende la nota final. |
| Formularios | Contacto, solicitud | `form`, `fieldset`, `legend`, `label`, `input`, `select`, `optgroup`, `option`, `textarea`, `button` | Agrupan datos relacionados y permiten practicar una consulta con etiquetas y validación del navegador. |
| Semántica y div/span | Las tres páginas | `header`, `nav`, `main`, `footer`, `section`, `article`, `aside`, `details`, `summary`, `address`, `div` | Describen la función del contenido. Los div solo agrupan la bienvenida, las tarjetas o la tabla para aplicar estilos. No se utiliza span. |

## Para explicarlo en clase

- Inicio: `section` reúne un tema y lleva un `h2`. `article` contiene una novedad fechada; `time datetime="2026-11-03"` expresa la fecha en un formato que las máquinas entienden.
- Catálogo: `rowspan="3"` hace que el área «Escritura y corrección» abarque cuadernos, lápices y borradores. Las dos filas siguientes no repiten esa celda. La tabla mantiene tres columnas.
- Contacto: `label for="cantidad"` se relaciona con `id="cantidad"`. `required`, `min="1"` y `max="100"` limitan el campo. El navegador valida antes del evento submit; `preventDefault()` evita el envío y muestra un mensaje que explica que no se enviaron datos.

## Pendientes reales

- No se recibieron los dos HTML de instrucciones y autoevaluación mencionados. La lista disponible es la consigna pegada en el chat; falta contrastar los documentos originales.
- Recibir audio o video educativo y añadir `audio` o `video`, `controls` y `source` con el tipo MIME correcto. El iframe no cubre este requisito.
- La portada usa los ocho recursos de texto pedidos, un lema propio identificado como tal y una cita externa verificada con `blockquote` y `cite`.
- No se dispone de un sitio publicado ni de un repositorio remoto. No hay direcciones de entrega confirmadas.

## Validación y publicación

El archivo `REVISION.md` registra las comprobaciones realizadas y sus límites.

Para validar manualmente, entra en https://validator.w3.org/, elige **Validate by File Upload**, selecciona cada uno de los tres HTML y pulsa **Check**. Corrige todos los errores y repite. También revisa `guia.html`. La validación HTML no comprueba que todos los enlaces o contenidos multimedia funcionen.

Para publicar:

1. Crea un repositorio en tu cuenta de GitHub. No incluyas archivos con datos privados.
2. Vincula este repositorio local con el remoto y sube la rama actual con `git push -u origin master`. Primero configura `origin` con la dirección real que GitHub te proporcione.
3. En el repositorio, abre **Settings → Pages** y selecciona publicación desde la rama `master`, carpeta raíz `/`.
4. Espera a que termine el despliegue y copia la dirección que muestre GitHub Pages.
5. Desde esa dirección, abre Inicio, Servicios y Contacto. Revisa imágenes, guía incrustada, descarga y formulario también en móvil.
6. Entrega en Moodle las dos direcciones reales: el sitio publicado y el repositorio. No se han inventado esos enlaces.

El historial se inició conservando la portada existente y registra los cambios reales por etapas. La fecha límite indicada en la consigna es el miércoles 4 de noviembre de 2026 a las 11:55 p. m., hora de Santo Domingo.

Referencia de publicación: [documentación oficial de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). En Source selecciona **Deploy from a branch**, elige la rama y carpeta indicadas y pulsa **Save**.

## Preguntas para practicar

- Inicio: ¿qué diferencia hay entre section y article? ¿Para qué sirve datetime en time?
- Catálogo: ¿por qué la sublista va dentro de un li? ¿Qué diferencia hay entre rowspan y colspan?
- Contacto: ¿cómo se conectan label y un campo? ¿Qué evita preventDefault en este formulario?
