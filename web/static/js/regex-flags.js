define(['jquery'], function($) {

    var RegexFlags = function(options) {
        options || (options = {});

        var _this = this;

        var input = $((options.inputSelector || '#regex-flags'));

        var inputCall = function() {
            _this.send.call(_this);
        };

        if (input.length) {
            _this.$el = input.first();
            _this.el = _this.$el[0];
            _this.$el.on('input', inputCall)
                     .each(inputCall);
        }

        return _this;
    };

    $.extend(RegexFlags.prototype, {
        send: function() {
            var _this = this;

            _this.$el.attr('size', _this.$el.val().length || 1);

            var flagTester = /[^gim]|([gim])(?:.*)\1+/.exec(_this.el.value);

            if (flagTester && flagTester[1]) {
                return console.log('Duplicated flag');
            } else if(flagTester) {
                return console.log('Unknown flag');
            }

            // send value


            // get response


        }
    });

    return RegexFlags;
});