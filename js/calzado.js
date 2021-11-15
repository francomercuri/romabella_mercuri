let stockMELI = [];
const contenedorMELI= document.querySelector('#productosMELI-container');

class ProductosMELI{
    constructor(id,title,price,thumbnail,permalink){
        this.id = id;
        this.nombre = title;
        this.precio= price;
        this.img= thumbnail;
        this.link= permalink;
    }
};

$.get('https://api.mercadolibre.com/sites/MLA/search?category=MLA109027&limit=20',function(data){
    data.results.forEach(el => {
        stockMELI.push(
            new ProductosMELI(el.id, el.title, el.price, el.thumbnail, el.permalink)
        )

    })
    mostrarMELI(stockMELI);
});
//Función para mostrar los productos obtenidos de la API de Mercadolibre
function mostrarMELI(array){
    array.forEach(producto => {
        let divD = document.createElement('div');//creo el div contenedor

        divD.classList.add('productosMELI');//le asigno una clase
        //Creo las cards y su contenido
        divD.innerHTML += `<div class = "MELI" id="catalogo${producto.id}">
                             <img src= "${producto.img}" alt="${producto.nombre} class ="MELI__foto">
                             <h4 class = "MELI__nombre"> ${producto.nombre}  </h4>
                             <p class = "MELI__precio"> $${producto.precio} </p>
                             <a target="new" class="MELI__link" href=${producto.link}>Ver más</a>
                             </div>`;

                             contenedorMELI.appendChild(divD);
    });
}
 //______________________ FILRO (barra de búsqueda en el header___________________-
let busqueda = document.getElementById('busqueda');
busqueda.onkeyup = () => {//Cuando se presione una tecla
    let prodBuscado = busqueda.value.toUpperCase();//pasar a mayusculas la busqueda
    let buscados = stockMELI.filter(producto => producto.nombre.toUpperCase().includes(prodBuscado));
    contenedorMELI.innerHTML="";
    mostrarMELI(buscados);
}

//Boton carrito para ir al catálogo
let carrito = document.querySelector('#carrito-calzado')
carrito.addEventListener('click',()=>{
    window.location.href = "../pages/productos.html";

});
