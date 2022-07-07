import { Ng2FittextDirective } from './directives/ng2-fittext.directive';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

export { Ng2FittextDirective } from './directives/ng2-fittext.directive';

@NgModule({
  declarations: [Ng2FittextDirective],
  exports: [Ng2FittextDirective],
  imports: [CommonModule],
})
export class Ng2FittextModule {
  static forRoot() {
    return {
      ngModule: Ng2FittextModule,
      providers: [],
    };
  }
}
