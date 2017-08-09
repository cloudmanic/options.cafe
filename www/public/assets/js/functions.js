;(function(window, document, jQuery, ocApp) {

	window.ocApp = ocApp;

	ocApp.init = function() {
		this.manageBar();
		this.manageNav();
		this.manageForm();
		this.initDetectMobileBrowser();
		this.newsletterSubscribe();
	};

	/**
	 * Manage Bar
	 *
	 */
	ocApp.manageBar = function() {
  	
  	if($('.newsletter-header').length)
  	{
      if(typeof(Storage) !== "undefined") 
      {
        if(localStorage.getItem("newsletter") == "yes")
        {
          $('.newsletter-header').hide();
          $('.wrapper').removeClass('wrapper--padding');
        }
      }
    }  	
  	
		$('.bar .bar__close').on('click', function(event) {
			$('.wrapper').removeClass('wrapper--padding');
			$(this).parent().slideUp();

      if(typeof(Storage) !== "undefined") 
      {
        localStorage.setItem("newsletter", "yes");
      }

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

	/**
	 * Newsletter subscribe
	 *
	 */
	ocApp.newsletterSubscribe = function() {

		$('.newsletter-form').on('submit', function(event) {
  		event.preventDefault();
  		
  		$this = $(this);
  		var btn = $this.find('[name="subscribe"]');
      var btn_val = btn.val();
      var success = $this.find('.subscribe__alert');
      var email = $this.find('[name="email"]').val();
      var hide_on_success = $this.find('.hide-on-success');
      var show_on_success = $this.find('.show-on-success');
		
      btn.val('Saving...');
		
      $.ajax({
        type: 'POST',
        url: '/actions/craft-sendy/newsletter/subscribe',
        data: JSON.stringify({ email: email }),
        contentType: "application/json",
        dataType: 'json',        
        success: function(json) { 
          btn.val(btn_val);
          btn.hide();
          success.show();
          
          if(hide_on_success.length)
          {
            hide_on_success.hide();
          }

          if(show_on_success.length)
          {
            show_on_success.show();
          }
          
          if(typeof(Storage) !== "undefined") 
          {
            localStorage.setItem("newsletter", "yes");
          }          
          
          // Log events.
          if(json.status && (! site.devMode))
          {
          	clicky.goal('5193');
          	_paq.push(['trackGoal', 1]);
          }
        }
      });		
		
		});

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
