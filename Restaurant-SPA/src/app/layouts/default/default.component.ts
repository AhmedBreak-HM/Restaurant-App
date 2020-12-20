import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  sideBarOpen: boolean = true;
  constructor() { }

  ngOnInit() {
  }
 private sideBarToggler() {
   this.sideBarOpen = !this.sideBarOpen;
  }

}
