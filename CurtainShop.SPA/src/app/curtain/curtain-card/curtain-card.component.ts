import { Component, OnInit, Input } from '@angular/core';
import { Curtain } from 'src/app/_models/curtain';

@Component({
  selector: 'app-curtain-card',
  templateUrl: './curtain-card.component.html',
  styleUrls: ['./curtain-card.component.css']
})
export class CurtainCardComponent implements OnInit {

  @Input() curtain: Curtain;
  
  constructor() { }

  ngOnInit(): void {
  }

}
