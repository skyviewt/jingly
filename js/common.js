"use strict";

var isMenuOpen = false;
/*-----------------------------READY FUNCTION-------------------------------------*/
function readyFn(jQuery) {
  var _this = this;

  $(".header").load("../header/header.html", function() {
    $(".header-btn.logo").on("click", function(event) {
      event.stopPropagation();
      if (!isMenuOpen) {
        $(".header-btn.logo").removeClass("animsition-link");

        TweenMax.to(".header", 0.5, {
          width: "100%",
          transformOrigin: "center right",
          "border-radius": 0,
          ease: Power2.easeInOut,
          onStart: function onStart() {
            $(".header-nav").toggleClass("minimized");
          },
          onComplete: function onComplete() {
            TweenMax.to(
              [
                ".header-btn.art",
                ".header-btn.coding",
                ".header-btn.resume",
                ".header-btn.linkedin"
              ],
              0.2,
              { opacity: 1, ease: Power2.easeInOut }
            );
          }
        });
        isMenuOpen = true;
      } else {
        // let the redirection happen
        $("header-btn.logo").addClass("animsition-link");
        $(location).attr("href", "../");
      }
    });

    $("html").click(function(event) {
      //if clicked element is not your element and parents aren't your div
      if (isMenuOpen) {
        if (
          event.target.className != "header" &&
          $(event.target).parents(".header").length == 0
        ) {
          isMenuOpen = false;
          $(".header-btn.logo").removeClass("animsition-link");
          TweenMax.to(
            [
              ".header-btn.art",
              ".header-btn.coding",
              ".header-btn.resume",
              ".header-btn.linkedin"
            ],
            0.2,
            {
              opacity: 0,
              ease: Power2.easeInOut,
              onComplete: function onComplete() {
                TweenMax.to(".header", 0.5, {
                  width: $(window).width() > 760 ? "50px" : "30px",
                  transformOrigin: "center right",
                  "border-radius": "10px",
                  ease: Power2.easeInOut
                });
                $(".header-nav").toggleClass("minimized");
              }
            }
          );
        }
      }
    });

    $(".header-btn.art").hover(
      function() {
        TweenMax.to(_this, 0.5, { scale: 1.25, ease: Back.easeInOut });
        TweenMax.to("#header-palette-color1", 0.5, {
          fill: COLOR.Red,
          ease: Power2.easeInOut
        });
        TweenMax.to("#header-palette-color2", 0.5, {
          fill: COLOR.Yellow,
          ease: Power2.easeInOut
        });
        TweenMax.to("#header-palette-color3", 0.5, {
          fill: COLOR.Blue,
          ease: Power2.easeInOut
        });
        TweenMax.to("#header-palette-color4", 0.5, {
          fill: COLOR.Green,
          ease: Power2.easeInOut
        });
        TweenMax.to("#header-palette-outline", 0.5, {
          stroke: COLOR.White,
          ease: Power2.easeInOut
        });
        TweenMax.to(".header-btn.art .header-btn-title", 0.5, {
          color: "#FDFFFC",
          ease: Power2.easeInOut
        });
      },
      function() {
        TweenMax.to("#header-palette-outline", 0.5, {
          stroke: COLOR.BlackStroke,
          ease: Power2.easeInOut
        });
        TweenMax.to(
          [
            "#header-palette-color1",
            "#header-palette-color2",
            "#header-palette-color3",
            "#header-palette-color4"
          ],
          0.5,
          { fill: COLOR.Moustache }
        );
        TweenMax.to(_this, 0.5, { scale: 1, ease: Back.easeInOut });
        TweenMax.to(".header-btn.art .header-btn-title", 0.5, {
          color: "#1f2c39",
          ease: Power2.easeInOut
        });
      }
    );

    $(".header-btn.coding").hover(
      function() {
        TweenMax.to(_this, 0.5, { scale: 1.25, ease: Back.easeInOut });
        TweenMax.to("#header-browser-button1", 0.5, {
          fill: COLOR.Red,
          stroke: COLOR.Red,
          ease: Power2.easeInOut
        });
        TweenMax.to("#header-browser-button2", 0.5, {
          fill: COLOR.Yellow,
          stroke: COLOR.Yellow,
          ease: Power2.easeInOut
        });
        TweenMax.to("#header-browser-button3", 0.5, {
          fill: COLOR.Green,
          stroke: COLOR.Green,
          ease: Power2.easeInOut
        });
        TweenMax.to("#header-browser-outline", 0.5, {
          stroke: COLOR.White,
          ease: Power2.easeInOut
        });
        TweenMax.to(".header-btn.coding .header-btn-title", 0.5, {
          color: "#FDFFFC",
          ease: Power2.easeInOut
        });
      },
      function() {
        TweenMax.to("#header-browser-outline", 0.5, {
          stroke: COLOR.BlackStroke,
          ease: Power2.easeInOut
        });
        TweenMax.to(
          [
            "#header-browser-button1",
            "#header-browser-button2",
            "#header-browser-button3"
          ],
          0.5,
          { fill: COLOR.Moustache, stroke: COLOR.Moustache }
        );
        TweenMax.to(_this, 0.5, { scale: 1, ease: Back.easeInOut });
        TweenMax.to(".header-btn.coding .header-btn-title", 0.5, {
          color: "#1f2c39",
          ease: Power2.easeInOut
        });
      }
    );

    $(".header-btn.resume").hover(
      function() {
        TweenMax.to(_this, 0.5, { scale: 1.25, ease: Back.easeInOut });
        TweenMax.to("#header-experience-circle", 0.5, {
          fill: COLOR.Red,
          stroke: COLOR.Red,
          ease: Power2.easeInOut
        });
        TweenMax.to("#header-experience-path1", 0.5, {
          stroke: COLOR.Blue,
          ease: Power2.easeInOut
        });
        TweenMax.to("#header-experience-path2", 0.5, {
          stroke: COLOR.Yellow,
          fill: COLOR.Yellow,
          ease: Power2.easeInOut
        });
        TweenMax.to("#header-experience-outline", 0.5, {
          stroke: COLOR.White,
          ease: Power2.easeInOut
        });
        TweenMax.to(".header-btn.resume .header-btn-title", 0.5, {
          color: "#FDFFFC",
          ease: Power2.easeInOut
        });
      },
      function() {
        TweenMax.to(
          ["#header-experience-outline", "#header-experience-path1"],
          0.5,
          { stroke: COLOR.BlackStroke, ease: Power2.easeInOut }
        );
        TweenMax.to(
          ["#header-experience-circle", "#header-experience-path2"],
          0.5,
          { fill: COLOR.Moustache, stroke: COLOR.Moustache }
        );
        TweenMax.to(_this, 0.5, { scale: 1, ease: Back.easeInOut });
        TweenMax.to(".header-btn.resume .header-btn-title", 0.5, {
          color: "#1f2c39",
          ease: Power2.easeInOut
        });
      }
    );

    $(".header-btn.linkedin").hover(
      function() {
        TweenMax.to(_this, 0.5, { scale: 1.25, ease: Back.easeInOut });
        TweenMax.to("#header-linkedin", 0.5, {
          fill: "#007bb6",
          stroke: "none",
          ease: Power2.easeInOut
        });
        TweenMax.to(".header-btn.linkedin .header-btn-title", 0.5, {
          color: "#FDFFFC",
          ease: Power2.easeInOut
        });
      },
      function() {
        TweenMax.to("#header-linkedin", 0.5, {
          fill: COLOR.White,
          stroke: COLOR.BlackStroke,
          ease: Power2.easeInOut
        });
        TweenMax.to(_this, 0.5, { scale: 1, ease: Back.easeInOut });
        TweenMax.to(".header-btn.linkedin .header-btn-title", 0.5, {
          color: "#1f2c39",
          ease: Power2.easeInOut
        });
      }
    );
  });
}

$(document).ready(readyFn);
