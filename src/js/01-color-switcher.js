
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let intervalId = null;

btnStart.addEventListener('click', onStartButton);
btnStop.addEventListener('click', onStopButton);



function onStartButton() {
  btnStart.disabled = true;
  intervalId = setInterval(randomColofFromBody, 1000);
  return intervalId;
};

function onStopButton() { 
  clearInterval(intervalId);
  btnStart.disabled = false;
  document.body.style.backgroundColor = 'white'; //при остановке делает белый цвет фона
};


////////Для генерации случайного цвета

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

////////Присваивает случайный цвет body

function randomColofFromBody() {
  return document.body.style.backgroundColor = getRandomHexColor();
}