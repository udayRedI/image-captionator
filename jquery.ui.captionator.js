(function($) {

    $.widget("ui.captionator", {
		options: {
			location: "bottom",
			color: "#fff",
			backgroundColor: "#000"
		},
				
		_create: function() {
			
			var self = this,
				options = self.options,
				element = self.element,
				caption = $("<span></span>").text(element.attr("alt")).addClass("ui-widget ui-caption").css({
					backgroundColor: options.backgroundColor,
					color: options.color,
					width: element.width()
				}).insertAfter(element),
				captionWidth = element.width() - parseInt(caption.css("paddingLeft")) - parseInt(caption.css("paddingRight")),
				captionHeight = caption.outerHeight() - parseInt(caption.css("paddingTop")) + parseInt(caption.css("paddingBottom"));
				
			caption.css({
				width: captionWidth,
				top: (options.location === "top") ? element.offset().top : element.offset().top + element.height() - captionHeight,
				left: element.offset().left,
				display: "none"
			});

		        $(self.element).hover(function(){
                            self._animate(caption, function(){
                            });
                            },function() {
                             self._animate(caption, function(){
                                 self._trigger("mouseout", null);
                             });
                        });

			self._trigger("added", null, caption);
			
			$(window).resize(function(){
				caption.css({
					top: (options.location === "top") ? element.offset().top : element.offset().top + element.height() - captionHeight,
					left: element.offset().left
				});
			});
		},
				
		destroy: function() {			
			this.element.next().remove();
			
			$(window).unbind("resize");
		},
		
		_setOption: function(option, value) {
			$.Widget.prototype._setOption.apply( this, arguments );
			
			var element = this.element,
				caption = element.next(),
				captionHeight = caption.outerHeight() - parseInt(caption.css("paddingTop")) + parseInt(caption.css("paddingBottom"));
			
			switch (option) {
				case "location":
					(value === "top") ? caption.css("top", element.offset().top) : caption.css("top", element.offset().top + element.height() - captionHeight);
					break;
				case "color":
					element.next().css("color", value);
					break;
				case "backgroundColor":
					element.next().css("backgroundColor", value);
					break;
			}
		},

                _animate: function(caption, callback){
                    $(caption).animate({
                        height:'toggle'
                    },function(){
                        callback();
                    });
                }
	});
})(jQuery);
