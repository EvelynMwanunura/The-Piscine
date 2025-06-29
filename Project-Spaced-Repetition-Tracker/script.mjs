// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getOrdinal } from "./common.mjs";
import { addData, getData, clearData } from "./storage.mjs";
import { getSpacedRepetitionDates } from "./dateIntervals.mjs"; // or whatever your file is called

let agendaContainer;
window.onload = function () {
  const users = getUserIds();
  const userDropdown = document.getElementById("dropdown");
  const userForm = document.getElementById("form");
  const topicInput = userForm["topicName"];
  const startingDateInput = userForm["startingDate"];
  startingDateInput.valueAsDate = new Date();
  agendaContainer = document.getElementById("agendas");

  //calling function to populate the user dropdown with available users whe page loads
  populateDropdown(users, userDropdown);

  //eventlistener for when a user is selected/changed
  userDropdown.addEventListener("change", (e) => {
    refreshAgendaDisplay(e.target.value);
  });

  //eventlistener to handle the submit of the form
  userForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const topic = topicInput.value.trim();
    const date = startingDateInput.value;
    const selectedUserId = userDropdown.value;

    const newEntry = {
      userId: selectedUserId,
      topic: topic,
      date: date,
    };

    addData(selectedUserId, [newEntry]);
    //clears input fields after submission
    topicInput.value = "";
    startingDateInput.value = new Date().toISOString().slice(0, 10);

    refreshAgendaDisplay(selectedUserId);
  });
};

// fetches displays data for selected user
function refreshAgendaDisplay(userId) {
  const userData = getData(userId) || [];
  agendaContainer.textContent = "";
  renderAgenda(userData);
  clearFunction();
}

//populates dropdown with users
function populateDropdown(users, userDropdown) {
  if (!userDropdown) return;
  users.forEach((userId) => {
    const option = document.createElement("option");
    option.value = userId;
    option.textContent = `User ${userId}`;
    userDropdown.appendChild(option);
  });
}

function renderAgenda(userData) {
  if (userData.length === 0) {
    agendaContainer.textContent = `No agendas for this user.`;
    return;
  }

  const today = new Date().toISOString().slice(0, 10);

  //collect all dates (main + spaced) in a single array
  let allEntries = [];
  userData.forEach((entry) => {
    const spacedDates = getSpacedRepetitionDates(entry.date);
    spacedDates.forEach((d) => {
      allEntries.push({
        topic: entry.topic,
        date: d,
      });
    });
  });

  //sort all entries by date
  allEntries.sort((a, b) => new Date(a.date) - new Date(b.date));
  //filter out all the old dates
  allEntries = allEntries.filter((entry) => entry.date >= today);

  //render the sorted and filtered list
  let agendaList = document.createElement("div");

  allEntries.forEach((entry) => {
    const listItem = document.createElement("div");

    listItem.innerHTML = `<strong>${entry.topic}</strong> , ${getOrdinal(
      new Date(entry.date)
    )}`;
    agendaList.appendChild(listItem);
  });

  agendaContainer.appendChild(agendaList);
}

const clearFunction = () => {
  if (!agendaContainer) return;

  const userDropdown = document.getElementById("dropdown");
  const selectedUserId = userDropdown.value;
  const userData = getData(selectedUserId) || [];

  if (userData.length === 0) return;

  const clearBtn = document.createElement("button");
  clearBtn.textContent = "Clear Data";
  clearBtn.id = "clearBtn";

  clearBtn.addEventListener("click", () => {
    clearData(selectedUserId);
    refreshAgendaDisplay(selectedUserId);
  });

  agendaContainer.appendChild(clearBtn);
};
