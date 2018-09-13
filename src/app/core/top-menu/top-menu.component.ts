import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  links: any[];

  constructor() {
    this.links = [];
  }

  ngOnInit() {
    this.links = [
      { name: 'Main page', link: '', icon: 'label' },
      { name: 'Contest list', link: 'contest', icon: 'subject' },
      { name: 'Users', link: 'users', icon: 'face' },
    ];
  }

}
