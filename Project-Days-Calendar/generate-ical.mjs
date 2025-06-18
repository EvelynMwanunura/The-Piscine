import fs from "node:fs";
import commemorativeDays from "./days.json" with { type: "json" };
import { generateDatesForYear } from "./dateUtils.mjs";

const startYear = 2020;
const endYear = 2030;
let icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nCALSCALE:GREGORIAN\n`;

commemorativeDays.forEach((dayInfo) => {
  const dates = generateDatesForYear(
    dayInfo.monthName,
    dayInfo.dayName,
    dayInfo.occurence,
    startYear,
    endYear
  );

  dates.forEach((date) => {
    icsContent += `BEGIN:VEVENT\n`;
    icsContent += `UID:${dayInfo.name.replace(/\s+/g, "-").toLowerCase()}-${date}\n`;
    icsContent += `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z\n`;
    icsContent += `SUMMARY:${dayInfo.name}\n`;
    icsContent += `DTSTART;VALUE=DATE:${date}\n`;
    icsContent += `DTEND;VALUE=DATE:${date}\n`;
    icsContent += `DESCRIPTION:See more at ${dayInfo.descriptionURL}\n`;
    icsContent += `END:VEVENT\n`;
    console.log(`Added event for ${dayInfo.name} on ${date}`);
  });
});

icsContent += `END:VCALENDAR\n`;

fs.writeFileSync("days.ics", icsContent, "utf8");
console.log("ICS file generated: days.ics");
