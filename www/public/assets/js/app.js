!function(t,e,n,i){(t.ocApp=i).init=function(){this.manageBar(),this.manageNav(),this.manageForm(),this.homePageClick(),this.initDetectMobileBrowser(),this.newsletterSubscribe()},i.manageBar=function(){$(".newsletter-header").length&&"undefined"!=typeof Storage&&"yes"==localStorage.getItem("newsletter")&&($(".newsletter-header").hide(),$(".wrapper").removeClass("wrapper--padding")),$(".bar .bar__close").on("click",function(e){$(".wrapper").removeClass("wrapper--padding"),$(this).parent().slideUp(),"undefined"!=typeof Storage&&localStorage.setItem("newsletter","yes"),e.preventDefault()})},i.manageNav=function(){$(".btn-menu").on("click",function(e){$(this).toggleClass("active"),$(".nav").slideToggle(),e.preventDefault()})},i.manageForm=function(){$(".form--broker .form__help").on("click",function(e){$(".tooltip").toggleClass("visible"),e.preventDefault()})},i.initDetectMobileBrowser=function(){$("html").addClass($.browser.mobile?"touch":"no-touch")},i.homePageClick=function(){$(".widget .home-page-click").on("click",function(e){_paq.push(["trackEvent","Ad","Click","Ad Click Blog Sidebar"]),t.location=site.baseUrl,e.preventDefault()})},i.newsletterSubscribe=function(){$(".newsletter-form").on("submit",function(e){e.preventDefault(),$this=$(this);var t=$this.find('[name="subscribe"]'),n=t.val(),i=$this.find('[name="entry_type"]').val(),a=$this.find(".subscribe__alert"),o=$this.find('[name="email"]').val(),s=$this.find(".hide-on-success"),r=$this.find(".show-on-success");t.val("Saving..."),$.ajax({type:"POST",url:"/actions/cloudmanic-craft-sendy/subscribe",data:JSON.stringify({email:o}),contentType:"application/json",dataType:"json",success:function(e){t.val(n),t.hide(),a.show(),s.length&&s.hide(),r.length&&r.show(),"undefined"!=typeof Storage&&localStorage.setItem("newsletter","yes"),e.status&&!site.devMode&&(clicky.goal("5193"),_paq.push(["trackGoal",1]),_paq.push(["trackEvent","Newsletter","Subscribe",i]),ga("send","event","Newsletter","Subscribe",i))}})})}}(window,document,window.jQuery,window.ocApp||{}),function(e,t,n,i){var a=$(e),o=$(t);i.$win=a,(i.$doc=o).ready(function(){i.init()})}(window,document,window.jQuery,window.ocApp);