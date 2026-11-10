// =========================================================
// Script de la Tienda de Útiles Escolares
// Autora del proyecto: Yadfreidel Victoria Lugo (2023-4137)
//
// Un solo archivo para todas las páginas. Cada parte busca
// sus elementos y revisa con if (elemento) { ... } que existan.
// Si una página no tiene ese elemento, la parte no se ejecuta
// y no aparece ningún error en la consola.
// =========================================================


// ---------------------------------------------------------
// 1. Menú hamburguesa
// ---------------------------------------------------------
const botonMenu = document.querySelector("#boton-menu");
const menu = document.querySelector("#menu-principal");

// Abre o cierra el menú y avisa al lector de pantalla si está abierto
function alternarMenu() {
    // toggle: si el menú NO tiene la clase "abierto", se la pone;
    // si ya la tiene, se la quita.
    menu.classList.toggle("abierto");

    // Actualizamos aria-expanded para que coincida con lo que se ve
    if (menu.classList.contains("abierto")) {
        botonMenu.setAttribute("aria-expanded", "true");
    } else {
        botonMenu.setAttribute("aria-expanded", "false");
    }
}

if (botonMenu && menu) {
    botonMenu.addEventListener("click", alternarMenu);
}


// ---------------------------------------------------------
// 2. Modo oscuro (se recuerda con localStorage)
// ---------------------------------------------------------
const botonTema = document.querySelector("#boton-tema");

// Cambia el texto del botón según el tema que está activo
function actualizarTextoBotonTema() {
    if (botonTema) {
        if (document.body.classList.contains("oscuro")) {
            botonTema.textContent = "☀️ Modo claro";
        } else {
            botonTema.textContent = "🌙 Modo oscuro";
        }
    }
}

// Pone o quita la clase "oscuro" del body y guarda la elección
function alternarTema() {
    document.body.classList.toggle("oscuro");

    // localStorage guarda datos en el navegador aunque se cierre la página
    if (document.body.classList.contains("oscuro")) {
        localStorage.setItem("tema", "oscuro");
    } else {
        localStorage.setItem("tema", "claro");
    }

    actualizarTextoBotonTema();
}

// Al abrir cualquier página, leemos el tema guardado y lo aplicamos.
// Esto funciona también en guia.html (la página del iframe).
const temaGuardado = localStorage.getItem("tema");

if (temaGuardado === "oscuro") {
    document.body.classList.add("oscuro");
}

actualizarTextoBotonTema();

if (botonTema) {
    botonTema.addEventListener("click", alternarTema);
}


// ---------------------------------------------------------
// 3. Año automático en el footer
// ---------------------------------------------------------
const spanAnio = document.querySelector("#anio");

if (spanAnio) {
    // new Date() crea la fecha de hoy; getFullYear() da el año (ej. 2026)
    spanAnio.textContent = new Date().getFullYear();
}


// ---------------------------------------------------------
// 4. Botón "volver arriba"
// ---------------------------------------------------------
const botonArriba = document.querySelector("#boton-arriba");

// Muestra el botón solo cuando la persona ya bajó 300 píxeles
function revisarScroll() {
    if (window.scrollY > 300) {
        botonArriba.classList.add("visible");
    } else {
        botonArriba.classList.remove("visible");
    }
}

// Sube suavemente hasta el inicio de la página
function volverArriba() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

if (botonArriba) {
    window.addEventListener("scroll", revisarScroll);
    botonArriba.addEventListener("click", volverArriba);
}


// ---------------------------------------------------------
// 5. Catálogo dinámico (solo en servicios.html)
// ---------------------------------------------------------

// Arreglo de objetos: cada objeto es un producto con sus datos.
// Son los mismos productos y precios de catalogo.txt y de la tabla.
const productos = [
    {
        nombre: "Cuaderno",
        categoria: "Escritura y corrección",
        precio: 85,
        descripcion: "Sirve para tomar apuntes y organizar ideas.",
        imagen: "imagenes/cuadernos.svg"
    },
    {
        nombre: "Lápiz",
        categoria: "Escritura y corrección",
        precio: 15,
        descripcion: "Se utiliza para escribir y dibujar con grafito.",
        imagen: "imagenes/lapices.svg"
    },
    {
        nombre: "Borrador",
        categoria: "Escritura y corrección",
        precio: 10,
        descripcion: "Permite corregir trazos de lápiz.",
        imagen: "imagenes/borradores.svg"
    },
    {
        nombre: "Sacapuntas",
        categoria: "Escritura y corrección",
        precio: 25,
        descripcion: "Afila la punta de los lápices.",
        imagen: "imagenes/sacapuntas.svg"
    },
    {
        nombre: "Mochila",
        categoria: "Organización",
        precio: 1250,
        descripcion: "Ayuda a transportar los materiales de clase.",
        imagen: "imagenes/mochilas.svg"
    },
    {
        nombre: "Regla",
        categoria: "Medición",
        precio: 35,
        descripcion: "Sirve para medir y trazar líneas rectas.",
        imagen: "imagenes/reglas.svg"
    }
];

const contenedorTarjetas = document.querySelector("#tarjetas");
const buscador = document.querySelector("#buscador");
const selectCategoria = document.querySelector("#filtro-categoria");
const contador = document.querySelector("#contador");
const mensajeSinResultados = document.querySelector("#sin-resultados");

// Convierte un número en pesos dominicanos. Ejemplo: 85 -> "RD$85.00"
function formatearPrecio(precio) {
    return precio.toLocaleString("es-DO", { style: "currency", currency: "DOP" });
}

// Recibe una lista de productos y crea una tarjeta HTML por cada uno
function pintarTarjetas(lista) {
    let html = "";

    // forEach recorre la lista: se ejecuta una vez por cada producto
    lista.forEach(function (producto) {
        // Plantilla con comillas invertidas: ${} mete el valor de una variable
        html += `
            <article class="tarjeta">
                <img src="${producto.imagen}" alt="Ilustración de ${producto.nombre}" width="360" height="250">
                <h3>${producto.nombre}</h3>
                <p class="categoria">${producto.categoria}</p>
                <p>${producto.descripcion}</p>
                <p class="precio">${formatearPrecio(producto.precio)}</p>
            </article>
        `;
    });

    // Reemplazamos todo lo que había en el contenedor por las tarjetas nuevas
    contenedorTarjetas.innerHTML = html;
}

// Lee el buscador y el select, filtra los productos y los muestra
function filtrarProductos() {
    // trim() quita espacios de los lados; toLowerCase() pasa todo a minúsculas
    const textoBuscado = buscador.value.trim().toLowerCase();
    const categoriaElegida = selectCategoria.value;

    // filter() crea una lista NUEVA solo con los productos que devuelven true
    const productosFiltrados = productos.filter(function (producto) {
        const coincideTexto = producto.nombre.toLowerCase().includes(textoBuscado);

        let coincideCategoria = false;
        if (categoriaElegida === "todas" || producto.categoria === categoriaElegida) {
            coincideCategoria = true;
        }

        // El producto se queda solo si cumple las dos condiciones
        return coincideTexto && coincideCategoria;
    });

    pintarTarjetas(productosFiltrados);

    // Contador: "Mostrando X de Y productos"
    contador.textContent = `Mostrando ${productosFiltrados.length} de ${productos.length} productos`;

    // Si no quedó ningún producto, mostramos el mensaje amable
    if (productosFiltrados.length === 0) {
        mensajeSinResultados.hidden = false;
    } else {
        mensajeSinResultados.hidden = true;
    }
}

if (contenedorTarjetas && buscador && selectCategoria && contador && mensajeSinResultados) {
    // "input" se dispara con cada letra que se escribe o borra
    buscador.addEventListener("input", filtrarProductos);
    // "change" se dispara cuando se elige otra opción del select
    selectCategoria.addEventListener("change", filtrarProductos);

    // Al abrir la página mostramos todos los productos
    filtrarProductos();
}


// ---------------------------------------------------------
// 6. Validación del formulario (solo en contacto.html)
// ---------------------------------------------------------
const formulario = document.querySelector("#formulario");
const campoNombre = document.querySelector("#nombre");
const campoCorreo = document.querySelector("#correo");
const campoConfirmar = document.querySelector("#confirmar-correo");
const campoTelefono = document.querySelector("#telefono");
const campoProducto = document.querySelector("#producto");
const campoCantidad = document.querySelector("#cantidad");
const campoFecha = document.querySelector("#fecha");
const mensajeExito = document.querySelector("#mensaje-exito");

// Escribe el error en el span del campo y lo marca en rojo.
// El span se llama "error-" + el id del campo (ej. error-nombre).
function mostrarError(campo, mensaje) {
    const spanError = document.querySelector("#error-" + campo.id);
    spanError.textContent = mensaje;
    campo.classList.add("invalido");
}

// Borra el error de un campo
function limpiarError(campo) {
    const spanError = document.querySelector("#error-" + campo.id);
    spanError.textContent = "";
    campo.classList.remove("invalido");
}

// Revisa si la fecha elegida es anterior a hoy
function esFechaPasada(textoFecha) {
    // Hoy a las 00:00, para comparar solo el día y no la hora
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    // Agregamos "T00:00:00" para que la fecha se lea en la hora local
    // de República Dominicana y no en la hora de Londres (UTC)
    const fechaElegida = new Date(textoFecha + "T00:00:00");

    return fechaElegida < hoy;
}

// Agrega una línea "Etiqueta: valor" a la lista del resumen.
// Usamos textContent (y no innerHTML) para que lo que escribió
// la persona se muestre como texto y nunca como código HTML.
function agregarDato(lista, etiqueta, valor) {
    const elemento = document.createElement("li");
    elemento.textContent = etiqueta + ": " + valor;
    lista.appendChild(elemento);
}

// Muestra el mensaje de éxito con un resumen de los datos
function mostrarExito() {
    // Texto visible del producto elegido (ej. "Lápiz" en vez de "lapiz")
    const nombreProducto = campoProducto.options[campoProducto.selectedIndex].text;
    // Fecha en formato dominicano (ej. 20/11/2026)
    const fechaBonita = new Date(campoFecha.value + "T00:00:00").toLocaleDateString("es-DO");

    let cantidad = campoCantidad.value;
    if (cantidad === "") {
        cantidad = "No indicada";
    }

    mensajeExito.innerHTML = `
        <h3>¡Solicitud revisada correctamente!</h3>
        <p>Este es el resumen de tu demostración (no se envió ni guardó nada):</p>
    `;

    const lista = document.createElement("ul");
    agregarDato(lista, "Nombre", campoNombre.value.trim());
    agregarDato(lista, "Correo", campoCorreo.value.trim());
    agregarDato(lista, "Teléfono", campoTelefono.value.trim());
    agregarDato(lista, "Producto", nombreProducto);
    agregarDato(lista, "Cantidad", cantidad);
    agregarDato(lista, "Fecha deseada", fechaBonita);
    mensajeExito.appendChild(lista);
}

// Se ejecuta al pulsar "Enviar"
function validarFormulario(event) {
    // Evita que el formulario se envíe y recargue la página
    event.preventDefault();

    // Borramos el mensaje de éxito anterior, si había uno
    mensajeExito.innerHTML = "";

    const nombre = campoNombre.value.trim();
    const correo = campoCorreo.value.trim();
    const confirmacion = campoConfirmar.value.trim();
    const telefono = campoTelefono.value.trim();

    // Patrones (expresiones regulares):
    // Correo: texto sin espacios + @ + texto + punto + texto
    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Teléfono: empieza (^) con 809, 829 u 849 y sigue con
    // exactamente 7 dígitos (\d{7}) hasta el final ($)
    const patronTelefono = /^(809|829|849)\d{7}$/;

    // Regla 1: nombre
    if (nombre === "") {
        mostrarError(campoNombre, "Escribe tu nombre.");
    } else if (nombre.length < 3) {
        mostrarError(campoNombre, "El nombre debe tener al menos 3 letras.");
    } else {
        limpiarError(campoNombre);
    }

    // Regla 2: correo
    if (correo === "") {
        mostrarError(campoCorreo, "Escribe tu correo.");
    } else if (patronCorreo.test(correo) === false) {
        mostrarError(campoCorreo, "El correo no es válido. Ejemplo: nombre@gmail.com");
    } else {
        limpiarError(campoCorreo);
    }

    // Regla 3 (propia): la confirmación debe ser igual al correo
    if (confirmacion === "") {
        mostrarError(campoConfirmar, "Repite tu correo.");
    } else if (confirmacion !== correo) {
        mostrarError(campoConfirmar, "Los correos no coinciden.");
    } else {
        limpiarError(campoConfirmar);
    }

    // Regla 4 (propia): teléfono dominicano
    if (telefono === "") {
        mostrarError(campoTelefono, "Escribe tu teléfono.");
    } else if (patronTelefono.test(telefono) === false) {
        mostrarError(campoTelefono, "Usa 10 dígitos sin guiones que empiecen por 809, 829 u 849. Ejemplo: 8091234567");
    } else {
        limpiarError(campoTelefono);
    }

    // Regla 5: producto elegido
    if (campoProducto.value === "") {
        mostrarError(campoProducto, "Elige un producto.");
    } else {
        limpiarError(campoProducto);
    }

    // Regla 6 (propia): la fecha no puede estar en el pasado
    if (campoFecha.value === "") {
        mostrarError(campoFecha, "Elige una fecha.");
    } else if (esFechaPasada(campoFecha.value)) {
        mostrarError(campoFecha, "La fecha no puede estar en el pasado.");
    } else {
        limpiarError(campoFecha);
    }

    // Buscamos el primer campo marcado como inválido
    const primerCampoInvalido = formulario.querySelector(".invalido");

    if (primerCampoInvalido) {
        // Hay errores: llevamos el cursor al primero para corregirlo
        primerCampoInvalido.focus();
    } else {
        // Todo está bien: resumen en la página y formulario vacío
        mostrarExito();
        formulario.reset();
    }
}

if (formulario && mensajeExito) {
    formulario.addEventListener("submit", validarFormulario);

    // Lista con los campos obligatorios
    const camposObligatorios = [campoNombre, campoCorreo, campoConfirmar, campoTelefono, campoProducto, campoFecha];

    // Cuando la persona corrige un campo, su error desaparece
    camposObligatorios.forEach(function (campo) {
        campo.addEventListener("input", function () {
            limpiarError(campo);
        });
    });
}
