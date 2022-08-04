import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {
      title: 'Candidates',
      url: '/candidates',
      icon: 'list',
    },
    {
      title: 'Top Candidates',
      url: '/dashboard',
      icon: 'people',
    },
  ];
  constructor() {}
}
