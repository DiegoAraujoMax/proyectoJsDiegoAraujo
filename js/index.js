let carrito = [];

document.addEventListener("DOMContentLoaded", function () {
  cargarCarritoDesdeLocalStorage();
  actualizarCarrito();
});

function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
  }
}

function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(categoria, tipo, precio, stock) {
  if (stock <= 0) {
    alert("Lo siento, este producto está agotado.");
    return;
  }

  const productoExistente = carrito.find(item => item.tipo === tipo);
  if (productoExistente) {
    if (productoExistente.cantidad < stock) {
      productoExistente.cantidad++;
    } else {
      alert("No puedes agregar más unidades de este producto al carrito.");
    }
  } else {
    carrito.push({
      categoria: categoria,
      tipo: tipo,
      precio: precio,
      cantidad: 1,
      stock: stock
    });
  }

  guardarCarritoEnLocalStorage();
  actualizarCarrito();
}

function actualizarCarrito() {
  const carritoContainer = document.getElementById("carrito");
  carritoContainer.innerHTML = "";

  let montoTotal = 0;

  carrito.forEach(function (producto, index) {
    const item = document.createElement("div");
    item.className = "carrito-item";
    item.innerHTML = `
      <p>${producto.tipo} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio * producto.cantidad}</p>
      <div class="acciones">
        <button onclick="ajustarCantidad(${index}, 1, ${producto.stock})">+</button>
        <button onclick="ajustarCantidad(${index}, -1, ${producto.stock})">-</button>
      </div>
    `;
    carritoContainer.appendChild(item);

    montoTotal += producto.precio * producto.cantidad;
  });

  const montoTotalElement = document.createElement("p");
  montoTotalElement.textContent = `Monto total a pagar: $${montoTotal}`;
  carritoContainer.appendChild(montoTotalElement);

  // Botón Limpiar Carrito
  const limpiarCarritoButton = document.createElement("button");
  limpiarCarritoButton.textContent = "Limpiar Carrito";
  limpiarCarritoButton.addEventListener("click", limpiarCarrito);
  carritoContainer.appendChild(limpiarCarritoButton);

  // Botón Pagar
  const pagarButton = document.createElement("button");
  pagarButton.textContent = "Pagar";
  pagarButton.addEventListener("click", mostrarMensajePagar);
  carritoContainer.appendChild(pagarButton);
}

function ajustarCantidad(index, cantidad, stock) {
  const producto = carrito[index];

  if (producto.cantidad + cantidad <= 0) {
    alert("No puedes tener una cantidad negativa en el carrito.");
  } else if (producto.cantidad + cantidad <= stock) {
    producto.cantidad += cantidad;
  } else {
    alert("No puedes agregar más unidades de este producto al carrito.");
  }

  guardarCarritoEnLocalStorage();
  actualizarCarrito();
}

function limpiarCarrito() {
  carrito = [];
  guardarCarritoEnLocalStorage();
  actualizarCarrito();
}

function mostrarMensajePagar() {
  alert("Todavía no llegamos a tanto, estamos mejorando.");
}
