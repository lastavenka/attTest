'use strict';

var hotelsTitle = document.querySelector('#hotels');
var sanatoriumsTitle = document.querySelector('#sanatoriums');
var recreationСentersTitle = document.querySelector('#recreationСenters');
var nav = document.querySelector('.page-header__nav');
var menu = document.querySelector('.menu__list');
var headerHeight = getComputedStyle(document.querySelector('.page-header')).height.slice(0, -2);
var headerPadding = 45;
var hamburger = document.querySelector(".hamburger");
var mainNav = document.querySelector(".page-header__nav");

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
    var elem = eval(e.target.getAttribute('data-nav') + "Title");
    scrollToHeader(elem);
    hamburger.classList.toggle("active");
    mainNav.classList.toggle("page-header__nav--close");
  }
};

nav.addEventListener('click', onNavClick);
menu.addEventListener('click', onNavClick);