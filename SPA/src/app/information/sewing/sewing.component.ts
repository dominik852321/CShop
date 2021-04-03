import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sewing',
  templateUrl: './sewing.component.html',
  styleUrls: ['./sewing.component.scss']
})
export class SewingComponent implements OnInit {

  title = 'Firany na miare | Sklep internetowy Panienka z okienka'; 

  constructor(private titleService: Title, private metaTagService: Meta) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({ name: 'description', content: 'Firany, firanki, zasłony, panele, zazdroski gotowe lub na wymiar  | Sklep internetowy Panienka z okienka, Firany szyte na wymiar'})
  }

}
