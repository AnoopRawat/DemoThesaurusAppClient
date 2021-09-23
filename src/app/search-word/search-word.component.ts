import { Component, OnInit } from '@angular/core';
import { AddEditWordComponent } from '../add-edit-word/add-edit-word.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IWord, ISynonym } from '../interfaces/IWord';
import { InteractionService } from '../services/interaction.service';
import { WordService } from '../services/word.service';

@Component({
  selector: 'app-search-word',
  templateUrl: './search-word.component.html',
  styleUrls: ['./search-word.component.css']
})
export class SearchWordComponent implements OnInit {
  showAdmin: boolean = true;
  wordToSearch: string = "";
  wordSearchAndFound: number = -1;
  foundWord: IWord = {
    name: "",
    description: "",
    synonyms: []
  };

  constructor(private dialog: MatDialog,
    private interactionService: InteractionService,
    private wordService: WordService,
    private snackBar: MatSnackBar) { }

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
    if (!wordName || wordName.length < 2) {
      alert('Please enter word to search.. Minimum 2 letters.');
      return;
    }

    this.wordService.getWordByName(wordName).subscribe((Response:IWord) => {
      console.log(Response);
      if (Response != null) {
        this.foundWord = Response;
        this.wordSearchAndFound = 1;
      } else {
        this.wordSearchAndFound = 0;
      }
    }, (err) => {
      this.wordSearchAndFound = 0;
      console.log('Error while getting word by name word. See console for details. ')
      console.log(err);
    });
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
    dialogRef.afterClosed().subscribe(response => {
      if (response && response.result) {
        this.searchWord(response.wordName);
        var message = "New Word added : " + response.wordName;
        this.snackBar.open(message, "", {
          duration: 4000
        });
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
        wordData: this.foundWord
      }
    });
    dialogRef.afterClosed().subscribe(response => {
      if (response && response.result) {
        this.searchWord(response.wordName);
        var message = "Word updated to : " + response.wordName;
        this.snackBar.open(message, "", {
          duration: 4000
        });
      }
    });
  }

  deletCurrentWord() {
    if (confirm("Note : Do you want to delete this word ? If yes, then operation can not be revert. !!")) {
      this.wordService.deleteWords(this.foundWord.name).subscribe((Response) => {
        console.log(Response);
        this.interactionService.AddEvent('RefreshWordList');
        this.searchWord( this.foundWord.name);
        var message = "Word deleted : " + this.foundWord.name;
        this.snackBar.open(message, "", {
          duration: 4000
        });
      }, (err) => {
        console.log('Error while deleting word. See console for details. ')
        console.log(err);
      });
    }
  }
}
