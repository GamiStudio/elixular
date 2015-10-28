import Elixular from "./elixular"
import InputElement from "./input-element";

var elixular = new Elixular();

function showResult(result) {
  console.log(result);
}

function reevaluate(expression) {
  elixular.test(expression)
    .then(showResult);
}

var regexInput = new InputElement({
  el: '#regex-input',
  resize: true,
  // we should probably use generators
  onChange: reevaluate
});
var regexFlags = new InputElement({
  el: '#regex-flags',
  onChange: reevaluate
});
