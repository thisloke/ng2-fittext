import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {Ng2FittextDirective} from './ng2-fittext.directive';

@NgModule({
  declarations: [
    AppComponent,
    Ng2FittextDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
