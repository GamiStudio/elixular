import Elixular from "./elixular"
import InputElement from "./input-element";

var elixular = new Elixular();

function showResult(result) {
  console.log(result);
}

// $("#regex-input").change(function() {
//   elixular.test(expression)
//     .then(showResult);
// })

var regexInput = new InputElement({
  el: '#regex-input',
  resize: true
});
var regexFlags = new InputElement({
  el: '#regex-flags'
});
