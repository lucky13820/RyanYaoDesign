import "./assets/css/main.css";
import TypeIt from "typeit";
import $ from "jquery";
import Barba from "barba.js";

$(document).ready(function() {
  initilizePlugins();
  typeit();
  gaTracker("UA-145302459-1");
  ga("send", "pageview");

  var themeSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
  );

  if(themeSwitch) {

    initTheme();
    themeSwitch.addEventListener('change', function(event){
      resetTheme(); // update color theme
    });

    function initTheme() {
      var darkThemeSelected = (localStorage.getItem('mode') !== null && localStorage.getItem('mode') === 'dark');
      // update checkbox
      themeSwitch.checked = darkThemeSelected;
      // update body data-theme attribute
      darkThemeSelected ? $("body").removeClass("bg-white text-black border-black").addClass("bg-black text-white border-white") : $("body").addClass("bg-white text-black border-black").removeClass("bg-black text-white border-white");
    };
  
    function resetTheme() {
      if(themeSwitch.checked) { // dark theme has been selected
        $("body").removeClass("bg-white text-black border-black").addClass("bg-black text-white border-white");
        localStorage.setItem('mode', 'dark');
      } else {
        $("body").addClass("bg-white text-black border-black").removeClass("bg-black text-white border-white");
        localStorage.setItem('mode', 'light');
      } 
    };
  }
  
  function initilizePlugins() {

    $(window).scroll(function() {
      if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        $("#bottomR, #bottomY").addClass("bottomLetter");
      } else {
        $("#bottomR, #bottomY").removeClass("bottomLetter");
      }
    });
    
  }

  var transEffect = Barba.BaseTransition.extend({
    start: function() {
      this.newContainerLoading.then(val =>
        this.fadeInNewcontent($(this.newContainer))
      );
    },
    fadeInNewcontent: function(nc) {
      nc.hide();
      var _this = this;
      $(this.oldContainer)
        .fadeOut(800)
        .promise()
        .done(() => {
          nc.css("visibility", "visible");
          nc.fadeIn(800, function() {
            _this.done();
          });
        });
    }
  });

  Barba.Pjax.getTransition = function() {
    return transEffect;
  };
  Barba.Pjax.start();

  Barba.Dispatcher.on("transitionCompleted", function() {
    typeit();
  });

  Barba.Dispatcher.on("initStateChange", function() {
    gaTracker("UA-145302459-1");
    ga("send", "pageview");
  });
});

function gaTracker(id) {
  $.getScript("//www.google-analytics.com/analytics.js"); // jQuery shortcut
  window.ga =
    window.ga ||
    function() {
      (ga.q = ga.q || []).push(arguments);
    };
  ga.l = +new Date();
  ga("create", id, "auto");
  ga("send", "pageview");
}

function makeNewPosition() {
  // Get viewport dimensions (remove the dimension of the div)
  var h = $(window).height() - 80;
  var w = $(window).width() - 80;

  var nh = Math.floor(Math.random() * h);
  var nw = Math.floor(Math.random() * w);

  return [nh, nw];
}

function animateDiv(myclass) {
  var newq = makeNewPosition();
  $(myclass).animate({ top: newq[0], left: newq[1] }, 20000, function() {
    animateDiv(myclass);
  });
}

function typeit() {
  new TypeIt("#typeText", {
    speed: 55,
    loop: true,
    waitUntilVisible: true,
    deleteSpeed: 35,
    cursor: false,
    lifeLike: true
  })
    .type("<span class='colorText-red'>I design for digital screens.</span>")
    .pause(8000)
    .delete()
    .type("<span class='colorText-blue'>I ride fixie.</span>")
    .pause(8000)
    .delete()
    .type("<span class='colorText-green'>I live in Vancouver.</span>")
    .pause(8000)
    .go();

  $("span.ti-container")
    .mouseenter(function() {
      if ($("span.ti-container").find(".colorText-red").length > 0) {
        $("#phone-1").addClass("phone-1");
        $("#phone-2").addClass("phone-2");
        $("#phone-3").addClass("phone-3");
      } else {
        $("#phone-1").removeClass("phone-1");
        $("#phone-2").removeClass("phone-2");
        $("#phone-3").removeClass("phone-3");
      }
      if ($("span.ti-container").find(".colorText-blue").length > 0) {
        $("#bike-1").addClass("bike-1");
        $("#bike-2").addClass("bike-2");
        $("#bike-3").addClass("bike-3");
      } else {
        $("#bike-1").removeClass("bike-1");
        $("#bike-2").removeClass("bike-2");
        $("#bike-3").removeClass("bike-3");
      }
      if ($("span.ti-container").find(".colorText-green").length > 0) {
        $("#map-1").addClass("map-1");
        $("#map-2").addClass("map-2");
        $("#map-3").addClass("map-3");
      } else {
        $("#map-1").removeClass("map-1");
        $("#map-2").removeClass("map-2");
        $("#map-3").removeClass("map-3");
      }
    })
    .mouseleave(function() {
      $("#phone-1").removeClass("phone-1");
      $("#phone-2").removeClass("phone-2");
      $("#phone-3").removeClass("phone-3");
      $("#bike-1").removeClass("bike-1");
      $("#bike-2").removeClass("bike-2");
      $("#bike-3").removeClass("bike-3");
      $("#map-1").removeClass("map-1");
      $("#map-2").removeClass("map-2");
      $("#map-3").removeClass("map-3");
    });

  animateDiv("#phone-1");
  animateDiv("#phone-2");
  animateDiv("#phone-3");
  animateDiv("#bike-1");
  animateDiv("#bike-2");
  animateDiv("#bike-3");
  animateDiv("#map-1");
  animateDiv("#map-2");
  animateDiv("#map-3");
}
