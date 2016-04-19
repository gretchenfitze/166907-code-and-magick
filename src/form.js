'use strict';

(function() {
  var utilities = require('./utilities');

  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    utilities.showElement(formContainer);
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    utilities.hideElement(formContainer);
  };

  var name = document.getElementById('review-name');
  var text = document.getElementById('review-text');
  var marks = document.getElementsByName('review-mark');
  var marksField = document.querySelector('.review-form-group-mark');
  var nameNotice = document.querySelector('.review-fields-name');
  var textNotice = document.querySelector('.review-fields-text');
  var reviewFields = document.querySelector('.review-fields');
  var submitButton = document.querySelector('.review-submit');
  name.setAttribute('required', '');
  submitButton.setAttribute('disabled', '');
  utilities.hideElement(textNotice);

  // При загрузке страницы имя пользователя и оценка из cookies ставятся в форму по умолчанию
  var browserCookies = require('browser-cookies');
  name.value = browserCookies.get('name');
  if (browserCookies.get('mark') !== null) {
    var mark = document.getElementById('review-mark-' + browserCookies.get('mark'));
    mark.setAttribute('checked', '');
  }

  // Валидация всей формы
  var validateForm = function() {
    var nameValue = document.getElementById('review-name').value;
    var textValue = document.getElementById('review-text').value;
    var markValue;

    // Проверка валидности имени
    if (nameValue === '') {
      utilities.showElement(nameNotice);
    } else {
      utilities.hideElement(nameNotice);
    }

    // Проверка необходимости оставить отзыв при плохой оценке
    for (var i = 0; i < marks.length; i++) {
      if(marks[i].checked) {
        markValue = marks[i].value;
      }
    }
    if ((markValue < 3) && (textValue === '')) {
      text.setAttribute('required', '');
      utilities.showElement(textNotice);
    } else {
      text.removeAttribute('required');
      utilities.hideElement(textNotice);
    }

    // Расчет количества дней, прошедшего от последнего дня рождения
    // (16 сентября прошлого или текущего года)
    var currentDate = new Date();
    var prevBirthdayYear;
    if ((currentDate.getMonth() < 8) ||
    ((currentDate.getMonth() === 8) && (currentDate.getDate() < 16))) {
      prevBirthdayYear = (currentDate.getFullYear() - 1);
    } else {
      prevBirthdayYear = currentDate.getFullYear();
    }
    var daysToExpire = (currentDate - Date.parse(prevBirthdayYear + '-09-16T00:00:00.001Z')) / 1000 / 60 / 60 / 24;
    // Последние введенные значения имени и оценки сохраняются в cookies
    browserCookies.set('name', name.value, {expires: daysToExpire});
    browserCookies.set('mark', markValue, {expires: daysToExpire});

    // Подтверждение возможности добавить отзыв
    if (textNotice.classList.contains('invisible') && nameNotice.classList.contains('invisible')) {
      utilities.hideElement(reviewFields);
      submitButton.removeAttribute('disabled');
    } else {
      utilities.showElement(reviewFields);
      submitButton.setAttribute('disabled', '');
    }
  };
  validateForm();
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
