import { Component, OnInit } from '@angular/core';
import { Candidate } from '../candidates/candidate';
import { CandidateService } from '../candidate.service';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-candidate-add',
  templateUrl: './candidate-add.component.html',
  styleUrls: ['./candidate-add.component.scss'],
})
export class CandidateAddComponent implements OnInit {
  public ionicForm: FormGroup;
  constructor(
    private candidateService: CandidateService,
    private location: Location,
    public formBuilder: FormBuilder
  ) {
    this.ionicForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
    });
  }

  ngOnInit() {}

  add(firstName: string, lastName: string): void {
    firstName = firstName.trim();
    lastName = lastName.trim();
    const fullName = firstName + ' ' + lastName;
    if (!firstName || !lastName) {
      return;
    }
    console.log('Adding candidate named ' + fullName);
    this.candidateService
      .addCandidate({ firstName, lastName, fullName } as Candidate)
      .subscribe(() => this.goBack());
  }

  formSubmit(): void {
    console.log('formSubmit called');
    this.add(this.ionicForm.value.firstName, this.ionicForm.value.lastName);
    console.log('formSubmit finished');
  }

  goBack(): void {
    this.location.back();
  }
}
