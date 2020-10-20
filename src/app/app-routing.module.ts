import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenericGuard } from './guards/generic.guard';
import { UserGuard } from './guards/user.guard';
import { LoginComponent } from './login/login.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [GenericGuard]},
  {path: 'signup', component: SignupComponent, canActivate: [GenericGuard]},
  {path: 'shopping-list', component: ShoppingListComponent, canActivate: [UserGuard]},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
