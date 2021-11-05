class Productos{
    constructor(id,destacado,nombre,marca,material,talle,precio,cantidad,img){
     this.id= id;
     this.destacado= destacado;
     this.nombre=nombre;
     this.marca=marca;
     this.material=material;
     this.talle=talle;
     this.precio=precio;
     this.cantidad=cantidad;
     this.img=img
    }
}
let stock = []
$.getJSON('../productos.json',(data) => {
    data.forEach(el => {
       stock.push(new Productos(el.id,el.destacado,el.nombre,el.marca,el.material,el.talle,el.precio,el.cantidad,el.img))
       localStorage.setItem('Tienda', JSON.stringify(stock))
    });

})
