import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-new-earner',
  templateUrl: './new-earner.component.html',
  styleUrls: ['./new-earner.component.scss']
})
export class NewEarnerComponent implements OnInit{
  form: FormGroup;
  types: string[] = ['Recruitment', 'Sales', 'Event', 'Sharing', 'Certification'];
  visibleForList: string[] = ['Everyone', 'sheer Employee']
  visibleFor!: string;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      'name': [null],
      'points': [null],
      'description': [null],
      'visible-for': [null],
    });

   }

   ngOnInit(): void {

  }

  radioChange(event: MatRadioChange) {
    this.visibleFor = event.value;
    console.log(event.value);
}
  onTypesChange(options: MatListOption[]) {

  }

}
