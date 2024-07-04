import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from './services/message.service';
import { BrowserEventService } from './services/browswer/browser-event.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Stock Market';
  isAdminRoute = false;

  constructor(public messageService: MessageService, 
    private browserEventService: BrowserEventService,
    private router: Router){}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAdminRoute = event.url.startsWith('/admin');
      }
    });
    // this.browserEventService.init();
  }
}
