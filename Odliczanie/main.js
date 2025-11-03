const settingsBtn = document.querySelector("button.settings");
const saveBtn = document.querySelector("button.save");

const settings = document.querySelector("div.settings");
const header = document.querySelector("header");
const spanEvent = document.querySelector("span.event");
const days = document.querySelector("span.days");
const hours = document.querySelector("span.hours");
const minutes = document.querySelector("span.minutes");
const seconds = document.querySelector("span.seconds");

const inputImg = document.getElementById("img");
const inputName = document.getElementById("name");
const inputDay = document.getElementById("day");
const inputMonth = document.getElementById("month");
const inputYear = document.getElementById("year");
let userTime = new Date("1 1 2026");

const showOptions = () => {
  settings.classList.toggle("active");
};
const calculateDate = () => {
  const localTime = new Date();
  let result = userTime - localTime;
  days.textContent = `${Math.floor(result / 1000 / 60 / 60 / 24)}`;
  hours.textContent = `${Math.floor((result / 1000 / 60 / 60) % 24)}`;
  minutes.textContent = `${Math.floor((result / 1000 / 60) % 60)}`;
  seconds.textContent = `${Math.floor((result / 1000) % 60)}`;
};

const updateApp = (e) => {
  e.preventDefault();
  header.style.backgroundImage = `url(${inputImg.value})`;
  spanEvent.textContent = `${inputName.value}`;
  userTime = new Date(
    `${inputMonth.value} ${inputDay.value} ${inputYear.value}`
  );
  calculateDate();
};

settingsBtn.addEventListener("click", showOptions);
saveBtn.addEventListener("click", updateApp);
calculateDate();
setInterval(calculateDate, 1000);
