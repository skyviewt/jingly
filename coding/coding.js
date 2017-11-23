let isStartMenuHidden = true;
let currentTab = 1;
let backgroundTimeline = new TimelineMax({pause: true});
let isMaximized = false;
let windowNameArray = ['Professional', 'Internships', 'Academic', 'Personal'];
/*-----------------------------READY FUNCTION-------------------------------------*/
function readyFn( jQuery ) {
    $.mobile.loading().hide();
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

    new CBPGridGallery( document.getElementById( 'grid-gallery' ), {isShowThumb: false} );

    let allMenuItems= ['square', 'box', 'rectangle', 'circle'];
    allMenuItems.forEach((item)=>{
        $('.'+item+'-dude').hover(()=>{
            console.log(this);
            $('.'+item).toggleClass('animated');
        }, ()=>{
            $('.'+item).toggleClass('animated');
        });
    });

    // animate svg background
    backgroundTimeline.add([
        TweenMax.staggerFromTo(['#left-tree-1', '#left-tree-2'], 0.9, {skewX: 0, rotation: 0, scaleY: 1}, {skewX: 0.1, rotation:3, scaleY: 1.012, yoyo: true, repeat: -1, transformOrigin:"center bottom", delay: 1}, 0.1),
        TweenMax.staggerFromTo(['#right-tree-1', '#right-tree-2', '#right-tree-3'], 1.1, {skewX: 0, rotation: 0, scaleY: 1}, {skewX: 0.3, rotation:4, scaleY: 1.005, yoyo: true, repeat: -1, transformOrigin:"center bottom", delay: 1.5}, 0.15),
        TweenMax.staggerFromTo('.stars1', 1, {opacity: 0}, {opacity: 1, yoyo: true, repeat: -1, ease: Back.easeInOut}, 0.1),
        TweenMax.staggerFromTo('.stars2', 1.2, {opacity: 0}, {opacity: 1, yoyo: true, repeat: -1, repeatDelay: Math.floor(Math.random() * 6) + 1, ease: Back.easeInOut, delay: 0.5}, 0.2),
        TweenMax.staggerFromTo('.stars3', 0.8, {opacity: 0}, {opacity: 1, yoyo: true, repeat: -1, repeatDelay: Math.floor(Math.random() * 6) + 1, ease: Back.easeInOut, delay: 0.7}, 0.1),
        TweenMax.staggerFromTo('.stars4', 0.9, {opacity: 0}, {opacity: 1, yoyo: true, repeat: -1, repeatDelay: Math.floor(Math.random() * 6) + 1, ease: Back.easeInOut, delay: 0.3}, 0.5),
        TweenMax.staggerFromTo('.stars5', 1.1, {opacity: 0}, {opacity: 1, yoyo: true, repeat: -1, repeatDelay: Math.floor(Math.random() * 6) + 1, ease: Back.easeInOut, delay: 1}, 0.3)
    ]);

    backgroundTimeline.play();

    $('html').click(function(event) {
        //if clicked element is not your element and parents aren't your div
        if(!isStartMenuHidden){
            if (event.target.className != 'start' && $(event.target).parents('.start').length == 0) {
                toggleMenu();
            }
        }
    });

    $('.tab-content').on('swipeleft', ()=>{
        if(currentTab < 4){
            toggleTab(currentTab + 1);
        }
    });

    $('.tab-content').on('swiperight', ()=>{
        if(currentTab > 1){
            toggleTab(currentTab - 1);
        }
    });

    $( document ).on( 'keydown', function( event ) {
        
        let keyCode = event.keyCode || event.which;

        switch (keyCode) {
            case 37:
            //left
            if(currentTab > 1){
                toggleTab(currentTab - 1);
            }
             break;
            case 39:
            //right
            if(currentTab < 4){
                toggleTab(currentTab + 1);
            }
            break;
        }
        
    });
   
}// end readyFn

function openTab(index){
    if(!isStartMenuHidden){
        restore();
        toggleTab(index);
        toggleMenu();
    }
}

function toggleTab(index){
    if(index !== currentTab){
        $('#tab-'+index +' , #tab-'+currentTab).toggleClass('active');
        $('#tabs-content-'+currentTab+', #tabs-content-'+index).toggleClass('hide');
        if(isMaximized) {
            $('#tabs-content-'+currentTab+', #tabs-content-'+index).toggleClass('maximized');
        }
        currentTab = index;
        $(".browser-tabs").animate({scrollLeft: $('#tab-'+index).offset().left - $('.browser-tabs').offset().left}, 500);
    }
}

function maximize() {
    $('.browser, #tabs-content-'+currentTab).toggleClass('maximized');
    isMaximized = !isMaximized;
}

function closeBrowser(){
    TweenMax.to('.browser', 0.15, {scale: 0.1, opacity: 0, transformOrigin:'top left', ease: Power4.easeInOut, onComplete: ()=>{
        $('.browser').css({display: 'none'});
    }});
}

function minimize(){
    TweenMax.to('.browser', 0.2, {y: '100%', skewX: 10, scale: 0.1, opacity: 0, ease: Power2.easeInOut});
    TweenMax.to('#minimized-window', 0.2, {width: '25%', opacity: 1, transformOrigin:'center left', ease: Power2.easeInOut, onComplete: ()=>{
        $('#window-name').html(windowNameArray[currentTab-1]);
    }});
}

function restore(){
    TweenMax.to('.browser', 0.2, {y: '0%', skewX: 0, scale: 1, opacity: 1, ease: Power2.easeInOut, onStart: ()=>{
        $('.browser').css({display: 'flex'});
    }});
    TweenMax.to('#minimized-window', 0.2, {width: '0%', opacity: 0, ease: Power2.easeInOut});   
}

function toggleMenu(){
    if(isStartMenuHidden){
        TweenMax.to('.start', 0.5, {y: '0%', ease: Power2.easeInOut, onStart: ()=>{
            $('.start').css({
                display: 'flex'
            });
        }, onComplete: ()=>{
            
            isStartMenuHidden = false;
        }});
    }else{
        TweenMax.to('.start', 0.5, {y: '100%', ease: Power2.easeInOut, onStart: ()=>{
            
        }, onComplete: ()=>{
            $('.start').css({
                display: 'none'
            });
            isStartMenuHidden = true;
        }});
    }
}

function togglePreview(previewClass){
    $('.project-preview.'+previewClass).toggleClass('maximized');
}


$( document ).ready( readyFn );