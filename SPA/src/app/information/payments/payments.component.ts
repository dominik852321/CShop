import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  title = 'Płatności | Sklep internetowy Panienka z okienka';

  constructor(private titleService: Title, private metaTagService: Meta) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({ name: 'description', content: 'Informacje w jaki sposób odbywa się płatność i jaki jest czas oczekiwania na firany| Sklep internetowy Panienka z okienka, Firany szyte na wymiar'})
  }

}
