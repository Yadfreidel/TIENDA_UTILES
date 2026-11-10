# Tienda de Útiles Escolares

Proyecto académico de **ISW-311 Tecnologías de Internet I**. Es una tienda de útiles escolares (cuadernos, lápices, borradores, sacapuntas, mochilas y reglas) pensada para estudiantes y sus familias. El sitio tiene tres páginas: una portada, un catálogo con buscador y filtro por categoría, y un formulario de contacto que se valida con JavaScript. No realiza ventas y no envía ni guarda los datos del formulario. Los precios son de referencia.

Está hecho con **HTML, CSS y JavaScript puros**, sin frameworks ni librerías.

**Sitio publicado:** https://yadfreidel.github.io/TIENDA_UTILES/
**Repositorio:** https://github.com/Yadfreidel/TIENDA_UTILES
**Autora:** Yadfreidel Victoria Lugo · Matrícula 2023-4137

## Capturas

| Portada en escritorio | Catálogo en escritorio |
| --- | --- |
| ![Portada con el main y el aside en dos columnas](docs/capturas/inicio-escritorio.png) | ![Catálogo con buscador, filtro y seis tarjetas](docs/capturas/catalogo-escritorio.png) |

| Contacto: formulario con errores | Portada en móvil (360 px) con el menú abierto | Catálogo en modo oscuro |
| --- | --- | --- |
| ![Formulario con mensajes de error en rojo](docs/capturas/formulario-errores.png) | ![Portada en móvil con el menú hamburguesa abierto](docs/capturas/movil-menu-abierto.png) | ![Catálogo en modo oscuro](docs/capturas/modo-oscuro.png) |

## Mapa de etiquetas

| Familia | Página y sección | Etiquetas usadas | ¿Por qué esa etiqueta? |
| --- | --- | --- | --- |
| 1. Cimientos | Las tres páginas (y `guia.html`), dentro del `head` | `<!DOCTYPE html>`, `html lang="es"`, `head`, `meta charset="UTF-8"`, `meta name="viewport"`, `meta name="description"`, `title`, `link rel="stylesheet"`, `script defer`, `body` | <!-- REVISAR --> Pongo `lang="es"` porque el sitio está en español. El `viewport` hace que se vea bien en el celular. Uso `defer` para que el script se ejecute cuando el HTML ya cargó. |
| 2. Semántica y estructura | Las tres páginas | `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `div`, `span` | <!-- REVISAR --> Cada etiqueta dice qué es esa parte: el `nav` es el menú y el `aside` (en Inicio) es información aparte. Uso `article` para la «Novedad del proyecto» y para cada tarjeta, porque se entienden solos. Uso `div` solo para el diseño (portada, filtros, tarjetas, galería, tabla) y `span` para el año y los errores. |
| 3. Encabezados | Las tres páginas | `h1`, `h2`, `h3` | <!-- REVISAR --> Hay un solo `h1` por página, en el header. Cada sección empieza con `h2`, y los subtítulos de Servicios y las tarjetas usan `h3`. No salto niveles. |
| 4. Texto y citas | Inicio («Sobre el proyecto», «Qué ofrecemos», «Novedad del proyecto», aside), Contacto («Acerca del contacto») y el footer | `strong`, `em`, `mark`, `abbr`, `small`, `q`, `code`, `kbd`, `blockquote cite`, `cite`, `time datetime`, `address`, `details`, `summary` | <!-- REVISAR --> Con `strong` y `mark` destaco lo importante, y `abbr` explica la sigla HTML. Uso `q` para el lema y `blockquote` con `cite` para la cita del estándar. `time` lleva la fecha en formato que entiende la computadora, y `address` agrupa los datos de contacto. `details` esconde una pregunta frecuente. |
| 5. Listas | Servicios («Organiza tu solicitud») y `guia.html` | `ul` con una sublista `ul` dentro de un `li`, `ol type="a"`, `li`, `dl`, `dt`, `dd` | <!-- REVISAR --> La sublista agrupa los útiles de escritura dentro de su categoría. El `ol type="a"` numera los pasos con letras porque el orden importa. El `dl` define tres palabras del catálogo. |
| 6. Enlaces | Menú de las tres páginas, Inicio («Novedad del proyecto» y aside) y Contacto («Acerca del contacto») | `a` interno entre páginas, externo con `target="_blank" rel="noopener"`, `mailto:`, `tel:`, `#solicitud` y `download` | <!-- REVISAR --> El enlace externo abre en otra pestaña y avisa en el texto. `rel="noopener"` es por seguridad. `mailto:` y `tel:` abren el correo y el teléfono. `#solicitud` baja directo al formulario y `download` descarga `catalogo.txt`. |
| 7. Multimedia | Inicio («Sobre el proyecto»), Servicios («Materiales para tus clases», tarjetas, «Guía visual de estudio») | `img` con `alt`, `width` y `height`, `figure`, `figcaption`, `iframe title` | <!-- REVISAR --> Todas las imágenes tienen `alt` para quien no puede verlas. `figure` y `figcaption` unen la imagen con su explicación. El `iframe` tiene `title` para que el lector de pantalla diga qué muestra. **Pendiente:** no hay `audio` ni `video`. |
| 8. Tablas | Servicios («Usos de los productos») | `table`, `caption`, `thead`, `tbody`, `tfoot`, `tr`, `th scope="col"`, `th scope="row"`, `td`, `rowspan="4"`, `colspan="3"` | <!-- REVISAR --> La tabla relaciona producto, uso, precio y área. `scope` dice si el encabezado es de columna o de fila. `rowspan="4"` une cuatro productos del mismo área y `colspan="3"` estira la nota del pie. |
| 9. Formularios | Contacto («Practica una solicitud») | `form novalidate`, 2 `fieldset` con `legend`, `label for` + `id`, `input` de 9 tipos (`text`, `email`, `tel`, `number`, `date`, `time`, `file`, `radio`, `checkbox`), `select` con `optgroup` y `option`, `textarea`, `button type="submit"`, `required`, `minlength`, `min`, `max`, `pattern`, `span.error` + `aria-describedby` | <!-- REVISAR --> Cada `label` está unido a su campo con `for` e `id`. Los atributos `required`, `minlength`, `min`, `max` y `pattern` dicen las reglas en el HTML. Uso `novalidate` para que mis mensajes de JavaScript reemplacen a los del navegador. Cada error sale en un `span` enlazado con `aria-describedby`. |

## Funcionalidades de JavaScript

Todo está en `js/app.js`. Cada parte revisa con `if (elemento)` que su elemento exista, así el mismo archivo sirve en todas las páginas sin errores en la consola.

| Funcionalidad | Página | Evento | Función principal |
| --- | --- | --- | --- |
| Menú hamburguesa: abre y cierra el menú y cambia `aria-expanded` | Las tres | `click` en `#boton-menu` | `alternarMenu()` |
| Modo oscuro: pone o quita la clase `oscuro` y lo guarda en `localStorage` | Las tres | `click` en `#boton-tema` | `alternarTema()` y `actualizarTextoBotonTema()` |
| Aplicar el tema guardado al abrir la página | Las tres y `guia.html` | Carga del script | `localStorage.getItem("tema")` |
| Año automático en el footer (`#anio`) | Las tres | Carga del script | `new Date().getFullYear()` |
| Detalle propio: botón «volver arriba» que aparece después de bajar 300 px | Las tres | `scroll` | `revisarScroll()` |
| Detalle propio: subir suavemente al inicio | Las tres | `click` en `#boton-arriba` | `volverArriba()` |
| Pintar las tarjetas desde el arreglo `productos` (6 objetos) | Servicios | Carga del script | `pintarTarjetas(lista)` |
| Formato de moneda en pesos dominicanos (`es-DO`, `DOP`) | Servicios | Al pintar cada tarjeta | `formatearPrecio(precio)` |
| Buscador por nombre | Servicios | `input` en `#buscador` | `filtrarProductos()` |
| Filtro por categoría | Servicios | `change` en `#filtro-categoria` | `filtrarProductos()` |
| Contador «Mostrando X de Y productos» | Servicios | `input` y `change` | `filtrarProductos()` |
| Mensaje cuando no hay resultados (`#sin-resultados`) | Servicios | `input` y `change` | `filtrarProductos()` |
| Validar el formulario sin recargar la página | Contacto | `submit` | `validarFormulario(event)` |
| Regla: nombre obligatorio, de 3 letras o más | Contacto | `submit` | `validarFormulario()` → `mostrarError()` |
| Regla: correo con formato válido | Contacto | `submit` | `validarFormulario()` con `patronCorreo` |
| Regla propia: la confirmación debe ser igual al correo | Contacto | `submit` | `validarFormulario()` |
| Regla propia: teléfono dominicano (809, 829 u 849 + 7 dígitos) | Contacto | `submit` | `validarFormulario()` con `patronTelefono` |
| Regla: elegir un producto | Contacto | `submit` | `validarFormulario()` |
| Regla propia: cantidad entre 1 y 50 si se escribe | Contacto | `submit` | `validarFormulario()` |
| Regla propia: la fecha no puede ser pasada | Contacto | `submit` | `esFechaPasada(textoFecha)` |
| Borrar el error cuando se corrige el campo | Contacto | `input` en cada campo validado | `limpiarError(campo)` |
| Resumen de éxito y formulario vacío | Contacto | `submit` sin errores | `mostrarExito()` y `agregarDato()` |

## Cómo ejecutarlo

- Visita el sitio publicado: https://yadfreidel.github.io/TIENDA_UTILES/
- O descarga el repositorio y abre `index.html` con la extensión **Live Server** de VS Code (o con doble clic en el navegador). No hay que instalar ni compilar nada.

## Estructura de archivos

```
TIENDA_UTILES/
├── index.html        Portada
├── servicios.html    Catálogo dinámico, listas, tabla y guía en iframe
├── contacto.html     Datos de contacto y formulario con validación
├── guia.html         Guía corta que se muestra dentro del iframe
├── catalogo.txt      Catálogo en texto para descargar
├── css/estilos.css   Única hoja de estilos
├── js/app.js         Único script (funciona en todas las páginas)
├── imagenes/         Ilustraciones SVG de los productos
└── docs/capturas/    Capturas de pantalla para este README
```
