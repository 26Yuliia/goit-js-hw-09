function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
btnStop.disabled = true;
let timerId = null;

btnStart.addEventListener('click', onStart);
btnStop.addEventListener('click', onStop);

btnStop.toggleAttribute('disabled');

function onStart() {
  timerId = setInterval(getBgColor, 1000);
}

function onStop() {
  clearInterval(timerId);
}

function getBgColor() {
  bodyEl.style.backgroundColor = getRandomHexColor();
}
