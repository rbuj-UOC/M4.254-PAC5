import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  active: number;

  constructor() {
    this.active = 0;
  }

  setSelectedItem(i: number) {
    this.active = i;
  }
}
