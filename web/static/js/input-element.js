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

  return _.every(mappedMods, function(item) {
    return item;
  });
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

    _.extend(_this, options);

    var selector = _this.el;

    if (!selector) return _this;

    _this.$el = $(selector);

    if (_this.$el.length === 0) return _this;

    _this.el = _this.$el.first()[0];

    var inputCall = function(e) {
      if (_this.resize === true) {
        _this._triggerResize();
      }

      if (_this.$el.val() && typeof _this.onChange == 'function') {
        _this.onChange.call(_this, _this.$el.val());
      }
    };

    _this.$el.on('input', inputCall).each(inputCall);
    _this.$el.on('keydown', function(e) {
      _this._keyDownEvent.apply(_this, arguments);
    });

    _this.initialize && _this.initialize();
  }

  get value() {
    return this.$el && this.$el.val();
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
  }

  _keyDownEvent(e) {
    if (this.wrapBlocks) {
      if (e.keyCode === 57 && checkKeyModifiers(e, 'shift')) {
        e.preventDefault();
        this._wrapBlock('(', ')');
      }

      if (e.keyCode === 219 && checkKeyModifiers(e)) {
        e.preventDefault();
        this._wrapBlock('[', ']');
      }
    }
  }
}

export default InputElement;
