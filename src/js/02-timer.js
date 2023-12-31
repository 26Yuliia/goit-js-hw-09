// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const startEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');

const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const timerEl = document.querySelector('.timer');
const fieldEl = document.querySelectorAll('.field');
const valueEl = document.querySelectorAll('.value');
const labelEl = document.querySelectorAll('.label');

startEl.setAttribute('disabled', '');

let selectedDate;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.warning('select a date from the future!');
      return;
    }
    startEl.removeAttribute('disabled');
    selectedDate = selectedDates[0].getTime();
  },
};

function addLeadingZero() {
  const difference = selectedDate - new Date().getTime();
  const { days, hours, minutes, seconds } = convertMs(difference);
  daysEl.textContent = String(days).padStart(2, 0);
  hoursEl.textContent = String(hours).padStart(2, 0);
  minutesEl.textContent = String(minutes).padStart(2, 0);
  secondsEl.textContent = String(seconds).padStart(2, 0);
}

startEl.addEventListener(
  'click',
  () => {
    Notiflix.Notify.success('the countdown has begun!');
    const timer = setInterval(() => {
      startEl.setAttribute('disabled', '');
      addLeadingZero();

      if (
        daysEl.textContent === '00' &&
        hoursEl.textContent === '00' &&
        minutesEl.textContent === '00' &&
        secondsEl.textContent === '00'
      ) {
        clearInterval(timer);
        Notiflix.Notify.failure('Your time has flown by!');
      }
    });
  },
  1000
);

flatpickr('#datetime-picker', { ...options });
