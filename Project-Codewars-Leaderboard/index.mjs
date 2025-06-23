// This is a placeholder file to show how you can "mock" fetch requests using
// the nock library.
// You can delete the contents of the file once you have understood how it
// works.

/*export function makeFetchRequest() {
  return fetch("https://example.com/test");
}*/

const userInput = document.getElementById("userInput");
const submit = document.getElementById("submit");
const tableElement = document.getElementById("table");
const languageSelect = document.getElementById("languageSelect");


let userData = []

const renderLeaderBoard = () => {
  tableElement.innerHTML = "";
  const table = document.createElement("table");
  table.className = "leaderBoardTable";


  const header = table.insertRow();
  const rows = ["userName", "Clan", "Score"];
  for(const head of rows){
    const th = document.createElement("th");
    th.textContent = head;
    header.append(th)
  }
  tableElement.appendChild(table);
  return table;
}



const fetchData = async (username) => {
  try{const response = await fetch(`https://www.codewars.com/api/v1/users/${username}`)
  const data = await response.json()
  console.log(data)
  return data
} catch (error){
  console.error("Failed to fetch", error)
}
}

//fetchData()

const renderTableRows = (table, userData, selectedLanguage="", highlight = false) => {
const score = selectedLanguage ? userData.ranks?.languages?.[selectedLanguage]?.score || 0 : userData.ranks?.overall?.score || 0;



  const row = table.insertRow();
  if (highlight) row.classList.add("highlight");

  const cells = [userData.username, userData.clan || "N/A", score]

  for(const cellData of cells) {
    const td = document.createElement("td");
    td.textContent = cellData;
    row.appendChild(td);
  }
}



submit.addEventListener("click", async (e) => {
  e.preventDefault();

  const usernames = userInput.value.split(",").map(user => user.trim()).filter(Boolean);
  const table = renderLeaderBoard();

  const allUserData = [];
  for (const username of usernames) {
    const data = await fetchData(username);
    if(data) {
      allUserData.push(data)
    }
  }
  userData = allUserData;
  allUserData.sort((a,b) => (b.ranks?.overall?.score) - (a.ranks?.overall?.score));

  /*for(const user of allUserData){
    renderTableRows(table, user)
  }*/

    for (let i = 0; i < allUserData.length; i++) {
  renderTableRows(table, allUserData[i], "", i === 0); // highlight the top user
}

  if(allUserData.length && allUserData[0].ranks?.languages) {
    languageDropdown(allUserData[0].ranks.languages)
  }
   userInput.value = "";
})



const languageDropdown = (languageObject) => {
  languageSelect.innerHTML = "";
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Overall Score";
  languageSelect.appendChild(defaultOption);

const languages = Object.keys(languageObject)
for(const language of languages) {
  const option = document.createElement("option");
  option.textContent = language;
  option.value = language;
  languageSelect.appendChild(option)
}

languageSelect.onchange = () => {
  const selectedLanguage = languageSelect.value;
  const table = renderLeaderBoard();

  const sorted = [...userData].sort((a, b) => {
    const scoreA = selectedLanguage ? a.ranks?.languages?.[selectedLanguage]?.score || 0 : a.ranks?.overall?.score || 0;
const scoreB = selectedLanguage ? b.ranks?.languages?.[selectedLanguage]?.score || 0 : b.ranks?.overall?.score || 0;

return scoreB - scoreA;
  })
  /*for(const user of sorted) {
    renderTableRows(table, user, selectedLanguage)
  }*/

    for (let i = 0; i < sorted.length; i++) {
  renderTableRows(table, sorted[i], selectedLanguage, i === 0);
}

}
};

window.onload = () => renderLeaderBoard();
