import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.scss']
})
export class AboutmeComponent implements OnInit {

  title = 'O mnie | Sklep internetowy Panienka z okienka';

  constructor(private titleService: Title, private metaTagService: Meta) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.metaTagService.updateTag({ name: 'description', content: 'Informacje o mnie, jakie firany szyję, z jakiego materiału i jakie mam doświadczenie. Przedstawienie kilka gotowych firan| Sklep internetowy Panienka z okienka, Firany szyte na wymiar'})
  }

}
