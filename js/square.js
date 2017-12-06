"use strict";

function makeBlockBody(s, heightScale, isSetStroke) {
  PARTS.Block = s.rect(
    DIMENSION.StartingPntX !== undefined
      ? DIMENSION.StartingPntX
      : DIMENSION.StartingPnt,
    DIMENSION.StartingPnt * heightScale,
    DIMENSION.SquareLength,
    DIMENSION.SquareLength,
    DIMENSION.SquareLength / 20,
    DIMENSION.SquareLength / 20
  );
  DIMENSION.BlockLength = PARTS.Block.getTotalLength();
  PARTS.Block.attr({
    fill: isSetStroke === undefined || isSetStroke ? "none" : COLOR.BlobFill,
    stroke: COLOR.BlackStroke,
    strokeWidth:
      DIMENSION.EyeSize / 2 > ($(window).width() <= 760 ? 2 : 3)
        ? DIMENSION.EyeSize / 2
        : $(window).width() <= 760 ? 2 : 3
  });
  if (isSetStroke === undefined || isSetStroke) {
    setStrokeAttributes("Block", false);
  }
}

function makeEyes(s, heightScale) {
  DIMENSION.LeftEyeX = Math.floor(
    (DIMENSION.StartingPntX !== undefined
      ? DIMENSION.StartingPntX
      : DIMENSION.StartingPnt) +
      DIMENSION.SquareLength / 4.25
  );
  DIMENSION.RightEyeX = Math.floor(
    (DIMENSION.StartingPntX !== undefined
      ? DIMENSION.StartingPntX
      : DIMENSION.StartingPnt) +
      DIMENSION.SquareLength -
      DIMENSION.SquareLength / 4.25
  );
  DIMENSION.EyeY = Math.floor(
    DIMENSION.StartingPnt * heightScale + DIMENSION.SquareLength / 2.5
  );
  DIMENSION.EyeSize = DIMENSION.SquareLength / 20;

  PARTS.LeftEye = s
    .circle(DIMENSION.LeftEyeX, DIMENSION.EyeY, DIMENSION.EyeSize)
    .attr({
      fill: COLOR.BlackStroke
    });
  PARTS.RightEye = s
    .circle(DIMENSION.RightEyeX, DIMENSION.EyeY, DIMENSION.EyeSize)
    .attr({
      fill: COLOR.BlackStroke
    });

  DIMENSION.MiddleX = (DIMENSION.LeftEyeX + DIMENSION.RightEyeX) / 2;
}

function makeEyeLids(s) {
  PARTS.LeftTopEyeLid = s
    .polygon([
      DIMENSION.LeftEyeX - DIMENSION.EyeSize * 0.75,
      DIMENSION.EyeY - DIMENSION.EyeSize,
      DIMENSION.LeftEyeX + DIMENSION.EyeSize * 0.75,
      DIMENSION.EyeY - DIMENSION.EyeSize,
      DIMENSION.LeftEyeX + DIMENSION.EyeSize * 1.25,
      DIMENSION.EyeY + DIMENSION.EyeSize / 4,
      DIMENSION.LeftEyeX - DIMENSION.EyeSize * 1.25,
      DIMENSION.EyeY + DIMENSION.EyeSize / 4
    ])
    .attr({
      fill: COLOR.BlobFill
    });
  PARTS.RightTopEyeLid = s
    .polygon([
      DIMENSION.RightEyeX - DIMENSION.EyeSize * 0.75,
      DIMENSION.EyeY - DIMENSION.EyeSize,
      DIMENSION.RightEyeX + DIMENSION.EyeSize * 0.75,
      DIMENSION.EyeY - DIMENSION.EyeSize,
      DIMENSION.RightEyeX + DIMENSION.EyeSize * 1.25,
      DIMENSION.EyeY + DIMENSION.EyeSize / 4,
      DIMENSION.RightEyeX - DIMENSION.EyeSize * 1.25,
      DIMENSION.EyeY + DIMENSION.EyeSize / 4
    ])
    .attr({
      fill: COLOR.BlobFill
    });
  PARTS.LeftBottomEyeLid = s
    .polygon([
      DIMENSION.LeftEyeX + DIMENSION.EyeSize * 1.25,
      DIMENSION.EyeY + DIMENSION.EyeSize / 4,
      DIMENSION.LeftEyeX - DIMENSION.EyeSize * 1.25,
      DIMENSION.EyeY + DIMENSION.EyeSize / 4,
      DIMENSION.LeftEyeX - DIMENSION.EyeSize * 0.75,
      DIMENSION.EyeY + DIMENSION.EyeSize * 1.5,
      DIMENSION.LeftEyeX + DIMENSION.EyeSize * 0.75,
      DIMENSION.EyeY + DIMENSION.EyeSize * 1.5
    ])
    .attr({
      fill: COLOR.BlobFill
    });
  PARTS.RightBottomEyeLid = s
    .polygon([
      DIMENSION.RightEyeX + DIMENSION.EyeSize * 1.25,
      DIMENSION.EyeY + DIMENSION.EyeSize / 4,
      DIMENSION.RightEyeX - DIMENSION.EyeSize * 1.25,
      DIMENSION.EyeY + DIMENSION.EyeSize / 4,
      DIMENSION.RightEyeX - DIMENSION.EyeSize * 0.75,
      DIMENSION.EyeY + DIMENSION.EyeSize * 1.5,
      DIMENSION.RightEyeX + DIMENSION.EyeSize * 0.75,
      DIMENSION.EyeY + DIMENSION.EyeSize * 1.5
    ])
    .attr({
      fill: COLOR.BlobFill
    });
}

function makeMouth(s) {
  DIMENSION.MouthLeftX = DIMENSION.LeftEyeX + DIMENSION.EyeSize * 2;
  DIMENSION.MouthY = DIMENSION.EyeY + DIMENSION.EyeSize * 2;
  DIMENSION.MouthRightX = DIMENSION.RightEyeX - DIMENSION.EyeSize * 2;
  PARTS.Mouth = s
    .path(
      "M" +
        DIMENSION.MouthLeftX +
        "," +
        DIMENSION.MouthY +
        " C" +
        (DIMENSION.MouthLeftX + DIMENSION.EyeSize * 2) +
        "," +
        (DIMENSION.MouthY + DIMENSION.EyeSize * 3) +
        " " +
        (DIMENSION.MouthRightX - DIMENSION.EyeSize * 2) +
        "," +
        (DIMENSION.MouthY + DIMENSION.EyeSize * 3) +
        " " +
        DIMENSION.MouthRightX +
        "," +
        DIMENSION.MouthY +
        " " +
        "Q" +
        DIMENSION.MiddleX +
        "," +
        (DIMENSION.EyeY + DIMENSION.EyeSize * 2) +
        " " +
        DIMENSION.MouthLeftX +
        "," +
        DIMENSION.MouthY
    )
    .attr({
      fill: COLOR.White
    });
}

function makeMoustaches(s) {
  PARTS.MoustacheLeft = s
    .path(
      "M" +
        DIMENSION.MiddleX +
        "," +
        (DIMENSION.EyeY + DIMENSION.EyeSize) +
        "c-" +
        DIMENSION.EyeSize +
        "," +
        DIMENSION.EyeSize * 2 +
        " -" +
        DIMENSION.EyeSize * 4 +
        "," +
        DIMENSION.EyeSize * 2 +
        " -" +
        DIMENSION.EyeSize * 4 +
        "," +
        DIMENSION.EyeSize * 0.5
    )
    .attr({
      fill: "none",
      stroke: COLOR.Moustache,
      strokeWidth: DIMENSION.EyeSize / 1.25,
      strokeLinecap: "round",
      strokeMiterlimit: DIMENSION.EyeSize / 1.25,
      opacity: 0
    });
  DIMENSION.MoustacheLeftLength = PARTS.MoustacheLeft.getTotalLength();
  setStrokeAttributes("MoustacheLeft", true);

  PARTS.MoustacheRight = s
    .path(
      "M" +
        DIMENSION.MiddleX +
        "," +
        (DIMENSION.EyeY + DIMENSION.EyeSize) +
        "c" +
        DIMENSION.EyeSize +
        "," +
        DIMENSION.EyeSize * 2 +
        " " +
        DIMENSION.EyeSize * 4 +
        "," +
        DIMENSION.EyeSize * 2 +
        " " +
        DIMENSION.EyeSize * 4 +
        "," +
        DIMENSION.EyeSize * 0.5
    )
    .attr({
      fill: "none",
      stroke: COLOR.Moustache,
      strokeWidth: DIMENSION.EyeSize / 1.25,
      strokeLinecap: "round",
      strokeMiterlimit: DIMENSION.EyeSize / 1.25,
      opacity: 0
    });
  DIMENSION.MoustacheRightLength = PARTS.MoustacheRight.getTotalLength();
  setStrokeAttributes("MoustacheRight", true);
}

function makeTie(s, heightScale, color) {
  DIMENSION.TiePnts = {
    startX: DIMENSION.MiddleX - DIMENSION.EyeSize * 0.75,
    startY: DIMENSION.MouthY + DIMENSION.EyeSize * 5.5,
    endX: DIMENSION.MiddleX + DIMENSION.EyeSize * 0.85,
    middleY: DIMENSION.MouthY + DIMENSION.EyeSize * 6.5,
    endY:
      DIMENSION.StartingPnt * heightScale +
      DIMENSION.SquareLength -
      DIMENSION.EyeSize / 2
  };

  PARTS.Tie = s
    .path(
      "M" +
        DIMENSION.TiePnts.startX +
        "," +
        DIMENSION.TiePnts.startY +
        " " +
        DIMENSION.TiePnts.endX +
        "," +
        DIMENSION.TiePnts.startY +
        " " +
        (DIMENSION.TiePnts.endX - DIMENSION.EyeSize / 2) +
        "," +
        DIMENSION.TiePnts.middleY +
        " " +
        (DIMENSION.TiePnts.startX + DIMENSION.EyeSize / 2) +
        "," +
        DIMENSION.TiePnts.middleY +
        "z M" +
        (DIMENSION.TiePnts.startX + DIMENSION.EyeSize / 2) +
        "," +
        DIMENSION.TiePnts.middleY +
        " " +
        DIMENSION.TiePnts.startX +
        "," +
        (DIMENSION.TiePnts.endY - DIMENSION.EyeSize) +
        " " +
        DIMENSION.MiddleX +
        "," +
        DIMENSION.TiePnts.endY +
        " " +
        DIMENSION.TiePnts.endX +
        "," +
        (DIMENSION.TiePnts.endY - DIMENSION.EyeSize) +
        " " +
        (DIMENSION.TiePnts.endX - DIMENSION.EyeSize / 2) +
        "," +
        DIMENSION.TiePnts.middleY
    )
    .attr({
      fill: "none",
      stroke: color ? color : COLOR.Moustache,
      strokeWidth: DIMENSION.EyeSize / 2,
      strokeLinecap: "round",
      strokeMiterlimit: DIMENSION.EyeSize / 2,
      opacity: 0
    });

  DIMENSION.TieLength = PARTS.Tie.getTotalLength();
  setStrokeAttributes("Tie", true);
}

function makeGlasses(s, color) {
  PARTS.LeftGlass = s
    .circle(DIMENSION.LeftEyeX, DIMENSION.EyeY, DIMENSION.EyeSize * 3.5)
    .attr({
      fill: "none",
      stroke: color ? color : COLOR.Moustache,
      strokeWidth: DIMENSION.EyeSize / 2,
      strokeLinecap: "round",
      strokeMiterlimit: DIMENSION.EyeSize / 2,
      opacity: 0
    });

  PARTS.RightGlass = s
    .circle(DIMENSION.RightEyeX, DIMENSION.EyeY, DIMENSION.EyeSize * 3.5)
    .attr({
      fill: "none",
      stroke: color ? color : COLOR.Moustache,
      strokeWidth: DIMENSION.EyeSize / 2,
      strokeLinecap: "round",
      strokeMiterlimit: DIMENSION.EyeSize / 2,
      opacity: 0
    });

  PARTS.GlassHinge = s
    .path(
      "M" +
        (DIMENSION.LeftEyeX + DIMENSION.EyeSize * 4) +
        "," +
        DIMENSION.EyeY +
        "Q" +
        DIMENSION.MiddleX +
        "," +
        (DIMENSION.EyeY - DIMENSION.EyeSize) +
        " " +
        (DIMENSION.RightEyeX - DIMENSION.EyeSize * 4) +
        "," +
        DIMENSION.EyeY
    )
    .attr({
      fill: "none",
      stroke: color ? color : COLOR.Moustache,
      strokeWidth: DIMENSION.EyeSize / 2,
      strokeLinecap: "round",
      strokeMiterlimit: DIMENSION.EyeSize / 2,
      opacity: 0
    });
}

function makeWorkerHat(s, heightScale, color) {
  DIMENSION.WorkerHat = {};
  DIMENSION.WorkerHat.startX =
    (DIMENSION.StartingPntX !== undefined
      ? DIMENSION.StartingPntX
      : DIMENSION.StartingPnt) - DIMENSION.EyeSize;
  DIMENSION.WorkerHat.startY =
    DIMENSION.StartingPnt * heightScale + DIMENSION.SquareLength / 8;
  PARTS.WorkerHat = s
    .path(
      "M" +
        DIMENSION.WorkerHat.startX +
        "," +
        DIMENSION.WorkerHat.startY +
        " " +
        "C" +
        DIMENSION.WorkerHat.startX +
        "," +
        (DIMENSION.WorkerHat.startY - DIMENSION.SquareLength / 1.5) +
        " " +
        (DIMENSION.WorkerHat.startX +
          DIMENSION.SquareLength +
          2 * DIMENSION.EyeSize) +
        "," +
        (DIMENSION.WorkerHat.startY - DIMENSION.SquareLength / 1.5) +
        " " +
        (DIMENSION.WorkerHat.startX +
          DIMENSION.SquareLength +
          2 * DIMENSION.EyeSize) +
        "," +
        DIMENSION.WorkerHat.startY +
        "Z"
    )
    .attr({
      fill: color,
      stroke: color,
      strokeWidth: DIMENSION.EyeSize / 2,
      strokeLinecap: "round",
      opacity: 0
    });
  PARTS.WorkerHatEdge = s
    .rect(
      (DIMENSION.StartingPntX !== undefined
        ? DIMENSION.StartingPntX
        : DIMENSION.StartingPnt) -
        DIMENSION.EyeSize * 3,
      DIMENSION.StartingPnt * heightScale -
        DIMENSION.SquareLength / 8 +
        DIMENSION.SquareLength / 5,
      DIMENSION.SquareLength + DIMENSION.EyeSize * 6,
      DIMENSION.SquareLength / 8
    )
    .attr({
      fill: color,
      stroke: color,
      strokeWidth: DIMENSION.EyeSize / 2,
      strokeLinecap: "round",
      opacity: 0
    });
}

/*-----------------------------ANIMATIONS-------------------------------------*/

function animateEyeLids() {
  // add some blinking
  var topLidTween = TweenMax.from(
    [PARTS.LeftTopEyeLid.node, PARTS.RightTopEyeLid.node],
    0.3,
    {
      scaleY: 0,
      transformOrigin: "center top",
      ease: Cubic.easeInOut
    }
  );

  var bottomLidTween = TweenMax.from(
    [PARTS.LeftBottomEyeLid.node, PARTS.RightBottomEyeLid.node],
    0.3,
    {
      scaleY: 0,
      transformOrigin: "center bottom",
      ease: Cubic.easeInOut
    }
  );

  var t1 = new TimelineMax({
    paused: true,
    repeat: 1,
    yoyo: true,
    onCompleteParams: ["{self}"],
    onComplete: function onComplete() {
      TweenLite.delayedCall(3 * Math.random() + 0.6, t1.restart, [], t1);
    }
  });

  t1.add([topLidTween, bottomLidTween]);
  t1.progress(1).progress(0);
  t1.play();
}

function animateMouseMoveBody() {
  PARTS.SquareGroup.hover(
    function() {
      var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
      TweenMax.to(PARTS.SquareGroup.node, 0.1, {
        skewX: plusOrMinus * 3,
        transformOrigin: "center bottom",
        ease: Power4.easeInOut,
        onComplete: function onComplete() {
          TweenMax.to(PARTS.SquareGroup.node, 0.1, {
            skewX: -1 * plusOrMinus * 3,
            transformOrigin: "center bottom",
            ease: Power4.easeInOut
          });
        }
      });
    },
    function() {
      TweenMax.to(PARTS.SquareGroup.node, 0, {
        skewX: 0,
        transformOrigin: "center bottom"
      });
    }
  );
}

/*-----------------------------ATTRIBUTES-------------------------------------*/

function setStrokeAttributes(objectName, isEnd) {
  PARTS[objectName].attr({
    "stroke-dasharray":
      DIMENSION[objectName + "Length"] + " " + DIMENSION[objectName + "Length"],
    "stroke-dashoffset": isEnd ? DIMENSION[objectName + "Length"] : 0
  });
}
