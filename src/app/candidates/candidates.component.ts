/* eslint-disable no-debugger */
import { Component, OnInit } from '@angular/core';
import { Candidate } from './candidate';
import { CandidateService } from '../candidate.service';
import { MessageService } from '../message.service';
import {
  BehaviorSubject,
  combineLatest,
  from,
  Observable,
  of,
  Subject,
} from 'rxjs';
import {
  debounceTime,
  map,
  startWith,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent implements OnInit {
  public searchField: FormControl;
  public searchedCandidates$: Observable<Candidate[]>;
  public candidates$: BehaviorSubject<Candidate[]> = new BehaviorSubject([]);

  constructor(
    private candidateService: CandidateService,
    private messageService: MessageService
  ) {
    this.searchField = new FormControl('');
    const searchTerm$: Observable<string> = this.searchField.valueChanges.pipe(
      startWith(this.searchField.value)
    );
    this.searchedCandidates$ = searchTerm$.pipe(
      debounceTime(300),
      switchMap((searchTerm) =>
        searchTerm
          ? this.candidateService.searchCandidates(searchTerm)
          : this.candidates$
      )
    );
    // this.searchedCandidates$ = combineLatest([
    //   this.candidates$,
    //   searchTerm$,
    // ]).pipe(
    //   map(([candidates, searchTerm]) =>
    //     candidates.filter(
    //       (candidate) =>
    //         searchTerm === '' ||
    //         candidate.firstName
    //           .toLocaleLowerCase()
    //           .includes(searchTerm.toLocaleLowerCase()) ||
    //         candidate.lastName
    //           .toLocaleLowerCase()
    //           .includes(searchTerm.toLocaleLowerCase())
    //     )
    //   )
    // );
  }

  ngOnInit() {
    this.getCandidates();
    this.watchCandidates();
  }

  watchCandidates(): void {
    this.candidateService.watchCandidates().subscribe((candidates) => {
      this.candidates$.next(candidates);
    });
  }

  getCandidates(): void {
    this.candidateService.getCandidates().subscribe((candidates) => {
      this.candidates$.next(candidates);
    });
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
        this.candidates$.next([...this.candidates$.getValue(), candidate]);
      });
  }

  delete(candidate: Candidate): void {
    const candidates = this.candidates$
      .getValue()
      .filter((c) => c !== candidate);
    this.candidates$.next(candidates);
    this.candidateService.deleteCandidate(candidate.id).subscribe();
  }

  logList(): void {
    for (const c of this.candidates$.getValue()) {
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
