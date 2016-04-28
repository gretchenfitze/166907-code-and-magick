'use strict';

(function() {

  var utilities = require('./utilities');

  var galleryContainer = document.querySelector('.overlay-gallery');
  var controlLeft = document.querySelector('.overlay-gallery-control-left');
  var controlRight = document.querySelector('.overlay-gallery-control-right');
  var closeGallery = document.querySelector('.overlay-gallery-close');
  var previewsContainer = document.querySelector('.overlay-gallery-preview');
  var photogalleryBlock = document.querySelectorAll('.photogallery-image');
  var photogallerySection = document.querySelector('.photogallery');
  var galleryPictures = photogallerySection.getElementsByTagName('img');

  /**
  * @type {Array.<string>} pictures
  */
  var galleryImages = [];
  for (var pic = 0; pic < galleryPictures.length; pic++) {
    galleryImages[pic] = galleryPictures[pic].getAttribute('src');
  }

  /**
  * @param {Array.<string>} pictures
  */
  var getGallery = function(pictures) {
    galleryImages = pictures;
  };

  var hideGalllery = function() {
    utilities.hideElement(galleryContainer);
    closeGallery.removeEventListener('click', _onCloseClick);
    document.removeEventListener('keydown', _onDocumentKeyDown);
  };

  /**
  * @type {number} picture
  */
  var activePictureIndex;

  /**
  * @param {number} picture
  */
  var showActivePicture = function(picture) {
    previewsContainer.innerHTML = '';
    var preview = new Image();
    preview.src = galleryImages[picture];
    previewsContainer.appendChild(preview);
  };

  /**
  * @param {KeyboardEvent} event
  */
  var _onDocumentKeyDown = function(event) {
    if (event.keyCode === 27) {
      hideGalllery();
    }
  };

  var _onCloseClick = function() {
    hideGalllery();
  };

  var _onClickControlLeft = function() {
    activePictureIndex--;
    checkControls();
    showActivePicture(activePictureIndex);
  };

  var _onClickControlRight = function() {
    activePictureIndex++;
    checkControls();
    showActivePicture(activePictureIndex);
  };

  var getActivePicture = function() {
    for (var i = 0; i < photogalleryBlock.length; i++) {
      (function(pict) {
        photogalleryBlock[i].addEventListener('click', function() {
          activePictureIndex = pict;
        });
      })(i);
    }
  };

  var checkControls = function() {
    if (activePictureIndex < 1) {
      utilities.hideElement(controlLeft);
    } else {
      utilities.showElement(controlLeft);
    }

    if (activePictureIndex >= (galleryImages.length - 1)) {
      utilities.hideElement(controlRight);
    } else {
      utilities.showElement(controlRight);
    }
  };

  var showGallery = function() {
    getGallery(galleryImages);
    for (var i = 0; i < photogalleryBlock.length; i++) {
      getActivePicture();
      photogalleryBlock[i].addEventListener('click', function() {
        checkControls();
        showActivePicture(activePictureIndex);
        utilities.showElement(galleryContainer);
      });
    }
    controlLeft.addEventListener('click', _onClickControlLeft);
    controlRight.addEventListener('click', _onClickControlRight);
    document.addEventListener('keydown', _onDocumentKeyDown);
    closeGallery.addEventListener('click', _onCloseClick);
  };

  module.exports = showGallery();
})();
