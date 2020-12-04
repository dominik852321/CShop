import { BsDropdownConfig, BsDropdownDirective, BsDropdownState } from 'ngx-bootstrap/dropdown';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-regulations',
  templateUrl: './regulations.component.html',
  styleUrls: ['./regulations.component.scss']
})
export class RegulationsComponent implements OnInit {

  isCollapsed = true;
  constructor() { }

  ngOnInit(): void {
  }

}
