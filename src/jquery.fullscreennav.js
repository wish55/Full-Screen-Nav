// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

		// Create the defaults once
		var pluginName = "fullScreenNav",
			defaults = {
				baseFontSize: 16, // used to calculate rem’s. http://techtime.getharvest.com/blog/in-defense-of-rem-units
				closeMenuBtnText: "\u00D7", // text for the close button when the menu opens. Defaults to "&time; (x)"
				closeMenuBtnClass: ".close-menu-btn", // class to add to close menu button.
				fontSizeDivisor: 2.25, // "1" would make the font-size fill all available space. I found 2.25 to be visually appealing. The larger the number, the smaller the text will become.
				menuBtn: ".open-menu-btn", // selector that, when clicked, opens the menu. You need to supply this in the html.
				openClass: ".open" // class to add to nav menu when opening
			};

		// The actual plugin constructor
		function Plugin (element, options ) {
				this.element = element;
				// jQuery has an extend method which merges the contents of two or
				// more objects, storing the result in the first object. The first object
				// is generally empty as we don't want to alter the default options for
				// future instances of the plugin
				this.settings = $.extend( {}, defaults, options );
				this._defaults = defaults;
				this._name = pluginName;
				this.init();
		}

		Plugin.prototype = {
				init: function () {
					// access to the DOM element & options via the instance, e.g. this.element or this.settings
					// call them like so: this.yourOtherFunction(this.element, this.settings).

					// document.documentElement.... faster than jQuery equivalent (src: http://jsperf.com/viewport-width-pure-js-vs-jquery/6)
					var self = this,
						wH = document.documentElement.clientHeight,
						links = $(this.element).find("ul a"),
						linkHeight = wH / links.length,
						_closeMenuBtnClass = this.settings.closeMenuBtnClass.split(".")[1], // get the class name from options, without the period
						closeMenuBtn = $("<a>", {
										    "class": _closeMenuBtnClass,
										    "text": this.settings.closeMenuBtnText,
										    "href": "#"
										});

						// Calculate size of nav links
						this.sizeLinks(links, linkHeight, this.settings);

						closeMenuBtn.insertBefore($(this.element).children("ul"));

						// Calculate size of nav links on window resize
						$(window).on("resize.fullScreenNav", function() {
							var _wH = document.documentElement.clientHeight,
								_linkHeight = _wH / links.length;

							self.sizeLinks(links, _linkHeight, self.settings);
						});

						// click on menuBtn, closeMenuBtn, or a link in the menu and fire toggleMenu function
						$(this.settings.menuBtn).add(closeMenuBtn).add(links).on("click", function() {
							self.toggleMenu(this.element, this.settings);
						});
				},

				// pass variables from init function into this function in order to dynamically size
				sizeLinks: function (_links, _linkHeight, _settings) {
					_links.css({
						"height": _linkHeight / _settings.baseFontSize + "rem",
						"line-height": _linkHeight / _settings.baseFontSize + "rem",
						"font-size": (_linkHeight / _settings.fontSizeDivisor) / _settings.baseFontSize + "rem"
					});
				},

				toggleMenu: function() {
					var _openClass = this.settings.openClass.split(".")[1]; // get the class name from options, without the period
					$(this.element).toggleClass(_openClass);
				}
		};

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function ( options ) {
				this.each(function() {
						if ( !$.data( this, "plugin_" + pluginName ) ) {
								$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
						}
				});
				return this;
		};

})( jQuery, window, document );