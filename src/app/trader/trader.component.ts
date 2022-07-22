import {Component, ViewChild, Input} from '@angular/core';
import { createChart } from 'lightweight-charts';

@Component({
  selector: 'app-trader',
  templateUrl: './trader.component.html',
  styleUrls: ['./trader.component.css']
})

export class TraderComponent{
  constructor(){
    this.isActive = false;
  }

  @Input() trader:any;
  @Input() isActive:boolean;
  @Input() orderNumber:any;
}
