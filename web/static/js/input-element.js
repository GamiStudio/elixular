// TODO: use array to track changes

function InputElement(options) {
  options || (options = {});

  var _this = this;

  _.extend(_this, options);

  var selector = _this.el;

  if (!selector) return _this;

  _this.$el = $(selector);

  if (_this.$el.length === 0) return _this;

  _this.el = _this.$el.first()[0];

  var inputCall = function(e) {
    if (_this.resize === true) {
      _this.triggerResize();
    }

    if (_this.$el.val()) {
      // please use generators!!!
      _this.onChange(_this.$el.val());
    }
  };

  _this.$el.on('input', inputCall).each(inputCall);
  _this.$el.on('keydown', function(e) {
    _this.keyDownEvent.apply(_this, arguments);
  });

  _this.initialize && _this.initialize();
};

_.extend(InputElement.prototype, {
  triggerResize: function() {
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
  },
  wrapBlock: function(startChar, endChar) {
    var insertAt = function(string, char, index) {
      return [string.slice(0, index), char, string.slice(index)].join('');
    };

    var setCaretPosition = function(target, caretPosStart, caretPosEnd) {
      if(target != null) {
        if(target.createTextRange) {
          var range = target.createTextRange();
          range.move('character', caretPosStart);
          range.select();
        }
        else {
          if(target.selectionStart) {
            target.focus();
            target.selectionStart = caretPosStart;
            target.selectionEnd = caretPosEnd || caretPosStart;
          }
          else
            target.focus();
        }
      }
    };

    var target = this.el;

    var selectionStart = target.selectionStart;
    var selectionEnd = target.selectionEnd + 1;
    target.value = insertAt(target.value, startChar, selectionStart);
    target.value = insertAt(target.value, endChar, selectionEnd);
    setCaretPosition(target, selectionStart + 1, selectionEnd);

    if (this.resize === true) {
      this.triggerResize();
    }
  },

  keyDownEvent: function(e) {
    if (e.keyCode === 57) {
      e.preventDefault();
      this.wrapBlock('(', ')');
    }

    if (e.keyCode === 219) {
      e.preventDefault();
      this.wrapBlock('[', ']');
    }
  }
})

export default InputElement;
