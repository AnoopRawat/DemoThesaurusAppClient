import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { ISynonym, IWord } from '../interfaces/iword';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-add-edit-word',
  templateUrl: './add-edit-word.component.html',
  styleUrls: ['./add-edit-word.component.css']
})
export class AddEditWordComponent implements OnInit {
  isEditMode: boolean = false;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true;
  selectable = true;
  removable = true;
  wordData = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddEditWordComponent>) { }

  ngOnInit(): void {
    this.wordData = this.data.wordData
    console.log("word data : ", this.data.wordData)
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
    console.log(this.data.wordData);
  }

}
