'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  var name = document.getElementById('review-name');
  var text = document.getElementById('review-text');
  var marks = document.getElementsByName('review-mark');
  var marksField = document.querySelector('.review-form-group-mark');
  var nameNotice = document.querySelector('.review-fields-name');
  var textNotice = document.querySelector('.review-fields-text');
  var reviewFields = document.querySelector('.review-fields');
  var submitButton = document.querySelector('.review-submit');
  name.setAttribute('required', 'true');
  submitButton.setAttribute('disabled', 'disabled');
  textNotice.classList.add('invisible');

  var showElement = function(element) {
    element.classList.remove('invisible');
  };
  var hideElement = function(element) {
    element.classList.add('invisible');
  };

  var validateForm = function() {
    var nameValue = document.getElementById('review-name').value;
    var textValue = document.getElementById('review-text').value;
    var markValue;

    // Проверка валидности имени
    if (nameValue === '') {
      showElement(nameNotice);
    } else {
      hideElement(nameNotice);
    }

    // Проверка необходимости оставить отзыв при плохой оценке
    for (var i = 0; i < marks.length; i++) {
      if(marks[i].checked) {
        markValue = marks[i].value;
      }
    }
    if ((markValue < 3) && (textValue === '')) {
      text.setAttribute('required', 'true');
      showElement(textNotice);
    } else {
      text.removeAttribute('required');
      hideElement(textNotice);
    }

    // Подтверждение возможности добавить отзыв
    if (textNotice.classList.contains('invisible') && nameNotice.classList.contains('invisible')) {
      hideElement(reviewFields);
      submitButton.removeAttribute('disabled');
    } else {
      showElement(reviewFields);
      submitButton.setAttribute('disabled', 'disabled');
    }
  };
  name.oninput = function() {
    validateForm();
  };

  marksField.onclick = function() {
    validateForm();
  };

  text.oninput = function() {
    validateForm();
  };
})();
