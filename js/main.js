/*-----------------------------GLOBAL VARS-------------------------------------*/
let COLOR = {
    'BlackStroke': '#1f2c39',
    'BlobFill': 'rgb(236, 240, 241)',
    'Red': '#E71D36',
    'Yellow': '#FF9F1C',
    'Green': '#2EC4B6',
    'Blue': '#005499',
    'White': '#FDFFFC',
    'Moustache': '#77818C'
};

let isMenuShown = false;
let isArtClicked = false;
let isCodingClicked = false;
let isResumeClicked = false;
let DIMENSION = {};
let PARTS = {};

let timelineJump = new TimelineMax({paused:true});
let timelineButtons = new TimelineMax({paused:true});

let TEXT = {
    Title: {
        beforeClick: 'Hello!',
        afterClick: 'Welcome!'
    },
    body: {
        afterClick:'My name is Jing, I am a programmer and illustrator.',
        art: 'View my artwork collection',
        coding: 'Check out my coding project',
        resume: 'Learn about my experiences'
    }
}
let artButton = $('.art');
let codingButton = $('.programming');
let resumeButton = $('.resume');

let redirectLinkButton = $('.animsition-overlay button');
let redirectLink = redirectLinkButton.find('a');

let linkStr = {
    art: './art/index.html',
    programming: './coding/index.html',
    resume: 'experience/index.html'
};

let msgTitle = $('.message-title');
let msgBody= $('.message-body');

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

    let s = Snap('#svg');
    DIMENSION.SquareLength = Math.floor(Math.min($( window ).width(), $( window ).height()) / 4);
    DIMENSION.StartingPnt = (DIMENSION.SquareLength*2 - DIMENSION.SquareLength) / 2;

    // change svg sttributes
    s.attr({
        width:DIMENSION.SquareLength*2,
        height: DIMENSION.SquareLength*2
    });
    s.attr({
        viewBox:'0 0 '+ DIMENSION.SquareLength*2 + ' ' + DIMENSION.SquareLength*2 
    });

    // change menu attributes
    $('.accessory').css({
        width:DIMENSION.SquareLength/2+'px', 
        left:DIMENSION.SquareLength*0.85+'px'
    });
    $('.btn').css({
        width: DIMENSION.SquareLength/1.5 +'px',
        height: DIMENSION.SquareLength/1.5 +'px'
    });

    $('.links').css({
        'margin-top': (DIMENSION.StartingPnt*1.85 - DIMENSION.SquareLength/1.5)/2 + $('.animsition-overlay button').height() + 'px'
    });
    
    //making parts
    makeEyes(s);
    makeBlockBody(s);

    // animate blob
    TweenMax.fromTo(PARTS.Block.node, 1, {strokeDashoffset: DIMENSION.BlockLength, opacity: 0}, {fill: COLOR.BlobFill, strokeDashoffset: 0, opacity: 1, ease: Power2.easeInOut, onStart: ()=>{
        animateMsg(msgTitle, TEXT.Title.beforeClick);
    }});

    makeEyeLids(s);
    animateEyeLids();
    
    makeMouth(s);
    animateMouthBig(Math.random()* 3000);

    makeMoustaches(s);
    makeTie(s);
    makeGlasses(s);

    //Group
    PARTS.SquareGroup = s.group(PARTS.Block,PARTS.RightEye, PARTS.RightTopEyeLid, PARTS.RightBottomEyeLid, 
        PARTS.LeftEye, PARTS.LeftTopEyeLid, PARTS.LeftBottomEyeLid, PARTS.Mouth, PARTS.MoustacheLeft, PARTS.MoustacheRight, PARTS.Tie, 
        PARTS.LeftGlass, PARTS.RightGlass, PARTS.GlassHinge
    ).attr({
        cursor: 'pointer'
    });
    // shadow
    PARTS.Shadow = s.ellipse(
        (DIMENSION.LeftEyeX+DIMENSION.RightEyeX)/2, DIMENSION.SquareLength*2 - DIMENSION.SquareLength/20, DIMENSION.SquareLength/4, DIMENSION.SquareLength/20
    ).attr({
        fill: COLOR.Blue,
        opacity: 0
    });

    animateJump();
    makeMenu();
    animateMenu();

}

/*-----------------------------GENERATE ELEMENTS-------------------------------------*/
function makeBlockBody(s){
    PARTS.Block = s.rect(DIMENSION.StartingPnt, DIMENSION.StartingPnt*1.85, DIMENSION.SquareLength, DIMENSION.SquareLength, DIMENSION.SquareLength/20, DIMENSION.SquareLength/20);
    DIMENSION.BlockLength = PARTS.Block.getTotalLength();
    PARTS.Block.attr({
        fill: 'none',
        stroke: COLOR.BlackStroke,
        strokeWidth: DIMENSION.EyeSize / 2
    });
    setStrokeAttributes('Block', false);
}


function makeEyes(s){
    DIMENSION.LeftEyeX = Math.floor(DIMENSION.StartingPnt + DIMENSION.SquareLength / 4.25);
    DIMENSION.RightEyeX = Math.floor(DIMENSION.StartingPnt + DIMENSION.SquareLength - DIMENSION.SquareLength / 4.25);
    DIMENSION.EyeY = Math.floor(DIMENSION.StartingPnt*1.85 + DIMENSION.SquareLength / 2.5);
    DIMENSION.EyeSize = DIMENSION.SquareLength / 20;
    
    PARTS.LeftEye = s.circle(DIMENSION.LeftEyeX, DIMENSION.EyeY, DIMENSION.EyeSize
    ).attr({
        fill: COLOR.BlackStroke
    });
    PARTS.RightEye = s.circle(DIMENSION.RightEyeX, DIMENSION.EyeY, DIMENSION.EyeSize
    ).attr({
        fill: COLOR.BlackStroke
    });

    DIMENSION.MiddleX = (DIMENSION.LeftEyeX + DIMENSION.RightEyeX)/2;
}


function makeEyeLids(s){

    PARTS.LeftTopEyeLid = s.polygon([DIMENSION.LeftEyeX-DIMENSION.EyeSize*0.75, DIMENSION.EyeY-DIMENSION.EyeSize, DIMENSION.LeftEyeX+DIMENSION.EyeSize*0.75, DIMENSION.EyeY-DIMENSION.EyeSize, 
        DIMENSION.LeftEyeX+DIMENSION.EyeSize*1.25, DIMENSION.EyeY+DIMENSION.EyeSize/4, DIMENSION.LeftEyeX-DIMENSION.EyeSize*1.25, DIMENSION.EyeY + DIMENSION.EyeSize/4]
    ).attr({
        fill: COLOR.BlobFill
    });
    PARTS.RightTopEyeLid = s.polygon([DIMENSION.RightEyeX-DIMENSION.EyeSize*0.75, DIMENSION.EyeY-DIMENSION.EyeSize, DIMENSION.RightEyeX+DIMENSION.EyeSize*0.75, DIMENSION.EyeY-DIMENSION.EyeSize, 
        DIMENSION.RightEyeX+DIMENSION.EyeSize*1.25, DIMENSION.EyeY+DIMENSION.EyeSize/4, DIMENSION.RightEyeX-DIMENSION.EyeSize*1.25, DIMENSION.EyeY + DIMENSION.EyeSize/4]
    ).attr({
            fill: COLOR.BlobFill
    });
    PARTS.LeftBottomEyeLid = s.polygon([DIMENSION.LeftEyeX+DIMENSION.EyeSize*1.25, DIMENSION.EyeY+DIMENSION.EyeSize/4, DIMENSION.LeftEyeX-DIMENSION.EyeSize*1.25, DIMENSION.EyeY + DIMENSION.EyeSize/4, 
        DIMENSION.LeftEyeX-DIMENSION.EyeSize*0.75, DIMENSION.EyeY+DIMENSION.EyeSize*1.5, DIMENSION.LeftEyeX+DIMENSION.EyeSize*0.75, DIMENSION.EyeY + DIMENSION.EyeSize*1.5]
    ).attr({
            fill: COLOR.BlobFill
    });
    PARTS.RightBottomEyeLid = s.polygon([DIMENSION.RightEyeX+DIMENSION.EyeSize*1.25, DIMENSION.EyeY+DIMENSION.EyeSize/4, DIMENSION.RightEyeX-DIMENSION.EyeSize*1.25, DIMENSION.EyeY + DIMENSION.EyeSize/4, 
        DIMENSION.RightEyeX-DIMENSION.EyeSize*0.75, DIMENSION.EyeY+DIMENSION.EyeSize*1.5, DIMENSION.RightEyeX+DIMENSION.EyeSize*0.75, DIMENSION.EyeY + DIMENSION.EyeSize*1.5]
    ).attr({
            fill: COLOR.BlobFill
    });

}

function makeMouth(s){
    DIMENSION.MouthLeftX = DIMENSION.LeftEyeX + (DIMENSION.EyeSize * 2);
    DIMENSION.MouthY = DIMENSION.EyeY + (DIMENSION.EyeSize * 2);
    DIMENSION.MouthRightX = DIMENSION.RightEyeX - (DIMENSION.EyeSize * 2);
    PARTS.Mouth = s.path('M'+(DIMENSION.MouthLeftX)+','+(DIMENSION.MouthY)+' C'+(DIMENSION.MouthLeftX+(DIMENSION.EyeSize*2))+','+(DIMENSION.MouthY+(DIMENSION.EyeSize*3))+' '+(DIMENSION.MouthRightX-(DIMENSION.EyeSize*2)) +','+(DIMENSION.MouthY+(DIMENSION.EyeSize*3))+' '+(DIMENSION.MouthRightX) +','+(DIMENSION.MouthY)+' '+
        'Q'+ (DIMENSION.MiddleX) +',' +(DIMENSION.EyeY+DIMENSION.EyeSize*2)+' '+(DIMENSION.MouthLeftX)+','+(DIMENSION.MouthY)
    ).attr({
        fill: COLOR.White
    });
}

function makeMoustaches(s){
    PARTS.MoustacheLeft = s.path('M'+DIMENSION.MiddleX+','+(DIMENSION.EyeY+DIMENSION.EyeSize)+
        'c-' +(DIMENSION.EyeSize)+','+(DIMENSION.EyeSize*2)+' -'+(DIMENSION.EyeSize*4)+','+(DIMENSION.EyeSize*2)+' -'+(DIMENSION.EyeSize*4)+','+(DIMENSION.EyeSize*0.5)
        ).attr({ 
            fill: 'none', 
            stroke:COLOR.Moustache, 
            strokeWidth: DIMENSION.EyeSize / 1.25, 
            strokeLinecap:'round', 
            strokeMiterlimit:DIMENSION.EyeSize / 1.25
        });
    DIMENSION.MoustacheLeftLength = PARTS.MoustacheLeft.getTotalLength();
    setStrokeAttributes('MoustacheLeft', true);

    PARTS.MoustacheRight = s.path('M'+DIMENSION.MiddleX+','+(DIMENSION.EyeY+DIMENSION.EyeSize)+
    'c' +(DIMENSION.EyeSize)+','+(DIMENSION.EyeSize*2)+' '+(DIMENSION.EyeSize*4)+','+(DIMENSION.EyeSize*2)+' '+(DIMENSION.EyeSize*4)+','+(DIMENSION.EyeSize*0.5)
    ).attr({ 
        fill: 'none', 
        stroke:COLOR.Moustache, 
        strokeWidth: DIMENSION.EyeSize / 1.25, 
        strokeLinecap:'round', 
        strokeMiterlimit:DIMENSION.EyeSize / 1.25
    });
    DIMENSION.MoustacheRightLength = PARTS.MoustacheRight.getTotalLength();
    setStrokeAttributes('MoustacheRight', true);
}

function makeTie(s){
    DIMENSION.TiePnts = {
        startX: DIMENSION.MiddleX-DIMENSION.EyeSize*0.75,
        startY: DIMENSION.MouthY+(DIMENSION.EyeSize*5.5),
        endX: DIMENSION.MiddleX+DIMENSION.EyeSize*0.85,
        middleY: DIMENSION.MouthY+(DIMENSION.EyeSize*6.5), 
        endY: DIMENSION.StartingPnt*1.85+DIMENSION.SquareLength-DIMENSION.EyeSize/2,
    };

    PARTS.Tie = s.path('M'+DIMENSION.TiePnts.startX+','+DIMENSION.TiePnts.startY+
        ' '+DIMENSION.TiePnts.endX+','+DIMENSION.TiePnts.startY+' '+
        (DIMENSION.TiePnts.endX-DIMENSION.EyeSize/2)+','+DIMENSION.TiePnts.middleY+' '
        +(DIMENSION.TiePnts.startX+DIMENSION.EyeSize/2)+','+DIMENSION.TiePnts.middleY+'z M'+
        (DIMENSION.TiePnts.startX+DIMENSION.EyeSize/2)+','+DIMENSION.TiePnts.middleY+' '+
        DIMENSION.TiePnts.startX+','+(DIMENSION.TiePnts.endY-DIMENSION.EyeSize)+' '+
        DIMENSION.MiddleX+','+DIMENSION.TiePnts.endY+' '+
        DIMENSION.TiePnts.endX+','+(DIMENSION.TiePnts.endY-DIMENSION.EyeSize)+' '
        +(DIMENSION.TiePnts.endX-DIMENSION.EyeSize/2)+','+DIMENSION.TiePnts.middleY
    ).attr({
        fill: 'none', 
        stroke:COLOR.Moustache, 
        strokeWidth: DIMENSION.EyeSize / 2, 
        strokeLinecap:'round', 
        strokeMiterlimit:DIMENSION.EyeSize / 2
    });

    DIMENSION.TieLength = PARTS.Tie.getTotalLength();
    setStrokeAttributes('Tie', true)
    
}

function makeGlasses(s){
    PARTS.LeftGlass=s.circle(DIMENSION.LeftEyeX, DIMENSION.EyeY, DIMENSION.EyeSize*3.5
    ).attr({
        fill:'none', 
        stroke:COLOR.Moustache, 
        strokeWidth: DIMENSION.EyeSize / 2, 
        strokeLinecap:'round', 
        strokeMiterlimit:DIMENSION.EyeSize / 2
    });
    DIMENSION.LeftGlassLength = Math.ceil(PARTS.LeftGlass.getTotalLength());
    setStrokeAttributes('LeftGlass', true);


    PARTS.RightGlass=s.circle(DIMENSION.RightEyeX, DIMENSION.EyeY, DIMENSION.EyeSize*3.5
    ).attr({
        fill:'none', 
        stroke:COLOR.Moustache, 
        strokeWidth: DIMENSION.EyeSize / 2, 
        strokeLinecap:'round', 
        strokeMiterlimit:DIMENSION.EyeSize / 2
    });
    DIMENSION.RightGlassLength = Math.ceil(PARTS.RightGlass.getTotalLength());
    setStrokeAttributes('RightGlass', true);

    PARTS.GlassHinge = s.path('M'+(DIMENSION.LeftEyeX+DIMENSION.EyeSize*4)+','+DIMENSION.EyeY+'Q'+
        DIMENSION.MiddleX+','+(DIMENSION.EyeY-DIMENSION.EyeSize)+' '+
        (DIMENSION.RightEyeX-DIMENSION.EyeSize*4)+','+DIMENSION.EyeY
    ).attr({
        fill:'none', 
        stroke:COLOR.Moustache,
        strokeWidth: DIMENSION.EyeSize / 2,
        strokeLinecap:'round',
        strokeMiterlimit:DIMENSION.EyeSize / 2
    });
    DIMENSION.GlassHingeLength = PARTS.GlassHinge.getTotalLength();
    setStrokeAttributes('GlassHinge', true);
}

function makeMenu(){
    // make art button
    PARTS.Palette = Snap('#palette');
    PARTS.PaletteOutline = PARTS.Palette.select('#palette-outline');
    PARTS.PaletteColor1 = PARTS.Palette.select('#palette-color1');
    PARTS.PaletteColor2 = PARTS.Palette.select('#palette-color2');
    PARTS.PaletteColor3 = PARTS.Palette.select('#palette-color3');
    PARTS.PaletteColor4 = PARTS.Palette.select('#palette-color4');
    DIMENSION.PaletteOutlineLength = PARTS.PaletteOutline.getTotalLength();
    setStrokeAttributes('PaletteOutline', false);

    // make programming button
    PARTS.Browser = Snap('#browser');
    PARTS.BrowserOutline = PARTS.Browser.select('#browser-outline');
    PARTS.BrowserButton1 = PARTS.Browser.select('#browser-button1');
    PARTS.BrowserButton2 = PARTS.Browser.select('#browser-button1');
    PARTS.BrowserButton3 = PARTS.Browser.select('#browser-button3');
    DIMENSION.BrowserOutlineLength = PARTS.BrowserOutline.getTotalLength();
    setStrokeAttributes('BrowserOutline', false);

    //make resume button
    PARTS.Experience = Snap('#experience');
    PARTS.ExperienceCenter = PARTS.Experience.select('#experience-circle');
    PARTS.ExperienceDashes = PARTS.Experience.select('#experience-path1');
    DIMENSION.ExperienceDashesLength = PARTS.ExperienceDashes.getTotalLength();
    setStrokeAttributes('ExperienceDashes', false);

    PARTS.ExperienceRectangle = PARTS.Experience.select('#experience-path2');
    DIMENSION.ExperienceRectangleLength = PARTS.ExperienceRectangle.getTotalLength();
    setStrokeAttributes('ExperienceRectangle', false);

    PARTS.ExperienceOutline = PARTS.Experience.select('#experience-outline');
    DIMENSION.ExperienceOutlineLength = PARTS.ExperienceOutline.getTotalLength();
    setStrokeAttributes('ExperienceOutline', false);

    // make accessories
    PARTS.AccSvg = Snap('#acc-svg');
    PARTS.ArtAcc = PARTS.AccSvg.select('#art-acc');
    PARTS.CodingAcc = PARTS.AccSvg.select('#coding-acc');
    PARTS.ExperienceAcc = PARTS.AccSvg.select('#experience-acc');
}

/*-----------------------------ANIMATIONS-------------------------------------*/

function animateEyeLids(){
    // add some blinking
    let topLidTween = TweenMax.from([PARTS.LeftTopEyeLid.node, PARTS.RightTopEyeLid.node] , 0.3, {scaleY: 0,
    transformOrigin: 'center top', ease:Cubic.easeInOut});

    let bottomLidTween = TweenMax.from([PARTS.LeftBottomEyeLid.node, PARTS.RightBottomEyeLid.node] , 0.3, {scaleY: 0,
    transformOrigin: 'center bottom', ease:Cubic.easeInOut});

    let t1 = new TimelineMax({
        paused: true,
        repeat: 1,
        yoyo: true,
        onCompleteParams: ['{self}'],
        onComplete: function() {
            TweenLite.delayedCall((3 * Math.random() + 0.6), t1.restart, [], t1);
        }
    });

    t1.add([topLidTween, bottomLidTween]);
    t1.progress(1).progress(0);
    t1.play();
}

function animateMouthBig(delay){
    setTimeout(()=>{
        PARTS.Mouth.animate({ d: 'M'+(DIMENSION.MouthLeftX - DIMENSION.EyeSize*2)+','+(DIMENSION.MouthY)+' C'+(DIMENSION.MouthLeftX)+','+(DIMENSION.MouthY+(DIMENSION.EyeSize*5))+' '+(DIMENSION.MouthRightX) +','+(DIMENSION.MouthY+(DIMENSION.EyeSize*5))+' '+(DIMENSION.MouthRightX + DIMENSION.EyeSize*2) +','+(DIMENSION.MouthY)+' '+
            'Q'+ (DIMENSION.MiddleX) +',' +(DIMENSION.EyeY+DIMENSION.EyeSize*2)+' '+(DIMENSION.MouthLeftX - DIMENSION.EyeSize)+','+(DIMENSION.MouthY) }, 1000, mina.easeinout, animateMouthRound(Math.random() * 5000+ 0.7));
        }, delay);
}

function animateMouthRound(delay){
    setTimeout(()=>{
        PARTS.Mouth.animate({d: 'M'+(DIMENSION.MiddleX - DIMENSION.EyeSize)+','+(DIMENSION.MouthY + DIMENSION.EyeSize)+' C'+(DIMENSION.MiddleX - DIMENSION.EyeSize)+','+(DIMENSION.MouthY+(DIMENSION.EyeSize*5))+' '+(DIMENSION.MiddleX + DIMENSION.EyeSize) +','+(DIMENSION.MouthY+(DIMENSION.EyeSize*5))+' '+(DIMENSION.MiddleX + DIMENSION.EyeSize) +','+(DIMENSION.MouthY+ DIMENSION.EyeSize)+' '+
        'Q'+ (DIMENSION.MiddleX) +',' +(DIMENSION.EyeY - DIMENSION.EyeSize)+' '+(DIMENSION.MiddleX - DIMENSION.EyeSize)+','+(DIMENSION.MouthY + DIMENSION.EyeSize)}, 1000, mina.easeinout, animateMouthSmall(Math.random() * 6000+ 0.7));
    }, delay);
}

function animateMouthSmall(delay){
    setTimeout(()=>{
        PARTS.Mouth.animate({ d: 'M'+(DIMENSION.MouthLeftX)+','+(DIMENSION.MouthY)+' C'+(DIMENSION.MouthLeftX+(DIMENSION.EyeSize*2))+','+(DIMENSION.MouthY+(DIMENSION.EyeSize*3))+' '+(DIMENSION.MouthRightX-(DIMENSION.EyeSize*2)) +','+(DIMENSION.MouthY+(DIMENSION.EyeSize*3))+' '+(DIMENSION.MouthRightX) +','+(DIMENSION.MouthY)+' '+
            'Q'+ (DIMENSION.MiddleX) +',' +(DIMENSION.EyeY+DIMENSION.EyeSize*2)+' '+(DIMENSION.MouthLeftX)+','+(DIMENSION.MouthY)}, 1000, mina.easeinout, animateMouthBig(Math.random() * 6000+ 0.7));
        }, delay);
}

function animateJump(){
    PARTS.SquareGroup.click(()=>{   
        if(timelineJump.getChildren(true, true, true, 0).length === 0){
            //not added, first jump
            timelineJump.add(TweenMax.fromTo(PARTS.SquareGroup.node, 0.3, { y: 0, scaleX: 0.95, scaleY: 1.05, transformOrigin: 'center bottom'}, 
            { y: -DIMENSION.SquareLength, scaleX: 1.15, scaleY: 0.85, transformOrigin: 'center bottom', ease: Back.easeInOut, onComplete:
                ()=>{
                    TweenMax.to(PARTS.SquareGroup.node, 0.8, {y: 0, scaleX:1, scaleY: 1, transformOrigin: 'center bottom', ease: Bounce.easeOut},0.3);
                }}), 0
            );

            timelineJump.add(TweenMax.fromTo(PARTS.Shadow.node, 0.3,{scaleX: 0, scaleY: 0, opacity: 1, transformOrigin: 'center bottom'}, 
            {scaleX: 1.5, scaleY: 1.5, opacity: 1, transformOrigin: 'center bottom', ease: Back.easeInOut, onComplete:
                ()=>{
                    TweenMax.to(PARTS.Shadow.node, 0.8, {scaleX:0, scaleY:0, transformOrigin: 'center bottom', ease: Bounce.easeOut}, 0.3);
                }}), 0
            );
            animateMsg(msgTitle, TEXT.Title.afterClick);
            animateMsg(msgBody, TEXT.body.afterClick);
        }
        if(timelineButtons.getChildren(true, true, true, 0).length === 0){
            timelineButtons.add(TweenMax.fromTo('.programming', 0.5, 
                {scaleX: 0.5, scaleY: 1.25, opacity:0, x:0, y:DIMENSION.SquareLength/10}, 
                {scaleX:1, scaleY:1, opacity:1, x: 0, y: 0, ease:Back.easeInOut}), 0
            );
            timelineButtons.add(TweenMax.fromTo('.art',1,
                {scale: 0.5, skew: 10, rotation: 180, opacity: 0, x: DIMENSION.SquareLength/2},
                {scale: 1, skew: 0, rotation: 0, opacity: 1, x: 0, ease: Back.easeInOut}), 0.2
            );
            timelineButtons.add(TweenMax.fromTo('.resume',1,
                {scale: 0.5, skew: 10, rotation: 180, opacity: 0, x: -DIMENSION.SquareLength/2},
                {scale: 1, skew: 0, rotation: 0, opacity: 1, x: 0, ease: Back.easeInOut}), 0.2
            );        
        }else{
            if(!isMenuShown){
                timelineButtons.clear();
                let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                let tweenVal = Math.random() * (1.02 - 1) + 1;

                timelineButtons.add(TweenMax.fromTo('.btn', 0.4, {scale: 1.1}, 
                    {opacity:1, scale: 1, transformOrigin:'center center', ease: Back.easeInOut}),0
                );
            }
            isMenuShown = true;
        }
        timelineJump.play(0);
        timelineButtons.play(0);
    });
}

function animateMenu(){
    artButton.click(()=>{
        showArt();
        hideCoding();
        hideExperience();
        
    });


    codingButton.click(()=>{
        showCoding();
        hideArt();
        hideExperience();
    });

    resumeButton.click(()=>{
        showExperience();
        hideArt();
        hideCoding();
    });
}

function animateMsg(msgObj, text){
    msgObj.fadeOut(function() {
        $(this).text(text).fadeIn();
    });
}

function showArt(){

    TweenMax.fromTo(PARTS.PaletteOutline.node, 1, 
        {strokeDashoffset: DIMENSION.PaletteOutlineLength}, 
        {fill: COLOR.White, strokeDashoffset: 0, ease: Power2.easeInOut}
    );

    TweenMax.to(PARTS.PaletteColor1.node, 1,
        {fill: COLOR.Red, stroke: COLOR.Red, ease:Power4.easeInOut}
    );

    TweenMax.to(PARTS.PaletteColor2.node, 1,
        {fill: COLOR.Yellow, stroke:COLOR.Yellow, ease:Power4.easeInOut}
    );

    TweenMax.to(PARTS.PaletteColor3.node, 1,
        {fill: COLOR.Blue, stroke:COLOR.Blue, ease:Power4.easeInOut}
    );

    TweenMax.to(PARTS.PaletteColor4.node, 1,
        {fill: COLOR.Green, stroke: COLOR.Green, ease:Power4.easeInOut}
    );

    TweenMax.to([PARTS.MoustacheLeft.node, PARTS.MoustacheRight.node], 1,
        {strokeDashoffset: 0, ease: Power2.easeOut, delay: 0.5}
    );
    if(!isArtClicked){
        TweenMax.fromTo(PARTS.ArtAcc.node, 0.8, 
            {x:-DIMENSION.SquareLength/6, y:0, scaleX: 1.2, skewX: 20},
            {x: 0, opacity: 1, scaleX: 0.95, skewX: 0, ease: Back.easeInOut}
        );
    }
    isArtClicked = true; 
    redirectLink.attr('href',   linkStr.art);
    TweenMax.to(redirectLinkButton, 1, {opacity: 1, backgroundColor: COLOR.Red, ease: Power4.easeInOut});
    animateMsg(msgBody, TEXT.body.art);
}

function hideArt(){
    if(isArtClicked){
        TweenMax.to(
            [PARTS.PaletteOutline.node,PARTS.PaletteColor1.node,PARTS.PaletteColor2.node,PARTS.PaletteColor3.node, PARTS.PaletteColor4.node], 1, 
            {stroke: COLOR.BlackStroke, fill:'none', ease: Power2.easeInOut}
        );
    
        TweenMax.to(PARTS.MoustacheLeft.node, 0.5,
            {strokeDashoffset: DIMENSION.MoustacheLeftLength, ease: Power2.easeOut}
        );

        TweenMax.to(PARTS.MoustacheRight.node, 0.5,
            {strokeDashoffset: DIMENSION.MoustacheRightLength, ease: Power2.easeOut}
        );

        TweenMax.to(PARTS.ArtAcc.node, 0.5, 
            {x:DIMENSION.SquareLength/6, opacity:0, scaleX: 1.2, skewX:-20, ease: Back.easeInOut}
        );
        isArtClicked = false;
    }
}

function showCoding(){
    TweenMax.fromTo(PARTS.BrowserOutline.node, 1, 
        {strokeDashoffset: DIMENSION.BrowserOutlineLength}, 
        {fill: COLOR.White, strokeDashoffset: 0, ease: Power2.easeInOut}
    );

    TweenMax.to(PARTS.BrowserButton1.node, 1, 
        {fill: COLOR.Red, stroke: COLOR.Red, ease:Power4.easeInOut}
    );

    TweenMax.to(PARTS.BrowserButton2.node, 1, 
        {fill: COLOR.Yellow, stroke:COLOR.Yellow, ease:Power4.easeInOut}
    );

    TweenMax.to(PARTS.BrowserButton3.node, 1, 
        {fill: COLOR.Green, stroke:COLOR.Green, ease:Power4.easeInOut}
    );

    TweenMax.to([PARTS.LeftGlass.node, PARTS.RightGlass.node, PARTS.GlassHinge.node], 1, 
        {strokeDashoffset: 0, ease: Power2.easeOut, delay: 0.5}
    );
    if(!isCodingClicked){
        TweenMax.fromTo(PARTS.CodingAcc.node, 0.8, {y:DIMENSION.SquareLength/6, scaleX: 0.8, scaleY: 1.2}, 
            {y: 0, opacity: 1, scale: 1, ease: Back.easeOut}
        );
    }
    isCodingClicked = true;
    redirectLink.attr('href',   linkStr.programming);
    TweenMax.to(redirectLinkButton, 1, {opacity: 1, backgroundColor: COLOR.Yellow, ease: Power4.easeInOut});
    animateMsg(msgBody, TEXT.body.coding);
}

function hideCoding(){
    if(isCodingClicked){
        TweenMax.to(
            [PARTS.BrowserOutline.node, PARTS.BrowserButton1.node, PARTS.BrowserButton2.node, PARTS.BrowserButton3.node], 1, 
            {stroke: COLOR.BlackStroke, fill: 'none', ease: Back.easeInOut}
        );
        
        TweenMax.to(PARTS.LeftGlass.node, 0.5, 
            {strokeDashoffset: DIMENSION.LeftGlassLength, ease: Power2.easeOut}
        );
        TweenMax.to(PARTS.RightGlass.node, 0.5, 
            {strokeDashoffset: DIMENSION.RightGlassLength, ease: Power2.easeOut}
        );
        TweenMax.to(PARTS.GlassHinge.node, 0.5, 
            {strokeDashoffset: DIMENSION.GlassHingeLength, ease: Power2.easeOut}
        );
        TweenMax.to(PARTS.CodingAcc.node, 0.5, 
            {y:DIMENSION.SquareLength/6, scaleX: 0.8, opacity: 0, scaleY: 1.2, ease: Back.easeInOut}
        )
        isCodingClicked = false;
    }
}

function showExperience(){
    TweenMax.fromTo(PARTS.ExperienceDashes.node, 1, 
        {strokeDashoffset: DIMENSION.ExperienceDashesLength}, 
        {fill: COLOR.White, strokeDashoffset: 0, stroke: COLOR.Blue, ease: Power2.easeInOut}
    );
    TweenMax.fromTo(PARTS.ExperienceRectangle.node, 1, 
        {strokeDashoffset: DIMENSION.ExperienceRectangleLength}, 
        {strokeDashoffset: 0, fill: COLOR.Yellow, ease: Power2.easeInOut}
    );
    TweenMax.fromTo(PARTS.ExperienceOutline.node, 1, 
        {strokeDashoffset: DIMENSION.ExperienceOutlineLength}, 
        {strokeDashoffset: 0, fill: COLOR.White, ease: Power2.easeInOut}
    );       
    TweenMax.to(PARTS.ExperienceCenter.node, 1, 
        {fill: COLOR.Red, stroke:COLOR.Red, ease:Power4.easeInOut}
    );
    TweenMax.to(PARTS.Tie.node,1, 
        {strokeDashoffset: 0, ease: Power2.easeOut, delay: 0.5}
    );
    if(!isResumeClicked){
        TweenMax.fromTo(PARTS.ExperienceAcc.node, 0.8, 
            {x:DIMENSION.SquareLength/6, y:0, scaleX: 1.2, skewX: -20}, 
            {x: 0, opacity: 1, skewX:0, scale: 1, ease: Back.easeInOut}
        );
    }
    isResumeClicked = true;
    redirectLink.attr('href',   linkStr.resume);
    TweenMax.to(redirectLinkButton, 1, {opacity: 1, backgroundColor: COLOR.Green, ease: Power4.easeInOut});
    animateMsg(msgBody, TEXT.body.resume);
}

function hideExperience(){
    if(isResumeClicked){
        TweenMax.to(
            [PARTS.ExperienceCenter.node, PARTS.ExperienceOutline.node, PARTS.ExperienceDashes.node, PARTS.ExperienceRectangle.node], 1, 
            {stroke: COLOR.BlackStroke, fill: 'none', ease: Back.easeInOut}
        );
    
        TweenMax.to(PARTS.Tie.node, 0.5, 
            {strokeDashoffset: DIMENSION.TieLength, ease: Power2.easeOut}
        );
    
        TweenMax.to(PARTS.ExperienceAcc.node, 0.5, 
            {x:-DIMENSION.SquareLength/6, opacity:0, skewX: 20, scaleX: 1.2, ease: Back.easeInOut}
        );
        
        isResumeClicked = false;
    }
}

/*-----------------------------ATTRIBUTES-------------------------------------*/

function setStrokeAttributes(objectName, isEnd){
    PARTS[objectName].attr({
        'stroke-dasharray': DIMENSION[objectName+'Length']+' '+DIMENSION[objectName+'Length'],
        'stroke-dashoffset': isEnd? DIMENSION[objectName+'Length']: 0
    });
}
 
$( document ).ready( readyFn );




