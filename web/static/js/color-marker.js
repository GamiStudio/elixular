import Utils from "./utils";

function markAtRange(string, index, range) {
  const beforeMark = string.substr(0, index);
  const markedText = string.substr(index, range);
  const afterMark = string.substr(index + range);

  return `${beforeMark}<mark>${markedText}</mark>${afterMark}`;
}

class ColorMarker {
  constructor(options = {}) {
    this.kind = 'range';

    Utils.objExtend(this, options);

    let selector = this.el;

    if (!selector) return this;

    this.el = document.querySelector(selector);

    if (!this.el) return this;

    this.initialize && this.initialize();
  }

  _updateRanges(value, matches) {
    let markup = value;
    let colorRanges = this._getRanges(matches);
    colorRanges.forEach(function(range) {
      markup = markAtRange(markup, range[0], range[1]);
    });

    return markup;
  }

  _updateRegex(value) {
    return value.replace(this.regex, '<mark>$1</mark>');
  }

  update(value, matches) {
    let markup;

    if (this.kind === 'range' && matches) {
      markup = this._updateRanges(value, matches);
    } else if (this.kind === 'regex') {
      markup = this._updateRegex(value);
    } else {
      markup = value;
    }

    this.el.innerHTML = markup;
  }

  clean() {
    this.el.innerHTML = '';
  }

  _getRanges(matches) {
    let colorRanges = [];

    matches.reverse().forEach(match => {
      const fromIndex = match.range[0];
      const toIndex = match.range[0] + (match.range[1] - 1);

      let lastRangeIndex = (colorRanges.length - 1);

      if (lastRangeIndex >= 0 && colorRanges[lastRangeIndex][0] <= toIndex) {
        colorRanges[lastRangeIndex][0] = fromIndex;
        colorRanges[lastRangeIndex][1] += match.range[1];
        return false;
      }

      colorRanges.push(match.range);
    });

    return colorRanges;
  }
}

export default ColorMarker;
