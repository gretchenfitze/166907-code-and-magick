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

  /**
   * @param {Object} data
   * @param {HTMLElement} container
   * @return {HTMLElement}
   */
  var getReviewElement = function(data, container) {
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
  };

  /**
   * @param {Object} data
   * @param {HTMLElement} container
   * @constructor
   */
  var Review = function(data, container) {
    this.data = data;
    this.element = getReviewElement(this.data, container);

    var reviewHelpfulBtn = this.element.querySelector('.review-quiz-answer-yes');
    var reviewUnhelpfulBtn = this.element.querySelector('.review-quiz-answer-no');
    var reviewQuizOnClickYes = function() {
      reviewHelpfulBtn.classList.add('review-quiz-answer-active');
    };
    var reviewQuizOnClickNo = function() {
      reviewUnhelpfulBtn.classList.add('review-quiz-answer-active');
    };

    this.remove = function() {
      reviewHelpfulBtn.removeEventListener('click', reviewQuizOnClickYes);
      reviewUnhelpfulBtn.removeEventListener('click', reviewQuizOnClickNo);
      this.element.parentNode.removeChild(this.element);
    };

    reviewHelpfulBtn.addEventListener('click', reviewQuizOnClickYes);
    reviewUnhelpfulBtn.addEventListener('click', reviewQuizOnClickNo);
    container.appendChild(this.element);
  };

  module.exports = Review;

})();
