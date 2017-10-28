const form = document.mainForm;
let graph = Viva.Graph.graph();
const container = document.getElementById('displayNetwork');

function handleForm(event) {
  event.preventDefault();
  document.getElementById('displayNetwork').innerHTML = '';
  const words = document.mainForm.userWords.value;
  const rendMode = document.mainForm.renderingMode.value;
  parseConnection(words);
  generateNodeGraphics(rendMode);
  smoothScroll(document.getElementById('userInput'));
}

form.addEventListener('submit', handleForm);

document.getElementById('resetButton').addEventListener('click', (e) => {
  window.location.reload();
  // e.preventDefault();
  // document.getElementById('displayNetwork').innerHTML = '';
  // document.mainForm.userWords.value = '';
  // const rendMode = document.getElementsByName('renderingMode');
  // rendMode.forEach((input) => {
  //   input.checked = false;
  // });
});
