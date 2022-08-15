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
    this.candidateService
      .addCandidate({ firstName, lastName, fullName } as Candidate)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
