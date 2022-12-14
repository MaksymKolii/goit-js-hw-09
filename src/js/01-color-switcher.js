let timerId = null;
const refs = getRefs();

refs.startBtn.addEventListener('click', onClickStartBtn);
refs.stopBtn.addEventListener('click', onClickStopBtn);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function getRefs() {
  return {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
  };
}

function onClickStartBtn() {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
  setBcgColorOnBody()

  timerId = setInterval(setBcgColorOnBody, 2000);
}

function onClickStopBtn() {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
  clearInterval(timerId);
}

function setBcgColorOnBody() {
  document.body.style.background = getRandomHexColor();
}
