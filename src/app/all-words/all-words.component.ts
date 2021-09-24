import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IWord } from '../interfaces/IWord';
import { InteractionService } from '../services/interaction.service';
import { WordService } from '../services/word.service';

@Component({
  selector: 'app-all-words',
  templateUrl: './all-words.component.html',
  styleUrls: ['./all-words.component.css']
})
export class AllWordsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'synonyms'];
  dataSource: IWord[] = [];
  totalWordsCount = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50, 100];
  showFirstLastButtons = true;

  constructor(private interactionService: InteractionService, private wordService: WordService) { }

  ngOnInit(): void {
    // call for total count
    this.RefreshWordsList();
    this.interactionService.getEvent$.subscribe(event => {
      if (event == "RefreshWordList") {
        this.RefreshWordsList()
      }
    });
  }

  private RefreshWordsList() {
    this.pageIndex = 0;
    this.wordService.getTotalWordsCount().subscribe((Response) => {
      console.log(Response);
      this.totalWordsCount = Response;
      // call for 1st page data.
      if (this.totalWordsCount > 0) {
        this.getAllWordsByPage(0, this.pageSize);
      }
    }, (err) => {
      alert('Error while getting total stocks count. See console for details.');
      console.log(err);
    });
  }

  handlePageEvent(event: PageEvent) {
    this.totalWordsCount = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    console.log(event);
    this.getAllWordsByPage(this.pageIndex, this.pageSize);
  }

  private getAllWordsByPage(pageIndex: number, pageSize: number) {
    this.wordService.getAllWordsByPage(pageIndex, pageSize).subscribe((response: IWord[]) => {
      console.log(response);
      this.dataSource = response;
    }, (err) => {
      alert('Error while getting all stocks. See console for details.');
      console.log(err);
    });
  }

  openSynonymAsWord(name: string) {
    this.interactionService.AddEvent(`searchSynonymAsWord_${name}`);
    this.interactionService.AddEvent('selectFirstTab');
  }
}