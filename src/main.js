import "./assets/css/main.css";
import TypeIt from "typeit";
import $ from "jquery";

$(document).ready(function() {
  new TypeIt("#typeText", {
    speed: 55,
    loop: true,
    waitUntilVisible: true,
    deleteSpeed: 35,
    cursor: false,
    lifeLike: true
  })
    .type("<span class='colorText-red'>I design for digital screens.</span>")
    .pause(5000)
    .delete()
    .type("<span class='colorText-blue'>I ride fixie.</span>")
    .pause(5000)
    .delete()
    .type("<span class='colorText-green'>I live in Vancouver.</span>")
    .pause(5000)
    .go();

  const toggleSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
  );

  function switchTheme(e) {
    if (e.target.checked) {
      $("body").addClass("bg-white text-black");
      $("body").removeClass("bg-black text-white");
    } else {
      $("body").removeClass("bg-white text-black");
      $("body").addClass("bg-black text-white");
    }
  }

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

  $(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
      $("#bottomR, #bottomY").addClass("bottomLetter");
    } else {
      $("#bottomR, #bottomY").removeClass("bottomLetter");
    }
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

  $("a").on("click", function (event){
    event.preventDefault()

    const href = $(this).attr("href")

    window.history.pushState('', '', href)

    $.ajax({
      url: href,
      success: function (data){
        $("section.container").fadeOut(600, function() {
          const newPage = $(data).filter("section.container").html()
          $("section.container").html(newPage)
          $("section.container").fadeIn(600)
        })
      }
    })

  })

 $(window).on('popstate', function() {
  location.reload(true);
});



  // (function ($) {
  //   'use strict';

  //   var $body    = $('html, body'),
  //    content  = $('#main').smoothState({
  //         // onStart runs as soon as link has been activated
  //         onStart : {

  //           // Set the duration of our animation
  //           duration: 2500,

  //           // Alterations to the page
  //           render: function () {

  //             // Quickly toggles a class and restarts css animations
  //             content.toggleAnimationClass('is-exiting');
  //             $body.animate({ 'scrollTop': 0 });
  //           }
  //         }
  //       }).data('smoothState'); // makes public methods available
  // })($);

  toggleSwitch.addEventListener("change", switchTheme, false);

});



function makeNewPosition(){
    
  // Get viewport dimensions (remove the dimension of the div)
  var h = $(window).height() - 80;
  var w = $(window).width() - 80;
  
  var nh = Math.floor(Math.random() * h);
  var nw = Math.floor(Math.random() * w);
  
  return [nh,nw];    
  
}

function animateDiv(myclass){
  var newq = makeNewPosition();
  $(myclass).animate({ top: newq[0], left: newq[1] }, 14000,   function(){
    animateDiv(myclass);        
  });
  
};

// $(function() {
//   "use strict";
//   var options = {
//       prefetch: true,
//       cacheLength: 2,
//       onStart: {
//         duration: 250, // Duration of our animation
//         render: function($container) {
//           // Add your CSS animation reversing class
//           $container.addClass("is-exiting");

//           // Restart your animation
//           smoothState.restartCSSAnimations();
//         }
//       }
//     },
//     smoothState = $("#main")
//       .smoothState(options)
//       .data("smoothState");
// });


