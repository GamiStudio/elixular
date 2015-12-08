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
    var colorRanges = [];

    matches.reverse().forEach(function(match) {
      var fromIndex = match.index;
      var toIndex = match.index + (match.val.length - 1);
      var lastRange = (colorRanges.length - 1);

      if (lastRange >= 0 && colorRanges[lastRange].from <= toIndex) {
        return colorRanges[0].from = fromIndex;
      }

      colorRanges.push({
        from: match.index,
        to: match.index + (match.val.length - 1)
      });
    });
  }
}

export default ResultsDisplay;