// This is a placeholder file which shows how you can define functions which can be used from both a browser script and a node script. You can delete the contents of the file once you have understood how it works.

export function getNthWeekdayOfMonth(year, month, weekday, nth) {
  const firstDay = new Date(year, month, 1);

  const firstWeekday = firstDay.getDay();
  const offset = (weekday - firstWeekday + 7) % 7;
  const date = 1 + offset + (nth - 1) * 7;

  const testDate = new Date(year, month, date);
  if (testDate.getMonth() !== month) return null;
  return date;
}
