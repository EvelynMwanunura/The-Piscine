import { getCommemorativeDates } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";

test("getCommemorativeDates returns an array of dates", () => {
  const year = 2023;
  const commemorativeDays = [
    {
      name: "Test Day",
      monthName: "January",
      dayName: "Monday",
      occurence: "first",
      descriptionURL: "https://example.com/test-day",
    },
  ];

  const result = getCommemorativeDates(year, commemorativeDays);
  assert.strictEqual(Array.isArray(result), true);
  assert.strictEqual(result.length, 1);
  assert.strictEqual(result[0].name, "Test Day");
  assert.strictEqual(result[0].date, 2);
});

test("Ada Lovelace Day is on the 2nd Tuesday of October", () => {
  const commemorativeDays = [
    {
      name: "Ada Lovelace Day",
      monthName: "October",
      dayName: "Tuesday",
      occurence: "second",
      descriptionURL:
        "https://codeyourfuture.github.io/The-Piscine/days/ada.txt",
    },
  ];

  // 2024: second Tuesday = Oct 8
  const r2024 = getCommemorativeDates(2024, commemorativeDays);
  assert.strictEqual(r2024.length, 1);
  assert.strictEqual(r2024[0].date, 8);

  // 2025: second Tuesday = Oct 14
  const r2025 = getCommemorativeDates(2025, commemorativeDays);
  assert.strictEqual(r2025[0].date, 14);
});

test("World Lemur Day (last Friday of October) is correct", () => {
  const commemorativeDays = [
    {
      name: "World Lemur Day",
      monthName: "October",
      dayName: "Friday",
      occurence: "last",
      descriptionURL:
        "https://codeyourfuture.github.io/The-Piscine/days/lemurs.txt",
    },
  ];

  // In 2023, in October last Friday is 27
  const r2023 = getCommemorativeDates(2023, commemorativeDays);
  assert.strictEqual(r2023.length, 1);
  assert.strictEqual(r2023[0].date, 27);
});

