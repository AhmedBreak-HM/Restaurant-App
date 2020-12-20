import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() { }

  private toggleSideBar() {
   this.toggleSideBarForMe.emit();
   setTimeout(() => {
    window.dispatchEvent(
      new Event('resize')
    );
  }, 300);
  }

}
