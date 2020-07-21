import { Component, OnInit } from '@angular/core';
import { Curtain } from 'src/app/_models/curtain';
import { from } from 'rxjs';
import { CurtainService } from 'src/app/_services/curtain.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-curtain-list',
  templateUrl: './curtain-list.component.html',
  styleUrls: ['./curtain-list.component.css']
})
export class CurtainListComponent implements OnInit {

  curtains: Curtain[];
  constructor(private curtainService: CurtainService,
              public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.curtains = data.curtains;
    })
  }

}
