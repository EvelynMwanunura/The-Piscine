const monthMap = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

const weekdayMap = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const occurrenceMap = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
};

export function generateDatesForYear(
  monthName,
  dayName,
  occurrence,
  startYear,
  endYear
) {
  const dates = [];
  const monthIndex = monthMap[monthName];
  const dayIndex = weekdayMap[dayName];

  for (let year = startYear; year <= endYear; year++) {
    let date;
    if (occurrence === "last") {
      date = new Date(year, monthIndex + 1, 0);
      while (date.getDay() !== dayIndex) {
        date.setDate(date.getDate() - 1);
      }
    } else {
      let count = 0;
      date = new Date(year, monthIndex, 1);
      while (true) {
        if (date.getDay() === dayIndex) {
          count++;
          if (count === occurrenceMap[occurrence]) break;
        }
        date.setDate(date.getDate() + 1);
      }
    }

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    dates.push(`${yyyy}${mm}${dd}`);
  }

  return dates;
}
