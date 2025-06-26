// This is a placeholder file to show how you can "mock" fetch requests using
// the nock library.
// You can delete the contents of the file once you have understood how it
// works.

/*export function makeFetchRequest() {
  return fetch("https://example.com/test");
}*/
import { fetchData } from "./api.mjs";
const userInput = document.getElementById("userInput");
const submit = document.getElementById("submit");
const tableElement = document.getElementById("table");
const languageSelect = document.getElementById("languageSelect");

let userData = [];

const renderLeaderBoard = () => {
  tableElement.innerHTML = "";
  const table = document.createElement("table");
  table.className = "leaderBoardTable";

  const header = table.insertRow();
  const rows = ["userName", "Clan", "Score"];
  for (const head of rows) {
    const th = document.createElement("th");
    th.textContent = head;
    header.append(th);
  }
  tableElement.appendChild(table);
  return table;
};

const renderTableRows = (
  table,
  userData,
  selectedLanguage = "",
  highlight = false
) => {
  const score = selectedLanguage
    ? userData.ranks?.languages?.[selectedLanguage]?.score || 0
    : userData.ranks?.overall?.score || 0;

  const row = table.insertRow();
  if (highlight) row.classList.add("highlight");

  const cells = [userData.username, userData.clan || "N/A", score];

  for (const cellData of cells) {
    const td = document.createElement("td");
    td.textContent = cellData;
    row.appendChild(td);
  }
};

submit.addEventListener("click", async (e) => {
  e.preventDefault();

  const usernames = userInput.value
    .split(",")
    .map((user) => user.trim())
    .filter(Boolean);
  const table = renderLeaderBoard();

  const fetchPromise = usernames.map((username) => fetchData(username));
  const results = await Promise.all(fetchPromise);
  const allUserData = results.filter((data) => data);

  //console.log("Raw fetch results:", results);
  //console.log("Filtered user data:", allUserData);

  userData = allUserData;
  allUserData.sort((a, b) => b.ranks?.overall?.score - a.ranks?.overall?.score);

  for (let i = 0; i < allUserData.length; i++) {
    renderTableRows(table, allUserData[i], "", i === 0);
  }

  if (allUserData.length && allUserData[0].ranks?.languages) {
    languageDropdown(allUserData[0].ranks.languages);
  }
  userInput.value = "";
});

const languageDropdown = () => {
  languageSelect.innerHTML = "";
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Overall Score";
  languageSelect.appendChild(defaultOption);

  const languageSet = new Set();
  userData.forEach((user) => {
    const languages = user.ranks?.languages;
    if (languages) {
      Object.keys(languages).forEach((lang) => languageSet.add(lang));
    }
  });

  const sortedLanguages = Array.from(languageSet).sort();

  for (const language of sortedLanguages) {
    const option = document.createElement("option");
    option.textContent = language;
    option.value = language;
    languageSelect.appendChild(option);
  }

  languageSelect.onchange = () => {
    const selectedLanguage = languageSelect.value;
    const table = renderLeaderBoard();
    const sorted = [...userData].sort((a, b) => {
      const scoreA = selectedLanguage
        ? a.ranks?.languages?.[selectedLanguage]?.score || 0
        : a.ranks?.overall?.score || 0;
      const scoreB = selectedLanguage
        ? b.ranks?.languages?.[selectedLanguage]?.score || 0
        : b.ranks?.overall?.score || 0;

      return scoreB - scoreA;
    });

    for (let i = 0; i < sorted.length; i++) {
      renderTableRows(table, sorted[i], selectedLanguage, i === 0);
    }
  };
};

window.onload = () => renderLeaderBoard();
