(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};
		
		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals')
			}, options);
			
			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;
			
			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};
			
			$self.data('countTo', data);
			
			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);
			
			// initialize the element with the starting value
			render(value);
			
			function updateTimer() {
				value += increment;
				loopCount++;
				
				render(value);
				
				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}
				
				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;
					
					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}
			
			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};
	
	$.fn.countTo.defaults = {
		from: 0,               // the number the element should start at
		to: 0,                 // the number the element should end at
		speed: 1000,           // how long it should take to count between the target numbers
		refreshInterval: 100,  // how often the element should be updated
		decimals: 0,           // the number of decimal places to show
		formatter: formatter,  // handler for formatting the value before rendering
		onUpdate: null,        // callback method for every time the element is updated
		onComplete: null       // callback method for when the element finishes updating
	};
	
	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
}(jQuery));

jQuery(function ($) {
  // custom formatting example
  $('.count-number').data('countToOptions', {
	formatter: function (value, options) {
	  return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
	}
  });
  
  // start all the timers
  $('.timer').each(count);  
  
  function count(options) {
	var $this = $(this);
	options = $.extend({}, options || {}, $this.data('countToOptions') || {});
	$this.countTo(options);
  }
});

$(window).scroll(function () { $('nav').toggleClass('scrolled', $(this).scrollTop() > 100); });

$(window).scroll(function () { $('.reo').toggleClass('scrolled', $(this).scrollTop() > 100); });

// $(window).scroll(function () { $('.small-nav').toggleClass('scrolled', $(this).scrollTop() > 100); });


const search=document.querySelector('#searchbar');
const form=document.querySelector('#fullscreenForm')
search.addEventListener("focus", function() {
	 form.classList.toggle('show1');
  });
  
  document.getElementById("fullscreenForm").addEventListener("click", function(event) {
	if (event.target === this || event.target.classList.contains("closeButton")) {
	  this.style.display = "none";
	}
  });

  const container = document.querySelector('.closeButton');
const arrowSymbol = document.querySelector('.symbol.arrow');
const symbol=document.querySelector('.symbol')

container.addEventListener('mouseover', () => {
  arrowSymbol.style.opacity = '1';
  arrowSymbol.style.animation = 'arrow-animation 0.3s forwards';
  symbol.style.opacity='0';
});

container.addEventListener('mouseout', () => {
  arrowSymbol.style.opacity = '0';
  arrowSymbol.style.animation = '';
  symbol.style.opacity= '1';
});
  
// $('.navbar-nav>li>a').on('click', function(){
//     $('.navbar-collapse').collapse('hide');
// });

// Toggle menu when close button is clicked
$('#closeButton').on('click', function(){
	$('.navbar-collapse').removeClass('show');
	$('.navbar-collapse').addClass('slide-out');
	setTimeout(function() {
	  $('.navbar-collapse').removeClass('slide-out');
	}, 300); // Adjust the timing to match the animation duration
  });
  
  // Reset animation and collapse when menu is hidden
  $('.navbar-collapse').on('hidden.bs.collapse', function(){
	if ($(this).hasClass('slide-out')) {
	  $(this).removeClass('slide-out');
	}
  });

//   $('.dropdown').on('show.bs.dropdown', function () {
// 	$(this).find('.dropdown-menu').first().addClass('show');
//   });
  
//   $('.dropdown').on('hide.bs.dropdown', function () {
// 	$(this).find('.dropdown-menu').first().removeClass('show');
//   });
