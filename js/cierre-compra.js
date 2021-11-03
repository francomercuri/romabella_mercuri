const btnConfirm = document.querySelector('#btn-confirm'),
    pagoEfectivo = document.querySelector('#efectivo'),
    pagoCredito = document.querySelector('#credito');
//variables para cierre Tarjeta
const tjConfirm = document.querySelector('#formulario-tarjeta .btn-enviar');
const orderNumber = document.querySelector('#orderNumber');
const modalTarjeta = document.querySelector('#tj-modal')
const btnAceptarTj = document.querySelector('.tj-cierre-btn');
let aleatorio = Math.round(Math.random()*1000000);


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


