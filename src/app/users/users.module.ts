import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserStatusComponent } from './user-status/user-status.component';
import { UsersComponent } from './users.component';
import { MaterialModule } from '../core/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from './users.service';
import { UserStatisticsComponent } from './user-statistics/user-statistics.component';

@NgModule({
    imports: [
      CommonModule,
      UsersRoutingModule,
      MaterialModule,
      ReactiveFormsModule,
      FormsModule
    ],
    declarations: [
        UsersComponent,
        UserInfoComponent,
        UserStatusComponent,
        UserStatisticsComponent,
    ],
    providers: [UsersService],
    entryComponents: [UserStatisticsComponent]
})
export class UsersModule { }
