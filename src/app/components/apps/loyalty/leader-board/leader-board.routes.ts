import { Routes } from '@angular/router';
import { authGuard } from '../../../../core/auth/auth.guard';



export const LEADER_BOARD_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./leader-board-list/leader-board-list.component').then(m => m.leaderBoardListComponent), title: 'Leader Board List', canActivate: [authGuard] },
  { path: 'leader-board-add', loadComponent: () => import('./leader-board-add/leader-board-add.component').then(m => m.leaderBoardAddComponent), title: 'Leader Board Add', canActivate: [authGuard] },
  { path: 'leader-board-detail/:id/:edit', loadComponent: () => import('./leader-board-add/leader-board-add.component').then(m => m.leaderBoardAddComponent), title: 'Leader Board Edit', canActivate: [authGuard] },
  { path: 'leader-board-detail/:id', loadComponent: () => import('./leader-board-detail/leader-board-detail.component').then(m => m.leaderBoardDetailComponent), title: 'Leader Board Detail', canActivate: [authGuard] },
];
