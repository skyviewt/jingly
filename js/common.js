let isMenuOpen = false;
/*-----------------------------READY FUNCTION-------------------------------------*/
function readyFn( jQuery ) {

    $('.header').load('../header/header.html', ()=>{

        $('.header-btn.art').hover(()=>{
            TweenMax.to(this, 0.5, {scale: 1.25, ease: Back.easeInOut});
            TweenMax.to('#header-palette-color1', 0.5, {fill: COLOR.Red, ease: Power2.easeInOut});
            TweenMax.to('#header-palette-color2', 0.5, {fill: COLOR.Yellow, ease: Power2.easeInOut});
            TweenMax.to('#header-palette-color3', 0.5, {fill: COLOR.Blue, ease: Power2.easeInOut});
            TweenMax.to('#header-palette-color4', 0.5, {fill: COLOR.Green, ease: Power2.easeInOut});
            TweenMax.to('#header-palette-outline', 0.5, {stroke: COLOR.White, ease: Power2.easeInOut});
            TweenMax.to('.header-btn.art .header-btn-title', 0.5, {color: '#FDFFFC', ease: Power2.easeInOut});
        },
        ()=>{
            TweenMax.to('#header-palette-outline', 0.5, {stroke: COLOR.BlackStroke, ease: Power2.easeInOut});
            TweenMax.to(['#header-palette-color1', '#header-palette-color2', '#header-palette-color3', '#header-palette-color4'],
                0.5, {fill: COLOR.Moustache});
            TweenMax.to(this, 0.5, {scale: 1, ease: Back.easeInOut} );
            TweenMax.to('.header-btn.art .header-btn-title', 0.5, {color: '#1f2c39', ease: Power2.easeInOut});
            
            
        });
    
        $('.header-btn.coding').hover(()=>{
            TweenMax.to(this, 0.5, {scale: 1.25, ease: Back.easeInOut});
            TweenMax.to('#header-browser-button1', 0.5, {fill: COLOR.Red, stroke: COLOR.Red, ease: Power2.easeInOut});
            TweenMax.to('#header-browser-button2', 0.5, {fill: COLOR.Yellow, stroke: COLOR.Yellow, ease: Power2.easeInOut});
            TweenMax.to('#header-browser-button3', 0.5, {fill: COLOR.Green, stroke: COLOR.Green, ease: Power2.easeInOut});
            TweenMax.to('#header-browser-outline', 0.5, {stroke: COLOR.White, ease: Power2.easeInOut});
            TweenMax.to('.header-btn.coding .header-btn-title', 0.5, {color: '#FDFFFC', ease: Power2.easeInOut});
        },
        ()=>{
            TweenMax.to('#header-browser-outline', 0.5, {stroke: COLOR.BlackStroke, ease: Power2.easeInOut});
            TweenMax.to(['#header-browser-button1', '#header-browser-button2', '#header-browser-button3'],
                0.5, {fill: COLOR.Moustache, stroke: COLOR.Moustache});
            TweenMax.to(this, 0.5, {scale: 1, ease: Back.easeInOut});
            TweenMax.to('.header-btn.coding .header-btn-title', 0.5, {color: '#1f2c39', ease: Power2.easeInOut});
            
            
        });
    
        $('.header-btn.resume').hover(()=>{
            TweenMax.to(this, 0.5, {scale: 1.25, ease: Back.easeInOut});
            TweenMax.to('#header-experience-circle', 0.5, {fill: COLOR.Red, stroke: COLOR.Red, ease: Power2.easeInOut});
            TweenMax.to('#header-experience-path1', 0.5, {stroke: COLOR.Blue, ease: Power2.easeInOut});
            TweenMax.to('#header-experience-path2', 0.5, {stroke: COLOR.Yellow, fill: COLOR.Yellow, ease: Power2.easeInOut});
            TweenMax.to('#header-experience-outline', 0.5, {stroke: COLOR.White, ease: Power2.easeInOut});
            TweenMax.to('.header-btn.resume .header-btn-title', 0.5, {color: '#FDFFFC', ease: Power2.easeInOut});
        },
        ()=>{
            TweenMax.to(['#header-experience-outline', '#header-experience-path1'], 0.5, {stroke: COLOR.BlackStroke, ease: Power2.easeInOut});
            TweenMax.to(['#header-experience-circle', '#header-experience-path2'],
                0.5, {fill: COLOR.Moustache, stroke: COLOR.Moustache});
            TweenMax.to(this, 0.5, {scale: 1, ease: Back.easeInOut});
            TweenMax.to('.header-btn.resume .header-btn-title', 0.5, {color: '#1f2c39', ease: Power2.easeInOut});
            
        });
    
        $('.header-btn.linkedin').hover(()=>{
            TweenMax.to(this, 0.5, {scale: 1.25, ease: Back.easeInOut});
            TweenMax.to('#header-linkedin', 0.5, {fill: '#007bb6', stroke: 'none', ease: Power2.easeInOut});
            TweenMax.to('.header-btn.linkedin .header-btn-title', 0.5, {color: '#FDFFFC', ease: Power2.easeInOut});
        },
        ()=>{
            TweenMax.to('#header-linkedin', 0.5, {fill: COLOR.White, stroke: COLOR.BlackStroke, ease: Power2.easeInOut});        
            TweenMax.to(this, 0.5, {scale: 1, ease: Back.easeInOut});
            TweenMax.to('.header-btn.linkedin .header-btn-title', 0.5, {color: '#1f2c39', ease: Power2.easeInOut});
        });
    });   
}

function onLogoClick() {
    if(!isMenuOpen){       
        TweenMax.to('.header', 0.5, {width: '100%', transformOrigin:'center right', 'border-radius':0, ease:Power2.easeInOut, onComplete:()=>{
            TweenMax.to(['.header-btn.art', '.header-btn.coding', '.header-btn.resume', '.header-btn.linkedin'], 0.2, {opacity: 1, ease:Power2.easeInOut});
            isMenuOpen = true;
        }});
        
    }else{
        TweenMax.to(['.header-btn.art', '.header-btn.coding', '.header-btn.resume', '.header-btn.linkedin'], 0.2, {opacity: 0, ease:Power2.easeInOut, onComplete: ()=>{
            TweenMax.to('.header', 0.5, {width: '60px', transformOrigin:'center right', 'border-radius': '10px', ease:Power2.easeInOut});
            isMenuOpen = false;
        }});
    }
}


$( document ).ready( readyFn );