import { BsDropdownConfig, BsDropdownDirective, BsDropdownState } from 'ngx-bootstrap/dropdown';
import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-regulations',
  templateUrl: './regulations.component.html',
  styleUrls: ['./regulations.component.scss']
})
export class RegulationsComponent implements OnInit {

  title = 'Regulamin sklepu | Sklep internetowy Panienka z okienka';

  constructor(private titleService: Title, private metaTagService: Meta) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({ name: 'description', content: 'Regulamin obowiązujący na stronie | Sklep internetowy Panienka z okienka, Firany szyte na wymiar'})
  }

}
