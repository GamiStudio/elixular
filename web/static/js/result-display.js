var markAtRange = function(string, index, range) {
  return string.substr(0, index) +
          '<mark>' +
          string.substr(index, range) +
          '</mark>' +
          string.substr(index + range);
}

class ResultsDisplay {
  constructor(options) {
    options || (options = {});

    var _this = this;

    _.extend(_this, options);

    var selector = _this.el;

    if (!selector) return _this;

    _this.$el = $(selector);

    if (_this.$el.length === 0) return _this;

    _this.el = _this.$el.first()[0];

    _this.initialize && _this.initialize();
  }

  update(value, matches) {
    var colorRanges = this._getRanges(matches);
    var markup = value;
    colorRanges.forEach(function(range) {
      markup = markAtRange(markup, range[0], range[1]);
    });

    this.$el.html(markup);
  }

  clean() {
    this.$el.html('');
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

export default ResultsDisplay;
