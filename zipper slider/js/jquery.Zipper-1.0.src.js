/*
    Bubble Jquery Plug in Based on original code
    Minimalistic Slideshow Gallery with jQuery by Mary Lou
    http://tympanus.net/codrops/2010/07/05/minimalistic-slideshow-gallery/
    
    Modified by Weblicating.com, September 2011

    This plugin is free software;  
*/

(function ($) {
	$.extend($.support, {
        touch: "ontouchend" in document
	});

	//
	// Hook up touch events
	//
	$.fn.addTouch = function() {
	        if ($.support.touch) {
	                this.each(function(i,el){
	                        el.addEventListener("touchstart", iPadTouchHandler, false);
	                        el.addEventListener("touchmove", iPadTouchHandler, false);
	                        el.addEventListener("touchend", iPadTouchHandler, false);
	                        el.addEventListener("touchcancel", iPadTouchHandler, false);
	                });
	        }
	};

	var lastTap = null;   
    $.fn.setZipper = function () {
		var $zipper_container = "<div class='zipper_container'></div>";
		var $zipper_background = "<div class='zipper_background'></div>";
		var $zipper_slider = "<div class='zipper_slider' style=''></div>";
		var $top_shadow = "<div class='top_shadow'></div>";
		$(this).parent().append($zipper_container);
		$('.zipper_container').append("<div class='link'></div>");
		$('.link').append($(this));
		$('.zipper_container').append($zipper_background);
		$('.zipper_container').append($zipper_slider);		
		
		
		$('.zipper_slider').slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 142,
			value: 0,
			slide: function( event, ui ) {
				$('.zipper_background').css('top',-ui.value);
			}
		}).addTouch();
		
		$('.zipper_background').click(function(ev){
			var linkPos = $('.link img').offset();
			var linkWidth = $('.link img').width();
			var linkHeight = $('.link img').height();
			if ($('.zipper_slider').slider('value') == 0){
				if ((ev.clientX > linkPos.left) && (ev.clientX < linkPos.left + linkWidth) && (ev.clientY > linkPos.top) && (ev.clientY < linkPos.top + linkHeight)){
					document.location.href= $('.link a').attr('href');
				}
			}
		});
	}
})(jQuery);
