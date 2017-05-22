import {Directive, ElementRef, Renderer, Input, AfterViewInit, HostListener, OnInit} from '@angular/core';

@Directive({
  selector: '[fittext]'
})
export class Ng2FittextDirective implements AfterViewInit, OnInit {

  @Input('fittext') fittext: any;
  @Input('container') container: any;
  @Input('activateOnResize') activateOnResize: boolean;
  @Input('activateOnInputEvents') activateOnInputEvents: boolean;
  private fontSize: number = 0;
  private speed: number = 1.05;

  constructor(public el: ElementRef, public renderer: Renderer) {
  }

  setFontSize(fontSize) {
    this.fontSize = fontSize;
    return this.el.nativeElement.style.setProperty('font-size', (fontSize).toString()+'px');
  }

  calculateFontSize(fontSize, speed){
    // TODO Do with Gauss
    return Math.floor(fontSize/speed);
  }

  checkOverflow(parent:any, children:any) {
    let overflowX = children.scrollWidth - parent.clientWidth;
    let overflowY = children.clientHeight - parent.clientHeight;
    return (overflowX > 1 || overflowY > 1);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if(this.activateOnResize && this.fittext) {
      if(this.activateOnInputEvents && this.fittext) {
          this.setFontSize(this.container.clientHeight);
      } else{
        this.setFontSize(this.container.clientWidth);
      }
      this.ngAfterViewInit();
    }
  }

  @HostListener('input', ['$event'])
  onInputEvents() {
    if(this.activateOnInputEvents && this.fittext) {
        this.setFontSize(this.container.clientHeight);
        this.ngAfterViewInit();
    }
  }

  ngOnInit() {
    if (this.fittext) {
      if(this.activateOnInputEvents) {
        this.setFontSize(this.container.clientHeight);
      } else {
        this.setFontSize(this.container.clientWidth);
      }
    }
    this.el.nativeElement.style.setProperty('will-change', 'content');
  }

  ngAfterViewInit() {
    if (this.fittext) {
      let overflow = this.checkOverflow(this.container, this.el.nativeElement);
      if(overflow) {
        this.setFontSize(this.calculateFontSize(this.fontSize, this.speed));
        this.ngAfterViewInit();
      }
    }
  }
}
