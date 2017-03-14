import {Directive, ElementRef, Renderer, Input, AfterViewInit, HostListener} from '@angular/core';

@Directive({
  selector: '[fittext]'
})
export class FittextDirective implements AfterViewInit {

  @Input('fittext') fittext: any;
  @Input('container') container: any;
  @Input('onResize') activateOnResize: boolean;
  public fontSize:number = 0;
  public speed:number = 1.05;

  constructor(public el: ElementRef, public renderer: Renderer) {
  }

  checkOverflowX(parent:any, children:any) {
    return children.clientHeight > parent.clientHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if(this.activateOnResize){
      this.fontSize = 0;
      this.ngAfterViewInit();
    }
  }

  ngAfterViewInit() {
    if (this.fittext) {
      if(this.fontSize == 0){
        this.fontSize = this.container.clientWidth;
        this.el.nativeElement.style.setProperty('font-size', (this.fontSize).toString()+'px');
      }
      let overflow = this.checkOverflowX(this.container, this.el.nativeElement);
      if(overflow) {
        this.fontSize = Math.floor(this.fontSize/this.speed);
        this.el.nativeElement.style.setProperty('font-size', (this.fontSize).toString()+'px');
        this.ngAfterViewInit();
      }
    }
  }
}
