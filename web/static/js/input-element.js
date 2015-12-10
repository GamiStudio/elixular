import Utils from "./utils";

// TODO: use array to track changes

function checkKeyModifiers(e, ...modifiers) {
  // altKey
  // ctrlKey
  // metaKey
  // shiftKey

  if (modifiers.length === 0) {
    return !(e.altKey || e.ctrlKey || e.metaKey || e.shiftKey);
  }

  var mappedMods = modifiers.map(function(mod) {
    return e[mod] || e[mod + 'Key'];
  });

  var every = true;

  mappedMods.forEach(function(mod) {
    if (!mod) every = false;
  });

  return every;
}

function setCaretPosition(target, caretPosStart, caretPosEnd) {
  if(target !== null) {
    if(target.createTextRange) {
      let range = target.createTextRange();
      range.move('character', caretPosStart);
      range.select();
    }
    else {
      target.focus();

      if(target.selectionStart) {
        target.selectionStart = caretPosStart;
        target.selectionEnd = caretPosEnd || caretPosStart;
      }
    }
  }
}

class InputElement {
  constructor(options) {
    options || (options = {});

    var _this = this;
    _this.wrapBlocks = true;

    Utils.objExtend(_this, options);

    var selector = _this.el;

    if (!selector) return _this;

    _this.el = document.querySelectorAll(selector)[0];

    if (!_this.el) return _this;

    _this._attachEvents();

    _this.initialize && _this.initialize();
  }

  get value() {
    return this.el && this.el.value;
  }

  _attachEvents() {
    var inputCall = (e) => {
      if (this.resize === true) {
        this._triggerResize();
      }

      if (typeof this.onChange == 'function') {
        this.onChange.call(this, this.value);
      }
    };

    this.el.addEventListener('input', inputCall);
    this.el.addEventListener('keydown', (e) => {
      this._keyDownEvent(e) && inputCall();
    });

    inputCall();
  }

  _triggerResize() {
    var element = this.el;
    var empty = false;
    var offset;
    var type = element.nodeName.toLowerCase();

    if (!element.value && element.placeholder) {
      empty = true;
      element.value = element.placeholder;
    }

    if (type === 'input') {
      element.style.width = "0";

      offset = element.offsetWidth;

      element.scrollLeft = 1e+10;

      var width = Math.max(element.scrollLeft + offset, element.scrollWidth - element.clientWidth);

      element.style.width = width + "px";
    }

    if (type === 'textarea') {
      element.style.height = element.scrollHeight + "px";
    }

    if (empty) {
      element.value = "";
    }
  }
  _wrapBlock(startChar, endChar) {
    var insertAt = function(string, char, index) {
      return [string.slice(0, index), char, string.slice(index)].join('');
    };

    var target = this.el;

    var selectionStart = target.selectionStart;
    var selectionEnd = target.selectionEnd + 1;
    target.value = insertAt(target.value, startChar, selectionStart);
    target.value = insertAt(target.value, endChar, selectionEnd);
    setCaretPosition(target, selectionStart + 1, selectionEnd);

    if (this.resize === true) {
      this._triggerResize();
    }

    return true;
  }

  _keyDownEvent(e) {
    if (this.wrapBlocks) {
      if (e.keyCode === 57 && checkKeyModifiers(e, 'shift')) {
        e.preventDefault();
        return this._wrapBlock('(', ')');
      }

      if (e.keyCode === 219 && checkKeyModifiers(e)) {
        e.preventDefault();
        return this._wrapBlock('[', ']');
      }
    }
  }
}

export default InputElement;
