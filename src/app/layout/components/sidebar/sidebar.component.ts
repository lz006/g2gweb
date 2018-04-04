import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: 'find-shipments', title: 'Find Shipments',  icon:'location_searching', class: '' },
    { path: 'open-shipments', title: 'Open Shipments',  icon:'drafts', class: '' },
    { path: 'user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: 'notifications', title: 'Notifications',  icon:'notifications', class: '' },
    { path: 'administration', title: 'Administration',  icon:'headset mic', class: '' },
    { path: 'landing', title: 'LandingPage',  icon:'home', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(public router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

}
