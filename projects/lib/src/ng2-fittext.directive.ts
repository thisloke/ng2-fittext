import {
  AfterViewChecked,
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[fittext]',
})
export class Ng2FittextDirective
  implements AfterViewInit, OnInit, OnChanges, AfterViewChecked {
  @Input('fittext') fittext: any;
  @Input('activateOnResize') activateOnResize: boolean = true;
  @Input('container') container: HTMLElement | null = null;
  @Input('activateOnInputEvents') activateOnInputEvents: boolean = false;
  @Input('minFontSize') minFontSize = 7;
  @Input('maxFontSize') maxFontSize = 1000;

  /* Deprecated */
  @Input('useMaxFontSize') useMaxFontSize = true;

  @Input('modelToWatch') modelToWatch: any;

  @Output() fontSizeChanged: EventEmitter<number> = new EventEmitter();

  private fontSize = 1000;
  private speed = 1.05;
  private done = false;

  constructor(public el: ElementRef<HTMLElement>) {}

  setFontSize(fontSize: number): void {
    if (this.isVisible() && !this.isDone()) {
      if (fontSize < this.minFontSize) {
        fontSize = this.minFontSize;
      }
      if (fontSize > this.maxFontSize) {
        fontSize = this.maxFontSize;
      }
      this.fontSize = fontSize;
      this.fontSizeChanged.emit(fontSize);
      this.el.nativeElement.style.setProperty(
        'font-size',
        fontSize.toString() + 'px'
      );
    }
  }

  getFontSize(): number {
    return this.fontSize;
  }

  calculateFontSize(fontSize: number, speed: number): number {
    return Math.floor(fontSize / speed);
  }

  checkOverflow(parent: HTMLElement, children: HTMLElement): boolean {
    return (
      this.hasXAxisOverflow(parent, children) ||
      this.hasYAxisOverflow(parent, children)
    );
  }

  hasXAxisOverflow(parent: HTMLElement, children: HTMLElement): boolean {
    return children.scrollWidth - parent.clientWidth > 0;
  }

  hasYAxisOverflow(parent: HTMLElement, children: HTMLElement): boolean {
    return children.clientHeight - parent.clientHeight > 0;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.done = false;
    if (this.activateOnResize && this.fittext) {
      if (this.activateOnInputEvents && this.fittext) {
        this.setFontSize(this.getStartFontSizeFromHeight());
      } else {
        this.setFontSize(this.getStartFontSizeFromWeight());
      }

      this.ngAfterViewInit();
    }
  }

  @HostListener('input', ['$event'])
  onInputEvents(event: Event) {
    this.done = false;
    if (this.activateOnInputEvents && this.fittext) {
      this.setFontSize(this.getStartFontSizeFromHeight());
      this.ngAfterViewInit();
    }
  }

  ngOnInit() {
    this.done = false;
    this.el.nativeElement.style.setProperty('will-change', 'content');
    this.ngAfterViewInit();
  }

  ngAfterViewInit() {
    if (this.isVisible() && !this.isDone()) {
      if (this.fittext) {
        if (this.hasOverflow()) {
          if (this.fontSize > this.minFontSize) {
            // iterate only until font size is bigger than minimal value
            this.setFontSize(this.calculateFontSize(this.fontSize, this.speed));
            this.ngAfterViewInit();
          }
        } else {
          this.done = true;
        }
      }
    }
  }

  ngOnChanges(changes: any): void {
    if (changes.modelToWatch) {
      // change of model to watch - call ngAfterViewInit where is implemented logic to change size
      setTimeout(() => {
        this.done = false;
        this.setFontSize(this.maxFontSize);
        this.ngAfterViewInit();
      });
    }
  }

  ngAfterViewChecked() {
    if (this.fontSize > this.minFontSize) {
      this.setFontSize(this.getStartFontSizeFromHeight());
      this.ngAfterViewInit();
    }
  }

  getStartFontSizeFromHeight(): number {
    return this.container
      ? this.container.clientHeight
      : this.el.nativeElement.parentElement!.clientHeight;
  }

  private getStartFontSizeFromWeight(): number {
    return this.container
      ? this.container.clientWidth
      : this.el.nativeElement.parentElement!.clientWidth;
  }

  isDone(): boolean {
    return this.done;
  }

  isVisible(): boolean {
    return this.getStartFontSizeFromHeight() > 0;
  }

  hasOverflow(): boolean {
    return this.container
      ? this.checkOverflow(this.container, this.el.nativeElement)
      : this.checkOverflow(
          this.el.nativeElement.parentElement!,
          this.el.nativeElement
        );
  }
}
