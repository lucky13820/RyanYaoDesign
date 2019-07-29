import "./main.css";
import TypeIt from "typeit";
import $ from "jQuery";

$(document).ready(function() {
  new TypeIt("#typeText", {
    speed: 55,
    loop: true,
    waitUntilVisible: true,
    deleteSpeed: 35,
    cursor: false,
  })
    .type("<span class='colorText'>I design for digital screens.</span>")
    .pause(5000)
    .delete()
    .type("<span class='colorText'>I ride fixie.</span>")
    .pause(5000)
    .delete()
    .type("<span class='colorText'>I live in Vancouver.</span>")
    .pause(5000)
    .go()


const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
    if (e.target.checked) {
        $("body").addClass("bg-black text-white");
    }
    else {
        $("body").removeClass("bg-black text-white");
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);
});


