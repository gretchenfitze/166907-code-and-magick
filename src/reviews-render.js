'use strict';

(function() {
  var templateElement = document.getElementById('review-template');
  var elementToClone;

  if ('content' in templateElement) {
    elementToClone = templateElement.content.querySelector('.review');
  } else {
    elementToClone = templateElement.querySelector('.review');
  }

  /** @constant {number} */
  var IMAGE_LOAD_TIMEOUT = 10000;

  module.exports = {
    /**
     * @param {Object} data
     * @param {HTMLElement} container
     * @return {HTMLElement}
     */
    getReviewElement: function(data, container) {
      var element = elementToClone.cloneNode(true);
      var author = data.author;
      element.querySelector('.review-rating').textContent = data.rating;

      // Исправление положения звёздочки рейтинга
      element.querySelector('.review-rating').style.backgroundPositionX = '10px';
      element.querySelector('.review-rating').style.backgroundRepeatX = 'no-repeat';
      element.querySelector('.review-rating').style.width = '40px';

      element.querySelector('.review-text').textContent = data.description;
      container.appendChild(element);

      var authorPicture = new Image();
      var pictureLoadTimeout;

      authorPicture.onload = function() {
        clearTimeout(pictureLoadTimeout);
        element.querySelector('img').setAttribute('src', author.picture);
        element.querySelector('img').setAttribute('width', '124px');
        element.querySelector('img').setAttribute('height', '124px');
      };

      authorPicture.onerror = function() {
        element.classList.add('review-load-failure');
      };

      authorPicture.src = author.picture;

      pictureLoadTimeout = setTimeout(function() {
        authorPicture.src = '';
        element.classList.add('review-load-failure');
      }, IMAGE_LOAD_TIMEOUT);

      return element;
    }
  };
})();
