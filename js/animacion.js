//_________________FUNCTION JQUERY AGREGAR UN TITULO__________________

        $("#tituloCatalogo").append(`<div>
                                     <h1>Catálogo de productos Romabella</h1>
                                     <p>Disfruta de recorrer nuestro catálogo completo y llevarte lo que más te guste <span>Todos nuestros productos son de excelente calidad, por eso te ofrecemos garantía de 60 días</span></p>
                                     </div>`);

        $("#saludo").append( `¡Hola, al fin llegaste! Este es el sitio donde encontrarás toda la indumentaria que te guste.</p>
                                     <p>Porque en Romabella no sólo nos encargamos de la moda, <span>¡Tenemos ropa y accesorios de todo tipo!</span>
                                     porque lo más importante es que nuestros productos sean <span class="sloganTwo">Simplemente... Lindos.</span>`
                                      );
$(window).on ('load',function(){
$("#sectionCatalogo").fadeIn('slow');
$("#logo").delay(2000).slideUp(1000).slideDown(1500);
})
$(window).on ('load',function(){
        $("#marca").slideDown(1000),
        $("#slogan").slideDown(1000);
});


