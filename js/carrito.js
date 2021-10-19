// VARIABLES INICIALES
const sectionCatalogo = document.getElementById('sectionCatalogo');
const contenedorCarrito = document.getElementById('contenedorCarrito');
let carritoDeCompras = [];
let productos = []
const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

$.getJSON('../productos.json',(data) => {
    console.log(data)
    data.forEach(el => productos.push(el));
    localStorage.setItem('TiendaRopa', JSON.stringify(data))
    mostrarProductos(productos);
})

//_____________________________FUNCIÓN PARA MOSTRAR LOS PRODUCTOS________________________________
function mostrarProductos(array) {

    array.forEach(prenda => {
        let divCard = document.createElement('div');//creo el div contenedor

        divCard.classList.add('contenedorCards');//le asigno una clase
        //Creo las cards y su contenido
        divCard.innerHTML += `<div class = "catalogo" id="catalogo${prenda.id}">
                             <img src= "${prenda.img}" alt="${prenda.nombre}, ${prenda.marca}" class ="catalogo__foto">
                             <h4 class = "catalogo__nombre"> ${prenda.nombre}  </h4>
                             <p class = "catalogo__marca"> ${prenda.marca}</p>
                             <p class = "catalogo__precio"> $${prenda.precio} </p>
                             <a id = boton${prenda.id} class = "catalogo__compra"><img src="../image/carrito.jpg" alt="Ver Carrito"> </a>
                             </div>`;

                             sectionCatalogo.appendChild(divCard);

                             let botonCompra = document.getElementById(`boton${prenda.id}`);

                             botonCompra.addEventListener('click', () => {
                                 agregarAlCarrito(prenda.id);
                             } )
    });
}



//__________________FUNCION PARA AGREGAR AL CARRITO_______________________
function agregarAlCarrito(id) {
    let repetido = carritoDeCompras.find(productoRepetido => productoRepetido.id == id);
        if(repetido){
            repetido.cantidad = repetido.cantidad + 1;
        document.getElementById(`cantidad${repetido.id}`).innerHTML = `<p id=cantidad${repetido.id}>Cantidad:${repetido.cantidad}</p>`
        memorizar(carritoDeCompras);
        actualizarCarrito();
    }else{
        let productoAgregar = productos.find(elegido => elegido.id == id);
        console.log(productoAgregar)
    carritoDeCompras.push(productoAgregar);//se agrega el objeto al carrito

    productoAgregar.cantidad = 1;
    let divCarrito = document.createElement('div');//creo div para el carrito
    divCarrito.classList.add('divCarrito');//asigno clase para el contenedor del carrito
    //Elementos a visualizar en el carrito
    divCarrito.innerHTML= `<h4 class = "catalogo__nombre"> ${productoAgregar.nombre}  </h4>
                            <p class = "catalogo__marca"> ${productoAgregar.marca}</p>
                            <p class = "catalogo__precio"> $${productoAgregar.precio} </p>
                            <p class = "catalogo__cantidad" id = cantidad${productoAgregar.id}>cantidad: ${productoAgregar.cantidad}</p>
                            <button class="botonEliminar" id="eliminar${productoAgregar.id}">Eliminar</button>`
    //INSERTO EL CONTENIDO CREADO EN EL CARRITO
    contenedorCarrito.appendChild(divCarrito)
    actualizarCarrito()

    let botonEliminar = document.getElementById(`eliminar${productoAgregar.id}`)
    botonEliminar.addEventListener('click', ()=>{
    botonEliminar.parentElement.remove()
    carritoDeCompras = carritoDeCompras.filter(el => el.id != productoAgregar.id);

    memorizar(carritoDeCompras);
    actualizarCarrito(carritoDeCompras);
    })
}
memorizar(carritoDeCompras);
}

recordar();

//_____________FUNCION PARA ACTUALIZAR CARRITO________________________
function actualizarCarrito() {
    contadorCarrito.innerText = carritoDeCompras.reduce((acc , el)=> acc + el.cantidad, 0);
    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad), 0);
 }


// //______________________ FILRO productos.html/header___________________-
let busqueda = document.getElementById('busqueda');
busqueda.onkeyup = () => {//Cuando se presione una tecla
    let prodBuscado = busqueda.value.toUpperCase();//pasar a mayusculas la busqueda
    let buscados = productos.filter(producto => producto.nombre.toUpperCase().includes(prodBuscado));
    sectionCatalogo.innerHTML="";
    mostrarProductos(buscados);
}

//__________________FUNCION AGREGAR A LOCAL STPRAGE_____________________________
function memorizar(dato){
localStorage.setItem('carrito', JSON.stringify(dato));
}

 //________________FUNCION PARA RECUPERAR STORAGE___________________
 function recordar(){
    let recordar = JSON.parse(localStorage.getItem('carrito'));
    let stockBack = JSON.parse(localStorage.getItem('TiendaRopa'))
    stockBack ? stockBack.forEach(el=> productos.push(el)) : []

if(recordar){
   recordar.forEach( el => {
       agregarAlCarrito(el.id);
                       })
       }
}

