import {Directive, ElementRef, Renderer, Input, AfterViewInit, AfterViewChecked, HostListener, OnInit, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[fittext]'
})
export class Ng2FittextDirective implements AfterViewInit, OnInit, OnChanges, AfterViewChecked {

  @Input('fittext') fittext: any;
  @Input('activateOnResize') activateOnResize: boolean;
  @Input('container') container: any;
  @Input('activateOnInputEvents') activateOnInputEvents: boolean;
  @Input('useMaxFontSize') useMaxFontSize: boolean;
  @Input('minFontSize') minFontSize = 7;
  @Input('modelToWatch') modelToWatch: any;
  private maxFontSize: number = 1000;
  private fontSize: number = 0;
  private speed: number = 1.05;

  constructor(public el: ElementRef, public renderer: Renderer) {
  }

  setFontSize(fontSize) {
    if (fontSize < this.minFontSize) {
      // force that font size will never be lower than minimal allowed font size
      fontSize = this.minFontSize;
    }

    this.fontSize = fontSize;
    return this.el.nativeElement.style.setProperty('font-size', (fontSize).toString() + 'px');
  }

  calculateFontSize(fontSize, speed) {
    // TODO Do with Gauss
    return Math.floor(fontSize / speed);
  }

  checkOverflow(parent: any, children: any) {

    let overflowX = children.scrollWidth - parent.clientWidth;
    let overflowY = children.clientHeight - parent.clientHeight;
    return (overflowX > 1 || overflowY > 1);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.activateOnResize && this.fittext) {
      if (this.activateOnInputEvents && this.fittext) {
        this.setFontSize(this.container ? this.container.clientHeight : this.el.nativeElement.parentElement.clientHeight);
      } else {
        this.setFontSize(this.container ? this.container.clientWidth : this.el.nativeElement.parentElement.clientWidth);
      }

      this.ngAfterViewInit();
    }
  }

  @HostListener('input', ['$event'])
  onInputEvents() {
    if (this.activateOnInputEvents && this.fittext) {
      this.setFontSize(this.container ? this.container.clientHeight : this.el.nativeElement.parentElement.clientHeight);
      this.ngAfterViewInit();
    }
  }

  ngOnInit() {
    if (this.useMaxFontSize) {
      this.maxFontSize = parseInt(window.getComputedStyle(this.container ? this.container : this.el.nativeElement.parentElement).fontSize, null);
    }

    if (this.fittext) {
      this.setFontSize(this.maxFontSize);
    }

    this.el.nativeElement.style.setProperty('will-change', 'content');
  }

  ngAfterViewInit() {
    if (this.fittext) {
      let overflow = this.container ? this.checkOverflow(this.container, this.el.nativeElement)
          : this.checkOverflow(this.el.nativeElement.parentElement, this.el.nativeElement);
      if (overflow) {
        if (this.fontSize > this.minFontSize) {
          // iterate only until font size is bigger than minimal value
          this.setFontSize(this.calculateFontSize(this.fontSize, this.speed));
          this.ngAfterViewInit();
        }
      } else {
        if (this.useMaxFontSize) {
          if (this.fontSize > this.maxFontSize) {
            this.maxFontSize = parseInt(window.getComputedStyle(this.container ? this.container : this.el.nativeElement.parentElement).fontSize, null);
            this.setFontSize(this.maxFontSize);
          }
        }
      }
    }
  }

  ngOnChanges(changes: any): void {
    if (changes.modelToWatch) {
      // change of model to watch - call ngAfterViewInit where is implemented logic to change size
      setTimeout(_ => this.ngAfterViewInit() );
    }
  }

  ngAfterViewChecked() {
    if (this.fontSize > this.minFontSize) {
      this.setFontSize(this.container ? this.container.clientHeight : this.el.nativeElement.parentElement.clientHeight);
      this.ngAfterViewInit();
    }
  }
}
