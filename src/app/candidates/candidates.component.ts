/* eslint-disable no-debugger */
import { Component, OnInit } from '@angular/core';
import { Candidate } from './candidate';
import { CandidateService } from '../candidate.service';
import { MessageService } from '../message.service';
import { combineLatest, from, Observable, of, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent implements OnInit {
  public candidates: Candidate[] = [];
  public searchField: FormControl;
  public searchedCandidates: Candidate[];

  constructor(
    private candidateService: CandidateService,
    private messageService: MessageService
  ) {
    this.searchField = new FormControl('');
    const searchTerm$: Observable<string> = this.searchField.valueChanges.pipe(
      startWith(this.searchField.value)
    );

    /*combineLatest([of(this.candidates), searchTerm$])
      .pipe(
        map(([candidates, searchTerm]) =>
          candidates.filter(
            (candidate) =>
              searchTerm === '' ||
              candidate.firstName.includes(searchTerm) ||
              candidate.lastName.includes(searchTerm)
          )
        )
      )
      .subscribe((c) => (this.searchedCandidates = c));*/
  }

  ngOnInit() {
    this.getCandidates();
  }

  getCandidates(): void {
    this.candidateService
      .getCandidates()
      .subscribe((candidates) => (this.candidates = candidates));
  }

  add(firstName: string, lastName: string): void {
    firstName = firstName.trim();
    lastName = lastName.trim();
    const fullName = firstName + ' ' + lastName;
    if (!firstName || !lastName) {
      return;
    }
    this.candidateService
      .addCandidate({ firstName, lastName, fullName } as Candidate)
      .subscribe((candidate) => {
        this.candidates.push(candidate);
      });
  }

  delete(candidate: Candidate): void {
    this.candidates = this.candidates.filter((c) => c !== candidate);
    this.candidateService.deleteCandidate(candidate.id).subscribe();
  }

  logList(): void {
    for (const c of this.candidates) {
      console.log(
        'id: ' +
          c.id +
          ' firstName: ' +
          c.firstName +
          ' lastName: ' +
          c.lastName +
          ' fullName: ' +
          c.fullName
      );
    }
  }
}
