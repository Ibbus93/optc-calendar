import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DailyComponent } from './daily/daily.component';
import { NotfoundComponent } from './notfound/notfound.component';

const appRoutes: Routes = [
  {
    path: 'daily',
    component: DailyComponent,
    data: { title: 'Daily Agenda' }
  },
  {
    path: '',
    redirectTo: '/daily',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DailyComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
