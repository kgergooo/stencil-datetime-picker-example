import moment from 'moment';

export function getDayListByMonth(date: Date): string[] {
  const response: string[] = [];

  const startOfMonth = moment(date).startOf('month').format('YYYY-MM-DD');
  const endOfMonth   = moment(date).endOf('month').format('YYYY-MM-DD');

  // First empty days of the week
  const dayOfWeek = moment(date).startOf('month').day();
  for(let i = 1; i < dayOfWeek; i++) {
    response.push(null);
  }

  // month days population
  const dayCounter = moment(startOfMonth);
  for(let i = 1; i <= +getDayFromDate(endOfMonth); i++) {
    response.push(dayCounter.toString());
    dayCounter.add(1, "day");
  }

  return  response;
}

export function getTime(date: Date): string {
  return moment(date).format('HH:mm');
}

export function getNextMonth(date: Date): Date {
  return moment(date).add(1, "month").startOf('month').toDate()
}

export function getPreviousMonth(date: Date): Date {
  return moment(date).subtract(1, "month").startOf('month').toDate()
}

export function getNextMonthName(date: Date): string {
  return moment(getNextMonth(date)).format('MMM');
}

export function getPreviousMonthName(date: Date): string {
  return moment(getPreviousMonth(date)).format('MMM');
}

export function getDayFromDate(date: string): string {
  return  date ? moment(new Date(date)).format('DD') : "";
}

export function isSameDate(first: Date, second: Date): boolean {
  const response: boolean =
  moment(first).date() === moment(second).date() &&
  moment(first).month() === moment(second).month() &&
  moment(first).year() === moment(second).year();

  return response;
}

export function getMonthNameFromDate(date: Date):string {
  return  moment(date).format('MMMM YYYY');
}

export function getShortDate(date: Date):string {
  return  moment(date).format('YYYY-MM-D');
}
