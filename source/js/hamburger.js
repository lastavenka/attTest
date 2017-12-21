"use strict";

(function () {
  var hamburger = document.querySelector(".hamburger");
  var mainNav = document.querySelector(".page-header__nav");

  hamburger.addEventListener("click", function (event) {
    event.preventDefault();
    mainNav.classList.toggle("page-header__nav--close");
    hamburger.classList.toggle("active");
  });
})();

