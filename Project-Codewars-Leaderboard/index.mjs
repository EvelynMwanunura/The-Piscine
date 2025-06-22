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
const languageSelect = document.getElementById("langaugeSelect");

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

const renderTableRows = (table, userData, selectedLanguage=""){
  const score = selectedLanguage?userData.ranks?.language?.[selectedLanguage]?.score|| 0 :userData.ranks?.overall?.score || 0


  const row = table.insertRow();
  const cells = [userData.username, userData.clan || "N/A", score]

  for(const cellData of cells) {
    const td = document.createElement("td");
    td.textContent = cellData;
    row.appendChild(td)
  }
}