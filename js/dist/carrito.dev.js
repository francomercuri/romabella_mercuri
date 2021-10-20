"use strict";

// VARIABLES INICIALES
var sectionCatalogo = document.getElementById('sectionCatalogo');
var contenedorCarrito = document.getElementById('contenedorCarrito');
var carritoDeCompras = [];
var productos = [];
var contadorCarrito = document.getElementById('contadorCarrito');
var precioTotal = document.getElementById('precioTotal');
$.getJSON('../productos.json', function (data) {
  console.log(data);
  data.forEach(function (el) {
    return productos.push(el);
  });
  localStorage.setItem('TiendaRopa', JSON.stringify(data));
  mostrarProductos(productos);
}); //_____________________________FUNCIÓN PARA MOSTRAR LOS PRODUCTOS________________________________

function mostrarProductos(array) {
  array.forEach(function (prenda) {
    var divCard = document.createElement('div'); //creo el div contenedor

    divCard.classList.add('contenedorCards'); //le asigno una clase
    //Creo las cards y su contenido

    divCard.innerHTML += "<div class = \"catalogo\" id=\"catalogo".concat(prenda.id, "\">\n                             <img src= \"").concat(prenda.img, "\" alt=\"").concat(prenda.nombre, ", ").concat(prenda.marca, "\" class =\"catalogo__foto\">\n                             <h4 class = \"catalogo__nombre\"> ").concat(prenda.nombre, "  </h4>\n                             <p class = \"catalogo__marca\"> ").concat(prenda.marca, "</p>\n                             <p class = \"catalogo__precio\"> $").concat(prenda.precio, " </p>\n                             <a id = boton").concat(prenda.id, " class = \"catalogo__compra\"><img src=\"../image/carrito.png\" alt=\"Ver Carrito\"> </a>\n                             </div>");
    sectionCatalogo.appendChild(divCard);
    var botonCompra = document.getElementById("boton".concat(prenda.id));
    botonCompra.addEventListener('click', function () {
      agregarAlCarrito(prenda.id);
    });
  });
} //__________________FUNCION PARA AGREGAR AL CARRITO_______________________


function agregarAlCarrito(id) {
  var repetido = carritoDeCompras.find(function (productoRepetido) {
    return productoRepetido.id == id;
  });

  if (repetido) {
    repetido.cantidad = repetido.cantidad + 1;
    document.getElementById("cantidad".concat(repetido.id)).innerHTML = "<p id=cantidad".concat(repetido.id, ">Cantidad:").concat(repetido.cantidad, "</p>");
    memorizar(carritoDeCompras);
    actualizarCarrito();
  } else {
    var productoAgregar = productos.find(function (elegido) {
      return elegido.id == id;
    });
    console.log(productoAgregar);
    carritoDeCompras.push(productoAgregar); //se agrega el objeto al carrito

    productoAgregar.cantidad = 1;
    var divCarrito = document.createElement('div'); //creo div para el carrito

    divCarrito.classList.add('divCarrito'); //asigno clase para el contenedor del carrito
    //Elementos a visualizar en el carrito

    divCarrito.innerHTML = "<img src= \"".concat(productoAgregar.img, "\" class = \"divCarrito__img\">\n                            <h4 class = \"divCarrito__nombre\"> ").concat(productoAgregar.nombre, "  </h4>\n                            <p class = \"divCarrito__marca\"> ").concat(productoAgregar.marca, "</p>\n                            <p class = \"divCarrito__precio\"> $").concat(productoAgregar.precio, " </p>\n                            <p class = \"divCarrito__cantidad\" id = cantidad").concat(productoAgregar.id, ">cantidad: ").concat(productoAgregar.cantidad, "</p>\n                            <button class=\"botonEliminar\" id=\"eliminar").concat(productoAgregar.id, "\">Eliminar</button>"); //INSERTO EL CONTENIDO CREADO EN EL CARRITO

    contenedorCarrito.appendChild(divCarrito);
    actualizarCarrito();
    var botonEliminar = document.getElementById("eliminar".concat(productoAgregar.id));
    botonEliminar.addEventListener('click', function () {
      botonEliminar.parentElement.remove();
      carritoDeCompras = carritoDeCompras.filter(function (el) {
        return el.id != productoAgregar.id;
      });
      memorizar(carritoDeCompras);
      actualizarCarrito(carritoDeCompras);
    });
  }

  memorizar(carritoDeCompras);
}

recordar(); //_____________FUNCION PARA ACTUALIZAR CARRITO________________________

function actualizarCarrito() {
  contadorCarrito.innerText = carritoDeCompras.reduce(function (acc, el) {
    return acc + el.cantidad;
  }, 0);
  precioTotal.innerText = carritoDeCompras.reduce(function (acc, el) {
    return acc + el.precio * el.cantidad;
  }, 0);
} // //______________________ FILRO productos.html/header___________________-


var busqueda = document.getElementById('busqueda');

busqueda.onkeyup = function () {
  //Cuando se presione una tecla
  var prodBuscado = busqueda.value.toUpperCase(); //pasar a mayusculas la busqueda

  var buscados = productos.filter(function (producto) {
    return producto.nombre.toUpperCase().includes(prodBuscado);
  });
  sectionCatalogo.innerHTML = "";
  mostrarProductos(buscados);
}; //__________________FUNCION AGREGAR A LOCAL STPRAGE_____________________________


function memorizar(dato) {
  localStorage.setItem('carrito', JSON.stringify(dato));
} //________________FUNCION PARA RECUPERAR STORAGE___________________


function recordar() {
  var recordar = JSON.parse(localStorage.getItem('carrito'));
  var stockBack = JSON.parse(localStorage.getItem('TiendaRopa'));
  stockBack ? stockBack.forEach(function (el) {
    return productos.push(el);
  }) : [];

  if (recordar) {
    recordar.forEach(function (el) {
      agregarAlCarrito(el.id);
    });
  }
}