let isStartMenuHidden = true;
let prevTab = 1;
/*-----------------------------READY FUNCTION-------------------------------------*/
function readyFn( jQuery ) {
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
        timeout: false,
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

    let allMenuItems= ['square', 'box', 'rectangle', 'circle'];
    allMenuItems.forEach((item)=>{
        $('.'+item+'-dude').hover(()=>{
            console.log(this);
            $('.'+item).toggleClass('animated');
        }, ()=>{
            $('.'+item).toggleClass('animated');
        });
    });
   
}

function openTab(index){
    restore();
    toggleTab(index);
    toggleMenu();
}

function toggleTab(index){
    if(index !== prevTab){
        $('#tab-'+index +' , #tab-'+prevTab).toggleClass('active');
        prevTab = index;
    }
}

function maximize() {
    $('.browser').toggleClass('maximized');
}

function closeBrowser(){
    TweenMax.to('.browser', 0.15, {scale: 0.1, opacity: 0, transformOrigin:'top left', ease: Power4.easeInOut});
}

function minimize(){
    TweenMax.to('.browser', 0.2, {y: '100%', skewX: 10, scale: 0.1, opacity: 0, ease: Power2.easeInOut});
    TweenMax.to('#minimized-window', 0.2, {width: '25%', opacity: 1, transformOrigin:'center left', ease: Power2.easeInOut});
}

function restore(){
    TweenMax.to('.browser', 0.2, {y: '0%', skewX: 0, scale: 1, opacity: 1, ease: Power2.easeInOut});
    TweenMax.to('#minimized-window', 0.2, {width: '0%', opacity: 0, ease: Power2.easeInOut});   
}

function toggleMenu(){
    if(isStartMenuHidden){
        TweenMax.to('.start', 0.5, {y: '0%', ease: Power2.easeInOut, onComplete: ()=>{
            isStartMenuHidden = false;
        }});
    }else{
        TweenMax.to('.start', 0.5, {y: '100%', ease: Power2.easeInOut, onComplete: ()=>{
            isStartMenuHidden = true;
        }});
    }
}


$( document ).ready( readyFn );