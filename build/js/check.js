function getMessage(a, b) {

  if (typeof a == 'boolean') {
    if (a == true) {
    var Message = ('Я попал в ' + b);
    }
    else {
    var Message = ('Я никуда не попал');
    }
  }

  
  else  if (typeof a == 'number') {
    var Message = ('Я прыгнул на ' + (a * 100) + ' сантиметров');
  }


  else if ((Array.isArray(a) == true) && (Array.isArray(b) == false)) {
    var sum = 0;
    for (var i = 0; i < a.length; i++) {
      sum += a[i];
    }
    var Message = ('Я прошёл ' + (sum) + ' шагов');
  }


  else if ((Array.isArray(a) == true) && (Array.isArray(b) == true)) {
    var length = 0;
    for (var i = 0; i < a.length; i++) {
        length += (a[i] * b[i]);
      }
    var Message = ('Я прошёл ' + (length) + ' метров');
  };
  return Message
};
