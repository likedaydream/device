'use strict';

// Write us form
var writeLink = document.querySelector('.js-write-link');
var writeModal = document.querySelector('.modal-write');

if (writeModal) {
  var writeClose = writeModal.querySelector('.modal-close')

  writeLink.addEventListener('click', function(evt) {
    evt.preventDefault();

    writeModal.classList.add('modal-show');
  });

  writeClose.addEventListener('click', function(evt) {
    evt.preventDefault();

    writeModal.classList.remove('modal-show');
  })
}

// Map popup
var mapLink = document.querySelector('.map-link');
var mapModal = document.querySelector('.modal-map');

if (mapModal) {
  var mapClose = mapModal.querySelector('.modal-close')

  mapLink.addEventListener('click', function(evt) {
    evt.preventDefault();

    mapModal.classList.add('modal-show');
  });

  mapClose.addEventListener('click', function(evt) {
    evt.preventDefault();

    mapModal.classList.remove('modal-show');
  })
}

// Enable tabbing for submenu
var dropdownBtns = document.querySelectorAll('.submenu-dropdown-btn');

for (var i = 0; i < dropdownBtns.length; i++) {
  dropdownBtns[i].addEventListener('focus', function (evt) {
    if (this.nextElementSibling) {
      this.nextElementSibling.classList.add('submenu-show');
    }
  });
  dropdownBtns[i].addEventListener('blur', function (evt) {
    if ( !(
      this.nextElementSibling
      && evt.relatedTarget
      && this.nextElementSibling.contains(evt.relatedTarget)
    )) {
      this.nextElementSibling.classList.remove('submenu-show');
    }
  });
}

// Prevent input autocomplete breaking hover state
var dropDownContainers = document.querySelectorAll('.submenu-dropdown');

for (var i = 0; i < dropDownContainers.length; i++) {
  dropDownContainers[i].addEventListener('focus', function (evt) {
    this.classList.add('submenu-show');
  }, {capture: true});

  dropDownContainers[i].addEventListener('blur', function (evt) {
    if ( !(
      evt.relatedTarget
      && this.contains(evt.relatedTarget)
    )) {
      this.classList.remove('submenu-show');
    }
  }, {capture: true});
}

// Slider
var slider = document.querySelector('.slider');
if (slider) {
  var sliderDots = slider.querySelectorAll('.slider-dots .dot-btn');
  var sliderSlides = slider.querySelectorAll('.slide');
  var sliderActiveDot;

  var sliderActiveIndex = function () {
    var defaultIndex = false;
    var activeIndex;

    sliderActiveDot = slider.querySelector('.dot-btn-active');
    if (!sliderActiveDot) { return defaultIndex; }
    activeIndex = sliderActiveDot.getAttribute('data-index');
    if (!activeIndex) { return defaultIndex; }
    return activeIndex;
  };

  var sliderShowSlide = function(index) {
    if (!sliderSlides[index]) { return; }

    // change slide
    var activeSlide = slider.querySelector('.slide-active');
    if (activeSlide) {
      activeSlide.classList.remove('slide-active');
    }
    sliderSlides[index].classList.add('slide-active');

    // change dot btn
    var activeIndex = sliderActiveIndex();
    var newActiveDot;
    if (activeIndex !== false) {
      if (sliderActiveDot) {
        sliderActiveDot.classList.remove('dot-btn-active');
      }
      newActiveDot = slider.querySelector('.dot-btn[data-index="' + index + '"]');
      if (newActiveDot) {
        newActiveDot.classList.add('dot-btn-active');
      }
    }
  };

  for (var i = 0; i < sliderDots.length; i++) {
    (function (i) {
      sliderDots[i].setAttribute('data-index', i);

      sliderDots[i].addEventListener('click', function (evt) {
        evt.preventDefault();
        sliderShowSlide(i);
      });

    } (i));
  }
}

// Service tabs
var serviceTabs = document.querySelector('.service-tabs');

if (serviceTabs) {
  serviceTabs.addEventListener('click', function (evt) {
    evt.preventDefault();

    if (
      evt.target.tagName === 'A'
      && evt.target.hash
      && !evt.target.parentElement.classList.contains('service-tabs-active')
    ) {
      var hash = evt.target.hash;
      var serviceActive = this.parentElement.querySelector('.service-active');

      if (serviceActive) {
        serviceActive.classList.remove('service-active');
      }
      var serviceNew = this.parentElement.querySelector(hash);
      if (serviceNew) {
        serviceNew.classList.add('service-active')
      }

      var oldTab = this.querySelector('.service-tabs-active');
      if (oldTab) {
        oldTab.classList.remove('service-tabs-active');
      }
      evt.target.parentElement.classList.add('service-tabs-active');
    }

  }, { capture:true })
}
