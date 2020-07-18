import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curtain-list',
  templateUrl: './curtain-list.component.html',
  styleUrls: ['./curtain-list.component.css']
})
export class CurtainListComponent implements OnInit {

  curtains;
  constructor() { }

  ngOnInit(): void {
  }

}
