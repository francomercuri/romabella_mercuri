const sectionDestacados = document.getElementById('destacados');

mostrarDestacados(productos);


//_____________FUNCION PARA AGREGAR PRODUCTOS DESTACADOS_________________
function mostrarDestacados (array){
    let destacable = productos.filter(prod => prod.destacado == true);
    if(destacable){
    for(destacado of destacable){
        let divD = document.createElement('div');//creo el div contenedor

        divD.classList.add('contenedorDestacados');//le asigno una clase
        //Creo las cards y su contenido
        divD.innerHTML += `<div class = "catalogo" id="catalogo${destacado.id}">
                             <img src= "${destacado.img}" alt="${destacado.nombre}, ${destacado.marca}" class ="catalogo__foto">
                             <h4 class = "catalogo__nombre"> ${destacado.nombre}  </h4>
                             <p class = "catalogo__marca"> ${destacado.marca}</p>
                             <p class = "catalogo__precio"> $${destacado.precio} </p>
                             <a href="pages/productos.html">Ver catálogo completo</a>
                             </div>`;

                             sectionDestacados.appendChild(divD);
    }
    }
}
