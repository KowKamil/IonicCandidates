import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Candidate } from '../candidates/candidate';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.scss'],
})
export class CandidateDetailComponent implements OnInit {
  @Input() public candidate?: Candidate;

  public ionicForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private candidateService: CandidateService,
    private location: Location,
    public formBuilder: FormBuilder
  ) {
    this.ionicForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
    });
  }

  public ngOnInit(): void {
    this.getCandidate();
  }

  getCandidate(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.candidateService
      .getCandidate(id)
      .subscribe((candidate) => (this.candidate = candidate));
  }

  goBack(): void {
    this.location.back();
  }

  logValue() {
    console.log(this.ionicForm.value);
  }

  save(): void {
    if (this.candidate) {
      //this.candidate.id=this.ionicForm.value.id;
      this.candidate.firstName = this.ionicForm.value.firstName;
      this.candidate.lastName = this.ionicForm.value.lastName;
      this.candidateService
        .updateCandidate(this.candidate)
        .subscribe(() => this.goBack());
    }
  }
}
