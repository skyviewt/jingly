/*-----------------------------GLOBAL VARS-------------------------------------*/
let DIMENSION = {};
let PARTS = {
    'dot1': $('.dot:nth-child(1)'),
    'dot2': $('.dot:nth-child(2)'),
    'dot3': $('.dot:nth-child(3)'),
    'dot4': $('.dot:nth-child(4)'),
    'timelineInside': $('.inside')
};
let currentDot = 1;
let prevDot = -1;

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
    makeTie(s, 1.9, COLOR.Blue);
    makeGlasses(s, COLOR.Red);
    makeWorkerHat(s, 1.9, COLOR.Yellow);
    

    //Group
    PARTS.SquareGroup = s.group(PARTS.Block,PARTS.RightEye, PARTS.RightTopEyeLid, PARTS.RightBottomEyeLid, 
        PARTS.LeftEye, PARTS.LeftTopEyeLid, PARTS.LeftBottomEyeLid, PARTS.Mouth, PARTS.Tie, 
        PARTS.LeftGlass, PARTS.RightGlass, PARTS.GlassHinge, PARTS.WorkerHat, PARTS.WorkerHatEdge
    ).attr({
        cursor: 'pointer'
    });

    PARTS.dot1.click(function(){

        TweenMax.to(PARTS.timelineInside, 1, {width: '100%', ease: Back.easeInOut, delay: 0.3});
        TweenMax.fromTo(PARTS.SquareGroup.node, 1,{},  {x: 0, ease: Back.easeInOut});
        prevDot = currentDot;
        currentDot = 1;
        animateDotChange();
        animateAccesories();
    });

    PARTS.dot2.click(function(){
        TweenMax.to(PARTS.timelineInside, 1, {width: '60%', ease: Back.easeInOut, delay: 0.3});
        TweenMax.to(PARTS.SquareGroup.node, 1, {x: $( window ).width()*.2+'px', ease: Back.easeInOut});
        prevDot = currentDot;
        currentDot = 2;
        animateDotChange();
        animateAccesories();
    });

    PARTS.dot3.click(function(){
        TweenMax.to(PARTS.timelineInside, 1, {width: '40%', ease: Back.easeInOut, delay: 0.3});
        TweenMax.to( PARTS.SquareGroup.node, 1, {x: $( window ).width()*.4+'px', ease: Back.easeInOut});
        prevDot = currentDot;
        currentDot = 3;
        animateDotChange();
        animateAccesories();
    });

    PARTS.dot4.click(function(){
        TweenMax.to(PARTS.timelineInside, 1, {width: '0%', ease: Back.easeInOut, delay: 0.3});
        TweenMax.to(PARTS.SquareGroup.node, 1, {x: $( window ).width()*.6+'px', ease: Back.easeInOut});
        prevDot = currentDot;
        currentDot = 4;
        animateDotChange();
        animateAccesories(); 
    });
}

function animateDotChange(){
     TweenMax.to(PARTS['dot'+prevDot], 0.2, {scale: 1, ease: Back.easeInOut, delay: 0.5});
     TweenMax.to(PARTS['dot'+currentDot], 0.2, {scale: 0, ease: Power4.easeInOut});
}

function animateAccesories(){
    hidePrevAccesory();
}

function hidePrevAccesory() {
    if(prevDot === 4) {
        // education => glasses
        TweenMax.to(PARTS.LeftGlass.node, 0.5, 
            {strokeDashoffset: DIMENSION.LeftGlassLength, ease: Power2.easeOut}
        );
        TweenMax.to(PARTS.RightGlass.node, 0.5, 
            {strokeDashoffset: DIMENSION.RightGlassLength, ease: Power2.easeOut}
        );
        TweenMax.to(PARTS.GlassHinge.node, 0.5, 
            {strokeDashoffset: DIMENSION.GlassHingeLength, ease: Power2.easeOut, onComplete: ()=>{
                showCurrentAccesory();
            }}
        );
    }else if(prevDot === 3){
        //working => hat
        TweenMax.to([PARTS.WorkerHat.node, PARTS.WorkerHatEdge.node],0.5, 
            {fill:'none', ease: Power2.easeOut, onComplete:()=>{
                showCurrentAccesory();
            }}
        );
    }else if(prevDot === 2){
        //experience => tie
        TweenMax.to([PARTS.Tie.node],0.5, 
            {strokeDashoffset: DIMENSION.TieLength, ease: Power2.easeOut, onComplete:()=>{
                showCurrentAccesory();
            }}
        );
    }else {
        showCurrentAccesory();
    }
}

function showCurrentAccesory() {
    if(currentDot === 4) {
        TweenMax.to([PARTS.LeftGlass.node, PARTS.RightGlass.node, PARTS.GlassHinge.node],0.5, 
            {strokeDashoffset: 0, ease: Power2.easeOut}
        );
    }else if(currentDot === 3){
        TweenMax.to([PARTS.WorkerHat.node, PARTS.WorkerHatEdge.node],0.5, 
            {fill: COLOR.Yellow, ease: Power2.easeOut}
        );
    }else if(currentDot === 2){
        TweenMax.to([PARTS.Tie.node],0.5, 
            {strokeDashoffset: 0, ease: Power2.easeOut}
        );
    }else {
        
    }
}

$( document ).ready( readyFn );