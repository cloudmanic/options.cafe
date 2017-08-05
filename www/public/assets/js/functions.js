;(function(window, document, jQuery, ocApp) {

	window.ocApp = ocApp;

	ocApp.init = function() {

		this.manageBar();
		this.manageNav();
		this.manageForm();
		this.initDetectMobileBrowser();
	};

	/**
	 * Manage Bar
	 *
	 */
	ocApp.manageBar = function() {
		$('.bar .bar__close').on('click', function(event) {
			$('.wrapper').removeClass('wrapper--padding');
			$(this).parent().slideUp();

			event.preventDefault();
		});
	};

	/**
	 * Manage Nav
	 *
	 */
	ocApp.manageNav = function() {
		$('.btn-menu').on('click', function(event) {
			$(this).toggleClass('active');
			$('.nav').slideToggle();

			event.preventDefault();
		});
	};

	/**
	 * Manage Form
	 *
	 */
	ocApp.manageForm = function() {
		$('.form--broker .form__help').on('click', function(event) {
			$('.tooltip').toggleClass('visible');

			event.preventDefault();
		});
	};

	/**
	 * Set class for touch devices
	 *
	 */
	ocApp.initDetectMobileBrowser = function() {
		$('html').addClass($.browser.mobile ? 'touch' : 'no-touch');
	};

})(window, document, window.jQuery, window.ocApp || {});

;(function(window, document, jQuery, ocApp) {

	/**
	 * Cache $(document) and $(window);
	 *
	 */
	var $win = $(window);
	var $doc = $(document);


	/**
	 * Expose $win and $doc in ocApp
	 *
	 */
	ocApp.$win = $win;
	ocApp.$doc = $doc;

	/**
	 * Fire up ocApp
	 *
	 */
	$doc.ready(function() {
		ocApp.init();
	});

})(window, document, window.jQuery, window.ocApp);
