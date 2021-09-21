import { Component, OnInit } from '@angular/core';
import { AddEditWordComponent } from '../add-edit-word/add-edit-word.component';
import { MatDialog } from '@angular/material/dialog';
import { IWord, ISynonym } from '../interfaces/iword';

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
  wordFound: boolean = true;

  foundWordSynonyms: ISynonym[] = [
    { name: 'ciao' },
    // { name: 'cciaoiao' },
    // { name: 'hcciahcciaoia ' },
    { name: 'hccihcciaoiaoi aoiaoi' },
    // { name: 'hcciaoiaoi' },
    // { name: 'hi' },
    // { name: 'hi' },
    // { name: 'hcciaoiaoi' },
    // { name: 'hi' },
    // { name: 'hi' },
    // { name: 'hi' },
    // { name: 'hcciaoiaoi' },
    // { name: 'hi' },
    // { name: 'hi' },
    { name: 'hey' },
    { name: 'ciao' },
  ];

  wordData: IWord = {
    name: this.FoundWord,
    description: this.FoundWordDescription,
    synonyms : this.foundWordSynonyms
  }

  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  searchWord(word: string) {
    this.wordFound = true;
    // api call
    alert(word);
    this.wordToSearch = "";
  }

  addNewWord() {
    // open dialog for adding new word, so pass existind data as null
    const dialogRef = this.dialog.open(AddEditWordComponent, {
      width: '800px',
      height: '600px',
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
      height: '600px',
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
}
