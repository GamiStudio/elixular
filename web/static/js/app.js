import Elixular from "./elixular";
import InputElement from "./input-element";
import ColorMarker from "./color-marker";
import Utils from "./utils";

var elixular = new Elixular();

var showResults = function(result) {
  resultDisplay.update(regexTest.value, result.matches);
}

var showErrors = function(result) {
  resultDisplay.clean();
}

var reevaluate = Utils.debounce(function() {
  if (!regexInput.value || !regexTest.value) {
    return resultDisplay.clean();
  }

  elixular.test(regexInput.value, regexFlags.value, regexTest.value)
    .then(showResults)
    .catch(showErrors);
}, 200);

var regexInput = new InputElement({
  el: '#regex-input',
  resize: true,
  onChange: reevaluate
});

var regexFlags = new InputElement({
  el: '#regex-flags',
  wrapBlocks: false,
  onChange: reevaluate
});

var regexTest = new InputElement({
  el: '#regex-test',
  wrapBlocks: false,
  onChange: function(value) {
    if (!value && resultDisplay) {
      resultDisplay.clean();
    }

    reevaluate();
  }
});

var resultDisplay = new ColorMarker({
  el: '#regex-test-wrapper pre'
});
