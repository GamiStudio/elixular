import Elixular from "./elixular";
import InputElement from "./input-element";
import ColorMarker from "./color-marker";

var elixular = new Elixular();

function showResults(result) {
  resultDisplay.update(regexTest.value, result.matches);
}

function showErrors(result) {
  console.log(result);
}

var reevaluate = _.debounce(function reevaluate() {
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
