import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
};

let finalTime = 0;
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notify.failure('Please choose a date in the future');

      return;
    }
    refs.startBtn.disabled = false;
    finalTime = selectedDates[0];
  },
};

flatpickr('input#datetime-picker', options);

// options.onClose().then((x)=>console.log(x))
class Timer {
  constructor() {
    this.intervalId = null;
    this.input = document.querySelector('#datetime-picker');
    this.days = document.querySelector('span[data-days]');
    this.hours = document.querySelector('span[data-hours]');
    this.minutes = document.querySelector('span[data-minutes]');
    this.seconds = document.querySelector('span[data-seconds]');
  }

  start() {
    refs.startBtn.disabled = true;
    this.input.disabled = true;
    this.intervalId = setInterval(() => {
      const diff = finalTime - Date.now();
      const timeComponents = this.convertMs(diff);

      if (diff < 1000) {
        clearInterval(this.intervalId);
      }
      this.updateInterfaceTime(timeComponents);
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

  updateInterfaceTime({ days, hours, minutes, seconds }) {
    this.days.textContent = `${days}`;
    this.hours.textContent = `${hours}`;
    this.minutes.textContent = `${minutes}`;
    this.seconds.textContent = `${seconds}`;
  }
}

const timer = new Timer();

refs.startBtn.addEventListener('click', timer.start.bind(timer));
