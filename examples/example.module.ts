import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ExampleComponent } from './example.component';
import { Ng2FittextModule } from '../index';

@NgModule({
    declarations: [
        ExampleComponent
    ],
    imports: [
        BrowserModule,
        Ng2FittextModule
    ],
    providers: [],
    bootstrap: [ExampleComponent]
})
export class ExampleModule { }
