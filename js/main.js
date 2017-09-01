let s = Snap('#svg');

let COLOR = {
    "BlackStroke": "#1f2c39",
    "BlobFill": "rgb(236, 240, 241)",
    "Red": "#E71D36",
    "Yellow": "#FF9F1C",
    "Green": "#2EC4B6",
    "Blue": "#005499",
    "White": "#FDFFFC",
    "Moustache": "#77818C"
}
let isMenuShown = false;
let isArtClicked = false;
let isCodingClicked = false;
let isResumeClicked = false;
let squareLength = Math.floor(Math.min($( window ).width(), $( window ).height()) / 4);

s.attr({width:squareLength*2, height: squareLength*2});
s.attr({viewBox:"0 0 "+ squareLength*2 + " " + squareLength*2 });
let startingPnt = (squareLength*2 - squareLength) / 2;
let block = s.rect(startingPnt, startingPnt*1.85, squareLength, squareLength, squareLength/20, squareLength/20);

let leftEyeX = Math.floor(startingPnt + squareLength / 4.25);
let eyeY = Math.floor(startingPnt*1.85 + squareLength / 2.5);
let eyeSize = squareLength / 20;
let leftEye = s.circle(leftEyeX, eyeY, eyeSize).attr({fill: COLOR.BlackStroke});

let rightEyeX = Math.floor(startingPnt + squareLength - squareLength / 4.25);
let rightEye = s.circle(rightEyeX, eyeY, eyeSize).attr({fill: COLOR.BlackStroke});

let middleX = (leftEyeX + rightEyeX)/2;



$(".accessory").css({width:squareLength/2+"px", left:squareLength*0.85+'px'});

let blockLength = block.getTotalLength();
block.attr({
    fill: "none",
    stroke: COLOR.BlackStroke,
    strokeWidth: eyeSize / 2,
    "stroke-dasharray": blockLength+" "+blockLength,
    "stroke-dashoffset": 0
});

TweenMax.fromTo(block.node, 1, {strokeDashoffset: blockLength, opacity: 0}, {fill: COLOR.BlobFill, strokeDashoffset: 0, opacity: 1, ease: Power2.easeInOut});


// add some eye lids
let leftTopEyeLid = s.polygon([leftEyeX-eyeSize*0.75, eyeY-eyeSize, leftEyeX+eyeSize*0.75, eyeY-eyeSize, 
leftEyeX+eyeSize*1.25, eyeY+eyeSize/4, leftEyeX-eyeSize*1.25, eyeY + eyeSize/4]).attr({
    fill: COLOR.BlobFill
});

let rightTopEyeLid = s.polygon([rightEyeX-eyeSize*0.75, eyeY-eyeSize, rightEyeX+eyeSize*0.75, eyeY-eyeSize, 
rightEyeX+eyeSize*1.25, eyeY+eyeSize/4, rightEyeX-eyeSize*1.25, eyeY + eyeSize/4]).attr({
    fill: COLOR.BlobFill
})

let leftBottomEyeLid = s.polygon([leftEyeX+eyeSize*1.25, eyeY+eyeSize/4, leftEyeX-eyeSize*1.25, eyeY + eyeSize/4, 
leftEyeX-eyeSize*0.75, eyeY+eyeSize*1.5, leftEyeX+eyeSize*0.75, eyeY + eyeSize*1.5]).attr({
    fill: COLOR.BlobFill
});

let rightBottomEyeLid = s.polygon([rightEyeX+eyeSize*1.25, eyeY+eyeSize/4, rightEyeX-eyeSize*1.25, eyeY + eyeSize/4, 
rightEyeX-eyeSize*0.75, eyeY+eyeSize*1.5, rightEyeX+eyeSize*0.75, eyeY + eyeSize*1.5]).attr({
    fill: COLOR.BlobFill
});

// add some blinking
let topLidTween = TweenMax.from([leftTopEyeLid.node, rightTopEyeLid.node] , 0.3, {scaleY: 0,
transformOrigin: "center top", ease:Cubic.easeInOut});

let bottomLidTween = TweenMax.from([leftBottomEyeLid.node, rightBottomEyeLid.node] , 0.3, {scaleY: 0,
transformOrigin: "center bottom", ease:Cubic.easeInOut});

let t1 = new TimelineMax({
    paused: true,
    repeat: 1,
    yoyo: true,
    onCompleteParams: ["{self}"],
    onComplete: function() {
        TweenLite.delayedCall((3 * Math.random() + 0.6), t1.restart, [], t1);
    }
});

t1.add([topLidTween, bottomLidTween]);
t1.progress(1).progress(0);
t1.play();

let mouthLeftX = leftEyeX + (eyeSize * 2);
let mouthY = eyeY + (eyeSize * 2);
let mouthRightX = rightEyeX - (eyeSize * 2);

let moustacheLeft = s.path("M"+middleX+","+(eyeY+eyeSize)+
    "c-" +(eyeSize)+","+(eyeSize*2)+" -"+(eyeSize*4)+","+(eyeSize*2)+" -"+(eyeSize*4)+","+(eyeSize*0.5)).attr({ fill: "none", stroke:COLOR.Moustache, strokeWidth: eyeSize / 1.25, strokeLinecap:"round", strokeMiterlimit:eyeSize / 1.25})
let moustacheLeftlength = moustacheLeft.getTotalLength();
moustacheLeft.attr({
    "stroke-dasharray": moustacheLeftlength+" "+moustacheLeftlength,
    "stroke-dashoffset": moustacheLeftlength

});

let moustacheRight = s.path("M"+middleX+","+(eyeY+eyeSize)+
    "c" +(eyeSize)+","+(eyeSize*2)+" "+(eyeSize*4)+","+(eyeSize*2)+" "+(eyeSize*4)+","+(eyeSize*0.5)).attr({ fill: "none", stroke:COLOR.Moustache, strokeWidth: eyeSize / 1.25, strokeLinecap:"round", strokeMiterlimit:eyeSize / 1.25})
moustacheRight.attr({
    "stroke-dasharray": moustacheLeftlength+" "+moustacheLeftlength,
    "stroke-dashoffset": moustacheLeftlength
});

let tiePnts = {
    startX: middleX-eyeSize*0.75,
    startY: mouthY+(eyeSize*5.5),
    endX: middleX+eyeSize*0.85,
    middleY: mouthY+(eyeSize*6.5), 
    endY: startingPnt*1.85+squareLength-eyeSize/2,
};

let tie = s.path("M"+tiePnts.startX+","+tiePnts.startY+
            " "+tiePnts.endX+","+tiePnts.startY+" "+(tiePnts.endX-eyeSize/2)+","+tiePnts.middleY+" "+
            (tiePnts.startX+eyeSize/2)+","+tiePnts.middleY+"z M"+(tiePnts.startX+eyeSize/2)+","+tiePnts.middleY+" "+
            tiePnts.startX+","+(tiePnts.endY-eyeSize)+" "+middleX+","+tiePnts.endY+" "+tiePnts.endX+","+(tiePnts.endY-eyeSize)+" "+
            (tiePnts.endX-eyeSize/2)+","+tiePnts.middleY
).attr({fill: "none", stroke:COLOR.Moustache, strokeWidth: eyeSize / 2, strokeLinecap:"round", strokeMiterlimit:eyeSize / 2})

let tieLength = tie.getTotalLength();
tie.attr({
    "stroke-dasharray": tieLength+" "+tieLength,
    "stroke-dashoffset": tieLength
});

let leftGlass=s.circle(leftEyeX, eyeY, eyeSize*3.5)
.attr({fill:"none", stroke:COLOR.Moustache, strokeWidth: eyeSize / 2, strokeLinecap:"round", strokeMiterlimit:eyeSize / 2});
let leftGlassLength = leftGlass.getTotalLength();
leftGlass.attr({
    "stroke-dasharray": leftGlassLength+" "+leftGlassLength,
    "stroke-dashoffset": leftGlassLength
});


let rightGlass=s.circle(rightEyeX, eyeY, eyeSize*3.5)
.attr({fill:"none", stroke:COLOR.Moustache, strokeWidth: eyeSize / 2, strokeLinecap:"round", strokeMiterlimit:eyeSize / 2});
let rightGlassLength = rightGlass.getTotalLength();
rightGlass.attr({
    "stroke-dasharray": rightGlassLength+" "+rightGlassLength,
    "stroke-dashoffset": rightGlassLength
});

let glassHinge = s.path("M"+(leftEyeX+eyeSize*4)+","+eyeY+"Q"+middleX+","+(eyeY-eyeSize)+" "+(rightEyeX-eyeSize*4)+","+eyeY)
.attr({fill:"none", stroke:COLOR.Moustache, strokeWidth: eyeSize / 2, strokeLinecap:"round", strokeMiterlimit:eyeSize / 2});
let glassHingeLength = glassHinge.getTotalLength();
glassHinge.attr({
    "stroke-dasharray": glassHingeLength+" "+glassHingeLength,
    "stroke-dashoffset": glassHingeLength
});


let mouth = s.path('M'+(mouthLeftX)+','+(mouthY)+' C'+(mouthLeftX+(eyeSize*2))+','+(mouthY+(eyeSize*3))+' '+(mouthRightX-(eyeSize*2)) +','+(mouthY+(eyeSize*3))+' '+(mouthRightX) +','+(mouthY)+' '+
'Q'+ (middleX) +',' +(eyeY+eyeSize*2)+' '+(mouthLeftX)+','+(mouthY)).attr({fill: COLOR.White});


function animateMouthBig(delay){
    setTimeout(()=>{
        mouth.animate({ d: 'M'+(mouthLeftX - eyeSize*2)+','+(mouthY)+' C'+(mouthLeftX)+','+(mouthY+(eyeSize*5))+' '+(mouthRightX) +','+(mouthY+(eyeSize*5))+' '+(mouthRightX + eyeSize*2) +','+(mouthY)+' '+
'Q'+ (middleX) +',' +(eyeY+eyeSize*2)+' '+(mouthLeftX - eyeSize)+','+(mouthY) }, 1000, mina.easeinout, animateMouthRound(Math.random() * 5000+ 0.7));
    }, delay);
}

function animateMouthRound(delay){
    setTimeout(()=>{
        mouth.animate({d: 'M'+(middleX - eyeSize)+','+(mouthY + eyeSize)+' C'+(middleX - eyeSize)+','+(mouthY+(eyeSize*5))+' '+(middleX + eyeSize) +','+(mouthY+(eyeSize*5))+' '+(middleX + eyeSize) +','+(mouthY+ eyeSize)+' '+
'Q'+ (middleX) +',' +(eyeY - eyeSize)+' '+(middleX - eyeSize)+','+(mouthY + eyeSize)}, 1000, mina.easeinout, animateMouthSmall(Math.random() * 6000+ 0.7));
    }, delay);
}

function animateMouthSmall(delay){
    setTimeout(()=>{
        mouth.animate({ d: 'M'+(mouthLeftX)+','+(mouthY)+' C'+(mouthLeftX+(eyeSize*2))+','+(mouthY+(eyeSize*3))+' '+(mouthRightX-(eyeSize*2)) +','+(mouthY+(eyeSize*3))+' '+(mouthRightX) +','+(mouthY)+' '+
'Q'+ (middleX) +',' +(eyeY+eyeSize*2)+' '+(mouthLeftX)+','+(mouthY)}, 1000, mina.easeinout, animateMouthBig(Math.random() * 6000+ 0.7));
    }, delay);
}

animateMouthBig(Math.random()* 3000);


let squareGroup = s.group(block, rightEye, rightTopEyeLid, rightBottomEyeLid, leftEye, leftTopEyeLid, leftBottomEyeLid, mouth, moustacheLeft, moustacheRight, tie, leftGlass, rightGlass, glassHinge).attr({cursor: "pointer"});

let shadow = s.ellipse((leftEyeX+rightEyeX)/2,squareLength*2 - squareLength/20, squareLength/4, squareLength/20).attr({fill: COLOR.Blue, opacity: 0});

let timelineJump = new TimelineMax();
let timelineButtons = new TimelineMax();

$('.btn').css({width: squareLength/2 +'px', height: squareLength/2+'px'});

squareGroup.click(()=>{
    timelineJump.add(TweenMax.fromTo(squareGroup.node, 0.3, { y: 0, scaleX: 0.95, scaleY: 1.05, transformOrigin: "center bottom"}, { y: -squareLength, scaleX: 1.15, scaleY: 0.85,transformOrigin: "center bottom", ease: Back.easeInOut, onComplete:
        ()=>{
                TweenMax.to(squareGroup.node, 0.8, {y: 0, scaleX:1, scaleY: 1, transformOrigin: "center bottom", ease: Bounce.easeOut},0.3);
        }}), 0);
    timelineJump.add(TweenMax.fromTo(shadow.node, 0.3,{scaleX: 0, scaleY: 0, opacity: 1, transformOrigin: "center bottom"}, {scaleX: 1.5, scaleY: 1.5, opacity: 1, transformOrigin: "center bottom", ease: Back.easeInOut, onComplete:
        ()=>{
            TweenMax.to(shadow.node, 0.8, {scaleX:0, scaleY:0, transformOrigin: "center bottom", ease: Bounce.easeOut}, 0.3);
    }}), 0);
    if(!isMenuShown){
        
        timelineButtons.add(TweenMax.fromTo(".programming", 0.5, {scaleX: 0.5, scaleY: 1.25, opacity:0, x:0, y:squareLength/10}, {scaleX:1, scaleY:1, opacity:1, x: 0, y: 0, ease:Back.easeInOut}), 0);
        timelineButtons.add(TweenMax.fromTo(".art",1,{scale: 0.5, skew: 10, rotation: 180, opacity: 0, x: squareLength/2},{scale: 1, skew: 0, rotation: 0, opacity: 1, x: 0, ease: Back.easeInOut}), 0.2);
        timelineButtons.add(TweenMax.fromTo(".resume",1,{scale: 0.5, skew: 10, rotation: 180, opacity: 0, x: -squareLength/2},{scale: 1, skew: 0, rotation: 0, opacity: 1, x: 0, ease: Back.easeInOut}), 0.2);        
        isMenuShown = true;
    }else{
        timelineButtons.clear();
        let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        let tweenVal = Math.random() * (1.02 - 1) + 1;

        timelineButtons.add(TweenMax.fromTo('.btn', 0.4, {scale: 1.1}, {opacity:1, scale: 1, transformOrigin:"center center", ease: Back.easeInOut}),0);
        // timelineJump.add(TweenMax.fromTo(squareGroup.node, 0.2, { scale: tweenVal, rotation: plusOrMinus*tweenVal, transformOrigin:"center bottom"}, { scale: 1, rotation: 0, transformOrigin:"center bottom", ease: Back.easeInOut, repeat: 1 }),0);
    }
    timelineJump.pause(0); 
    timelineJump.play();
    timelineButtons.play();
});

let palette = Snap("#palette");
let paletteOutline = palette.select("#palette-outline");
let paletteColor1 = palette.select("#palette-color1");
let paletteColor2 = palette.select("#palette-color2");
let paletteColor3 = palette.select("#palette-color3");
let paletteColor4 = palette.select("#palette-color4");
let paletteOutlineLength = paletteOutline.getTotalLength();
paletteOutline.attr({
    "stroke-dasharray": paletteOutlineLength+" "+paletteOutlineLength,
    "stroke-dashoffset": 0
});

let browser = Snap("#browser");
let browserOutline = browser.select("#browser-outline");
let browserButton1 = browser.select("#browser-button1");
let browserButton2 = browser.select("#browser-button1");
let browserButton3 = browser.select("#browser-button3");
let browserOutlineLength = browserOutline.getTotalLength();
browserOutline.attr({
    "stroke-dasharray": browserOutlineLength+" "+browserOutlineLength,
    "stroke-dashoffset": 0
});

let experience = Snap("#experience");
let experienceCenter = Snap.select("#experience-circle");
let experienceDashes = experience.select("#experience-path1");
let experienceDashesLength = experienceDashes.getTotalLength();
experienceDashes.attr({
    "stroke-dasharray": experienceDashesLength+" "+experienceDashesLength,
    "stroke-dashoffset": 0
});
let experienceRectangle = experience.select("#experience-path2");
let experienceRectangleLength = experienceRectangle.getTotalLength();
experienceRectangle.attr({
    "stroke-dasharray": experienceRectangleLength+" "+experienceRectangleLength,
    "stroke-dashoffset": 0
});

let experienceOutline = experience.select("#experience-outline");
let experienceOutlineLength = experienceOutline.getTotalLength();
experienceOutline.attr({
    "stroke-dasharray": experienceOutlineLength+" "+experienceOutlineLength,
    "stroke-dashoffset": 0
});


$('.art').click(()=>{
    toggleArt(true);
    toggleCoding(false);
    toggleExperience(false);
});


$('.programming').click(()=>{
    toggleArt(false);
    toggleCoding(true);
    toggleExperience(false);
});



$('.resume').click(()=>{
    toggleArt(false);
    toggleCoding(false);
    toggleExperience(true);
});

let accSvg = Snap("#acc-svg");
let artAcc = accSvg.select("#art-acc");
let codingAcc = accSvg.select("#coding-acc");
let experienceAcc = accSvg.select("#experience-acc");

function toggleArt(toColor){
    if(toColor){
        TweenMax.fromTo(paletteOutline.node, 1, {strokeDashoffset: paletteOutlineLength}, {fill: COLOR.White, strokeDashoffset: 0, ease: Power2.easeInOut});
        TweenMax.to(paletteColor1.node, 1, {fill: COLOR.Red, stroke: COLOR.Red, ease:Power4.easeInOut});
        TweenMax.to(paletteColor2.node, 1, {fill: COLOR.Yellow, stroke:COLOR.Yellow, ease:Power4.easeInOut});
        TweenMax.to(paletteColor3.node, 1, {fill: COLOR.Blue, stroke:COLOR.Blue, ease:Power4.easeInOut});
        TweenMax.to(paletteColor4.node, 1, {fill: COLOR.Green, stroke: COLOR.Green, ease:Power4.easeInOut});
        TweenMax.to([moustacheLeft.node, moustacheRight.node], 1, {strokeDashoffset: 0, ease: Power2.easeInOut, delay: 0.8});
        if(!isArtClicked){
            TweenMax.fromTo(artAcc.node, 0.8, {x:-squareLength/6, y:0, scaleX: 1.2}, {x: 0, opacity: 1, scaleX: 0.95, ease: Back.easeOut, delay: 0.5}); 
        }
        isArtClicked = true;
    }else{
        if(isArtClicked){
            TweenMax.to([paletteOutline.node, paletteColor1.node, paletteColor2.node, paletteColor3.node, paletteColor4.node], 1, {stroke: COLOR.BlackStroke, fill: "none", ease: Back.easeInOut});    
            TweenMax.to([moustacheLeft.node, moustacheRight.node], 0.5, {strokeDashoffset: moustacheLeftlength, ease: Power2.easeInOut});
            TweenMax.to(artAcc.node, 0.5, {x:squareLength/6, opacity:0, scaleX: 1.2, ease: Back.easeInOut});
        }
        isArtClicked = false;
    }

}

function toggleCoding(toColor){
    if(toColor){
        TweenMax.fromTo(browserOutline.node, 1, {strokeDashoffset: browserOutlineLength}, {fill: COLOR.White, strokeDashoffset: 0, ease: Power2.easeInOut});
        TweenMax.to(browserButton1.node, 1, {fill: COLOR.Red, stroke: COLOR.Red, ease:Power4.easeInOut});
        TweenMax.to(browserButton2.node, 1, {fill: COLOR.Yellow, stroke:COLOR.Yellow, ease:Power4.easeInOut});
        TweenMax.to(browserButton3.node, 1, {fill: COLOR.Green, stroke:COLOR.Green, ease:Power4.easeInOut});
        TweenMax.to([leftGlass.node, rightGlass.node, glassHinge.node], 1, {strokeDashoffset: 0, ease: Power2.easeInOut, delay: 0.8});
        if(!isCodingClicked){
            TweenMax.fromTo(codingAcc.node, 0.8, {y:squareLength/4, scaleX: 0.8, scaleY: 1.2}, {y: 0, opacity: 1, scale: 1, ease: Back.easeOut, delay: 0.5});
        }
        isCodingClicked = true;
    }else{
        if(isCodingClicked){
            TweenMax.to([browserOutline.node, browserButton1.node, browserButton2.node, browserButton3.node], 1, {stroke: COLOR.BlackStroke, fill: "none", ease: Back.easeInOut});
            TweenMax.to([leftGlass.node, rightGlass.node], 0.5, {strokeDashoffset: leftGlassLength, ease: Power2.easeInOut});
            TweenMax.to(glassHinge.node, 0.5, {strokeDashoffset: glassHingeLength, ease: Power2.easeInOut});
            TweenMax.to(codingAcc.node, 0.5, {y:squareLength/4, scaleX: 0.8, opacity: 0, scaleY: 1.2, ease: Back.easeInOut});
        }
        isCodingClicked = false;
    }
}

function toggleExperience(toColor){
    if(toColor){
        TweenMax.fromTo(experienceDashes.node, 1, {strokeDashoffset: experienceDashesLength}, {fill: COLOR.White, strokeDashoffset: 0, stroke: COLOR.Blue, ease: Power2.easeInOut});
        TweenMax.fromTo(experienceRectangle.node, 1, {strokeDashoffset: experienceRectangleLength}, {strokeDashoffset: 0, fill: COLOR.Yellow, ease: Power2.easeInOut});
        TweenMax.fromTo(experienceOutline.node, 1, {strokeDashoffset: experienceOutlineLength}, {strokeDashoffset: 0, fill: COLOR.White, ease: Power2.easeInOut});       
        TweenMax.to(experienceCenter.node, 1, {fill: COLOR.Red, stroke:COLOR.Red, ease:Power4.easeInOut});
        TweenMax.to(tie.node,1, {strokeDashoffset: 0, ease: Power2.easeInOut, delay: 0.8});
        if(!isResumeClicked){
            TweenMax.fromTo(experienceAcc.node, 0.8, {x:squareLength/6, y:0, scaleX: 1.2}, {x: 0, opacity: 1, scale: 1, ease: Back.easeOut, delay: 0.5});
        }
        isResumeClicked = true;
    }else{
        if(isResumeClicked){
            TweenMax.to([experienceCenter.node, experienceOutline.node, experienceDashes.node, experienceRectangle.node], 1, {stroke: COLOR.BlackStroke, fill: "none", ease: Back.easeInOut});
            TweenMax.to(tie.node, 0.5, {strokeDashoffset: tieLength, ease: Power2.easeInOut});
            TweenMax.to(experienceAcc.node, 0.5, {x:-squareLength/6, opacity:0, scaleX: 1.2, ease: Back.easeInOut});
        }
        isResumeClicked = false;
    }
}





