/*-----------------------------GLOBAL VARS-------------------------------------*/
let DIMENSION = {};
let PARTS = {};

let dot1 = $('.dot:nth-child(1)');
let dot2 = $('.dot:nth-child(2)');
let dot3 = $('.dot:nth-child(3)');
let dot4 = $('.dot:nth-child(4)');

/*-----------------------------READY FUNCTION-------------------------------------*/
function readyFn( jQuery ) {
    
    $(".animsition-overlay").animsition({
        inClass: 'overlay-slide-in-top',
        outClass: 'overlay-slide-out-top',
        inDuration: 1000,
        outDuration: 500,
        linkElement: '.animsition-link',
        // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
        loading: true,
        loadingParentElement: 'body', //animsition wrapper element
        loadingClass: 'animsition-loading',
        loadingInner: '',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: [ 'animation-duration', '-webkit-animation-duration'],
        // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
        // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
        overlay : true,
        overlayClass : 'animsition-overlay-slide',
        overlayParentElement : 'body',
        transition: function(url){ window.location.href = url; }
    });

    let s = Snap('#svg-timeline');
    DIMENSION.SquareLength = Math.floor(Math.max($( window ).width(), $(window).height()) / 12);
    DIMENSION.StartingPnt = DIMENSION.SquareLength / 2;
    DIMENSION.StartingPntX = $(window).width()*0.2 - DIMENSION.SquareLength/2 + 20;

    // change svg sttributes
    
    s.attr({
        width: Math.ceil($( window ).width()),
        height: DIMENSION.SquareLength*2
    });
    s.attr({
        viewBox:'0 0 '+ Math.ceil($( window ).width()) + ' ' + DIMENSION.SquareLength*2
    });

    $('#timeline').css({
        'margin-top':DIMENSION.SquareLength * 2 + 'px'
    });

    $('#svg-timeline').css({
        'margin-top': -1 * (DIMENSION.SquareLength * 2 + DIMENSION.SquareLength *1.5 - DIMENSION.SquareLength* 1.9 - 5) + 'px'
    });

    makeEyes(s, 1.9);
    makeBlockBody(s, 1.9, false);
    makeEyeLids(s);
    animateEyeLids();

    makeMouth(s);
    makeTie(s, 1.9);
    makeGlasses(s);

    //Group
    PARTS.SquareGroup = s.group(PARTS.Block,PARTS.RightEye, PARTS.RightTopEyeLid, PARTS.RightBottomEyeLid, 
        PARTS.LeftEye, PARTS.LeftTopEyeLid, PARTS.LeftBottomEyeLid, PARTS.Mouth, PARTS.Tie, 
        PARTS.LeftGlass, PARTS.RightGlass, PARTS.GlassHinge
    ).attr({
        cursor: 'pointer'
    });
}

$( document ).ready( readyFn );