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
