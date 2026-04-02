import type { Routes } from '@angular/router';
import { authGuard, adminGuard, superAdminGuard, publicGuard } from './core/guards';

export const routes: Routes = [
  //* Auth routes (login) - only for non-authenticated users
  {
    path: 'auth',
    canActivate: [publicGuard],
    loadChildren: () => import('./features/auth/auth.routes'),
  },

  //* Super Admin routes - requires super_admin role
  {
    path: 'super-admin',
    canActivate: [authGuard, superAdminGuard],
    loadChildren: () => import('./features/super-admin/super-admin.routes'),
  },

  //* Admin routes - requires admin or super_admin role
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    loadChildren: () => import('./features/admin/admin.routes'),
  },

  //* Public routes (existing)
  // {
  //   path: 'team/:teamId',
  //   pathMatch: 'full',
  //   loadComponent: () => import("./features/team/pages/details/team-details.page")
  // },
  // {
  //   path: 'match/:matchId',
  //   loadComponent: () => import('./features/matches/pages/match-details/match-details'),
  //   title: 'Match Details',
  // },
  {
    path: 'live-match',
    loadComponent: () => import('./features/matches/pages/live-match-logger/live-match-logger'),
    title: 'Live Match Logger',
  },
  {
    path: 'matches',
    loadComponent: () => import('./features/matches/pages/matches-list/matches-list'),
    title: 'Matches',
  },
  {
    path: 'team/:id',
    loadComponent: () => import('./features/user/page/team-detail.page'),
    title: 'Team Detail',
  },
  {
    path: 'player/:id',
    loadComponent: () => import('./features/user/page/player-detail.page'),
    title: 'Player Detail',
  },
  {
    path: 'championship/:id',
    loadComponent: () => import('./features/user/page/championship-detail.page'),
    title: 'Championship Detail',
  },
  {
    path: 'ui-showcase',
    loadComponent: () =>
      import('./features/ui-dumb/pages/ui-showcase.page').then((m) => m.UiShowcasePage),
    title: 'UI Showcase - IcePlay',
  },
  {
    path: 'cup/:cupName',
    loadComponent: () => import('./features/cup/cup.page'),
    title: 'Cup Overview - IcePlay',
  },

  //* Catch-all redirect
  {
    path: '**',
    redirectTo: 'matches',
  },
];
