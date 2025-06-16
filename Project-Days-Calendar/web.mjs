// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

//import { getGreeting } from "./common.mjs";
//import daysData from "./days.json" with { type: "json" };
let nav = 0;

const yearSelect = document.getElementById("year-select")
const monthSelect = document.getElementById("month-select")

const calender = document.getElementById("calendar");
const monthDisplay = document.getElementById("monthDisplay");

const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
];
const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function load(){
    const today = new Date();

    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    const firstDay = new Date(year, month, 1); // first day of this month
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 0 = last day of prev month

    const dateString = firstDay.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    })

    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]); // if its sunday = 6

    monthDisplay.innerText = `${today.toLocaleDateString("en-GB", {
      month: "long",
    })} ${year}`;


    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const daySquare = document.createElement("div");
      daySquare.classList.add("day");

      if (i > paddingDays) {
        daySquare.innerText = i - paddingDays;

        daySquare.addEventListener("click", () => console.log("click"));
      } else {
        daySquare.classList.add("padding");
      }
      calender.appendChild(daySquare);
    }
}


load();






