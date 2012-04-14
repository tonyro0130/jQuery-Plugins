/*

	jQuery Scroller plugin
	Copyright (c) 2010 Max Vergelli

	For support and tutorials visit
	http://maxvergelli.wordpress.com/

	License: GNU Lesser General Public License (LGPL) 
	at http://opensource.org/licenses/lgpl-2.1.php

	This plugin is free software;  you can redistribute it  and/or  modify  it 
	under the terms of the GNU Lesser General Public License as  published  by 
	the Free Software Foundation;  either version 2.1 of the License,  or  (at 
	your option) any later version.
	This software is distributed in the hope  that  it  will  be  useful,  but 
	WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
	or FITNESS FOR A PARTICULAR PURPOSE.  See the  GNU Lesser  General  Public 
	License for more details.
	You should have received a copy of  the  GNU Lesser General Public License 
	along with this library;  if not,  write to the  Free Software Foundation, 
	Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA

	THIS COMMENT AND COPYRIGHT NOTICE MUST BE RETAINED IN THE CODE AS IS FOR LEGAL USE

*/

(function ($) {
    var interval;
    var autoplay;
    var autoloop;
    var shownav;
    var playtime;
    var current             = 0;
    var current_thumb         = 0;
    var nmb_thumb_wrappers;//    = $('#pb_thumbs .pb_thumb_wrapper').length;
    var nmb_images_wrapper  = 6;
	$.fn.Play = function(){
		this.next();
        $('#pb_pause_play',this).addClass('pb_pause').removeClass('pb_play');
        playtime = setInterval(function(){$(this).next();},interval)
	};
    $.fn.Pause = function(){
            $('#pb_pause_play').addClass('pb_play').removeClass('pb_pause');
            clearTimeout(playtime);
        };
        
    /**
    * show the next image
    */
    $.fn.next = function(){
        ++current; 
        this.showImage('r');
    };
    
    /**
    * shows the previous image
    */
    $.fn.prev = function(){
        --current;
        this.showImage('l');
    };
    $.fn.showImage = function(dir){
            /**
            * the thumbs wrapper being shown, is always 
            * the one containing the current image
            */
            var _= {me:this};
            _.me.alternateThumbs();
            
            /**
            * the thumb that will be displayed in full mode
            */
            var $thumb = $('#pb_thumbs .pb_thumb_wrapper:eq('+(current_thumb - 1)+')')
                        .find('a:eq('+ (parseInt(current - nmb_images_wrapper*(current_thumb -1)) - 1) +')')
                        .find('img');

            if($thumb.length){
                var source = $thumb.attr('alt');
                var $currentImage = $('#pb_wrapper').find('img');
                if($currentImage.length){
                    $currentImage.fadeOut(function(){
                        $(this).remove();
                        $('<img />').load(function(){
                            var $image = $(this);
                            $image.hide();
                            $('#pb_wrapper').empty().append($image.fadeIn());
                        }).attr('src',source);
                    });
                }
                else{
                    $('<img />').load(function(){
                            var $image = $(this);
                            $image.hide();
                            $('#pb_wrapper').empty().append($image.fadeIn());
                    }).attr('src',source);
                }
                        
            }
            else{ //this is actually not necessary since we have a circular slideshow
                if(dir == 'r')
                    --current;
                else if(dir == 'l')
                    ++current;    
                _.me.alternateThumbs();
                return;
            } 
        };      
    $.fn.alternateThumbs = function(){
        var _= {me:this};
        //alert(current_thumb);
        $('#pb_thumbs',_.me).find('.pb_thumb_wrapper:eq('+(current_thumb)+')')
                        .hide();
            current_thumb = Math.ceil(current/nmb_images_wrapper);
            /**
            * if we reach the end, start from the beggining
            */
            //alert(nmb_thumb_wrappers);
            if(current_thumb > nmb_thumb_wrappers){
                current_thumb     = 1;
                if (autoloop == 'yes')
                {
                    current         = 1;
                }
                else{
                    _.me.Pause();
                    current = nmb_thumb_wrappers * nmb_images_wrapper;                    
                }
            }    
            /**
            * if we are at the beggining, go to the end
            */                    
            else if(current_thumb == 0){
                current_thumb     = nmb_thumb_wrappers;
                current         = current_thumb*nmb_images_wrapper;
            }
            
            //alert($('#pb_thumbs', _.me).attr('class'));
            $('#pb_thumbs',_.me).find('.pb_thumb_wrapper:eq('+(current_thumb - 1)+')').show();    
            //alert('.pb_thumb_wrapper:nth-child('+current_thumb+')');
            
        };        
    $.fn.PhotoBox = function (options) {
        var _= {me:this};
        options = $.extend({ 
                                interval:   4000,
                                autoplay:   'no',
                                autoloop:   'no',
                                shownav :   'no'
                            }, 
                            options);
        interval = typeof options.interval == 'number'?parseInt(options.interval) : 4000;
        autoplay = options.autoplay.toLowerCase();
        autoloop = options.autoloop.toLowerCase();
        shownav = options.shownav.toLowerCase();
        nmb_thumb_wrappers    = $('#pb_thumbs .pb_thumb_wrapper').length; 
        
        if (autoplay == "yes"){
            _.me.Play();
        }else{
            _.me.next();
            _.me.Pause();
        }
        if (shownav == "always")
        {
            showControls();
        }
        slideshowMouseEvent();
        function slideshowMouseEvent(){
            _.me.unbind('mouseenter')
                               .bind('mouseenter',showControls)
                               .andSelf()
                               .unbind('mouseleave')
                               .bind('mouseleave',hideControls);
            }
        $('#pb_grid',_.me).bind('click',function(e){
            if (shownav != "always"){
                hideControls();
            }
            _.me.unbind('mouseenter').unbind('mouseleave');
            _.me.Pause();
            $('#pb_thumbs',_.me).stop().animate({'top':'0px'},500);
            e.preventDefault();
        });
        
        /**
        * closing the thumbs view,
        * shows the controls
        */
        $('#pb_thumb_close', _.me).bind('click',function(e){
            showControls();
            slideshowMouseEvent();
            $('#pb_thumbs',_.me).stop().animate({'top':'-400px'},500);
            e.preventDefault();
        });
        
        /**
        * pause or play icons
        */
        $('#pb_pause_play',_.me).bind('click',function(e){
            var $this = $(this);
            if($this.hasClass('pb_play'))
                _.me.Play();
            else
                _.me.Pause();
            e.preventDefault();    
        });
        
        $('#pb_thumb_next').bind('click',function(e){
            next_thumb();
            e.preventDefault();
        });
        $('#pb_thumb_prev').bind('click',function(e){
            prev_thumb();
            e.preventDefault();
        });
        
        /**
        * click controls next or prev,
        * pauses the slideshow, 
        * and displays the next or prevoius image
        */
        $('#pb_next',_.me).bind('click',function(e){
            _.me.Pause();
            _.me.next();
            e.preventDefault();
        });
        $('#pb_prev').bind('click',function(e){
            _.me.Pause();
            _.me.prev();
            e.preventDefault();
        });
        function showControls(){
            if ((shownav == "yes") || (shownav == "always"))
                $('#pb_controls',_.me).stop().animate({'right':'15px'},500);
        }
        function hideControls(){
            if (shownav != "always"){
                $('#pb_controls',_.me).stop().animate({'right':'-110px'},500);
            }                
        }
        function next_thumb(){
            var $next_wrapper = $('#pb_thumbs').find('.pb_thumb_wrapper:nth-child('+parseInt(current_thumb+1)+')');
            if($next_wrapper.length){
                $('#pb_thumbs').find('.pb_thumb_wrapper:nth-child('+current_thumb+')')
                                .fadeOut(function(){
                                    ++current_thumb;
                                    $next_wrapper.fadeIn();                                    
                                });
            }
        }
        function prev_thumb(){
            var $prev_wrapper = $('#pb_thumbs').find('.pb_thumb_wrapper:nth-child('+parseInt(current_thumb-1)+')');
            if($prev_wrapper.length){
                $('#pb_thumbs').find('.pb_thumb_wrapper:nth-child('+current_thumb+')')
                                .fadeOut(function(){
                                    --current_thumb;
                                    $prev_wrapper.fadeIn();                                    
                                });
            }                
        }
        $('#pb_thumbs .pb_thumb_wrapper > a',_.me).bind('click',function(e){
            var $this         = $(this);
            $('#pb_thumb_close').trigger('click');
            var idx            = $this.index();
            var p_idx        = $this.parent().index();
            current            = parseInt(p_idx*nmb_images_wrapper + idx + 1);
            _.me.showImage();
            e.preventDefault();
        });
        
        /*
        * Hover effect on thumbnails
        */
        $('#pb_thumbs .pb_thumb_wrapper',_.me).children().hover(function() {
            $(this).siblings().stop().fadeTo(500,0.5);
        }, function() {
            $(this).siblings().stop().fadeTo(500,1);
        });
        
    };
})(jQuery);
