let s = Snap('#svg');

let COLOR = {
    "BlackStroke": "#1f2c39",
    "BlobFill": "rgb(236, 240, 241)",
    "White": "#fff",
    "Shadow": "rgba(87, 101, 115, 0.68)"
}

let squareLength = Math.floor(Math.min($( window ).width(), $( window ).height()) / 4);

s.attr({width:squareLength*2, height: squareLength*2});
s.attr({viewBox:"0 0 "+ squareLength*2 + " " + squareLength*2 });
let startingPnt = (squareLength*2 - squareLength) / 2;
let block = s.rect(startingPnt, startingPnt*1.85, squareLength, squareLength, squareLength/20, squareLength/20);
block.attr({
    fill: COLOR.BlobFill
});

let leftEyeX = Math.floor(startingPnt + squareLength / 4.25);
let eyeY = Math.floor(startingPnt*1.85 + squareLength / 2.5);
let eyeSize = squareLength / 20;
let leftEye = s.circle(leftEyeX, eyeY, eyeSize).attr({fill: COLOR.BlackStroke});

let rightEyeX = Math.floor(startingPnt + squareLength - squareLength / 4.25);
let rightEye = s.circle(rightEyeX, eyeY, eyeSize).attr({fill: COLOR.BlackStroke});

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
let middleX = (leftEyeX + rightEyeX)/2;

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

let squareGroup = s.group(block, rightEye, rightTopEyeLid, rightBottomEyeLid, leftEye, leftTopEyeLid, leftBottomEyeLid, mouth).attr({cursor: "pointer"});

let shadow = s.ellipse((leftEyeX+rightEyeX)/2,squareLength*2 - squareLength/20, squareLength/4, squareLength/20).attr({fill: COLOR.Shadow, opacity: 0});
let isMenuShown = false;
let t2 = new TimelineMax();

$('.btn').css({width: squareLength/2 +'px', height: squareLength/2+'px'});

squareGroup.click(()=>{
    if(!isMenuShown){
        t2.add(TweenMax.fromTo(squareGroup.node, 0.3, { y: 0, scaleX: 0.95, scaleY: 1.05, transformOrigin: "center bottom"}, { y: -squareLength, scaleX: 1.15, scaleY: 0.85,transformOrigin: "center bottom", ease: Back.easeInOut, onComplete:
            ()=>{
                TweenMax.to(squareGroup.node, 0.8, {y: 0, scaleX:1, scaleY: 1, transformOrigin: "center bottom", ease: Bounce.easeOut},0.3);
            }}), 0);
        t2.add(TweenMax.fromTo(shadow.node, 0.3,{scaleX: 0, scaleY: 0, opacity: 1, transformOrigin: "center bottom"}, {scaleX: 1.5, scaleY: 1.5, opacity: 1, transformOrigin: "center bottom", ease: Back.easeInOut, onComplete:
        ()=>{
            TweenMax.to(shadow.node, 0.8, {scaleX:0, scaleY:0, transformOrigin: "center bottom", ease: Bounce.easeOut}, 0.3);
        }}), 0);
        t2.add(TweenMax.fromTo(".programming", 0.5, {scaleX: 0.5, scaleY: 1.25, opacity:0, x:0, y:squareLength/10}, {scaleX:1, scaleY:1, opacity:1, x: 0, y: 0, ease:Back.easeInOut}), 0);
        t2.add(TweenMax.fromTo(".art",1,{scale: 0.5, skew: 10, rotation: 180, opacity: 0, x: squareLength/2},{scale: 1, skew: 0, rotation: 0, opacity: 1, x: 0, ease: Back.easeInOut}), 0.2);
        t2.add(TweenMax.fromTo(".resume",1,{scale: 0.5, skew: 10, rotation: 180, opacity: 0, x: -squareLength/2},{scale: 1, skew: 0, rotation: 0, opacity: 1, x: 0, ease: Back.easeInOut}), 0.2);        
        isMenuShown = true;
    }else{
        t2.clear();
        let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        let tweenVal = Math.random() * (1.02 - 1) + 1;

        t2.add(TweenMax.fromTo('.btn', 0.4, {scale: 1.05}, {opacity:1, scale: 1, transformOrigin:"center center", ease: Back.easeInOut}),0);
        t2.add(TweenMax.fromTo(squareGroup.node, 0.2, { scale: tweenVal, rotation: plusOrMinus*tweenVal, transformOrigin:"center bottom"}, { scale: 1, rotation: 0, transformOrigin:"center bottom", ease: Back.easeInOut, repeat: 1 }),0)  
}
    t2.pause(0); 

    t2.play();
});

$('.art').click(()=>{

    TweenMax.fromTo('#palette', 1, {drawSVG:0}, {drawSVG:"102%"}, "-=1" );
})




