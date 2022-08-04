import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../candidate.service';
import { Candidate } from '../candidates/candidate';

@Component({
  selector: 'app-top-candidates',
  templateUrl: './top-candidates.component.html',
  styleUrls: ['./top-candidates.component.scss'],
})
export class TopCandidatesComponent implements OnInit {
  candidates: Candidate[] = [];
  constructor(private candidateService: CandidateService) {}

  ngOnInit() {
    this.getCandidates();
  }
  getCandidates(): void {
    this.candidateService
      .getCandidates()
      .subscribe((candidates) => (this.candidates = candidates.slice(0, 3)));
  }
}
