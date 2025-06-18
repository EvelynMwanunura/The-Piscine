export function generateDatesForYear(
  occurence,
  weekday,
  monthName,
  startYear,
  endYear
) {
  const weekdayMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

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

  const weekdayIndex = weekdayMap[weekday];
  const monthIndex = monthMap[monthName];
  const dates = [];

  for (let year = startYear; year <= endYear; year++) {
    const firstDayOfMonth = new Date(Date.UTC(year, monthIndex, 1));
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    let matchingDays = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(Date.UTC(year, monthIndex, day));
      if (date.getUTCDay() === weekdayIndex) {
        matchingDays.push(day);
      }
    }
    let chosenDay;
    if (occurence === "last") {
      chosenDay = matchingDays[matchingDays.length - 1];
    } else {
      const ordinalMap = {
        first: 0,
        second: 1,
        third: 2,
        fourth: 3,
      };
      chosenDay = matchingDays[ordinalMap[occurence]];
    }
    if (chosenDay) {
      dates.push(chosenDate.toISOString().split("T")[0].replace(/-/g, ""));
    }
  }
  return dates;
}
