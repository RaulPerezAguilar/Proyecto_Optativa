import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'ajustes',
    loadComponent: () => import('./pages/ajustes/ajustes.page').then((m) => m.AjustesPage),
  },
  {
    // Ruta con parámetro: /detalle/1, /detalle/2...
    path: 'detalle/:id',
    loadComponent: () => import('./pages/detalle/detalle.page').then((m) => m.DetallePage),
  },
  {
    // Cualquier otra URL vuelve a Home
    path: '**',
    redirectTo: 'home',
  },
];
