// This is a placeholder file which shows how you can access functions and data defined in other files. You can delete the contents of the file once you have understood how it works.
// It can be run with `node`.

export function renderCalendar(year, month, specialDays) {
  const table = document.createElement("table");
  table.className = "calendar-table";
  const header = table.insertRow();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (const day of daysOfWeek) {
    const th = document.createElement("th");
    th.textContent = day;
    header.appendChild(th);
  }

  const firstDay = new Date(year, month, 1);
  const startingDay = firstDay.getDay();
  const monthLength = new Date(year, month + 1, 0).getDate();

  let row = table.insertRow();
  for (let i = 0; i < startingDay; i++) {
    row.insertCell(); // Empty cell
  }

  for (let day = 1; day <= monthLength; day++) {
    if (row.cells.length % 7 === 0) row = table.insertRow();
    const cell = row.insertCell();
    cell.textContent = day;

    console.log("Current day:", day);
    console.log("Special days:", specialDays);
    specialDays.forEach((d) =>
      console.log("Special date:", d.date, typeof d.date)
    );

    const special = specialDays.find((d) => Number(d.date) === day);
    console.log("Found special:", special);

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
