import { Component, OnInit } from '@angular/core';
import { AddEditWordComponent } from '../add-edit-word/add-edit-word.component';
import { MatDialog } from '@angular/material/dialog';
import { IWord, ISynonym } from '../interfaces/IWord';
import { InteractionService } from '../services/interaction.service';
import { WordService } from '../services/word.service';

@Component({
  selector: 'app-search-word',
  templateUrl: './search-word.component.html',
  styleUrls: ['./search-word.component.css']
})
export class SearchWordComponent implements OnInit {
  FoundWord: string = "hello";
  FoundWordDescription: string = `lorem lipsum  to greet someoneto greet someoneto greet someoneto greet someone`;
  showAdmin: boolean = true;
  wordToSearch: string = "";
  wordSearchAndFound: number = -1;

  foundWordSynonyms: ISynonym[] = [
    { name: 'ciao' },
    { name: 'hccihccaoi aoiaoi' },
    { name: 'hey' },
    { name: 'ciao' },
  ];

  wordData: IWord = {
    name: this.FoundWord,
    description: this.FoundWordDescription,
    synonyms: this.foundWordSynonyms
  }

  constructor(private dialog: MatDialog,
    private interactionService: InteractionService,
    private wordService: WordService) { }

  ngOnInit(): void {
    this.interactionService.getEvent$.subscribe(event => {
      if (event.startsWith('searchSynonymAsWord_')) {
        let searchString = event.substr(event.indexOf('_') + 1, event.length);
        this.searchWord(searchString)
      }
    });
  }

  searchWord(wordName: string) {
    this.wordToSearch = wordName;
    if (!wordName) {
      alert('Please enter word to search..');
      return;
    }

    this.wordService.getWordByName(wordName).subscribe((Response) => {
      console.log(Response);
      if (Response != null) {
        this.wordSearchAndFound = 1;
      } else {
        this.wordSearchAndFound = 0;
      }
    }, (err) => {
      this.wordSearchAndFound = 0;
      console.log('Error while getting word by name word. See console for details. ')
      console.log(err);
    });

    if (wordName == 'a') {
      this.wordSearchAndFound = 1;
    } else {
      this.wordSearchAndFound = 0;
    }
  }

  addNewWord() {
    // open dialog for adding new word, so pass existind data as null
    const dialogRef = this.dialog.open(AddEditWordComponent, {
      width: '800px',
      height: '550px',
      disableClose: true,
      data: {
        wordData: null
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
  }

  editCurrentWord() {
    // open dialog for editing existind word details, so pass existind word to dialog.
    const dialogRef = this.dialog.open(AddEditWordComponent, {
      width: '800px',
      height: '550px',
      disableClose: true,
      data: {
        wordData: this.wordData
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
  }

  deletCurrentWord() {
    if (confirm("Note : Do you want to delete this word ? If yes, then operation can not be revert. !!")) {
      this.wordService.deleteWords(this.wordData.name).subscribe((Response) => {
        console.log(Response);
      }, (err) => {
        console.log('Error while deleting word. See console for details. ')
        console.log(err);
      });
    }
  }
}
