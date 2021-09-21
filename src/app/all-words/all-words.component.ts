import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IWord } from '../interfaces/IWord';
import { InteractionService } from '../services/interaction.service';
import { WordService } from '../services/word.service';

const DATA: IWord[] = [
  { name: "word1", description: "decription", synonyms: [{ name: "synomys1" }, { name: "synonweym2" }] },
  { name: "word2", description: "decription of word", synonyms: [{ name: "synoasdasmys1" }, { name: "synonywewewm2" }] },
  { name: "word3", description: "decription of word", synonyms: [{ name: "synosdmys1" }, { name: "syeenonym2" }] },
  { name: "word4", description: "decription of word", synonyms: [{ name: "dmys1" }, { name: "synonym2" }, { name: "synonym2" }] },
  { name: "word5", description: "decription of word", synonyms: [{ name: "synosdmys1" }, { name: "nym2" }, { name: "synonym2" }] },
  { name: "word6", description: "decription of word", synonyms: [{ name: "synomys1" }, { name: "synm2" }, { name: "synonym2" }] },
  { name: "word7", description: "decription of word", synonyms: [{ name: "synssssomys1" }, { name: "sytttnonym2" }] },
  { name: "word8", description: "decription of word", synonyms: [{ name: "smys1" }, { name: "synym2" }] },
  { name: "word9", description: "decription of word", synonyms: [{ name: "syns1" }, { name: "synon  ym2" }, { name: "synonym2" }] },
  { name: "word8", description: "decription of word", synonyms: [{ name: "synys1" }, { name: "syno 77nym2" }, { name: "synonym2" }] }
];

@Component({
  selector: 'app-all-words',
  templateUrl: './all-words.component.html',
  styleUrls: ['./all-words.component.css']
})
export class AllWordsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'synonyms'];
  dataSource: IWord[] = DATA;
  totalWordsCount = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;

  constructor(private interactionService: InteractionService, private wordService: WordService) { }

  ngOnInit(): void {
    // call for total count
    this.wordService.getTotalWordsCount().subscribe((Response) => {
      console.log(Response);
      this.totalWordsCount = Response;
      // call for 1st page data.
      if (this.totalWordsCount > 0) {
        this.wordService.getAllWordsByPage(0, this.pageSize).subscribe((response: IWord[]) => {
          console.log(response);
          this.dataSource = response;
        }, (err) => {
          console.log('Error while getting all stocks. See console for details.');
          console.log(err);
        });
      }
    }, (err) => {
      console.log('Error while getting total stocks count. See console for details.');
      console.log(err);
    })
  }

  handlePageEvent(event: PageEvent) {
    this.totalWordsCount = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    console.log(event);
    this.wordService.getAllWordsByPage(this.pageIndex, this.pageSize).subscribe((response: IWord[]) => {
      console.log(response);
      this.dataSource = response;
    }, (err) => {
      console.log('Error while getting all stocks. See console for details.');
      console.log(err);
    });
  }

  getServerData(event?: PageEvent) {
    console.log("abc- ", event);
  }

  openSynonymAsWord(name: string) {
    this.interactionService.AddEvent(`searchSynonymAsWord_${name}`);
    this.interactionService.AddEvent('selectFirstTab');
  }
}