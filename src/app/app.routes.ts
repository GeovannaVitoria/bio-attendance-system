import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Colaboradores } from './pages/colaboradores/colaboradores';
import { Login } from './pages/login/login';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'dashboard', component: Dashboard },
    { path: 'colaboradores/:id', component: Colaboradores },
];
