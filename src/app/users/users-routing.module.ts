import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInfoComponent } from './user-info/user-info.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: UsersComponent },
  { path: 'info/:name', component: UserInfoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
