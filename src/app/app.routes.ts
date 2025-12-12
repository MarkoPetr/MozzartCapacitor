import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'results',
    loadComponent: () => import('./results/results.page').then( m => m.ResultsPage)
  },
];
