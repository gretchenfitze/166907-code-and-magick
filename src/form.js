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
  var nameValue = document.getElementById('review-name').value;
  var text = document.getElementById('review-text');
  var textValue = document.getElementById('review-text').value;
  var marks = document.getElementsByName('review-mark');
  var marksField = document.querySelector('.review-form-group-mark');
  var markValue;
  var checkName = document.querySelector('.review-fields-name');
  var checkText = document.querySelector('.review-fields-text');
  var reviewFields = document.querySelector('.review-fields');
  var submitButton = document.querySelector('.review-submit');

  name.setAttribute('required', 'true');
  submitButton.setAttribute('disabled', 'disabled');
// Проверка валидности имени
  name.oninput = function() {
    if (nameValue.lenght === 0) {
      checkName.classList.remove('invisible');
    } else {
      checkName.classList.add('invisible');
    }
  };
// Проверка необходимости оставить отзыв при плохой оценке
  marksField.onclick = function() {
    for(var i = 0; i < marks.length; i++) {
      if(marks[i].checked) {
        markValue = marks[i].value;
      }
    }
    if (markValue > 3) {
      text.removeAttribute('required');
      checkText.classList.add('invisible');
    } else {
      text.setAttribute('required', 'true');
      checkText.classList.remove('invisible');
    }
  };
// Проверка заполнения текста
  text.oninput = function() {
    if ((textValue.lenght === 0) && (text.getAttribute('required') === 'true')) {
      checkText.classList.remove('invisible');
    } else {
      checkText.classList.add('invisible');
    }
  };

  document.oninput = function() {
    if ((checkText.classList.contains('invisible')) && (checkName.classList.contains('invisible'))) {
      reviewFields.classList.add('invisible');
      submitButton.removeAttribute('disabled');
    }
  };
})();
