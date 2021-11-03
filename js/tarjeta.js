const tarjeta = document.querySelector('#tarjeta');
const btnAbrirForm = document.querySelector('#btn-abrir-form');
const formulario = document.querySelector('#formulario-tarjeta');
const numeroTarjeta = document.querySelector('#tarjeta .tj-numero');
const nombreTarjeta = document.querySelector('#tarjeta .tj-nombre');
const logoTarjeta = document.querySelector('#tj-logo');
const firma = document.querySelector('#tarjeta .tj-firma p');
const monthVencimiento = document.querySelector('#tarjeta #vencimiento .month');
const yearVencimiento = document.querySelector('#tarjeta #vencimiento .year');
const cvv = document.querySelector('#tarjeta .cvv');
const btnConfirm = document.querySelector('#btn-confirm'),
    pagoEfectivo = document.querySelector('#efectivo'),
    pagoCredito = document.querySelector('#credito');
//variables para cierre Tarjeta
const tjConfirm = document.querySelector('#formulario-tarjeta .btn-enviar');
const orderNumber = document.querySelector('#orderNumber');
const modalTarjeta = document.querySelector('#tj-modal')
const btnAceptarTj = document.querySelector('.tj-cierre-btn');
let aleatorio = Math.round(Math.random()*1000000);


// -----------------FUNCION PARA MOSTRAR EL FRENTE DE LA TARJETA
const mostrarFrente = () => {
    if(tarjeta.classList.contains('tj-active')){
        tarjeta.classList.remove('tj-active');
    }
}

// -----------------------------Rotar tarjeta
tarjeta.addEventListener('click',() =>{
    tarjeta.classList.toggle('tj-active');
})

// -----------------------------Abrir formulario
btnAbrirForm.addEventListener('click',() =>{
    btnAbrirForm.classList.toggle('btn-active');
    formulario.classList.toggle('form-active');
})

// ----------------------Select para meses de vencimiento
for (let i = 1; i <= 12; i++){
    let option = document.createElement('option');//Se crea el elemento option
    option.value = i;//se le agrega el valor de i (1-12)
    option.innerText = i;//Se le agrega el texto correspondiente a i
    formulario.selectMonth.appendChild(option);

}

// ----------------------Select para años de vencimiento
const actualYear = new Date().getFullYear();//se crea la constante con el año actual
for (let i = actualYear; i <= actualYear +10; i++){
    let option = document.createElement('option');//Se crea el elemento option
    option.value = i;//se le agrega el valor de i (1-12)
    option.innerText = i;//Se le agrega el texto correspondiente a i
    formulario.selectYear.appendChild(option);
}

// ---------------Número de Tarjeta + validacion-----------------------

    // El input recibe el evento y su valor se guarda en la variable
formulario.inputNumero.addEventListener('keyup',(e) =>{
    let valorInput = e.target.value;
    formulario.inputNumero.value = valorInput
    //Expresión regular para eliminar espacios en blanco
    .replace(/\s/g, "")
    //Eliminar letras y otros digitos != 0 - 9
    .replace(/\D/g, "")
    //Tomar los números de 0 a 9, agrupar cada 4 caracteres y agregar 1 espacio
    .replace(/([0-9]{4})/g, '$1 ')
    //Eliminar espacio final generado por la expresion anterior
    .trim();

    numeroTarjeta.textContent = valorInput;

    if(valorInput == ""){//condicional en caso de borrar los numeros del form
        numeroTarjeta.textContent = '#### #### #### ####';//volvemos al contenido predeterminado
        logoTarjeta.innerHTML = '';//eliminamos la imagen de logo
    }

    if(valorInput[0] == 4){
        logoTarjeta.innerHTML = '';//elimino el logo para que no aparezca uno por cada tecla que toco
        const imagen = document.createElement('img');
        imagen.src = '../image/tarjeta/visa.png';
        logoTarjeta.appendChild(imagen);
    }else if(valorInput[0] == 5){
        logoTarjeta.innerHTML = '';
        const imagen = document.createElement('img');
        imagen.src = '../image/tarjeta/mastercard.png';
        logoTarjeta.appendChild(imagen);
    }
    //Mostrar el frente de la tarjeta al usuario
    mostrarFrente();
});

// --------------- Nombre de Tarjeta + validacion-----------------------

formulario.inputNombre.addEventListener('keyup' , (e) =>{
        let valorInput = e.target.value;
        formulario.inputNombre.value = valorInput
        //Eliminar numeros con expresión regular
        .replace(/[1-9]/g, '');
        nombreTarjeta.textContent = valorInput;
        firma.textContent = valorInput.toLowerCase();

        if(valorInput == ''){
            nombreTarjeta.textContent = 'Juan Perez';
            firma.textContent = 'Juan Perez';
        }

        mostrarFrente();
});

// Select mes
formulario.selectMonth.addEventListener('change', (e) =>{
    monthVencimiento.textContent = e.target.value;
    mostrarFrente();
});

// Select año
formulario.selectYear.addEventListener('change', (e) =>{
    yearVencimiento.textContent = e.target.value.slice(2);
    mostrarFrente();
});

// CVV
formulario.inputCVV.addEventListener('keyup',(e)=>{
    if(!tarjeta.classList.contains('tj-active')){
        tarjeta.classList.toggle('tj-active');
    }
    formulario.inputCVV.value = formulario.inputCVV.value
    //Expresión regular para eliminar espacios en blanco
    .replace(/\s/g, "")
    //Eliminar letras y otros digitos != 0 - 9
    .replace(/\D/g, "");

    cvv.textContent = formulario.inputCVV.value;
});


//CIERRE VENTA CON TARJETA

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

