// This is a placeholder file which shows how you can access functions and data defined in other files. You can delete the contents of the file once you have understood how it works.
// It can be run with `node`.
import fs from "node:fs";
import commemorativeDys from "./days.json" assert { type: "json" };
import { generateDatesForYear } from "./dateUtils.mjs";

const startYear = 2020;
const endYear = 2030;
const icsContent = `BEGIN: VCALENDAR\nVERSION:2.0\nCALSCALE:GREGORIAN\n`;

commemorativeDys.forEach((dayInfo) => {
  const dates = generateDatesForYear(
    dayInfo.day,
    dayInfo.month,
    startYear,
    endYear
  );
  dates.forEach((date) => {
    icsContent += `BEGIN:VEVENT\nSUMMARY:${dayInfo.name}\nDTSTART;VALUE=DATE:${date}\nDTEND;VALUE=DATE:${date}\nDESCRIPTION:${dayInfo.description}\nEND:VEVENT\n`;
  });
});

icsContent += `END:VCALENDAR\n`;

fs.writeFileSync("days.ics", icsContent, "utf8");
console.log("ICS file generated: days.ics");
