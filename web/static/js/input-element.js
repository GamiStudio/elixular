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

  let mappedMods = modifiers.map(function(mod) {
    return e[mod] || e[mod + 'Key'];
  });

  let every = true;

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

// Calculate new String after wrapping block insertion
function insertAt(string, char, index) {
  return [string.slice(0, index), char, string.slice(index)].join('');
}

class InputElement {
  constructor(options = {}) {
    this.wrapBlocks = true;

    Utils.objExtend(this, options);

    let selector = this.el;

    if (!selector) return this;

    this.el = document.querySelector(selector);

    if (!this.el) return this;

    this._attachEvents();

    this.initialize && this.initialize();
  }

  get value() {
    return this.el && this.el.value;
  }

  _attachEvents() {
    let inputCall = (e) => {
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
    let element = this.el;
    let empty = false;
    let offset;
    let type = element.nodeName.toLowerCase();

    if (!element.value && element.placeholder) {
      empty = true;
      element.value = element.placeholder;
    }

    if (type === 'input') {
      element.style.width = "0";

      offset = element.offsetWidth;

      element.scrollLeft = 1e+10;

      let width = Math.max(element.scrollLeft + offset, element.scrollWidth - element.clientWidth);

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
    let target = this.el;

    const selectionStart = target.selectionStart;
    const selectionEnd = target.selectionEnd + 1;
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
