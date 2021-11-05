// VARIABLES INICIALES
const sectionCatalogo = document.getElementById('sectionCatalogo');
const contenedorCarrito = document.getElementById('contenedorCarrito');
let carritoDeCompras = [];
// let productos = []
const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');
const btnToggle = document.querySelector('.toggle-btn');
const carritoBkg = document.getElementById('sidebar-bkground');
const btnCerrar = document.getElementById('btn-cerrar');
//Variables para cierre Carrito
const modalCarrito = document.querySelector('#carrito-modal');
const btnAceptarCarrito = document.querySelector('.carrito-cierre-btn');
const orderNumber = document.querySelector('#orderNumber');
const btnConfirm = document.querySelector('#btn-confirm');
const  pagoEfectivo = document.querySelector('#efectivo');
const pagoCredito = document.querySelector('#credito');
let aleatorio = Math.round(Math.random()*1000000);



$.getJSON('../productos.json',(data) => {
    localStorage.setItem('TiendaRopa', JSON.stringify(data))
    mostrarProductos(data);
    recordar();
})



//_____________________________FUNCIÓN PARA MOSTRAR LOS PRODUCTOS________________________________
function mostrarProductos(array) {

    array.forEach(prenda => {
        let divCard = document.createElement('div');//creo el div contenedor

        divCard.classList.add('contenedorCards');//le asigno una clase
        //Creo las cards y su contenido
        divCard.innerHTML += `<div class = "catalogo" id="catalogo${prenda.id}">
                             <img src= "${prenda.img}" loading="lazy" alt="${prenda.nombre}, ${prenda.marca}" class ="catalogo__foto">
                             <div class= "catalogo__productName">
                             <h4 class = "catalogo__productName--nombre"> ${prenda.nombre}  </h4>
                             <p class = "catalogo__productName--marca"> ${prenda.marca}</p>
                             </div>
                             <select class="catalogo__talle" name="talle" id="talle${prenda.id}">
                                <option class="catalogo__talle__option" value="s">Small</option>
                                <option class="catalogo__talle__option" value="m">Medium</option>
                                <option class="catalogo__talle__option" value="l">Large</option>
                                <option class="catalogo__talle__option" value="xl">XLarge</option>
                            </select>
                             <p class = "catalogo__precio"> $${prenda.precio} </p>
                             <a id = boton${prenda.id} class = "catalogo__compra"><img src="../image/carrito.png" alt="Ver Carrito"> </a>
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
        let productoAgregar = stock.find(elegido => elegido.id == id);
        //Tomo el valor del talle elegido por el usuario mediante un select
        productoAgregar.talle = document.getElementById(`talle${productoAgregar.id}`).value;

        carritoDeCompras.push(productoAgregar);//se agrega el objeto al carrito
        mostrarCarrito(productoAgregar)
}
memorizar(carritoDeCompras);
}

function mostrarCarrito(productoAgregar) {
    let divCarrito = document.createElement('div');//creo div para el carrito
    divCarrito.classList.add('divCarrito');//asigno clase para el contenedor del carrito
    //Elementos a visualizar en el carrito
    divCarrito.innerHTML= `<img src= "${productoAgregar.img}" class="divCarrito__img">
                            <h4 class = "divCarrito__nombre"> ${productoAgregar.nombre}  </h4>
                            <p class = "divCarrito__marca"> ${productoAgregar.marca}</p>
                            <p class="divCarrito__talle">Talle: ${productoAgregar.talle.toUpperCase()}</p>
                            <p class = "divCarrito__precio"> $${productoAgregar.precio} </p>
                            <p class = "divCarrito__cantidad" id = cantidad${productoAgregar.id}>cantidad: ${productoAgregar.cantidad}</p>
                            <button class="botonEliminar" id="eliminar${productoAgregar.id}">
                            &#128465; Eliminar</button>`
    //INSERTO EL CONTENIDO CREADO EN EL CARRITO
    contenedorCarrito.appendChild(divCarrito)
    actualizarCarrito()

    let botonEliminar = document.getElementById(`eliminar${productoAgregar.id}`)
    botonEliminar.addEventListener('click', ()=>{
        if(productoAgregar.cantidad == 1){
            botonEliminar.parentElement.remove()
            carritoDeCompras = carritoDeCompras.filter(el => el.id != productoAgregar.id);

            memorizar(carritoDeCompras);
            actualizarCarrito();
        }else{
            productoAgregar.cantidad = productoAgregar.cantidad - 1;
            document.getElementById(`cantidad${productoAgregar.id}`).innerHTML = `<p id=cantidad${productoAgregar.id}>Cantidad:${productoAgregar.cantidad}</p>`
            actualizarCarrito()
        }

    })
}


//_____________FUNCION PARA ACTUALIZAR CARRITO________________________
function actualizarCarrito() {
    contadorCarrito.innerText = carritoDeCompras.reduce((acc , el)=> acc + el.cantidad, 0);
    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad), 0);
 }


// //______________________ FILRO productos.html/header___________________-
let busqueda = document.getElementById('busqueda');
busqueda.onkeyup = () => {//Cuando se presione una tecla
    let prodBuscado = busqueda.value.toUpperCase();//pasar a mayusculas la busqueda
    let buscados = stock.filter(producto => producto.nombre.toUpperCase().includes(prodBuscado));
    sectionCatalogo.innerHTML="";
    mostrarProductos(buscados);
}


//__________________BOTON CARRITO PARA ABRIR SIDEBAR__________________

//Al agregar la clase 'active' se desplaza el carrito (en formato sidebar) y un fondo translúcido
btnToggle.addEventListener('click', ()=>{
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('sidebar-bkground').classList.toggle('active');
})

//Al hacer click sobre el fondo translúcido (carritoBkg) se borra la clase y se oculta el carrito
carritoBkg.addEventListener('click',()=>{
    document.getElementById('sidebar').classList.remove('active');
    carritoBkg.classList.remove('active');
})
//Al hacer click sobre el boton cerrar (btnCerrar) se borra la clase y se oculta el carrito
btnCerrar.addEventListener('click',()=>{
    document.getElementById('sidebar').classList.remove('active');
    carritoBkg.classList.remove('active');
})

  //CIERRE EN CARRITO DE COMPRAS
  btnConfirm.addEventListener('click', () =>{
    if (pagoEfectivo.checked == true){
        document.getElementById('sidebar').classList.remove('active');
        carritoBkg.classList.remove('active');
        modalCarrito.classList.add('active');
        numeroOrden(orderNumber);
        btnAceptarCarrito.addEventListener('click', ()=>{
            modalCarrito.classList.remove('active');
        })
    }else if(pagoCredito.checked == true){
        window.location.href ="tarjeta.html";
    }else{
        console.log('elige un medio de pago');
    }
})
