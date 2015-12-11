import Utils from "./utils";

var markAtRange = function(string, index, range) {
  return string.substr(0, index) +
          '<mark>' +
          string.substr(index, range) +
          '</mark>' +
          string.substr(index + range);
}

class ColorMarker {
  constructor(options) {
    options || (options = {});

    var _this = this;

    _this.kind = 'range';

    Utils.objExtend(_this, options);

    var selector = _this.el;

    if (!selector) return _this;

    _this.el = document.querySelector(selector);

    if (!_this.el) return _this;

    _this.initialize && _this.initialize();
  }

  _updateRanges(value, matches) {
    var markup = value;
    var colorRanges = this._getRanges(matches);
    colorRanges.forEach(function(range) {
      markup = markAtRange(markup, range[0], range[1]);
    });

    return markup;
  }

  _updateRegex(value) {
    return value.replace(this.regex, '<mark>$1</mark>');
  }

  update(value, matches) {
    var markup;

    if (this.kind === 'range' && matches) {
      markup = this._updateRanges(value, matches);
    } else if (this.kind === 'regex') {
      markup = this._updateRegex(value);
    } else {
      markup = value;
    }

    console.log('updating');
    console.log(markup);

    this.el.innerHTML = markup;
  }

  clean() {
    this.el.innerHTML = '';
  }

  _getRanges(matches) {
    var colorRanges = [];

    matches.reverse().forEach(function(match) {
      var fromIndex = match.range[0];
      var toIndex = match.range[0] + (match.range[1] - 1);
      var lastRangeIndex = (colorRanges.length - 1);

      if (lastRangeIndex >= 0 && colorRanges[lastRangeIndex][0] <= toIndex) {
        colorRanges[lastRangeIndex][0] = fromIndex;
        colorRanges[lastRangeIndex][1] += match.range[1];
        return false;
      }

      colorRanges.push(match.range);
    });

    return colorRanges;
  }

  _colorRanges(value, ranges) {

  }
}

export default ColorMarker;
