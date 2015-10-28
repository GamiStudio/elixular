define(['jquery'], function($) {
    var RegexInput = function(options) {
        options || (options = {});

        var _this = this;

        var input = $((options.inputSelector || '#regex-input'));

        if (input.length) {
            _this.$el = input.first();
            _this.el = _this.$el[0];
        }

        var inputCall = function() {
            _this.send.call(_this);
        };

        _this.$el.on('input', inputCall)
                 .each(inputCall);

        return _this;
    };

    $.extend(RegexInput.prototype, {
        send: function() {
            var _this = this;

            if (!_this.el.value.length) return console.log('No value');

            // send value

            console.log(_this.el.value.length);

            // get response


        },

        resize: function() {
            var element = this.el;
            var empty = false;

            if (!element.value && element.placeholder) {
                empty = true;
                element.value = element.placeholder;
            }

            element.style.width = "0";

            var offset = element.offsetWidth;

            element.scrollLeft = 1e+10;

            var width = Math.max(element.scrollLeft + offset, element.scrollWidth - element.clientWidth);

            element.style.width = width + "px";

            if (empty) {
                element.value = "";
            }
        }
    });

    return RegexInput;
});