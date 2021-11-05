
let destacados = []
const sectionDestacados = document.querySelector('#destacados');

$.getJSON('../productos.json',(data) => {
    data.forEach(el => {
    if (el.destacado == true){
       destacados.push(new Productos(el.id,el.destacado,el.nombre,el.marca,el.material,el.talle,el.precio,el.cantidad,el.img))
    }
    });

})

console.log(destacados);
function mostrarDestacados(array){
    for (producto of array){
        let divD = document.createElement('div');//creo el div contenedor

        divD.classList.add('contenedorDestacados');//le asigno una clase
        //Creo las cards y su contenido
        divD.innerHTML += `<div class = "catalogo" id="catalogo${producto.id}">
                             <img src= "${producto.img}" alt="${producto.nombre}, ${producto.marca}" class ="catalogo__foto">
                             <h4 class = "catalogo__nombre"> ${producto.nombre}  </h4>
                             <p class = "catalogo__marca"> ${producto.marca}</p>
                             <p class = "catalogo__precio"> $${producto.precio} </p>
                             <a href="pages/productos.html">Ver catálogo completo</a>
                             </div>`;

                             sectionDestacados.appendChild(divD);
    }
}

mostrarDestacados(destacados);


//_____________FUNCION PARA AGREGAR PRODUCTOS DESTACADOS_________________
// function mostrarDestacados (array){
//     let destacable = array.filter(prod => prod.destacado == true);
//     if(destacable){
//     destacable.forEach(destacado => {
//         let divD = document.createElement('div');//creo el div contenedor

//         divD.classList.add('contenedorDestacados');//le asigno una clase
//         //Creo las cards y su contenido
//         divD.innerHTML += `<div class = "catalogo" id="catalogo${destacado.id}">
//                              <img src= "${destacado.img}" alt="${destacado.nombre}, ${destacado.marca}" class ="catalogo__foto">
//                              <h4 class = "catalogo__nombre"> ${destacado.nombre}  </h4>
//                              <p class = "catalogo__marca"> ${destacado.marca}</p>
//                              <p class = "catalogo__precio"> $${destacado.precio} </p>
//                              <a href="pages/productos.html">Ver catálogo completo</a>
//                              </div>`;

//                              sectionDestacados.appendChild(divD);
//     });
//     }
// }


