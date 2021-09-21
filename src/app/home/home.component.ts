import { Component, OnInit } from '@angular/core';
import { InteractionService } from '../services/interaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedTabIndex: number = 0;
  constructor(private interactionService: InteractionService) { }

  ngOnInit(): void {
    this.interactionService.getEvent$.subscribe(event => {
      if (event == "selectFirstTab") {
        this.selectedTabIndex = 0;
      }
    });
  }
}
