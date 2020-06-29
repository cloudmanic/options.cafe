;(function(window, document, jQuery, ocApp) {

	window.ocApp = ocApp;

	ocApp.init = function() {
		this.manageBar();
		this.manageNav();
		this.manageForm();
		this.contactUs();
		this.homePageClick();
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
	 * home-page-click
	 *
	 */
  ocApp.homePageClick = function() {
		$('.widget .home-page-click').on('click', function(event) {
  		_paq.push(['trackEvent', 'Ad', 'Click', 'Ad Click Blog Sidebar']);
      window.location = site.baseUrl;
			event.preventDefault();
		});
  };

	/**
	 * Contact us page
	 *
	 */
	ocApp.contactUs = function() {
		$('.contact-us .submit').on('submit', function(event) {
			event.preventDefault();

			var $this = $(this);
			var error = false;
			var email = $this.find("#email").val();
			var subject = $this.find("#subject").val();
			var body = $this.find("#body").val();

			if(email.length <= 0) {
				error = true;
				$this.find("#email").parent().addClass('has-error');
				$this.find("#email").parent().find("p").html("Email address is required.");
			} else {
				$this.find("#email").parent().removeClass('has-error');
				$this.find("#email").parent().find("p").html("");
			}

			if(subject.length <= 0) {
				error = true;
				$this.find("#subject").parent().addClass('has-error');
				$this.find("#subject").parent().find("p").html("Subject is required.");
			} else {
				$this.find("#subject").parent().removeClass('has-error');
				$this.find("#subject").parent().find("p").html("");
			}

			if(body.length <= 0) {
				error = true;
				$this.find("#body").parent().addClass('has-error');
				$this.find("#body").parent().find("p").html("Body is required.");
			} else {
				$this.find("#body").parent().removeClass('has-error');
				$this.find("#body").parent().find("p").html("");
			}

			// If we have error do not continue.
			if(error) {
				return false;
			}

			// Send it to the server
	    $.post({
	        url: '/',
	        dataType: 'json',
	        data: $this.serialize(),
	        success: function(response) {
	          if (response.success) {
							$this.hide();
							$('.help-page .section__title').hide();
							$('.contact-us .success').fadeIn();
	          } else {
							// response.error will be an object containing any validation errors that occurred, indexed by field name
							// e.g. response.error.fromName => ['From Name is required']
							alert('An error occurred. Please try again.');
	          }
	        }
	    });
		});
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
      var entry_type = $this.find('[name="entry_type"]').val();
      var success = $this.find('.subscribe__alert');
      var email = $this.find('[name="email"]').val();
      var hide_on_success = $this.find('.hide-on-success');
      var show_on_success = $this.find('.show-on-success');

      btn.val('Saving...');

      $.ajax({
        type: 'POST',
        url: '/actions/cloudmanic-craft-sendy/subscribe',
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
        	_paq.push(['trackGoal', 1]);
        	_paq.push(['trackEvent', 'Newsletter', 'Subscribe', entry_type]);
        	ga('send', 'event', 'Newsletter', 'Subscribe', entry_type);
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
