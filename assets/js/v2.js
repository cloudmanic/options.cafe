// Kick start alpine
document.addEventListener("alpine:init", () => {
  //
  // Deal with Nav section of the site.
  //
  Alpine.data("nav", () => ({
    mobileNav: false,

    // Toggle the mobile nav menu.
    mobileNavToggle: function () {
      this.mobileNav = !this.mobileNav;
    },
  }));

  //
  // Course landing page.
  //
  Alpine.data("course", () => ({
    email: "",
    signupEmailModal: false,
    promoVideoModal: false,

    // When a user enter's there password to sign
    onSignup: function () {
      axios
        .post("https://faas-sfo3-7872a1dd.doserverless.co/api/v1/web/fn-3ee59ea2-6356-4796-a28f-713ebf8ac572/default/newsletter-subscribe", {
          email: this.email,
        })
        .then(function (response) {
          // Log events.
          plausible("newsletter-signup");
          _paq.push(["trackGoal", 1]);
          _paq.push(["trackEvent", "Newsletter", "Subscribe", "Course"]);
          ga("send", "event", "Newsletter", "Subscribe", "Course");
        })
        .catch(function (error) {
          this.signupEmailModal = false;
          alert("Sorry there was an error. Please try again.");
          console.log(error);
        })
        .finally(function () {
          this.signupEmailModal = false;
          window.location.href = "/options-trading-course/coming-soon";
        });
    },
  }));
});
