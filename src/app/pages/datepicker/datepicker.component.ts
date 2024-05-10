import { Component } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [NativeDateAdapter], 
})
export class DatepickerComponent {

}