import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContestComponent } from './contest/contest.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './core/material.module';
import { TopMenuComponent } from './core/top-menu/top-menu.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    ContestComponent,
    NotFoundComponent,
    MainPageComponent,
    TopMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
