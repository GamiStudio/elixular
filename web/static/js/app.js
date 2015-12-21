import Elixular from "./elixular";
import InputElement from "./input-element";
import ColorMarker from "./color-marker";
import Utils from "./utils";

let elixular = new Elixular();

function showResults(result) {
  resultDisplay.update(regexTest.value, result.matches);
}

function showErrors(result) {
  resultDisplay.clean();
}

let reevaluate = Utils.debounce(function() {
  if (!regexInput.value || !regexTest.value) {
    return resultDisplay.clean();
  }

  elixular.test(regexInput.value, regexFlags.value, regexTest.value)
    .then(showResults)
    .catch(showErrors);
}, 200);

let regexInput = new InputElement({
  el: '#regex-input',
  resize: true,
  onChange: reevaluate
});

let regexFlags = new InputElement({
  el: '#regex-flags',
  wrapBlocks: false,
  onChange: function(value) {
    if (coloredFlags) {
      coloredFlags.update(value);
    }

    reevaluate();
  }
});

let regexTest = new InputElement({
  el: '#regex-test',
  wrapBlocks: false,
  onChange: function(value) {
    if (!value && resultDisplay) {
      resultDisplay.clean();
    }

    reevaluate();
  }
});

let resultDisplay = new ColorMarker({
  el: '#regex-test-wrapper pre'
});

let coloredFlags = new ColorMarker({
  el: '.regex__flags pre',
  kind: 'regex',
  regex: /([^uismxfU])/g,
});
