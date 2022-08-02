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
      url: '/folder/Candidates',
      icon: 'heart',
    },
    {
      title: 'Dashboard',
      url: '/folder/Dashboard',
      icon: 'mail',
    },
  ];
  constructor() {}
}
