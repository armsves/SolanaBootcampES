import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => 
        import('./home-page.component').then(m => m.HomePageComponent),
    },
    {
        path: 'balance',
        loadComponent: () => 
        import('./balancePageComponent').then(m => m.BalancePageComponent),
    },
    {
        path: 'history',
        loadComponent: () => 
        import('./historyPageComponent').then(m => m.HistoryPageComponent),
    },
    {
        path: '**',
        redirectTo: '',
    }
];