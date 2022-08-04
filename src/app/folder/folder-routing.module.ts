import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatesComponent } from '../candidates/candidates.component';
import { TopCandidatesComponent } from '../top-candidates/top-candidates.component';

import { FolderPage } from './folder.page';

const routes: Routes = [
  {
    path: 'candidates',
    component: CandidatesComponent,
  },
  {
    path: 'dashboard',
    component: TopCandidatesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
