require.config({
    baseUrl: 'js',
    paths: {
        modules: 'modules',
        jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min',
        underscore: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min'
    },
    map: {
        '*': { 'jquery': 'jquery-private' },
        'jquery-private': { 'jquery': 'jquery' }
    }
});

define('jquery-private', ['jquery'], function(jq) {
    return jq.noConflict(true);
});

require(['modules/input-element'], function(InputElement) {
    console.log(InputElement);

    var regexInput = new InputElement({
        el: '#regex-input',
        resize: true
    });
    var regexFlags = new InputElement({
        el: '#regex-flags'
    });
});
