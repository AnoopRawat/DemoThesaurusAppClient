import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { ISynonym, IWord } from '../interfaces/IWord';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { WordService } from '../services/word.service';

@Component({
  selector: 'app-add-edit-word',
  templateUrl: './add-edit-word.component.html',
  styleUrls: ['./add-edit-word.component.css']
})
export class AddEditWordComponent implements OnInit {
  isEditMode: boolean = false;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddEditWordComponent>,
    private wordService: WordService) { }

  ngOnInit(): void {
    this.isEditMode = this.data.wordData != null;
    if (!this.isEditMode) {
      this.data.wordData = {
        name: "",
        description: "",
        synonyms: []
      }
    }
  }

  addSynonym(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our synonyms list
    if (value) {
      this.data.wordData.synonyms.push({ name: value });
    }
    // Clear the input value
    event.chipInput!.clear();
  }


  remove(synonym: ISynonym): void {
    const index = this.data.wordData.synonyms.indexOf(synonym);
    if (index >= 0) {
      this.data.wordData.synonyms.splice(index, 1);
    }
  }

  addEditWord() {
    if (!this.isEditMode) {
      this.wordService.addWord(this.data.wordData).subscribe((Response) => {
        console.log(Response);
      }, (err) => {
        console.log('Error while adding word. See console for details. ')
        console.log(err);
      });
    } else {
      this.wordService.updateWord(this.data.wordData).subscribe((Response) => {
        console.log(Response);
      }, (err) => {
        console.log('Error while updating word. See console for details.')
        console.log(err);
      });
    }
  }

}
