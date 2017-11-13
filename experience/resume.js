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

let timelineHome = new TimelineMax({pause: true});
let timelineMcgill = new TimelineMax({pause: true});
let timelineLaronde = new TimelineMax({pause: true});
let timelineMileEnd = new TimelineMax({pause: true});

let sliderActiveTag = {
    1: '',
    2: '-ubisoft-club',
    3: '-programming',
    4: '-education'
}

/*-----------------------------READY FUNCTION-------------------------------------*/
function readyFn( jQuery ) {

    // get background svg
    let svgUrl = "../experience/experience.svg";
    
    $('#background-container').load(svgUrl, function(){
        timelineHome.add([
            TweenMax.to('#home', 0.8, {scale: 1.05, transformOrigin: 'center bottom', yoyo: true, repeat: -1, ease: Sine.easeInOut}),
            TweenMax.to('#tree', 0.8, {skewX: -5, transformOrigin: 'center bottom', yoyo: true, repeat: -1, ease: Sine.easeInOut}),
            TweenMax.to('#house-bush', 0.8, {skewX: 5, transformOrigin: 'center bottom', yoyo: true, repeat: -1, ease: Sine.easeInOut})
        ], 0);
        timelineHome.play(0);
    });

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
    DIMENSION.SquareLength = Math.min(Math.floor(Math.max($( window ).width(), $(window).height()) / 20), 50);
    DIMENSION.StartingPnt = DIMENSION.SquareLength / 2;
    DIMENSION.StartingPntX = $(window).width()*0.2 - DIMENSION.SquareLength/2 + 20;

    $('#timeline-text').css({
        'margin-top': (1.5*DIMENSION.SquareLength)+'px'
    });

    $('.sliders').css({
        'margin-top': (-1*DIMENSION.SquareLength)+'px'
    });
    // change svg sttributes
    
    s.attr({
        width: Math.ceil($( window ).width()),
        height: DIMENSION.SquareLength*2
    });
    s.attr({
        viewBox:'0 0 '+ Math.ceil($( window ).width()) + ' ' + DIMENSION.SquareLength*2
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
        TweenMax.to(PARTS.SquareGroup.node, 1, {x: 0, ease: Back.easeInOut});
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
    
    animateMouseMoveBody(PARTS.SquareGroup);


}// end of readyFn

function animateDotChange(){
     TweenMax.to(PARTS['dot'+prevDot], 0.2, {scale: 1, ease: Back.easeInOut, delay: 0.5});
     TweenMax.to(PARTS['dot'+currentDot], 0.2, {scale: 0, ease: Power4.easeInOut});
}

function animateAccesories(){
    hidePrevAccesory();
}

function hidePrevAccesory() {
    let sign = prevDot < currentDot ? -1 : 1;
    if(prevDot === 4) {
        timelineMcgill.pause(0);
        // education
        TweenMax.fromTo([PARTS.LeftGlass.node, PARTS.RightGlass.node, PARTS.GlassHinge.node],0.5,{scale: 1, opacity:1}, 
            {scale: 0, opacity: 0, ease: Back.easeInOut, onComplete: ()=>{
                showCurrentSlideAndAcc();
            }}
        );
    }else if(prevDot === 3){
        timelineLaronde.pause(0);
        //skills
        TweenMax.fromTo([PARTS.WorkerHat.node, PARTS.WorkerHatEdge.node],0.5, {x: 0, opacity: 1},
            {x: sign * DIMENSION.SquareLength/2, opacity:0, ease: Power2.easeOut, onComplete:()=>{
                showCurrentSlideAndAcc();
            }}
        );
    }else if(prevDot === 2){
        timelineMileEnd.pause(0);
        //experience
        TweenMax.to([PARTS.Tie.node],0.5, 
            {strokeDashoffset: DIMENSION.TieLength, fill: 'none', ease: Power2.easeOut, onComplete:()=>{
                showCurrentSlideAndAcc();
            }}
        );
    }else {
        //home
        timelineHome.pause(0);
        showCurrentSlideAndAcc();
    }
}

function showCurrentSlideAndAcc() {
    let sign = prevDot < currentDot ? -1 : 1;
    if(currentDot === 4) {
        //education
        if(timelineMcgill.getChildren(true, true, true, 0).length === 0) {
            timelineMcgill.add([
                TweenMax.to('#mcgill', 1, {scale:1.05, transformOrigin: 'center bottom', ease: Sine.easeInOut}),        
                TweenMax.to('#mcgill-flag', 0.8, {skewY: -10, scaleX: 0.85, transformOrigin: 'left center', yoyo: true, repeat: -1, ease: Sine.easeInOut}),
                TweenMax.to('#windows', 0.8, {fill:COLOR.Yellow, yoyo: true, repeat: 2, ease: Bounce.easeInOut, delay: 0.8}),
                TweenMax.to('#mcgill-door', 0.5, {fill:COLOR.BlackStroke, ease: Sine.easeInOut})
            ],0);
        }
        timelineMcgill.play(0);
        
        TweenMax.fromTo([PARTS.LeftGlass.node, PARTS.RightGlass.node, PARTS.GlassHinge.node],0.5,{scale: 0, opacity:0}, 
            {scale: 1, opacity: 1, ease: Back.easeInOut}
        );
        toggleSlide();
    }else if(currentDot === 3){
        //skills
        if(timelineLaronde.getChildren(true, true, true, 0).length === 0) {
            timelineLaronde.add([
                TweenMax.fromTo('#excited', 0.5,{opacity: 0, scale: 1}, {opacity: 1, scale: 1.15, transformOrigin: 'center bottom', yoyo: true, repeat: -1, ease: Back.easeInOut}),
                TweenMax.to('#bridge-light', 0.8, {stroke:COLOR.Red,yoyo: true, repeat: -1, ease: Bounce.easeInOut})
            ],0);
        }
        timelineLaronde.play(0);
        
        TweenMax.fromTo([PARTS.WorkerHat.node, PARTS.WorkerHatEdge.node],0.5, {x: sign * DIMENSION.SquareLength, opacity: 0},
            {x:0, opacity: 1, ease: Power2.easeOut}
        );
        toggleSlide();
    }else if(currentDot === 2){
        // experience
        if(timelineMileEnd.getChildren(true, true, true, 0).length === 0) {
            // add background animation for first time
            timelineMileEnd.add([
                TweenMax.to('#tank', 0.8, {scale: 1.05, transformOrigin: 'center bottom', yoyo: true, repeat: -1, ease: Sine.easeInOut}),
                TweenMax.staggerFromTo('.graffitis', 0.8, {oppacity: 0, rotation: 125 , scale: 1.2}, {opacity: 1, rotation: 0, scale: 1, ease: Back.easeInOut}, 0.2)
            ],0);
        }
        timelineMileEnd.play(0);
        TweenMax.to([PARTS.Tie.node],0.8, 
            {strokeDashoffset: 0, fill: COLOR.Blue, ease: Power2.easeOut}
        );
        toggleSlide();
    }
    else{
        // home
        timelineHome.play(0);
        toggleSlide();
    }
}

function toggleSlide() {
    let sign = prevDot < currentDot ? -1 : 1;

    TweenMax.fromTo('#slider-'+prevDot+sliderActiveTag[prevDot], 0.4, {x: 0, opacity: 1}, {x: -1 * sign*80, opacity: 0, ease: Back.easeIn,
     onComplete: ()=>{
        if(prevDot !== 1) {
            $('#slider-nav-'+prevDot).toggleClass('hide');
        }
        
        $('#slider-'+prevDot+sliderActiveTag[prevDot]).toggleClass('hide');

        TweenMax.fromTo('#slider-'+currentDot+sliderActiveTag[currentDot], 0.6, {x: sign*80, opacity: 0}, {x:0, opacity: 1, ease: Back.easeOut, onStart: ()=>{
            
            $('#slider-'+currentDot+sliderActiveTag[currentDot]).toggleClass('hide');
            if(currentDot !== 1) {
                $('#slider-nav-'+currentDot).toggleClass('hide');
            }
        }},0);
        
    }}, 0);
}

function showSection(sectionName){
    // hide previous slide and active nav
    
    TweenMax.fromTo('#slider-'+currentDot+sliderActiveTag[currentDot], 0.4, {y: 0, opacity: 1}, {y:100, opacity: 0, ease: Back.easeIn, onComplete: ()=>{
        
        toggleSliderNav();
        // show current slide and active nav
        TweenMax.fromTo('#slider-'+currentDot+'-'+sectionName, 0.4, {y: -100, opacity: 0}, {y:0, opacity: 1, ease: Back.easeOut, onStart: ()=>{
            toggleSliderNav(sectionName);
        } },0); 
    }},0);
    

   
}

function toggleSliderNav(sectionName){
    if(sectionName === undefined){
        $('#slider-'+currentDot+sliderActiveTag[currentDot]).toggleClass('hide');
        $('#slider-nav-section'+sliderActiveTag[currentDot]).toggleClass('active');
    }else{
        if(sliderActiveTag[currentDot] !== sectionName){
            $('#slider-'+currentDot+'-'+sectionName).toggleClass('hide');
            $('#slider-nav-section'+'-'+sectionName).toggleClass('active');
            sliderActiveTag[currentDot] = '-'+sectionName;
        }
    }
}

$( document ).ready( readyFn );