import Elixular from "./elixular";
import InputElement from "./input-element";
import ColorMarker from "./color-marker";
import Utils from "./utils";

var elixular = new Elixular();

var showResults = function(result) {
  console.log('show results');
  resultDisplay.update(regexTest.value, result.matches);
}

var showErrors = function(result) {
  console.log(result);
}

var reevaluate = Utils.debounce(function() {
  if (!regexInput.value || !regexTest.value) {
    return resultDisplay.clean();
  }

  elixular.test(regexInput.value, regexTest.value)
    .then(showResults)
    .catch(showErrors);
}, 300);

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
  onChange: reevaluate
});

var resultDisplay = new ColorMarker({
  el: '#regex-test-wrapper pre'
});
