import moment from 'moment';

export interface CalendarDay {
  day: number;
  month: number;
  year: number;
  data?: any;
}

export interface CalendarMonth {
  month: number;
  year: number;
  days: CalendarDay[];
}

export interface CalendarYear {
  year: number;
  months: CalendarMonth[];
}

export interface CalendarSheet {
  years: CalendarYear[];
}

export const calendarSheet = (start: Date, end: Date): CalendarSheet => {
  let sheet: CalendarSheet = { years: [] };
  const startAsDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const endAsDay = new Date(end.getFullYear(), end.getMonth(), end.getDate());

  // iterate years
  for (var y = start.getFullYear(); y <= end.getFullYear(); y++) {
    let iYear: CalendarYear = { year: y, months: [] };

    // iterate months
    for (var m = 0; m <= 11; m++) {
      if (
        (start.getFullYear() != end.getFullYear() &&
          y === start.getFullYear() &&
          m >= start.getMonth()) ||
        (y === start.getFullYear() &&
          y === end.getFullYear() &&
          m >= start.getMonth() &&
          m <= end.getMonth()) ||
        (y > start.getFullYear() && y < end.getFullYear()) ||
        (start.getFullYear() != end.getFullYear() && y === end.getFullYear() && m <= end.getMonth())
      ) {
        let iMonth: CalendarMonth = { month: m, year: y, days: [] };

        // iterate days
        const daysInMonth = moment([y, m]).daysInMonth();
        for (var d = 1; d <= daysInMonth; d++) {
          const iDate = new Date(y, m, d);
          if (iDate.getTime() >= startAsDay.getTime() && iDate.getTime() < endAsDay.getTime()) {
            const iDay: CalendarDay = { day: d, month: m, year: y };
            iMonth.days.push(iDay);
          }
        }

        iYear.months.push(iMonth);
      }
    }
    sheet.years.push(iYear);
  }

  return sheet;
};
