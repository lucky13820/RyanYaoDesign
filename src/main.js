import "./main.css";
import TypeIt from "typeit";
import $ from "jquery";

$(document).ready(function() {
  new TypeIt("#typeText", {
    speed: 55,
    loop: true,
    waitUntilVisible: true,
    deleteSpeed: 35,
    cursor: false,
  })
    .type("<span class='colorText-red'>I design for digital screens.</span>")
    .pause(5000)
    .delete()
    .type("<span class='colorText-blue'>I ride fixie.</span>")
    .pause(5000)
    .delete()
    .type("<span class='colorText-green'>I live in Vancouver.</span>")
    .pause(5000)
    .go()


const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        $("body").addClass("bg-white text-black");
        $("body").removeClass("bg-black text-white");
    }
    else {
        $("body").removeClass("bg-white text-black");
        $("body").addClass("bg-black text-white");
    }    
};

$( "span.ti-container" ).mouseover(
  function() {
    if ($("span.ti-container").find(".colorText-red").length > 0){
      $( "#phone-1" ).addClass("phone-1");
      $( "#phone-2" ).addClass("phone-2");
      $( "#phone-3" ).addClass("phone-3");
    }
    if ($("span.ti-container").find(".colorText-green").length > 0){
      $( "#bike-1" ).addClass("bike-1");
      $( "#bike-2" ).addClass("bike-2");
      $( "#bike-3" ).addClass("bike-3");
    }
  }
).mouseout(function() {
  $( "#phone-1" ).removeClass("phone-1");
      $( "#phone-2" ).removeClass("phone-2");
      $( "#phone-3" ).removeClass("phone-3");
      $( "#bike-1" ).removeClass("bike-1");
      $( "#bike-2" ).removeClass("bike-2");
      $( "#bike-3" ).removeClass("bike-3");
});;

toggleSwitch.addEventListener('change', switchTheme, false);
});


