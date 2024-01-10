import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Ng2FittextModule } from 'lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Ng2FittextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
