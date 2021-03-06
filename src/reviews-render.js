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
    var reviewRating = element.querySelector('.review-rating');
    reviewRating.textContent = data.rating;

    // Исправление положения звёздочки рейтинга
    reviewRating.style.backgroundPositionX = '10px';
    reviewRating.style.backgroundRepeatX = 'no-repeat';
    reviewRating.style.width = '40px';

    element.querySelector('.review-text').textContent = data.description;
    container.appendChild(element);

    var authorPicture = new Image();
    var pictureLoadTimeout;

    authorPicture.onload = function() {
      var authorImg = element.querySelector('img');
      clearTimeout(pictureLoadTimeout);
      authorImg.setAttribute('src', author.picture);
      authorImg.setAttribute('width', '124px');
      authorImg.setAttribute('height', '124px');
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

    this.reviewHelpfulBtn = this.element.querySelector('.review-quiz-answer-yes');
    this.reviewUnhelpfulBtn = this.element.querySelector('.review-quiz-answer-no');

    this.reviewQuizOnClickYes = this.reviewQuizOnClickYes.bind(this);
    this.reviewQuizOnClickNo = this.reviewQuizOnClickNo.bind(this);


    this.reviewHelpfulBtn.addEventListener('click', this.reviewQuizOnClickYes);
    this.reviewUnhelpfulBtn.addEventListener('click', this.reviewQuizOnClickNo);
    container.appendChild(this.element);
  };

  Review.prototype.reviewQuizOnClickYes = function() {
    this.reviewHelpfulBtn.classList.add('review-quiz-answer-active');
  };

  Review.prototype.reviewQuizOnClickNo = function() {
    this.reviewUnhelpfulBtn.classList.add('review-quiz-answer-active');
  };

  Review.prototype.remove = function() {
    this.reviewHelpfulBtn.removeEventListener('click', this.reviewQuizOnClickYes);
    this.reviewUnhelpfulBtn.removeEventListener('click', this.reviewQuizOnClickNo);
    this.element.parentNode.removeChild(this.element);
  };

  module.exports = Review;
})();
