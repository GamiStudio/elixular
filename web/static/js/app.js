import Elixular from "./elixular";
import InputElement from "./input-element";
import ResultsDisplay from "./result-display";

var elixular = new Elixular();

function showResults(result) {
  resultDisplay.update(regexTest.value, result.matches);
}

function showErrors(result) {
  console.log(result);
}

var reevaluate = _.debounce(function reevaluate() {
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
  onChange: reevaluate
});

var regexTest = new InputElement({
  el: '#regex-test',
  wrapBlocks: false,
  onChange: reevaluate
});

var resultDisplay = new ResultsDisplay({
  el: '#regex-test-wrapper pre'
});
