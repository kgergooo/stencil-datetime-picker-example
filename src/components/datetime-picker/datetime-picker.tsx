import { Component, Event, EventEmitter, Prop, State, Watch } from '@stencil/core';
import moment from 'moment';
import {
  getDayListByMonth,
  isSameDate,
  getDayFromDate,
  getMonthNameFromDate,
  getPreviousMonth,
  getNextMonth,
  getShortDate,
  getTime
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
  }) selectedDate: Date = new Date();

  // On property change reload calendar
  @Watch('selectedDate')
    watchHandler(newDate): void {
      this.reloadCalendar(newDate);
    }

  @State() daysInMonth: string [];
  @State() selectedTime: string = "12:00";

  private selectedMonth: Date;

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

  private onTimeChanged(ev) {
    // On time selection, emit data change event
    this.selectedDate = moment(new Date(getShortDate(this.selectedDate)) + " " + ev.target.value).toDate();
    this.onDateSelected.emit(this.selectedDate);
  }

  componentWillLoad() {
    this.watchHandler(this.selectedDate);
  }

  render() {
    return (
      <div class="picker-container">
        <div class="input-container">
            <input class="input-field" value={moment(this.selectedDate).format("YYYY-MM-DD") }/>
            <input class="input-field" type="time" min="9:00" max="18:00" value={getTime(this.selectedDate)} onInput={(ev) => {this.onTimeChanged(ev)}}></input>
        </div>
        <div class="month">      
          <ul>
            <li class="prev cursor-p" onClick={() => {this.onPreviousMonthClicked()}}>&#10094;</li>
            <li class="next cursor-p" onClick={() => {this.onNextMonthClicked()}}>&#10095;</li>
            <li>{getMonthNameFromDate(this.selectedMonth)}</li>
          </ul>
        </div>

        <ul class="weekdays">
          <li>Mo</li>
          <li>Tu</li>
          <li>We</li>
          <li>Th</li>
          <li>Fr</li>
          <li>Sa</li>
          <li>Su</li>
        </ul>

        <ul class="days">  
          {this.daysInMonth.map((day) =>
            <li class={(day ? 'cursor-p': '')} onClick={() => {this.onDaySelected(day)}}>
              <span class={(isSameDate(this.selectedDate,new Date(day)) ? 'active': '')}>{getDayFromDate(day)}</span>
            </li>
          )}
        </ul>
      </div>
    )
  }
}
