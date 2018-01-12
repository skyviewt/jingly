/*-----------------------------READY FUNCTION-------------------------------------*/
function readyFn( jQuery ) {
    
    $.mobile.loading().hide();
    $('.lazy').Lazy({
        scrollDirection: 'vertical',
        effect: 'fadeIn',
        visibleOnly: true,
        placeholder: '../img/default.jpg',
        defaultImage: '../img/default.jpg'
    });
    $('.animsition-overlay').animsition({
        inClass: 'overlay-slide-in-top',
        outClass: 'overlay-slide-out-top',
        inDuration: 1000,
        outDuration: 500,
        linkElement: '.animsition-link',
        // e.g. linkElement: 'a:not([target='_blank']):not([href^='#'])'
        loading: true,
        loadingParentElement: 'body', //animsition wrapper element
        loadingClass: 'animsition-loading',
        loadingInner: '',
        timeout: true,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: [ 'animation-duration', '-webkit-animation-duration'],
        // 'browser' option allows you to disable the 'animsition' in case the css property in the array is not supported by your browser.
        // The default setting is to disable the 'animsition' in a browser that does not support 'animation-duration'.
        overlay : true,
        overlayClass : 'animsition-overlay-slide',
        overlayParentElement : 'body',
        transition: function(url){ window.location.href = url; }
    });
    new CBPGridGallery( document.getElementById( 'grid-gallery' ),  {isShowThumb: true} );

}

$( document ).ready( readyFn );