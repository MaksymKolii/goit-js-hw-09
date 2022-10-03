import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

let finalTime = 0;
const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hourss: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
      return;
    }
    refs.startBtn.disabled = false;
    finalTime = selectedDates[0];
  },
};

flatpickr('input#datetime-picker', options);

class Timer {
  constructor({ onTicTac }) {
    this.intervalId = null;
    this.onTicTac = onTicTac;
  }

  start() {
    refs.startBtn.disabled = true;
    refs.input.disabled = true;
    this.intervalId = setInterval(() => {
      const realTime = Date.now();
      const diff = finalTime - realTime;
      const timeComponents = this.convertMs(diff);

      if (diff < 1000) {
        clearInterval(this.intervalId);
      }
      this.onTicTac(timeComponents);
    }, 1000);
  }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    // Remaining seconds
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({
  onTicTac: updateInterfaceTime,
});


function updateInterfaceTime({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hourss.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}


refs.startBtn.addEventListener('click', timer.start.bind(timer));



