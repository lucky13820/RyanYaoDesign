import './assets/css/main.css'
import './assets/css/lightbox.css'
import './assets/vendor/lightbox.js'
import $ from 'jquery'
import jQuery from 'jquery'
import Barba from 'barba.js'
import Gumshoe from 'gumshoejs'
import SmoothScroll from 'smooth-scroll'

$(document).ready(function () {
  gaTracker('UA-145302459-1')
  ga('send', 'pageview')
  ga('set', 'anonymizeIp', true)

  $('h1').widowFix()
  $('p').widowFix()

  initProgress()

  function initProgress () {
    var winHeight = $(window).height()
    var docHeight = $(document).height()
    var progressBar = $('progress')
    var max
    var value

    console.log(docHeight)

    /* Set the max scrollable area */
    max = docHeight - winHeight
    progressBar.attr('max', max)

    $(document).on('scroll', function () {
      value = $(window).scrollTop()
      progressBar.attr('value', value)
    })
  }

  var themeSwitch = document.getElementById('themeSwitch')
  initTheme()
  themeSwitch.addEventListener('change', resetTheme, function () {})

  function activateDarkMode () {
    $('body')
      .removeClass('bg-white text-black border-black')
      .addClass('bg-black text-gray-300 border-white')
    localStorage.setItem('mode', 'dark')
    $('#themeSwitch').prop('checked', true)
  }

  function activateLightMode () {
    $('body')
      .addClass('bg-white text-black border-black')
      .removeClass('bg-black text-gray-300 border-white')
    localStorage.setItem('mode', 'light')
    $('#themeSwitch').prop('checked', false)
  }

  function initTheme () {
    var isDarkMode = ''
    var isLightMode = ''
    const isNotSpecified = window.matchMedia(
      '(prefers-color-scheme: no-preference)'
    ).matches
    const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addListener(e => e.matches && activateDarkMode())
    window
      .matchMedia('(prefers-color-scheme: light)')
      .addListener(e => e.matches && activateLightMode())

    if (window.matchMedia('(prefers-color-scheme: dark)')
      .matches) {
      isDarkMode = true
    }
    if (window.matchMedia('(prefers-color-scheme: light)')
      .matches) {
      isDarkMode = false
    }
    if (localStorage.getItem('mode') === 'dark') {
      isDarkMode = true
    };

    if (localStorage.getItem('mode') === 'light') {
      isDarkMode = false
    };

    if (isDarkMode == true) activateDarkMode()
    if (isDarkMode == false) activateLightMode()
  }

  function resetTheme (e) {
    if (e.target.checked) {
      // dark theme has been selected
      activateDarkMode()
    } else {
      activateLightMode()
    }
  }

  // function initilizePlugins() {
  //   $(window).scroll(function() {
  //     if ($(window).scrollTop() + $(window).height() == $(document).height()) {
  //       $("#bottomR, #bottomY").addClass("bottomLetter");
  //     } else {
  //       $("#bottomR, #bottomY").removeClass("bottomLetter");
  //     }
  //   });
  // }

  var transEffect = Barba.BaseTransition.extend({
    start: function () {
      this.newContainerLoading.then(val =>
        this.fadeInNewcontent($(this.newContainer))
      )
    },
    fadeInNewcontent: function (nc) {
      nc.hide()
      var _this = this
      $(this.oldContainer)
        .fadeOut(800)
        .promise()
        .done(() => {
          nc.css('visibility', 'visible')
          nc.fadeIn(800, function () {
            _this.done()
          })
        })
    }
  })

  Barba.Pjax.getTransition = function () {
    return transEffect
  }
  Barba.Pjax.start()

  Barba.Dispatcher.on('initStateChange', function () {
    gaTracker('UA-145302459-1')
    ga('send', 'pageview')
    ga('set', 'anonymizeIp', true)
    $('html, body').animate({ scrollTop: 0 }, 800)
  })

  Barba.Dispatcher.on('transitionCompleted', function () {
    initProgress()
  })

  $('p a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') ==
          this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash)
        target = target.length
          ? target
          : $('[name=' + this.hash.slice(1) + ']')
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault()
          $('html, body').animate(
            {
              scrollTop: target.offset().top
            },
            800,
            function () {
              // Callback after animation
              // Must change focus!
              var $target = $(target)
              $target.focus()
              if ($target.is(':focus')) {
                // Checking if the target was focused
                return false
              } else {
                $target.attr('tabindex', '-1') // Adding tabindex for elements not focusable
                $target.focus() // Set focus again
              }
            }
          )
        }
      }
    })
})

var spy = new Gumshoe('#content-nav a', {
  reflow: true,
  nested: true,
  nestedClass: 'active-parent'
})

var scroll = new SmoothScroll('a[href*="#"]', {
  speed: 500,
  speedAsDuration: true,
  easing: 'easeInCubic',
  offset: 32
})

function collision ($div1, $div2) {
  var x1 = $div1.offset().left
  var y1 = $div1.offset().top
  var h1 = $div1.outerHeight(true)
  var w1 = $div1.outerWidth(true)
  var b1 = y1 + h1
  var r1 = x1 + w1
  var x2 = $div2.offset().left
  var y2 = $div2.offset().top
  var h2 = $div2.outerHeight(true)
  var w2 = $div2.outerWidth(true)
  var b2 = y2 + h2
  var r2 = x2 + w2

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
    $div1.addClass('show')
  } else {
    $div1.removeClass('show')
  }
}

window.setInterval(function () {
  collision($('#content-nav'), $('.image-container'))
}, 100)

function gaTracker (id) {
  $.getScript('//www.google-analytics.com/analytics.js') // jQuery shortcut
  window.ga =
        window.ga ||
        function () {
          (ga.q = ga.q || []).push(arguments)
        }
  ga.l = +new Date()
  ga('create', id, 'auto')
  ga('send', 'pageview')
  ga('set', 'anonymizeIp', true)
}

function makeNewPosition () {
  // Get viewport dimensions (remove the dimension of the div)
  var h = $(window).height() - 80
  var w = $(window).width() - 80

  var nh = Math.floor(Math.random() * h)
  var nw = Math.floor(Math.random() * w)

  return [nh, nw]
}

function animateDiv (myclass) {
  var newq = makeNewPosition()
  $(myclass).animate({ top: newq[0], left: newq[1] }, 20000, function () {
    animateDiv(myclass)
  })
}

(function ($) {
  jQuery.fn.widowFix = function (userOptions) {
    var defaults = {
      letterLimit: null,
      prevLimit: null,
      linkFix: false,
      dashes: false
    }

    var wfOptions = $.extend(defaults, userOptions)

    if (this.length) {
      return this.each(function () {
        var $this = $(this)
        var linkFixLastWord

        if (wfOptions.linkFix) {
          var $linkHolder = $this.find('a:last')
          // find the anchors and wrap them up with a <var> tag to find it later
          $linkHolder.wrap('<var>')
          // store the anchor inside
          var $lastLink = $('var').html()
          // get the real length of the last word
          linkFixLastWord = $linkHolder.contents()[0]
          // remove the anchor
          $linkHolder.contents().unwrap()
        }

        var contentArray = $(this).html().split(' ')
        var lastWord = contentArray.pop()

        if (contentArray.length <= 1) {
          // it's a one word element, abort!
          return
        }

        function checkSpace () {
          if (lastWord === '') {
            // trailing space found, pop it off and check again
            lastWord = contentArray.pop()
            checkSpace()
          }
        }
        checkSpace()

        // if contains a dash, use white-space nowrap to stop breaking
        if (wfOptions.dashes) {
          // all 3 dash types: regular, en, em
          var dashes = ['-', '–', '—']

          $.each(dashes, function (index, dash) {
            if (lastWord.indexOf(dash) > 0) {
              lastWord = '<span style="white-space:nowrap;">' + lastWord + '</span>'
              return false // break out early
            }
          })
        }

        var prevWord = contentArray[contentArray.length - 1]

        // if linkFix is on, check for the letter limit
        if (wfOptions.linkFix) {
          // if the last word is longer than the limit, stop the script
          if (wfOptions.letterLimit !== null &&
						linkFixLastWord.length >= wfOptions.letterLimit
          ) {
            $this.find('var').each(function () {
              $(this).contents().replaceWith($lastLink)
              $(this).contents().unwrap()
            })
            return

            // or if the prev word is longer than the limit
          } else if (wfOptions.prevLimit !== null &&
							   prevWord.length >= wfOptions.prevLimit
							   ) {
            $this.find('var').each(function () {
              $(this).contents().replaceWith($lastLink)
              $(this).contents().unwrap()
            })
            return
          }
        } else {
          // if the last word is longer than the limit, stop the script
          if (wfOptions.letterLimit !== null &&
						lastWord.length >= wfOptions.letterLimit
          ) {
            return
          } else if (wfOptions.prevLimit !== null &&
						prevWord.length >= wfOptions.prevLimit
          ) {
            return
          }
        }

        var content = contentArray.join(' ') + '&nbsp;' + lastWord
        $this.html(content)

        if (wfOptions.linkFix) {
          // find the var and put the anchor back in, then unwrap the <var>
          $this.find('var').each(function () {
            $(this).contents().replaceWith($lastLink)
            $(this).contents().unwrap()
          })
        }
      })
    }
  }
})(jQuery)
