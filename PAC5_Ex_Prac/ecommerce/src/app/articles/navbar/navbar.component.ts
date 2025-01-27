import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  active: number;

  constructor() {
    this.active = 0;
  }

  setSelectedItem(i: number) {
    this.active = i;
  }
}
