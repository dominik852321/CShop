import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.scss']
})
export class PrivacypolicyComponent implements OnInit {

  title = 'Polityka prywatności | Sklep internetowy Panienka z okienka';

  constructor(private titleService: Title, private metaTagService: Meta) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({ name: 'description', content: 'Informacje o polityce prywatności, jak chronione są dane na stronie panienkazokienka.com | Sklep internetowy Panienka z okienka, Firany szyte na wymiar'})
  }

}
