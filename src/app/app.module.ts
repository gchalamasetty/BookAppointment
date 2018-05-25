import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MyDatePickerModule } from "mydatepicker";
import { FormsModule, ReactiveFormsModule, Form } from '@angular/forms';
import { AppComponent } from './app.component';
import { DateTimeSelectionCompComponent } from './date-time-selection-comp/date-time-selection-comp.component';
import { BookingConfirmationService } from './date-time-selection-comp/date-time-selection-comp.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    DateTimeSelectionCompComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MyDatePickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [BookingConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
