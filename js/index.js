let nombreUsuario;
let edadUsuario;
let carrito = [];

function ingresarSitio() {
  nombreUsuario = prompt("Bienvenido al a la bodega online. Por favor, ingresa tu nombre:");
  edadUsuario = parseInt(prompt("Hola " + nombreUsuario + ", ingresa tu edad:"));

  if (isNaN(edadUsuario) || edadUsuario < 18) {
    alert("Lo siento, debes ser mayor de 18 años para ingresar al sitio.");
    return;
  }

  mostrarOpcionesCompra();
}

function mostrarOpcionesCompra() {
  let opciones = "Elige la categoria y luego el producto:\n1. Vinos\n2. Cerveza\n3. Whisky\n4. Otros\n5. Ir al carrito";
  let eleccion = parseInt(prompt(opciones));

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

function agregarAlCarrito(categoria) {
  let tiposBebida = [];
  let precios = [];

  switch (categoria) {
    case "Vinos":
      tiposBebida = ["Tinto", "Blanco", "Merlot"];
      precios = [299, 499, 799];
      break;
    case "Cerveza":
      tiposBebida = ["Rubia", "Negra", "Roja"];
      precios = [140, 200, 160];
      break;
    case "Whisky":
      tiposBebida = ["Escocés", "Irlandés", "Inglés"];
      precios = [5500, 3600, 900];
      break;
    case "Otros":
      tiposBebida = ["Vodka", "Gin", "Fernet"];
      precios = [449, 789, 536];
      break;
    default:
      alert("Categoría no válida.");
      mostrarOpcionesCompra();
      return;
  }

  let opciones = "Elige un tipo de " + categoria + ":\n";
  for (let i = 0; i < tiposBebida.length; i++) {
    opciones += (i + 1) + ". " + tiposBebida[i] + " ($" + precios[i] + ")\n";
  }

  let eleccionTipo = parseInt(prompt(opciones));

  if (eleccionTipo >= 1 && eleccionTipo <= tiposBebida.length) {
    let producto = {
      categoria: categoria,
      tipo: tiposBebida[eleccionTipo - 1],
      precio: precios[eleccionTipo - 1]
    };

    carrito.push(producto);

    let continuar = confirm("Producto agregado al carrito. ¿Quieres agregar otro producto?");
    if (continuar) {
      mostrarOpcionesCompra();
    } else {
      mostrarResumenCompra();
    }
  } else {
    alert("Opción no válida. Por favor, elige una opción del 1 al " + tiposBebida.length + ".");
    agregarAlCarrito(categoria);
  }
}

function mostrarCarrito() {
  if (carrito.length === 0) {
    alert("El carrito está vacío. Agrega productos antes de ir al carrito.");
    mostrarOpcionesCompra();
    return;
  }

  let montoTotal = 0;

  console.log("Carrito de compras:");
  carrito.forEach(function (producto) {
    console.log(producto.categoria + " - " + producto.tipo + ": $" + producto.precio);
    montoTotal += producto.precio;
  });

  let eliminarProducto = confirm("Monto total a pagar: $" + montoTotal + "\n¿Quieres eliminar algún producto del carrito?");
  if (eliminarProducto) {
    mostrarCarritoEliminar();
  } else {
    let confirmarPago = confirm("¿Quieres proceder al pago?");
    if (confirmarPago) {
      alert("Gracias por tu compra, " + nombreUsuario + ". ¡Vuelve pronto!");
    } else {
      let volverAlMenu = confirm("¿Quieres volver al menú de elección de productos?");
      if (volverAlMenu) {
        mostrarOpcionesCompra();
      } else {
        alert("La compra ha sido cancelada. ¡Hasta luego!");
      }
    }
  }
}

function mostrarCarritoEliminar() {
  console.log("Carrito actual:");
  carrito.forEach(function (producto, index) {
    console.log(index + 1 + ". " + producto.categoria + " - " + producto.tipo + ": $" + producto.precio);
  });

  let indiceEliminar = parseInt(prompt("Ingresa el número del producto que deseas eliminar (o 0 para finalizar):"));

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

function mostrarResumenCompra() {
  let montoTotal = 0;

  console.log("Resumen de la compra:");
  carrito.forEach(function (producto) {
    console.log(producto.categoria + " - " + producto.tipo + ": $" + producto.precio);
    montoTotal += producto.precio;
  });

  let confirmarPago = confirm("Monto total a pagar: $" + montoTotal + "\n¿Quieres proceder al pago?");

  if (confirmarPago) {
    let eliminarProducto = confirm("¿Quieres eliminar algún producto del carrito?");
    if (eliminarProducto) {
      mostrarCarritoEliminar();
    } else {
      alert("Gracias por tu compra, " + nombreUsuario + ". ¡Vuelve pronto!");
    }
  } else {
    let volverAlMenu = confirm("¿Quieres volver al menú de elección de productos?");
    if (volverAlMenu) {
      mostrarOpcionesCompra();
    } else {
      alert("La compra ha sido cancelada. ¡Hasta luego!");
    }
  }
}

ingresarSitio();

