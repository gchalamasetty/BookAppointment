import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IMyDpOptions, IMyOptions, IMyDateModel } from 'mydatepicker';
import { MyDatePickerModule } from "mydatepicker";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { responseFromAPI } from './date-time-mock-model';
import { BookingConfirmationService } from './date-time-selection-comp.service';

@Component({
  selector: 'app-date-time-selection-comp',
  templateUrl: './date-time-selection-comp.component.html',
  styleUrls: ['./date-time-selection-comp.component.css']
})
export class DateTimeSelectionCompComponent implements OnInit {

  //Triggering function in parent component
  @Output() closeDateTimeSelectView: EventEmitter<any> = new EventEmitter<any>();
  // Declaring Global Variables
  public dateForm: FormGroup;
  public todayDate = new Date();
  public datesInJSONobject: any = [];
  public displayRadioGroupObject: Array<any>;
  public availableDates: Array<any>;
  public serviceBookedDateandTime: object;
  // Date Picker Customisation
  private myOptions: IMyOptions = {
    dateFormat: 'mm/dd/yyyy',
    firstDayOfWeek: 'su',
    disableWeekends: true,
    sunHighlight: false,
    openSelectorOnInputClick: true,
    editableDateField: false,
    disableUntil: {
      year: this.todayDate.getFullYear(),
      month: this.todayDate.getMonth() + 1,
      day: this.todayDate.getDate() - 1
    },
    highlightDates: [{ year: 0, month: 0, day: 0 }]
  }
//Constructor
  constructor(private _fb: FormBuilder, 
              private serviceCall: BookingConfirmationService) {
    this.availableDates = responseFromAPI.avilableDates;
  }
// ngOnInit Lifecycle hook 
  ngOnInit() {
    this.dateForm = this._fb.group({
      selectedDate: ['', [Validators.required]]
    });
    this.transformResponseIntoDesiredWay();
  }
  // Transforming the response from API in the way required for datepicker to highlight dates
  transformResponseIntoDesiredWay() {
    this.availableDates.map(results => {
      if (results['date']) {
        this.datesInJSONobject.push({
          year: Number(results['date'].split('/')[2]),
          month: Number(results['date'].split('/')[0]),
          day: Number(results['date'].split('/')[1])
        })
      }
    });
  }
  // Highlight dates recieved from JSON in Date picker calender
  highlightDates() {
    let copy = this.getCopyOfOptions();
    copy.highlightDates = this.datesInJSONobject;
    this.myOptions = copy;
  }
  // Creating a copy of date picker options, for the date-picker to detect changes
  getCopyOfOptions(): IMyOptions {
    return JSON.parse(JSON.stringify(this.myOptions));
  }
  // When user change the date 
  onDateChanged(event: IMyDateModel) {
    this.displayRadioGroupObject = [];
    this.serviceBookedDateandTime ={};
    let yearSelected = event.date.year,
      monthSelected = event.date.month,
      daySelected = event.date.day;
    const dateSelected = monthSelected + '/' + daySelected + '/' + yearSelected;
    this.displayTimeSlots(dateSelected.toString());
  }
  // Function to display available time slots in an ordered fashion 
  displayTimeSlots(dateSelected) {
    this.displayRadioGroupObject = this.availableDates.filter(object => {
      if (object['date'] === dateSelected) {
        return object;
      }
    });
  }
 
  //Close the modal popUp by triggering event in parent component
  closeDateTimeSelctionView() {
    this.closeDateTimeSelectView.emit();
  }
// When user selects the radio button
  selectTimeSlot(row){
    this.serviceBookedDateandTime = row;
  }
// Making Post Call to submit the Booking Information
  submitServiceReservation(){
    let body ={
      date: this.serviceBookedDateandTime['date'],
      startTime: this.serviceBookedDateandTime['startTime'],
      endTime: this.serviceBookedDateandTime['endTime'],
      timeSlot: this.serviceBookedDateandTime['timeSlotDescription']
    }
    this.serviceCall.submitServiceInstallRequest( body).subscribe(response=>{
      console.log("Request Submitted :", body);
    }, error =>{
      console.log("Error :", error, "Body :", body);
    })
  }
}
