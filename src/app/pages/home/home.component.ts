import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {'class' : 'app-home'}
})
export class HomeComponent implements OnInit {
  panelOpenState = false;
  constructor() { }

  ngOnInit(): void {
  }
  
  connectSpotify() {
    
  }

}