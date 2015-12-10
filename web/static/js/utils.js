var Utils = {};

// Some underscore based functions

Utils.dateNow = Date.now || function() {
  return new Date().getTime();
};

Utils.allKeys = function(obj) {
  if (!(typeof obj === 'function' || typeof obj === 'object' && !!obj)) return [];
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
};

Utils.objExtend = function(obj, ...ext) {
  var undef;
  var length = ext.length;
  if (length < 1 || obj == null) return obj;


  for (var index = 0; index < length; index++) {
    var source = ext[index],
      keys = Utils.allKeys(source),
      l = keys.length;
    for (var i = 0; i < l; i++) {
      var key = keys[i];
      if (!undef || obj[key] === void 0) obj[key] = source[key];
    }
  }
  return obj;
}

Utils.debounce = function(func, wait, immediate) {
  var timeout, args, context, timestamp, result;

  var later = function() {
    var last = Utils.dateNow() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function() {
    context = this;
    args = arguments;
    timestamp = Utils.dateNow();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};

export default Utils;
