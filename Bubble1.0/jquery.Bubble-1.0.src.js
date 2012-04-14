/*
    Bubble Jquery Plug in Based on original code
    Minimalistic Slideshow Gallery with jQuery by Mary Lou
    http://tympanus.net/codrops/2010/07/05/minimalistic-slideshow-gallery/
    
    Modified by Weblicating.com, September 2011

    This plugin is free software;  
*/

(function ($) {

    $.fn.setBubble = function (options) {
        var arrowColor;
        var bubbleType;
        var arrowPositionX;
        var arrowPositionY;
        var backgroundStart;
        var backgroundEnd;
        var offSetX;
        var offSetY;
		var useArrow;
        options = $.extend({
            arrowColor: '#F3961C',
            bubbleType: 'triangle-isosceles',
            arrowPositionX: 'left',
            arrowPositionY: 'bottom',
            bubbleWidth: 300,
            backgroundStart: '#F9D835',
            backgroundEnd: '#F3961C',
			useArrow:'true'
        },
                            options);
        arrowColor = options.arrowColor.toUpperCase();
        bubbleType = options.bubbleType.toLowerCase();
        arrowPositionX = options.arrowPositionX.toLowerCase();
        arrowPositionY = options.arrowPositionY.toLowerCase();
        backgroundStart = options.backgroundStart.toUpperCase();
        backgroundEnd = options.backgroundEnd.toUpperCase();
        bubbleWidth = typeof options.bubbleWidth == 'number' ? parseInt(options.bubbleWidth) : 300;
		useArrow = options.useArrow.toLowerCase();

        $(this).addClass(bubbleType);
        if (arrowPositionY == "center") {
            $(this).addClass(arrowPositionX);
            offsetY = '15px';
            offsetX = '-15px';
        }
        else {
            $(this).addClass(arrowPositionY);
            offsetY = '-15px';
            offsetX = '15px';
        }
        $(this).css('background', '-moz-linear-gradient(' + backgroundStart + ',' + backgroundEnd + ') repeat scroll 0 0 transparent');
        $(this).css('width', bubbleWidth + 'px');
		$("<style type='text/css' id='" + $(this).attr('id') + "after' />").appendTo("head");
		if (useArrow == 'true'){
	        if (arrowPositionY == "center") {
	            $("#" + $(this).attr('id') + "after").text("#" + $(this).attr('id') + ":after{top:" + offsetY + ";" + arrowPositionX + ":" + offsetX + ";border-color:transparent " + arrowColor + ";}");
	        }
	        else {
	            $("#" + $(this).attr('id') + "after").text("#" + $(this).attr('id') + ":after{" + arrowPositionY + ":" + offsetY + ";" + arrowPositionX + ":" + offsetX + ";border-color:" + arrowColor + " transparent;}");
	        }
		}
		else{
			$("#" + $(this).attr('id') + "after").text("#" + $(this).attr('id') + ":after{border-width:0;}");
		}
    };

    $.fn.makeBubble = function (options) {
        var arrowColor;
        var arrowPositionX;
        var arrowPositionY;
        var content;
        var bubblePosition;
        var bubblePosX;
        var bubblePosY;
        var bubbleWidth;
        var effectType;
		var backgroundStart;
		var backgroundEnd;
		var useArrow;
		var bubbleStatus = false;
		var mouseStatus = false;
        options = $.extend({
            arrowColor: '#F3961C',
            bubbleType: 'triangle-isosceles',
            bubblePosition: 'top',
            backgroundStart: '#F9D835',
            backgroundEnd: '#F3961C',
            bubbleWidth: 300,
            effectType: 'fade',
            content: "",
			useArrow:'true'
        }, options);
        arrowColor = options.arrowColor.toUpperCase();
        bubbleType = options.bubbleType.toLowerCase();
        backgroundStart = options.backgroundStart.toUpperCase();
        backgroundEnd = options.backgroundEnd.toUpperCase();
        content = options.content;
        bubblePosition = options.bubblePosition.toLowerCase();
        effectType = options.effectType.toLowerCase();
		useArrow = options.useArrow.toLowerCase();
        bubbleWidth = typeof options.bubbleWidth == 'number' ? parseInt(options.bubbleWidth) : 300;
		

        switch (bubblePosition) {
            case 'top':
                arrowPositionX = 'left';
                arrowPositionY = 'bottom';
                break;
            case 'bottom':
                arrowPositionX = 'left';
                arrowPositionY = 'top';
                break;
            case 'left':
                arrowPositionX = 'right';
                arrowPositionY = 'center';
                break;
            case 'right':
                arrowPositionX = 'left';
                arrowPositionY = 'center';
                break;
            default:
                arrowPositionX = 'left';
                arrowPositionY = 'bottom';
                break;
        }
        var parentPosition = $(this).offset();


        var bubbleId = $(this).attr('id') + "_bubble";
        $("<div id='" + bubbleId + "'><p>" + content + "</p></div>").appendTo($('body'));
        $('#' + bubbleId).setBubble({
            arrowColor: arrowColor,
            bubbleType: bubbleType,
            arrowPositionX: arrowPositionX,
            arrowPositionY: arrowPositionY,
            bubbleWidth: bubbleWidth,
            backgroundStart: backgroundStart,
            backgroundEnd: backgroundEnd,
			useArrow:useArrow
        });
        switch (bubblePosition) {
            case 'top':
                bubblePosY = parentPosition.top - $('#' + bubbleId).outerHeight() - 30;
                bubblePosX = parentPosition.left;
                break;
            case 'bottom':
                bubblePosX = parentPosition.left;
                bubblePosY = parentPosition.top + $(this).height() + 10;
                break;
            case 'left':
                bubblePosX = parentPosition.left - $('#' + bubbleId).outerWidth() - 50;
                bubblePosY = parentPosition.top - 30;
                break;
            case 'right':
                bubblePosX = parentPosition.left + $(this).outerWidth();
                bubblePosY = parentPosition.top - 30;
                break;
        }
        $('#' + bubbleId).css({ 'position': 'absolute', 'left': bubblePosX, 'top': bubblePosY, 'z-index': 9999, 'display': 'none' });
		var oldHeight = $('#' + bubbleId).height();
		var oldWidth = $('#' + bubbleId).outerWidth();
		var elementCenterX;
		var elementCenterY;
		var marginLeft = $('#' + bubbleId).css('margin-left');
		var marginTop = $('#' + bubbleId).css('margin-top');
		elementCenterX = parentPosition.left - marginLeft.substr(0,marginLeft.length - 2);// + ($(this).outerWidth() / 2) -  marginLeft.substr(0,marginLeft.length - 2);
		elementCenterY = parentPosition.top -  marginTop.substr(0,marginTop.length-2);// + ($(this).outerHeight() / 2) - marginTop.substr(0,marginTop.length-2);
        $(this).click(function () {
			$('#' + bubbleId).css({'left':elementCenterX, 'top' : elementCenterY});
            $('#' + bubbleId).height(1);
            $('#' + bubbleId).width($(this).width());

            $('#' + bubbleId).animate({
                width: oldWidth,
                height: oldHeight,
				left:bubblePosX,
				top:bubblePosY,
                opacity: 1
            }, 1500);

            //            $('#' + bubbleId).animate({
            //                width: 200,
            //                height: 200
            //            }, {
            //                duration: 5000,
            //                specialEasing: {
            //                    width: 'linear',
            //                    height: 'easeOutBounce'
            //                },
            //                complete: function () {
            //                   
            //                }
            //            });
        });

        $(this).hover(function () {
			mouseStatus = true;
			if (effectType == 'fade') {
				$('#' + bubbleId).fadeIn(200);
            }
            else if (effectType == 'grow') {
				if (bubbleStatus == false){
					bubbleStatus = true;
					/*if ((bubblePosition == 'left') || (bubblePosition == 'right')){
						var elementCenterX;
						var elementCenterY;
						var marginLeft = $('#' + bubbleId).css('margin-left');
						var marginTop = $('#' + bubbleId).css('margin-top');
						elementCenterX = parentPosition.left;// + ($(this).outerWidth() / 2) -  marginLeft.substr(0,marginLeft.length - 2);
						elementCenterY = parentPosition.top -  marginTop.substr(0,marginTop.length-2);// + ($(this).outerHeight() / 2) - marginTop.substr(0,marginTop.length-2);
						$('#' + bubbleId).css({'left':elementCenterX, 'top' : elementCenterY});
			            $('#' + bubbleId).height(1);
			            $('#' + bubbleId).width($(this).width());

			            $('#' + bubbleId).animate({
			                width: oldWidth,
			                height: oldHeight,
							left:bubblePosX,
							top:bubblePosY,
			                opacity: 1
			            }, 1500);
					}
	                else{*/
						$('#' + bubbleId).css({'left':elementCenterX, 'top' : elementCenterY});
			            $('#' + bubbleId).height(1);
			            $('#' + bubbleId).width($(this).width());

			            $('#' + bubbleId).animate({
			                width: oldWidth,
			                height: oldHeight,
							left:bubblePosX,
							top:bubblePosY,
			                opacity: 1
			            }, 1500, function(){
							bubbleStatus = false;
							if (mouseStatus == false){
								$('#' + bubbleId).animate({
					                width: 1,
					                height: 1,
									left:elementCenterX,
									top:elementCenterY,
					                opacity: 0
					            }, 1500);
							}
						});
					//}
				}
            }
        }, function () {
			mouseStatus = false;
            if (effectType == 'fade') {
                $('#' + bubbleId).fadeOut(200);
            }
            else if (effectType == 'grow') {
				if (bubbleStatus == false){
					$('#' + bubbleId).animate({
			                width: 1,
			                height: 1,
							left:elementCenterX,
							top:elementCenterY,
			                opacity: 0
			            }, 1500);
				}
            }
        });
    };
})(jQuery);
