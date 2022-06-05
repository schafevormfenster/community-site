import { formatInTimeZone } from 'date-fns-tz';

export interface CalendarDay {
  day: number;
  month: number;
  year: number;
  localString: string;
}

export interface CalendarMonth {
  month: number;
  year: number;
  localString: string;
  days: CalendarDay[];
}

export interface CalendarYear {
  year: number;
  localString: string;
  months: CalendarMonth[];
}

export interface CalendarSheet {
  years: CalendarYear[];
}

const monthDays = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const calendarSheet = (start: Date, end: Date): CalendarSheet => {
  let sheet: CalendarSheet = { years: [] };
  const startAsDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const endAsDay = new Date(end.getFullYear(), end.getMonth(), end.getDate());

  // iterate years
  for (var y = start.getFullYear(); y <= end.getFullYear(); y++) {
    let iYear: CalendarYear = { year: y, localString: y.toString(), months: [] };

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
        const monthAsDate = new Date(y, m, 1);
        let iMonth: CalendarMonth = {
          month: m,
          year: y,
          localString: formatInTimeZone(monthAsDate, 'Europe/Berlin', 'yyyy-MM'),
          days: [],
        };

        // iterate days
        for (var d = 1; d <= monthDays(y, m); d++) {
          const iDate = new Date(y, m, d);
          if (iDate.getTime() >= startAsDay.getTime() && iDate.getTime() < endAsDay.getTime()) {
            const iDay: CalendarDay = {
              day: d,
              month: m,
              year: y,
              localString: formatInTimeZone(iDate, 'Europe/Berlin', 'yyyy-MM-dd'),
            };
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
