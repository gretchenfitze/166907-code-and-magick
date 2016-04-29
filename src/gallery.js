'use strict';

(function() {
  var utilities = require('./utilities');

  /**
  * @type {Array.<string>} pictures
  */
  var galleryImages = [];

  /**
  * @param {Array.<string>} pictures
  */
  var getGallery = function(pictures) {
    galleryImages = pictures;
    var photogallerySection = document.querySelector('.photogallery');
    var galleryPictures = photogallerySection.getElementsByTagName('img');
    for (var pic = 0; pic < galleryPictures.length; pic++) {
      galleryImages[pic] = galleryPictures[pic].getAttribute('src');
    }
  };

  var showGallery = function() {
    getGallery(galleryImages);
  };

  /**
  * @constructor
  */
  var Gallery = function() {
    var self = this;

    this.getActivePicture = function() {
      for (var i = 0; i < self.photogalleryBlock.length; i++) {
        (function(pict) {
          self.photogalleryBlock[i].addEventListener('click', function() {
            self.activePictureIndex = pict;
          });
        })(i);
      }
    };

    /**
    * @param {number} picture
    */
    this.showActivePicture = function(picture) {
      self.previewsContainer.innerHTML = '';
      var preview = new Image();
      preview.src = galleryImages[picture];
      self.previewsContainer.appendChild(preview);
    };

    /**
    * @param {KeyboardEvent} event
    */
    this._onDocumentKeyDown = function(event) {
      if (event.keyCode === 27) {
        self.hideGalllery();
      }
    };

    this._onCloseClick = function() {
      self.hideGalllery();
    };

    this.checkControls = function() {
      if (self.activePictureIndex < 1) {
        utilities.hideElement(this.controlLeft);
      } else {
        utilities.showElement(this.controlLeft);
      }

      if (self.activePictureIndex >= (galleryImages.length - 1)) {
        utilities.hideElement(this.controlRight);
      } else {
        utilities.showElement(this.controlRight);
      }
    };

    this._onClickControlLeft = function() {
      self.activePictureIndex--;
      self.checkControls();
      self.showActivePicture(self.activePictureIndex);
    };

    this._onClickControlRight = function() {
      self.activePictureIndex++;
      self.checkControls();
      self.showActivePicture(self.activePictureIndex);
    };

    this.controlLeft.addEventListener('click', self._onClickControlLeft);
    this.controlRight.addEventListener('click', self._onClickControlRight);

    this.hideGalllery = function() {
      utilities.hideElement(self.galleryContainer);
      self.closeGallery.removeEventListener('click', self._onCloseClick);
      document.removeEventListener('keydown', self._onDocumentKeyDown);
    };

    for (var i = 0; i < this.photogalleryBlock.length; i++) {
      this.getActivePicture();
      this.photogalleryBlock[i].addEventListener('click', function() {
        document.addEventListener('keydown', self._onDocumentKeyDown);
        self.closeGallery.addEventListener('click', self._onCloseClick);
        self.checkControls();
        self.showActivePicture(self.activePictureIndex);
        utilities.showElement(self.galleryContainer);
      });
    }
  };

  Gallery.prototype = {
    galleryContainer: document.querySelector('.overlay-gallery'),
    controlLeft: document.querySelector('.overlay-gallery-control-left'),
    controlRight: document.querySelector('.overlay-gallery-control-right'),
    closeGallery: document.querySelector('.overlay-gallery-close'),
    previewsContainer: document.querySelector('.overlay-gallery-preview'),
    photogalleryBlock: document.querySelectorAll('.photogallery-image')
  };

  module.exports = new Gallery();
  module.exports = showGallery();
})();
