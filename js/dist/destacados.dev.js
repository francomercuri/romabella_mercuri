"use strict";

var sectionDestacados = document.getElementById('destacados');
mostrarDestacados(productos); //_____________FUNCION PARA AGREGAR PRODUCTOS DESTACADOS_________________

function mostrarDestacados(array) {
  var destacable = productos.filter(function (prod) {
    return prod.destacado == true;
  });

  if (destacable) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = destacable[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        destacado = _step.value;
        var divD = document.createElement('div'); //creo el div contenedor

        divD.classList.add('contenedorDestacados'); //le asigno una clase
        //Creo las cards y su contenido

        divD.innerHTML += "<div class = \"catalogo\" id=\"catalogo".concat(destacado.id, "\">\n                             <img src= \"").concat(destacado.img, "\" alt=\"").concat(destacado.nombre, ", ").concat(destacado.marca, "\" class =\"catalogo__foto\">\n                             <h4 class = \"catalogo__nombre\"> ").concat(destacado.nombre, "  </h4>\n                             <p class = \"catalogo__marca\"> ").concat(destacado.marca, "</p>\n                             <p class = \"catalogo__precio\"> $").concat(destacado.precio, " </p>\n                             <a href=\"pages/productos.html\">Ver cat\xE1logo completo</a>\n                             </div>");
        sectionDestacados.appendChild(divD);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
}