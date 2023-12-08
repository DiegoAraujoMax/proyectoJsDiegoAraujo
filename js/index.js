
/*const realizarPreguntas = () => {
    let preguntaNombre = prompt("Por favor, ¿podría decirnos su nombre y apellido?").toLowerCase();
    alert("Hola " + preguntaNombre + ", encantados de tenerte aquí");

    let edadValida = false;

    do {
        let preguntaEdad = parseInt(prompt("Cuentanos, ¿qué edad tienes?"));

        if (isNaN(preguntaEdad) || preguntaEdad < 0) {
            alert("Por favor, ingrese una edad válida.");
        } else {
            edadValida = true;

            if (preguntaEdad < 18) {
                alert("Usted es menor de edad y no puede ingresar al sitio.");
                return; // Sale de la función si es menor de 18
            } else {
                alert("Usted es mayor de edad y puede seguir.");
            }
        }
    } while (!edadValida);

    let tipoBebida = prompt("¿Qué tipo de bebida desea?");
    alert("Gracias por su elección. Disfrute de su catálogo de " + tipoBebida + ".");
};

alert("Bienvenido a nuestra bodega online. Le realizaremos unas breves preguntas a continuación...");
realizarPreguntas();*/

 

// Variables necesarias
var nombreUsuario;
var edadUsuario;
var carrito = [];

// Función para preguntar nombre y edad
function ingresarSitio() {
  nombreUsuario = prompt("Bienvenido al mini e-commerce. Por favor, ingresa tu nombre:");
  edadUsuario = parseInt(prompt("Hola " + nombreUsuario + ". Ingresa tu edad:"));

  if (isNaN(edadUsuario) || edadUsuario < 18) {
    alert("Lo siento, debes ser mayor de 18 años para ingresar al sitio.");
    return;
  }

  mostrarOpcionesCompra();
}

// Función para mostrar opciones de compra
function mostrarOpcionesCompra() {
  var opciones = "Elige una opción:\n1. Vinos\n2. Cerveza\n3. Whisky\n4. Otros\n5. Ir al carrito";
  var eleccion = parseInt(prompt(opciones));

  switch (eleccion) {
    case 1:
      agregarAlCarrito("Vinos");
      break;
    case 2:
      agregarAlCarrito("Cerveza");
      break;
    case 3:
      agregarAlCarrito("Whisky");
      break;
    case 4:
      agregarAlCarrito("Otros");
      break;
    case 5:
      mostrarCarrito();
      break;
    default:
      alert("Opción no válida. Por favor, elige una opción del 1 al 5.");
      mostrarOpcionesCompra();
  }
}

// Función para agregar productos al carrito
function agregarAlCarrito(categoria) {
  var tiposBebida = ["Tipo A", "Tipo B", "Tipo C"];
  var precios = [10, 15, 20];

  var eleccionTipo = parseInt(prompt("Elige un tipo de " + categoria + ":\n1. " + tiposBebida[0] + " ($" + precios[0] + ")\n2. " + tiposBebida[1] + " ($" + precios[1] + ")\n3. " + tiposBebida[2] + " ($" + precios[2] + ")"));

  if (eleccionTipo >= 1 && eleccionTipo <= 3) {
    var producto = {
      categoria: categoria,
      tipo: tiposBebida[eleccionTipo - 1],
      precio: precios[eleccionTipo - 1]
    };

    carrito.push(producto);

    var continuar = confirm("Producto agregado al carrito. ¿Quieres agregar otro producto?");
    if (continuar) {
      mostrarOpcionesCompra();
    } else {
      mostrarResumenCompra();
    }
  } else {
    alert("Opción no válida. Por favor, elige una opción del 1 al 3.");
    agregarAlCarrito(categoria);
  }
}

// Función para mostrar el carrito y permitir eliminar productos
function mostrarCarrito() {
  if (carrito.length === 0) {
    alert("El carrito está vacío. Agrega productos antes de ir al carrito.");
    mostrarOpcionesCompra();
    return;
  }

  var montoTotal = 0;

  console.log("Carrito de compras:");
  carrito.forEach(function (producto) {
    console.log(producto.categoria + " - " + producto.tipo + ": $" + producto.precio);
    montoTotal += producto.precio;
  });

  var eliminarProducto = confirm("Monto total a pagar: $" + montoTotal + "\n¿Quieres eliminar algún producto del carrito?");
  if (eliminarProducto) {
    mostrarCarritoEliminar();
  } else {
    var confirmarPago = confirm("¿Quieres proceder al pago?");
    if (confirmarPago) {
      alert("Gracias por tu compra, " + nombreUsuario + ". ¡Vuelve pronto!");
    } else {
      var volverAlMenu = confirm("¿Quieres volver al menú de elección de productos?");
      if (volverAlMenu) {
        mostrarOpcionesCompra();
      } else {
        alert("La compra ha sido cancelada. ¡Hasta luego!");
      }
    }
  }
}

// Función para mostrar el carrito y permitir eliminar productos
function mostrarCarritoEliminar() {
  console.log("Carrito actual:");
  carrito.forEach(function (producto, index) {
    console.log(index + 1 + ". " + producto.categoria + " - " + producto.tipo + ": $" + producto.precio);
  });

  var indiceEliminar = parseInt(prompt("Ingresa el número del producto que deseas eliminar (o 0 para finalizar):"));

  if (indiceEliminar >= 1 && indiceEliminar <= carrito.length) {
    carrito.splice(indiceEliminar - 1, 1);
    mostrarCarritoEliminar();
  } else if (indiceEliminar === 0) {
    mostrarResumenCompra();
  } else {
    alert("Número no válido. Por favor, elige un número del 1 al " + carrito.length + " o 0 para finalizar.");
    mostrarCarritoEliminar();
  }
}

// Función para mostrar el resumen de la compra y el monto total a pagar
function mostrarResumenCompra() {
  var montoTotal = 0;

  console.log("Resumen de la compra:");
  carrito.forEach(function (producto) {
    console.log(producto.categoria + " - " + producto.tipo + ": $" + producto.precio);
    montoTotal += producto.precio;
  });

  var confirmarPago = confirm("Monto total a pagar: $" + montoTotal + "\n¿Quieres proceder al pago?");

  if (confirmarPago) {
    var eliminarProducto = confirm("¿Quieres eliminar algún producto del carrito?");
    if (eliminarProducto) {
      mostrarCarritoEliminar();
    } else {
      alert("Gracias por tu compra, " + nombreUsuario + ". ¡Vuelve pronto!");
    }
  } else {
    var volverAlMenu = confirm("¿Quieres volver al menú de elección de productos?");
    if (volverAlMenu) {
      mostrarOpcionesCompra();
    } else {
      alert("La compra ha sido cancelada. ¡Hasta luego!");
    }
  }
}

// Iniciar el proceso al cargar la página
ingresarSitio();
