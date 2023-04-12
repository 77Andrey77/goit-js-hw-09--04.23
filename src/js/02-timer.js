import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const datetimePicker = document.querySelector("#datetime-picker");
const btnStart = document.querySelector('[data-start]');
let enteredTime = null;
const spanDays = document.querySelector('[data-days]');
const spanHours = document.querySelector('[data-hours]');
const spanMinutes = document.querySelector('[data-minutes]');
const spanSeconds = document.querySelector('[data-seconds]');


btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    

    if (selectedDates[0] < options.defaultDate) {
      window.alert("Please choose a date in the future")
    }
    else {
      console.log(selectedDates[0]);
      btnStart.disabled = false;
      enteredTime = selectedDates[0];
    }
    
  },
};

flatpickr(datetimePicker, options);

btnStart.addEventListener('click', onClickStartTimer);


function onClickStartTimer () {
btnStart.disabled = true;

  const intervalId = setInterval(() => {

    const currentTime = Date.now();
    const deltaTime = enteredTime - currentTime;

    if (deltaTime > 0) {

      const timeComponents = convertMs(deltaTime);
      // console.log(timeComponents);
      spanDays.textContent = timeComponents.days;
      spanHours.textContent = timeComponents.hours;
      spanMinutes.textContent = timeComponents.minutes;
      spanSeconds.textContent = timeComponents.seconds;
    } else {
      clearInterval(intervalId);
     }
   
  }, 1000);

  
};



function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

