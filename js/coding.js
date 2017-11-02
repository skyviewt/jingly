/*-----------------------------READY FUNCTION-------------------------------------*/
function readyFn( jQuery ) {
    
    var btn = $('#accordion li a');
    var wrapper = $('#accordion li');
    
    $(btn).on('click', function() {
        $(btn).removeClass('active');
        $(btn).parent().find('.addon').removeClass('fadein');
        
        $(this).addClass('active');
        $(this).parent().find('.addon').addClass('fadein');
    });
}


$( document ).ready( readyFn );