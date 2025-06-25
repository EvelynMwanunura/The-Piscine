// This is a placeholder file which shows how you can define functions which can be used from both a browser script and a node script. You can delete the contents of the file once you have understood how it works.
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

const occurenceMap = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
};

function getNthWeekdayOfMonth(year, month, weekday, nth) {
  const firstDay = new Date(year, month, 1);

  const firstWeekday = firstDay.getDay();
  const offset = (weekday - firstWeekday + 7) % 7;
  const date = 1 + offset + (nth - 1) * 7;

  const testDate = new Date(year, month, date);
  if (testDate.getMonth() !== month) return null;
  return date;
}

function getLastWeekdayOfMonth(year, month, weekday) {
  const lastDay = new Date(year, month + 1, 0);
  const lastWeekday = lastDay.getDay();
  const offset = (lastWeekday - weekday + 7) % 7;
  return lastDay.getDate() - offset;
}

export function getCommemorativeDates(year, commemorativeDays) {
 
  const dates = [];

  for (const day of commemorativeDays) {
    const month = monthMap[day.monthName];
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ].indexOf(day.dayName);

    let date;
    if (day.occurence === "last") {
      date = getLastWeekdayOfMonth(year, month, weekday);
    } else {
      const nth = occurenceMap[day.occurence];
      date = getNthWeekdayOfMonth(year, month, weekday, nth);
    }

    if (date !== null) {
      dates.push({
        name: day.name,
        date: date,
        month: month + 1,
        descriptionURL: day.descriptionURL,
      });
    }
  }

  return dates;
}

