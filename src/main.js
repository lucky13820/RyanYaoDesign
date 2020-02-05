import "./assets/css/main.css";
import "./assets/css/lightbox.css";
import "./assets/vendor/lightbox.js";
import $ from "jquery";
import Barba from "barba.js";

$(document).ready(function() {
  initilizePlugins();
  // typeit();
  // gaTracker("UA-145302459-1");
  // ga("send", "pageview");

  var winHeight = $(window).height(),
    docHeight = $(document).height(),
    progressBar = $("progress"),
    max,
    value;

  /* Set the max scrollable area */
  max = docHeight - winHeight;
  progressBar.attr("max", max);

  $(document).on("scroll", function() {
    value = $(window).scrollTop();
    progressBar.attr("value", value);
  });

  var themeSwitch = document.getElementById("themeSwitch");
  initTheme();
  themeSwitch.addEventListener("change", resetTheme, function() {});

  function activateDarkMode() {
    $("body")
      .removeClass("bg-white text-black border-black")
      .addClass("bg-black text-gray-300 border-white");
    localStorage.setItem("mode", "dark");
    $("#themeSwitch").prop("checked", true);
  }

  function activateLightMode() {
    $("body")
      .addClass("bg-white text-black border-black")
      .removeClass("bg-black text-gray-300 border-white");
    localStorage.setItem("mode", "light");
    $("#themeSwitch").prop("checked", false);
  }

  function initTheme() {
    var isDarkMode = '';
    var isLightMode = '';
    const isNotSpecified = window.matchMedia(
      "(prefers-color-scheme: no-preference)"
    ).matches;
    const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified;

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addListener(e => e.matches && activateDarkMode());
    window
      .matchMedia("(prefers-color-scheme: light)")
      .addListener(e => e.matches && activateLightMode());

      if (window.matchMedia("(prefers-color-scheme: dark)")
      .matches) {
        isDarkMode = true
      }
      if (window.matchMedia("(prefers-color-scheme: light)")
      .matches) {
        isDarkMode = false
      }
    if (localStorage.getItem("mode") === "dark") {
      isDarkMode = true
    };

    if (localStorage.getItem("mode") === "light") {
      isDarkMode = false
    };

    if (isDarkMode == true) activateDarkMode();
    if (isDarkMode == false) activateLightMode();
  }

  function resetTheme(e) {
    if (e.target.checked) {
      // dark theme has been selected
      activateDarkMode();
    } else {
      activateLightMode();
    }
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
    // gaTracker("UA-145302459-1");
    // ga("send", "pageview");
    $("html, body").animate({ scrollTop: 0 }, 800);
  });

  $('p a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $("html, body").animate(
            {
              scrollTop: target.offset().top
            },
            800,
            function() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) {
                // Checking if the target was focused
                return false;
              } else {
                $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }
            }
          );
        }
      }
    });
});

// function gaTracker(id) {
//     $.getScript("//www.google-analytics.com/analytics.js"); // jQuery shortcut
//     window.ga =
//         window.ga ||
//         function() {
//             (ga.q = ga.q || []).push(arguments);
//         };
//     ga.l = +new Date();
//     ga("create", id, "auto");
//     ga("send", "pageview");
// }

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
