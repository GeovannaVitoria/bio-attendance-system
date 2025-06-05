import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Colaboradores } from './colaboradores/colaboradores';
import { Dashboard } from './dashboard/dashboard';
import { Login } from './login/login';

@NgModule({
  declarations: [
    Colaboradores,
    Dashboard,
    Login
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class PagesModule {}