class UtilsConstructor {
  dateNow() {
    return Date.now && Date.now() || (new Date().getTime());
  }

  allKeys(obj) {
    if (!(typeof obj === 'function' || typeof obj === 'object' && !!obj)) return [];
    let keys = [];
    for (let key in obj) keys.push(key);
    return keys;
  }

  objExtend(obj, ...ext) {
    let undef;
    const length = ext.length;
    if (length < 1 || obj == null) return obj;

    for (let index = 0; index < length; index++) {
      let source = ext[index];
      let keys = Utils.allKeys(source);
      let l = keys.length;
      for (let i = 0; i < l; i++) {
        let key = keys[i];
        if (!undef || obj[key] === void 0) obj[key] = source[key];
      }
    }
    return obj;
  }

  debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result;

    let later = function() {
      let last = Utils.dateNow() - timestamp;

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
      let callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  }
}

const Utils = new UtilsConstructor();

export default Utils;
