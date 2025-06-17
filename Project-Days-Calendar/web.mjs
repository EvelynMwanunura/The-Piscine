// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getCommemorativeDates } from "./common.mjs";
import { renderCalendar } from "./generate-ical.mjs";

let commemorativeDays = [];

async function loadCommemorativeDays() {
  const response = await fetch("./days.json");
  commemorativeDays = await response.json();
  console.log("Commemorative days loaded:", commemorativeDays);
  load();
}
loadCommemorativeDays();

const yearSelect = document.getElementById("year-select");
const monthSelect = document.getElementById("month-select");

const calendar = document.getElementById("calendar");
const monthDisplay = document.getElementById("monthDisplay");

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function load() {
  const month = parseInt(monthSelect.value);
  const year = parseInt(yearSelect.value);
  if (!commemorativeDays || commemorativeDays.length === 0) {
    console.warn("Commemorative days not loaded yet.");
    return;
  }

  // Get list of special commemorative dates for selected year and month
  const specialDaysList = getCommemorativeDates(year, commemorativeDays);
  const filteredSpecialDays = specialDaysList.filter(
    (day) => day.month === month + 1
  ); // month + 1 because months in  data are 1-based

  console.log(
    "Filtered specialDays passed to renderCalendar:",
    filteredSpecialDays
  );
  calendar.innerHTML = "";
  const table = renderCalendar(year, month, filteredSpecialDays);
  calendar.appendChild(table);

  // Set month display text
  monthDisplay.textContent = `${monthNames[month]} ${year}`;
}

function populateDropdown() {
  monthNames.forEach((name, idx) => {
    const opt = document.createElement("option");
    opt.value = idx;
    opt.textContent = name;
    monthSelect.appendChild(opt);
  });

  for (let y = 1900; y <= 2050; y++) {
    const opt = document.createElement("option");
    opt.value = y;
    opt.textContent = y;
    yearSelect.appendChild(opt);
  }

  const today = new Date();
  monthSelect.value = today.getMonth();
  yearSelect.value = today.getFullYear();
}

populateDropdown();
load();

//Event listeners
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");

prevBtn.addEventListener("click", () => {
  let m = parseInt(monthSelect.value); // Current month
  let y = parseInt(yearSelect.value); // Current year

  m--; // Go to previous month
  if (m < 0) {
    // If going before January
    m = 11;
    y--;
  }

  monthSelect.value = m;
  yearSelect.value = y;

  load();
});

// Next month button logic
nextBtn.addEventListener("click", () => {
  let m = parseInt(monthSelect.value);
  let y = parseInt(yearSelect.value);

  m++; // Go to next month
  if (m > 11) {
    // If going past December
    m = 0;
    y++;
  }

  monthSelect.value = m;
  yearSelect.value = y;

  load();
});
