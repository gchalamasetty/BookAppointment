import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //Flag to initialize and destroy the date-time-component view
  showAppointmentDiv: boolean = false;

  //Function to be called, after user clicks on Book Appointment Button
  selectAppointment() {
    this.showAppointmentDiv = true;
  }
  //Destroy the child component view, i.e., modal pop up
  closeChildComponentView(event) {
    this.showAppointmentDiv = false;
  }
}
