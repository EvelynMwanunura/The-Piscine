// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getCommemorativeDates } from "./common.mjs";

let commemorativeDays = [];

async function loadCommemorativeDays() {
  const response = await fetch("./days.json");
  commemorativeDays = await response.json();

  load();
}
loadCommemorativeDays();

const yearSelect = document.getElementById("year-select");
const monthSelect = document.getElementById("month-select");

const calendar = document.getElementById("calendar");

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
function renderCalendar(year, month, specialDays) {
  const table = document.createElement("table");
  table.className = "calendar-table";
  const header = table.insertRow();
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  for (const day of daysOfWeek) {
    const th = document.createElement("th");
    th.textContent = day;
    header.appendChild(th);
  }

  const firstDay = new Date(year, month, 1);
  let startingDay = firstDay.getDay();
  startingDay = (startingDay + 6) % 7; // Adjust to make Monday the first day of the week
  const monthLength = new Date(year, month + 1, 0).getDate();

  let row = table.insertRow();
  for (let i = 0; i < startingDay; i++) {
    row.insertCell(); // Empty cell
  }

  for (let day = 1; day <= monthLength; day++) {
    if (row.cells.length % 7 === 0) row = table.insertRow();
    const cell = row.insertCell();
    cell.textContent = day;

    const special = specialDays.find((d) => Number(d.date) === day);

    if (special) {
      cell.classList.add("special-day");
      cell.title = special.name;

      const link = document.createElement("a");
      link.href = special.descriptionURL;
      link.target = "_blank";
      link.textContent = `⭐ ${special.name}`;
      cell.appendChild(document.createElement("br"));
      cell.appendChild(link);
    }
  }

  return table;
}

function load() {
  const month = parseInt(monthSelect.value);
  const year = parseInt(yearSelect.value);
  if (!commemorativeDays || commemorativeDays.length === 0) {
    return;
  }

  // Get list of special commemorative dates for selected year and month
  const specialDaysList = getCommemorativeDates(year, commemorativeDays);
  const filteredSpecialDays = specialDaysList.filter(
    (day) => day.month === month + 1
  ); // month + 1 because months in  data are 1-based

  calendar.innerHTML = "";
  const table = renderCalendar(year, month, filteredSpecialDays);
  calendar.appendChild(table);
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
yearSelect.addEventListener("change", load);
monthSelect.addEventListener("change", load);
populateDropdown();
load();
