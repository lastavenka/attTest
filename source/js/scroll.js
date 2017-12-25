'use strict';

var contentTitles = document.querySelectorAll('.content__item-title');
var nav = document.querySelector('.page-header__nav');
var menu = document.querySelector('.menu');
var headerHeight = document.querySelector('.page-header').offsetHeight;
var footer = document.querySelector('.page-footer');
var headerPadding = 45;
var hamburger = document.querySelector('.hamburger');
var mainNav = document.querySelector('.page-header__nav');
var tabletsPortraitWidth = 900;
var s = !0;

var offset = function(a) {
  for (var b = 0; a; ) (b += parseInt(a.offsetTop)), (a = a.offsetParent);
  return b;
};

window.onload = function() {
  var a = menu,
    b = offset(a),
    f = window.getComputedStyle ? getComputedStyle(a, '') : a.currentStyle,
    d = a.offsetHeight + parseInt(f.marginTop) || 0,
    e = offset(footer);
  window.onscroll = function() {
    var c = window.pageYOffset || document.documentElement.scrollTop,
      c = e - (c + d + b);
    s != 0 < c &&
      ((s = 0 < c)
        ? ((a.style.top = b + 'px'), (a.style.position = 'fixed'))
        : ((a.style.top = e - d + 'px'), (a.style.position = 'absolute')));
  };
};

var scrollToHeader = function(elem) {
  var selectedPosY = 0;

  while (elem != null) {
    selectedPosY += elem.offsetTop;
    elem = elem.offsetParent;
  }

  animateScrollTo(selectedPosY - headerHeight - headerPadding);
};

var onNavClick = function(e) {
  e.preventDefault();

  if (e.target.tagName == 'A') {
    scrollToHeader(
      document.querySelector('#' + e.target.getAttribute('data-nav'))
    );

    if (document.documentElement.offsetWidth < tabletsPortraitWidth) {
      hamburger.classList.toggle('active');
      mainNav.classList.toggle('page-header__nav--close');
    }
  }
};

var onContentScroll = function() {
  [].forEach.call(contentTitles, function(elem) {
    if (
      elem.getBoundingClientRect().top <=
      +headerHeight + +headerPadding * 5
    ) {
      menu
        .querySelector('.menu__link--active')
        .classList.remove('menu__link--active');
      menu
        .querySelector(
          '.menu__link[data-nav="' + elem.getAttribute('id') + '"]'
        )
        .classList.add('menu__link--active');
    }
  });
};

if (document.documentElement.offsetWidth > tabletsPortraitWidth) {
  window.addEventListener('scroll', onContentScroll);
}
nav.addEventListener('click', onNavClick);
menu.addEventListener('click', onNavClick);
