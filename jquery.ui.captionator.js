(function($) {

    $.widget("ui.captionator", {
		options: {
			location: "bottom",
			color: "#fff",
			backgroundColor: 'rgba(0,0,0,.5);',
                        height:'400px',
                        width:'600px',
                        captionHeight:'30px',
                        slideTimeOut:1000
		},
				
		_create: function() {
			
                        var caption;
                        var self = this;
                        var options = self.options;
                        var captionedImages = $('imageCaptionator');
                        $(captionedImages).css('height',options.height);
                        $(captionedImages).css('width',options.width);
                        var captionHeight = options.captionHeight;
                        position = options.location;
                        var slideTimeOut = options.slideTimeOut;

                        for(imageIndex = 0; imageIndex < captionedImages.length; imageIndex++){
                            captionedImage = captionedImages[imageIndex];
                            var img = $('<img>');
                            img.attr('src', $(captionedImage).attr('src'));
                            img.attr('height', parseInt(options.height));
                            img.attr('width', parseInt(options.width));
                            $(captionedImage).append(img);
		            caption = $("<span></span>").text($(captionedImage).attr("alt")).addClass("ui-caption").css({
				backgroundColor: options.backgroundColor,
				color: options.color,
				width: parseInt($(img).css("width")),
                                height: captionHeight,
			    });
                            $(captionedImage).append(caption);
                            if(position == "bottom"){
                                caption.css('top', img.height());
                            } else {
                                slide = -parseInt(caption.css('height'))-parseInt(caption.css('padding'))-parseInt(caption.css('padding'));
                                caption.css('top', slide);
                            }
                        }

		        $('imageCaptionator').mouseenter(function(){
                            var _this = this;
                            caption = $(this).find('span');
                            image = $(this).find('img');
                            var slideValue = self._getMouseEnterValue(caption, image);
                            self._animate(caption, slideValue, slideTimeOut, function() {
                                self._trigger("captionSlideIn", null);
                            });
                        })
                        .mouseout(function() {
                            var slideValue = self._getMouseOutValue(caption, image);
                            self._animate(caption, slideValue, slideTimeOut, function() {
                                self._trigger("captionSlideOut", null);
                            });
                        });

			//self._trigger("added", null, caption);
		},
				
		destroy: function() {			
			this.image.next().remove();
			$(window).unbind("resize");
		},
		
		_setOption: function(option, value) {
			$.Widget.prototype._setOption.apply( this, arguments );
			
			var image = this.element,
				caption = image.next(),
				captionHeight = caption.outerHeight() - parseInt(caption.css("paddingTop")) + parseInt(caption.css("paddingBottom"));
			
			switch (option) {
				case "location":
					(value === "top") ? caption.css("top", image.offset().top) : caption.css("top", image.offset().top + image.height() - captionHeight);
					break;
				case "color":
					image.next().css("color", value);
					break;
				case "backgroundColor":
					image.next().css("backgroundColor", value);
					break;
			}
		},

                _animate: function(caption, slideValue,  slideTimeOut, callback){
                    $(caption).animate({
                        top:slideValue
                    },slideTimeOut, function(){
                        callback();
                    });
                },

                _getMouseEnterValue: function(caption,image){
                    var position =  this.options.location;

                    if(position == 'top'){
                        return 0;
                    } else if(position == 'bottom'){
                        padding = parseInt(caption.css('padding'));
                        captionHeight = parseInt(caption.css('height'));
                        imageHeight = parseInt(image.height());
                        slideValue = imageHeight-captionHeight-padding-padding;
                        return slideValue; 
                    }
                },

                _getMouseOutValue: function(caption,image){
                    var position = this.options.location;

                    if(position == 'top'){
                        slideValue = -parseInt(caption.css('height'))-parseInt(caption.css('padding'))-parseInt(caption.css('padding'));
                        return slideValue;
                    } else if(position == 'bottom'){
                        slideValue = parseInt(image.height());
                        return slideValue;
                    }
                }
	});
})(jQuery);
