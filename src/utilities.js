'use strict';

module.exports = {
  /**
  * @param {Node} element
  */
  hideElement: function(element) {
    element.classList.add('invisible');
  },

  /**
  * @param {Node} element
  */
  showElement: function(element) {
    element.classList.remove('invisible');
  },

  /**
  * @param {Node} element
  * @return {boolean}
  */
  isVisible: function(element) {
    var elementPosition = element.getBoundingClientRect();
    return elementPosition.bottom > 0;
  }
};
