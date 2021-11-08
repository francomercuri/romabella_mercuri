
let destacados = []
const sectionDestacados = document.querySelector('#destacados');
const carritoIndex = document.querySelector('#carrito-index');


$.getJSON('../productos.json',(data) => {
    data.forEach(el => {
    if (el.destacado == true){
       destacados.push(new Productos(el.id,el.destacado,el.nombre,el.marca,el.material,el.talle,el.precio,el.cantidad,el.img))
    }
    });
    mostrarDestacados(destacados);
})

console.log(destacados);
function mostrarDestacados(array){
    array.forEach(producto => {
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
    });
}

carritoIndex.addEventListener('click',()=>{
    window.location.href = "pages/productos.html";

});


