// This is a placeholder file to show how you can "mock" fetch requests using
// the nock library.
// You can delete the contents of the file once you have understood how it
// works.

/*export function makeFetchRequest() {
  return fetch("https://example.com/test");
}*/

const userInput = decodeURIComponent.getElementById("userInput");
const submit = document.gerElementById("submit");
const tableElement = document.getElementById("table");
const languageSelect = documentGetElementById = ("langaugeSelect");

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