var isSmall;

$(window).load(function() {
	if($(window).width() <= 580) {
		isSmall = true;
	}
	var collapsingHeader = new CollapsingHeader($('#header'), {
		nav : $('#main-nav'),
		body : $('#main'),
		customElements : [
			{
				selector : '#logo',
				attributes : [
					{
						prop : 'height',
						from : 0,
						to : 100,
						unit : 'px'
					},
					{
						prop : 'yPos',
						from : 0,
						to : 100,
						unit : '%'
					}
				]
			}
		]
	});
});

var CollapsingHeader = function(el, opts) {
	var self = this,
		highPerformance = $.support.transition,
		defaults = {
			scrollInterval : 2,
			customElements : []
		};

	var init = function init() {
		attachEvents();
		//setCustomElements();
	};

	var attachEvents = function attachEvents() {
		$(window).on('scroll', function(ev) {
			move($(window).scrollTop());
		});
		move($(window).scrollTop());
	};

	var getScrollPercent = function getScrollPercent(pagePos) {
		var pos = (pagePos * opts.scrollInterval) / el.height();

		if(pos > 1) {
			pos = 1;
		}

		return pos;
	};

	var move = function move(pagePos) {
		if(getScrollPercent(pagePos) < 1) {
			if(highPerformance) {
				opts.body.css({
					'-webkit-transform' : 'translate3d(0, ' + ('-' + pagePos + 'px') + ', 0)',
					'-moz-transform' : 'translate3d(0, ' + ('-' + pagePos + 'px') + ', 0)',
					'-ms-transform' : 'translate3d(0, ' + ('-' + pagePos + 'px') + ', 0)',
					'-o-transform' : 'translate3d(0, ' + ('-' + pagePos + 'px') + ', 0)',
					'transform' : 'translate3d(0, ' + ('-' + pagePos + 'px') + ', 0)',
					'margin-top' : 0
				});
				opts.nav.css({
					'-webkit-transform' : 'translate3d(0, ' + ('-' + pagePos + 'px') + ', 0)',
					'-moz-transform' : 'translate3d(0, ' + ('-' + pagePos + 'px') + ', 0)',
					'-ms-transform' : 'translate3d(0, ' + ('-' + pagePos + 'px') + ', 0)',
					'-o-transform' : 'translate3d(0, ' + ('-' + pagePos + 'px') + ', 0)',
					'transform' : 'translate3d(0, ' + ('-' + pagePos + 'px') + ', 0)',
					'z-index' : 100,
					position : 'relative',
					top : 'auto'
				});
				$('#logo-bg').addClass('hidden');
				/*
				logo.css({
					'-webkit-transform' : 'translate3d(0, ' + ('-' + ((-logoPadding - pagePos) / 50) + 'px') + ', 0)',
					'-moz-transform' : 'translate3d(0, ' + ('-' + ((-logoPadding - pagePos) / 50) + 'px') + ', 0)',
					'-ms-transform' : 'translate3d(0, ' + ('-' + ((-logoPadding - pagePos) / 50) + 'px') + ', 0)',
					'-o-transform' : 'translate3d(0, ' + ('-' + ((-logoPadding - pagePos) / 50) + 'px') + ', 0)',
					'transform' : 'translate3d(0, ' + ('-' + ((-logoPadding - pagePos) / 50) + 'px') + ', 0)'
				})*/
			} else {

				//TODO...i guess
				opts.body.css('margin-top', '-' + pagePos + 'px');
			}
		} else {
			opts.nav.css({
				'-webkit-transform' : 'translate3d(0, 0, 0)',
				'-moz-transform' : 'translate3d(0, 0, 0)',
				'-ms-transform' : 'translate3d(0, 0, 0)',
				'-o-transform' : 'translate3d(0, 0, 0)',
				'transform' : 'translate3d(0, 0, 0)',
				'z-index' : 100,
				position : 'fixed',
				top : 0
			});

			var max = ((el.height() * 2) - opts.nav.height()) - 1;

			if(pagePos >= max && !isSmall) {
				pagePos = max;
				$(window).scrollTop(max);
			}

			opts.body.css({
				'-webkit-transform' : 'translate3d(0, ' + ('-' + (pagePos + 1) + 'px') + ', 0)',
				'-moz-transform' : 'translate3d(0, ' + ('-' + (pagePos + 1) + 'px') + ', 0)',
				'-ms-transform' : 'translate3d(0, ' + ('-' + (pagePos + 1) + 'px') + ', 0)',
				'-o-transform' : 'translate3d(0, ' + ('-' + (pagePos + 1) + 'px') + ', 0)',
				'transform' : 'translate3d(0, ' + ('-' + (pagePos + 1) + 'px') + ', 0)',
				'margin-top' : opts.nav.outerHeight()
			});
			$('#logo-bg').removeClass('hidden');
		}

		// TODO before fork
		//moveCustomElements(pagePos);
		// ---Shim---
		
		if(getScrollPercent(pagePos) < 1) {
			var headerHeight = el.height() * .45;


			// find aspect
			//console.log($('#logo img').width(), $('#logo img').height())
			var aspect = $('#logo img').width() / $('#logo img').height();
			var imgHeight = (el.height() * .6) / aspect;
			var height = (imgHeight - ((imgHeight * getScrollPercent(pagePos)) - 145));
			if(isSmall) {
				height = (imgHeight - ((imgHeight * getScrollPercent(pagePos)) - 75));
			}
			//var centerPos = ((el.height() / 2) - (height / 2) / el.height()) / 2;
			var centerPos = (el.height() / 2) - (height / 2);

			/*

				height = 60% of el.height()  * aspect

			*/

			$('#logo img').css({
					   //Start   //End
				//height : (45 - (15 * getScrollPercent(pagePos))) + '%',
				//height : (headerHeight - ((headerHeight * getScrollPercent(pagePos)) - 145)) + 'px',
				height : height + 'px',
				width : 'auto',
					   //Zero value targets should end opposite the start number
				//'margin-top' : (10 - (10 * getScrollPercent(pagePos))) + '%',
				'margin-top' : (centerPos - (centerPos * getScrollPercent(pagePos))) + 'px',
				'margin-left' : (0 + (((el.width() / 2) - ((height * aspect) / 2)) * getScrollPercent(pagePos))) + 'px'
			});

			var logoWidth = $('#logo img').width();

			$('#logo').css({
				'-webkit-transform' : 'translate3d(0, ' + (pagePos + 'px') + ', 0)',
				'-moz-transform' : 'translate3d(0, ' + (pagePos + 'px') + ', 0)',
				'-ms-transform' : 'translate3d(0, ' + (pagePos + 'px') + ', 0)',
				'-o-transform' : 'translate3d(0, ' + (pagePos + 'px') + ', 0)',
				'transform' : 'translate3d(0, ' + (pagePos + 'px') + ', 0)',
				//'left' : -($('#logo').width() / 2) + $('#logo img').width(),
				//'left' : (-30 -(-30 * getScrollPercent(pagePos))) + '%',
				position : 'absolute',
				top : 0
			});
			//console.log($('#logo').width(), $('#logo img').width());
		} else {
			if(isSmall) {
				$('#logo img').css({
					height : '75px',
					'margin-top' : 0,
					'margin-left' : 'auto'
				});
			} else {
				$('#logo img').css({
					height : '145px',
					'margin-top' : 0,
					'margin-left' : 'auto'
				});
			}
			

			$('#logo').css({
				'-webkit-transform' : 'translate3d(0, 0, 0)',
				'-moz-transform' : 'translate3d(0, 0, 0)',
				'-ms-transform' : 'translate3d(0, 0, 0)',
				'-o-transform' : 'translate3d(0, 0, 0)',
				'transform' : 'translate3d(0, 0, 0)',
				position : 'fixed',
				top : 0
			})
		}
	};

	/* TODO
	var moveCustomElements = function moveCustomElements(pagePos) {
		if(opts.customElements.length) {
			customElements.forEach(function(element) {
				var cEl = $(element.selector);

				if(getScrollPercent(pagePos) <= 1) {

				} else {

				}
			});
		}
	};*/

	for(var d in defaults) {
		if(typeof opts === 'undefined') {
			opts = defaults;
		} else {
			if(typeof opts[d] === 'undefined') {
				opts[d] = defaults[d];
			}
		}
	}

	init();
}

$.support.transition = (function() {
	var b = document.body || document.documentElement,
		s = b.style,
		support = s.transition !== undefined || s.WebkitTransition !== undefined || s.MozTransition !== undefined || s.MsTransition !== undefined || s.OTransition !== undefined;

	return support;
})();