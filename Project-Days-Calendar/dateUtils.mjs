export function generateDatesForYear(day, month, startYear, endYear) {
  const dates = [];
  for (let year = startYear; year <= endYear; year++) {
    const date = new Date(Date.UTC(year, month - 1, day));
    dates.push(date.toISOString().split("T")[0].replace(/-/g, ""));
  }
  return dates;
}
