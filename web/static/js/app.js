import Elixular from "./elixular";
import InputElement from "./input-element";

var elixular = new Elixular();

function showResults(result) {
  console.log(result);
}

function showErrors(result) {
  console.log(result);
}

var reevaluate = _.debounce(function reevaluate(expression) {
  elixular.test(expression, regexTest.$el.val())
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