const refs = {
  startBtn: document.querySelector('button[data-action="start"'),
  stopBtn: document.querySelector('button[data-action="stop"'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const INTERVAL_DELAY = 1000;
let intervalId = null;

refs.btnStart.addEventListener('click', changeColor);
refs.btnStop.addEventListener('click', onBtnStop);
function changeColor() {
  intervalId = setInterval(() => {
    refs.body.style.backgroundColor =
      colors[getRandomHexColor(0, colors.length - 1)];
  }, INTERVAL_DELAY);
  refs.btnStart.disabled = true;
}

function onBtnStop() {
  clearInterval(intervalId);
  refs.btnStart.disabled = false;
}
