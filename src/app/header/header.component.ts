import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  birthday = new Date('August 11, 2001 13:00:00');
  timeDiff = Math.abs(Date.now() - this.birthday.getTime());
  age = Math.floor((this.timeDiff / (1000 * 3600 * 24))/365.25)
}
