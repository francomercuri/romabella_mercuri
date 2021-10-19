"use strict";

//_________________FUNCTION JQUERY AGREGAR UN TITULO__________________
$("#tituloCatalogo").append("<div>\n                                     <h1>Cat\xE1logo de productos Romabella</h1>\n                                     <p>Disfruta de recorrer nuestro cat\xE1logo completo y llevarte lo que m\xE1s te guste <span>Todos nuestros productos son de excelente calidad, por eso te ofrecemos garant\xEDa de 60 d\xEDas</span></p>\n                                     </div>");
$("#saludo").append("\xA1Hola, al fin llegaste! Este es el sitio donde encontrar\xE1s toda la indumentaria que te guste.</p>\n                                     <p>Porque en Romabella no s\xF3lo nos encargamos de la moda, <span>\xA1Tenemos ropa y accesorios de todo tipo!</span>\n                                     porque lo m\xE1s importante es que nuestros productos sean <span class=\"sloganTwo\">Simplemente... Lindos.</span>");
$(window).on('load', function () {
  $("#sectionCatalogo").fadeIn('slow');
  $("#logo").delay(2000).slideUp(1000).slideDown(1500);
});
$(window).on('load', function () {
  $("#marca").slideDown(1000), $("#slogan").slideDown(1000);
});