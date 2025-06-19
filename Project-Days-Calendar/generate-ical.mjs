#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { getCommemorativeDates } from "./common.mjs";

// Helper to compute YYYYMMDD for the day after a given date
function nextDayYYYYMMDD(year, month, day) {
  const d = new Date(year, month - 1, day);
  d.setDate(d.getDate() + 1);
  const Y = d.getFullYear();
  const M = String(d.getMonth() + 1).padStart(2, "0");
  const D = String(d.getDate()).padStart(2, "0");
  return `${Y}${M}${D}`;
}

// Load commemorative-days data
const daysPath = path.resolve(process.cwd(), "days.json");
const commemorativeDays = JSON.parse(fs.readFileSync(daysPath, "utf8"));

// Prepare VEVENTs for each year
const events = [];
const startYear = 2020;
const endYear = 2030;


const now = new Date();
const dtstamp = now.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

for (let year = startYear; year <= endYear; year++) {
  const list = getCommemorativeDates(year, commemorativeDays);
  for (const item of list) {
    const { name, month, date, descriptionURL } = item;
    const dtStart = `${year}${String(month).padStart(2, "0")}${String(
      date
    ).padStart(2, "0")}`;
    const dtEnd = nextDayYYYYMMDD(year, month, date);
    // Make a simple stable UID
    const uidBase = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const uid = `${uidBase}-${year}@commemorative-days`;

    events.push(
      [
        "BEGIN:VEVENT",
        `UID:${uid}`,
        `DTSTAMP:${dtstamp}`,
        `SUMMARY:${name}`,
        `DESCRIPTION:${descriptionURL}`,
        `DTSTART;VALUE=DATE:${dtStart}`,
        `DTEND;VALUE=DATE:${dtEnd}`,
        "END:VEVENT",
      ].join("\r\n")
    );
  }
}


const icsLines = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//MyOrg//Commemorative Days//EN",
  "CALSCALE:GREGORIAN",
  ...events,
  "END:VCALENDAR",
];
const icsContent = icsLines.join("\r\n");

const outPath = path.resolve(process.cwd(), "days.ics");
fs.writeFileSync(outPath, icsContent, "utf8");
console.log(`Generated ${outPath} with ${events.length} events.`);