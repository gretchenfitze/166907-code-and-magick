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

  /**
  * @constructor
  */
  var Gallery = function() {
    getGallery(galleryImages);

    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
    this._onCloseClick = this._onCloseClick.bind(this);
    this._onClickControlLeft = this._onClickControlLeft.bind(this);
    this._onClickControlRight = this._onClickControlRight.bind(this);
    this.galleryActivate = this.galleryActivate.bind(this);
    this.galleryOnClick = this.galleryOnClick.bind(this);
    this.hideGallery = this.hideGallery.bind(this);
    this.getActivePictureOnClick = this.getActivePictureOnClick.bind(this);

    this.changePhotoHash = function(src) {
      history.replaceState(null, null, '#photo/' + src);
    };

    this.getActivePicture = function() {
      for (var i = 0; i < this.photogalleryBlock.length; i++) {
        this.photogalleryBlock[i].addEventListener('click', this.getActivePictureOnClick);
      }
    };

    /**
    * @param {number} picture
    */
    this.showActivePicture = function(picture) {
      this.previewsContainer.innerHTML = '';
      var preview = new Image();
      if (isNaN(picture)) {
        preview.src = picture;
        this.changePhotoHash(picture);
      } else {
        preview.src = galleryImages[picture];
        this.changePhotoHash(galleryImages[picture]);
        this.activePictureIndex = galleryImages.indexOf(this.activePictureUrl);
      }
      this.previewsContainer.appendChild(preview);
    };

    this.checkControls = function() {
      if (this.activePictureIndex < 1) {
        utilities.hideElement(this.controlLeft);
      } else {
        utilities.showElement(this.controlLeft);
      }

      if (this.activePictureIndex >= (galleryImages.length - 1)) {
        utilities.hideElement(this.controlRight);
      } else {
        utilities.showElement(this.controlRight);
      }
    };

    this.controlLeft.addEventListener('click', this._onClickControlLeft);
    this.controlRight.addEventListener('click', this._onClickControlRight);

    for (var i = 0; i < this.photogalleryBlock.length; i++) {
      this.getActivePicture();
      this.photogalleryBlock[i].addEventListener('click', this.galleryOnClick);
    }
    if (location.hash.match(/#photo\/(\S+)/)) {
      this.activePictureUrl = location.hash.match(/#photo\/(\S+)/)[1];
      this.activePictureIndex = galleryImages.indexOf(this.activePictureUrl);
      this.galleryActivate();
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

  /**
  * @param {KeyboardEvent} event
  */
  Gallery.prototype._onDocumentKeyDown = function(event) {
    if (event.keyCode === 27) {
      this.hideGallery();
    }
  };

  Gallery.prototype._onCloseClick = function() {
    this.hideGallery();
  };

  Gallery.prototype._onClickControlLeft = function() {
    this.activePictureIndex--;
    this.checkControls();
    this.changePhotoHash(galleryImages[this.activePictureIndex]);
    this.showActivePicture(galleryImages[this.activePictureIndex]);
  };

  Gallery.prototype._onClickControlRight = function() {
    this.activePictureIndex++;
    this.checkControls();
    this.changePhotoHash(galleryImages[this.activePictureIndex]);
    this.showActivePicture(galleryImages[this.activePictureIndex]);
  };

  /**
  * @param {Event} click
  */
  Gallery.prototype.getActivePictureOnClick = function(evt) {
    this.activePictureUrl = evt.target.getAttribute('src');
    this.activePictureIndex = galleryImages.indexOf(this.activePictureUrl);
  };

  Gallery.prototype.galleryActivate = function() {
    document.addEventListener('keydown', this._onDocumentKeyDown);
    this.closeGallery.addEventListener('click', this._onCloseClick);
    this.checkControls();
    this.showActivePicture(this.activePictureUrl);
    utilities.showElement(this.galleryContainer);
  };

  Gallery.prototype.galleryOnClick = function() {
    this.getActivePicture();
    this.galleryActivate();
    window.addEventListener('hashchange', this.galleryActivate);
  };

  Gallery.prototype.hideGallery = function() {
    utilities.hideElement(this.galleryContainer);
    this.closeGallery.removeEventListener('click', this._onCloseClick);
    document.removeEventListener('keydown', this._onDocumentKeyDown);
    history.replaceState(null, null, '#');
  };

  module.exports = new Gallery();
})();
