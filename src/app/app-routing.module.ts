import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './admin/users/users.component';
import { BooksComponent } from './admin/books/books.component';
import { ShopbookComponent } from './shopbook/shopbook.component';
import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [
  { path: 'admin/books', canActivate: [AuthGuard], component: BooksComponent },
  { path: 'admin/users', canActivate: [AuthGuard], component: UsersComponent },
  { path: 'shop', component: ShopbookComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
