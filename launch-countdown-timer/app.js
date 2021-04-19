const daysEl = document.querySelectorAll(".days");
const hoursEl = document.querySelectorAll(".hours");
const minutesEl = document.querySelectorAll(".minutes");
const secondsEl = document.querySelectorAll(".seconds");

let countdown = 1000 * 60 * 60 * 24 * 14;
let days = 13;
let hours = 23;
let minutes = 59;
let seconds = 59;
let counterCall = 0;

const updatedCounter = () => {
  daysEl.forEach((el) => {
    el.textContent = `0${days}`.slice(-2);
  });
  hoursEl.forEach((el) => {
    el.textContent = `0${hours}`.slice(-2);
  });
  minutesEl.forEach((el) => {
    el.textContent = `0${minutes}`.slice(-2);
  });
  secondsEl.forEach((el) => {
    el.textContent = `0${seconds}`.slice(-2);
  });
};

const counter = setInterval(() => {
  countdown -= 1000;
  counterCall++;
  seconds--;

  if (seconds === -1) {
    seconds = 59;
  }
  if (counterCall % 60 === 0) {
    minutes--;
  }
  if (minutes === -1) {
    minutes = 59;
  }
  if (counterCall % 3600 === 0) {
    hours--;
  }
  if (hours === -1) {
    hours = 23;
  }
  if (counterCall % 86400 === 0) {
    days--;
  }
  if (countdown === 0) {
    clearInterval(counter);
  }
  updatedCounter();
}, 1000);
