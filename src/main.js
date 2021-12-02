import "./assets/css/main.css";
import "./assets/css/lightbox.css";
import "./assets/vendor/lightbox.js";
import $ from "jquery";
import Barba from "barba.js";
import Gumshoe from "gumshoejs";
import SmoothScroll from "smooth-scroll";
import LazyLoad from "vanilla-lazyload";
import "jquery-ui";

var myLazyLoad = new LazyLoad();
$(document).ready(function () {
  // gaTracker('UA-145302459-1')
  // ga('send', 'pageview')
  // ga('set', 'anonymizeIp', true)

  initProgress();
  myLazyLoad.update();

  function initProgress() {
    var winHeight = $(window).height();
    var docHeight = $(document).height();
    var progressBar = $("progress");
    var max;
    var value;

    /* Set the max scrollable area */
    max = docHeight - winHeight;
    progressBar.attr("max", max);

    $(document).on("scroll", function () {
      value = $(window).scrollTop();
      progressBar.attr("value", value);
    });
  }

  var themeSwitch = document.getElementById("themeSwitch");
  initTheme();
  themeSwitch.addEventListener("change", resetTheme, function () {});

  function activateDarkMode() {
    $("body")
      .removeClass("bg-white text-black border-black")
      .addClass("bg-black text-gray-300 border-white");
    localStorage.setItem("mode", "dark");
    $("#themeSwitch").prop("checked", true);
    sa_event("dark-mode");
  }

  function activateLightMode() {
    $("body")
      .addClass("bg-white text-black border-black")
      .removeClass("bg-black text-gray-300 border-white");
    localStorage.setItem("mode", "light");
    $("#themeSwitch").prop("checked", false);
    sa_event("light-mode");
  }

  function initTheme() {
    var isDarkMode = "";
    var isLightMode = "";
    const isNotSpecified = window.matchMedia(
      "(prefers-color-scheme: no-preference)"
    ).matches;
    const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified;

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addListener((e) => e.matches && activateDarkMode());
    window
      .matchMedia("(prefers-color-scheme: light)")
      .addListener((e) => e.matches && activateLightMode());

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      isDarkMode = true;
    }
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      isDarkMode = false;
    }
    if (localStorage.getItem("mode") === "dark") {
      isDarkMode = true;
    }

    if (localStorage.getItem("mode") === "light") {
      isDarkMode = false;
    }

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

  var transEffect = Barba.BaseTransition.extend({
    start: function () {
      this.newContainerLoading.then((val) =>
        this.fadeInNewcontent($(this.newContainer))
      );
    },
    fadeInNewcontent: function (nc) {
      nc.hide();
      var _this = this;
      $(this.oldContainer)
        .fadeOut(800)
        .promise()
        .done(() => {
          nc.css("visibility", "visible");
          nc.fadeIn(800, function () {
            _this.done();
          });
        });
    },
  });

  Barba.Pjax.getTransition = function () {
    return transEffect;
  };
  Barba.Pjax.start();

  Barba.Dispatcher.on("initStateChange", function () {
    // gaTracker('UA-145302459-1')
    // ga('send', 'pageview')
    // ga('set', 'anonymizeIp', true)
    $("html, body").animate({ scrollTop: 0 }, 800);
  });

  Barba.Dispatcher.on("transitionCompleted", function () {
    initProgress();
    myLazyLoad.update();
    cl.responsive();
    spy.setup();
  });

  $('p a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
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
              scrollTop: target.offset().top,
            },
            800,
            function () {
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

var spy = new Gumshoe("#content-nav a", {
  reflow: true,
  nested: true,
  nestedClass: "active-parent",
  offset: 32,
});

var scroll = new SmoothScroll('a[href*="#"]', {
  speed: 500,
  speedAsDuration: true,
  easing: "easeInCubic",
  offset: 32,
});

const copyEmail = document.getElementById("copyEmail");
copyEmail.addEventListener(
  "click",
  function (event) {
    /* Get the text field */
    var copyText = document.getElementById("myEmail").innerText;

    var range = document.createRange();
    range.selectNode(document.getElementById("myEmail"));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges(); // to deselect

    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied: " + copyText;
  },
  false
);

copyEmail.addEventListener(
  "mouseout",
  function (event) {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy email to clipboard";
  },
  false
);
