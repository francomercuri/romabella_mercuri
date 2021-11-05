//______________Funcion para agregar numero de orden aleatorio al cierre de la compra________

function numeroOrden (contenedor){
    contenedor.innerHTML = "";
    let codigoCompra = document.createElement('div');
    codigoCompra.classList.add('codigoCompra');
    codigoCompra.innerHTML += `<p>Su número de orden es: <span>${aleatorio}</span></p>`;
    contenedor.appendChild(codigoCompra);
}

//__________________FUNCION AGREGAR A LOCAL STORAGE_____________________________
function memorizar(dato){
    localStorage.setItem('carrito', JSON.stringify(dato));
    }

     //________________FUNCION PARA RECUPERAR STORAGE___________________
     function recordar(){
        let recordar = JSON.parse(localStorage.getItem('carrito'));
        let stockBack = JSON.parse(localStorage.getItem('TiendaRopa'))
        stockBack ? stockBack.forEach(el=> stock.push(el)) : []

    if(recordar){
       recordar.forEach( el => {
           carritoDeCompras.push(el)
           mostrarCarrito(el);
                           })
            actualizarCarrito()
           }
    }


const btnCarrito = document.querySelector('#carrito-btn');


