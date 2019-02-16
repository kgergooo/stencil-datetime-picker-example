import { Component, Event, EventEmitter, Prop, State, Watch } from '@stencil/core';
import moment from 'moment';
import {
  getDayListByMonth,
  getPreviousMonthName,
  isSameDate,
  getNextMonthName,
  getDayFromDate,
  getMonthNameFromDate,
  getPreviousMonth,
  getNextMonth
} from '../../utils/utils';

@Component({
  tag: 'datetime-picker',
  styleUrl: 'datetime-picker.css',
  shadow: true
})
export class DateTimePicker {
  @Event() onDateSelected: EventEmitter<Date>;

  @Prop({
    mutable: true,
    reflectToAttr: true
  }) selectedDate: Date;

  // On property change reload calendar
  @Watch('selectedDate')
    watchHandler(newDate): void {
      this.reloadCalendar(newDate);
    }

  @State() daysInMonth: string [];
  public selectedMonth: Date;

  private reloadCalendar(newDate: Date) {
    this.selectedMonth = moment(newDate).startOf('month').toDate();
    this.daysInMonth = getDayListByMonth(this.selectedMonth);
  }

  private onNextMonthClicked() {
    this.selectedMonth = getNextMonth(this.selectedMonth);
    this.daysInMonth = getDayListByMonth(this.selectedMonth)
  }

  private onPreviousMonthClicked() {
    this.selectedMonth = getPreviousMonth(this.selectedMonth);
    this.daysInMonth = getDayListByMonth(this.selectedMonth)
  }

  private onDaySelected(day) {
    if(day) {
      this.selectedDate = moment(new Date(day)).toDate();
      this.onDateSelected.emit(day);
    }
  }

  componentWillLoad() {
    this.watchHandler(this.selectedDate);
  }

  render() {
    return (
      <div class="container datepicker-wrapper">
      {/* Selected day */}
      <input value={moment(this.selectedDate).format("YYYY-MM-DD") }/>
      {/* Header */}
      <div class="calendar-wrapper">
        <div class="header row mt-3">
          <div class="col-3">
            <span class="cursor-p" onClick={() => {this.onPreviousMonthClicked()}}>
              {getPreviousMonthName(this.selectedMonth)}
            </span>
          </div>
          <div class="col-6 text-center">
            <b>{getMonthNameFromDate(this.selectedMonth)}</b>
          </div>
          <div class="col-3 text-right">
            <span class="cursor-p" onClick={() => {this.onNextMonthClicked()}}>
              {getNextMonthName(this.selectedMonth)}
            </span>
          </div>
        </div>

        {/* Days */}
        <div class="row pb-2 pt-2 text-center calendar-days">
          {this.daysInMonth.map((day) =>
            <div class={'column col-1 ' + (day ? 'cursor-p ': '')} onClick={() => {this.onDaySelected(day)}}>
              <span class={(isSameDate(this.selectedDate,new Date(day)) ? 'selected-day': '') + ' day'}>{getDayFromDate(day)}</span>
            </div>
          )}
        </div>
        </div>
      </div>
    )
  }
}
