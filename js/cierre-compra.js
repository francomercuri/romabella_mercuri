const btnConfirm = document.querySelector('#btn-confirm'),
    pagoEfectivo = document.querySelector('#efectivo'),
    pagoCredito = document.querySelector('#credito');

const tjConfirm = document.querySelector('#formulario-tarjeta .btn-enviar');
const orderNumber = document.querySelector('#orderNumber');
const modalTarjeta = document.querySelector('#tj-modal')
const btnAceptarTj = document.querySelector('.tj-cierre-btn');


let aleatorio = Math.round(Math.random()*1000000);
    //CIERRE EN CARRITO DE COMPRAS
// btnConfirm.addEventListener('click', () =>{
//     if (pagoEfectivo.checked == true){
//         console.log('gracias por su compra')
//     }else if(pagoCredito.checked == true){
//         window.location.href ="tarjeta.html";
//     }else{
//         console.log('elige un medio de pago');
//     }
// })



tjConfirm.addEventListener('click',()=>{
    modalTarjeta.classList.add('active');
    numeroOrden(orderNumber);
});

function numeroOrden (contenedor){
    contenedor.innerHTML = "";
    let codigoCompra = document.createElement('div');
    codigoCompra.classList.add('codigoCompra');
    codigoCompra.innerHTML += `<p>Su número de orden es: <span>${aleatorio}</span></p>`;
    contenedor.appendChild(codigoCompra);
}

btnAceptarTj.addEventListener('click', ()=>{
    modalTarjeta.classList.remove('active');
    window.location.href ="../index.html";
})

