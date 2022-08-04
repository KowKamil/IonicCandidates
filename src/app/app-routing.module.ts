import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CandidateDetailComponent } from './candidate-detail/candidate-detail.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { TopCandidatesComponent } from './top-candidates/top-candidates.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/candidates',
    pathMatch: 'full',
  },
  {
    path: 'candidates',
    component: CandidatesComponent,
  },
  {
    path: 'dashboard',
    component: TopCandidatesComponent,
  },
  {
    path: 'detail/:id',
    component: CandidateDetailComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
