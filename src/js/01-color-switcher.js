
const startBtn = document.querySelector('button[data-start]')
const stopBtn = document.querySelector('button[data-stop]')
let timerId = null;

stopBtn.addEventListener("click", () => {

    startBtn.disabled = false;
    stopBtn.disabled = true;

    clearInterval(timerId);
  });

startBtn.addEventListener("click", () => {

    startBtn.disabled = true;
    stopBtn.disabled = false;

  timerId = setInterval(() => {

    document.body.style.background = getRandomHexColor();
    
  }, 1000);
})

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }