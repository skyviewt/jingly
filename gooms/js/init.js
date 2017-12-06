(function($) {

	var settings = {
		
		// Full screen header?
			fullScreenHeader: true,

		// Parallax?
			parallax: true,

		// Lower = more intense. Higher = less intense.
			parallaxFactor: 10

	};

	$('.lazy').Lazy({
        scrollDirection: 'vertical',
        effect: 'fadeIn',
        visibleOnly: true
    });
	
	skel.init({
		reset: 'full',
		breakpoints: {
			'global':	{ range: '*', href: 'css/style.css', containers: 1140, grid: { gutters: 40 } },
			'wide':		{ range: '-1680', href: 'css/style-wide.css', containers: 960 },
			'normal':	{ range: '-1080', href: 'css/style-normal.css', containers: '95%', viewport: { scalable: false } },
			'narrow':	{ range: '-840', href: 'css/style-narrow.css', grid: { gutters: 30 } },
			'mobile':	{ range: '-736', href: 'css/style-mobile.css', grid: { collapse: true, gutters: 20 } }
		}
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		if (skel.vars.isTouch) {
			
			settings.parallax = false;
			$body.addClass('is-scroll');
		
		}
			
		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');
			
			$window.on('load', function() {
				$body.removeClass('is-loading');
			});
			
		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');
			
		// Scrolly links.
			$('.scrolly').scrolly(1000, function() { return (skel.isActive('mobile') ? 70 : 190); });
	
		// Full screen header.
			if (settings.fullScreenHeader) {
				
				var $header = $('#header');
				
				if ($header.length > 0) {
					
					var $header_header = $header.find('header');
					
					$window
						.on('resize.overflow_fsh', function() {
						
							if (skel.isActive('mobile'))
								$header.css('padding', '');
							else {
								
								var p = Math.max(192, ($window.height() - $header_header.outerHeight()) / 2);
								$header.css('padding', p + 'px 0 ' + p + 'px 0');
							
							}
						
						})
						.trigger('resize.overflow_fsh');
						
					$window.load(function() {
						$window.trigger('resize.overflow_fsh');
					});
				
				}
			
			}
			
		// Parallax background.
			if (settings.parallax) {
				
				var $dummy = $(), $bg;
			
				$window
					.on('scroll.overflow_parallax', function() {
						$bg.css('background-position', 'center ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					})
					.on('resize.overflow_parallax', function() {
						if (!skel.isActive('wide')
						||	skel.isActive('narrow')) {
							
							$body.css('background-position', '');
							$bg = $dummy;
						
						}
						else
							$bg = $body;
					
					})
					.trigger('resize.overflow_parallax');

				// IE's smooth scroll kind of screws this up, so we have to turn it off.
					if (skel.vars.IEVersion < 11)
						$window.unbind('scroll.overflow_parallax');
			
			}
			
		// Poptrox.
			$('.gallery').poptrox({
				useBodyOverflow: false,
				usePopupEasyClose: false,
				overlayColor: '#0a1919',
				overlayOpacity: (skel.vars.IEVersion < 9 ? 0 : 0.75),
				usePopupDefaultStyling: false,
				usePopupCaption: true,
				popupLoaderText: '',
				windowMargin: 10,
				usePopupNav: true
			});
			
	});

})(jQuery);