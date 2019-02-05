import {
    AfterViewChecked,
    AfterViewInit,
    Directive,
    ElementRef, HostListener,
    Input,
    OnChanges,
    OnInit,
    Renderer2
} from '@angular/core';

@Directive({
    selector: '[fittext]'
})
export class Ng2FittextDirective implements AfterViewInit, OnInit, OnChanges, AfterViewChecked {

    @Input('fittext') fittext: any;
    @Input('activateOnResize') activateOnResize: boolean;
    @Input('container') container: HTMLElement;
    @Input('activateOnInputEvents') activateOnInputEvents: boolean;
    @Input('useMaxFontSize') useMaxFontSize: boolean;
    @Input('minFontSize') minFontSize = 7;
    @Input('modelToWatch') modelToWatch: any;
    private maxFontSize = 1000;
    private fontSize = 1000;
    private speed = 1.05;
    private done = false;

    constructor(public el: ElementRef,
                public renderer: Renderer2) {}

    setFontSize(fontSize: number) {
        if (this.isVisible() && !this.done) {
            if (fontSize < this.minFontSize) {
                // force that font size will never be lower than minimal allowed font size
                fontSize = this.minFontSize;
            }

            this.fontSize = fontSize;
            return this.el.nativeElement.style.setProperty('font-size', (fontSize).toString() + 'px');
        }
    }

    calculateFontSize(fontSize: number, speed: number) {
        // TODO Do with Gauss
        return Math.floor(fontSize / speed);
    }

    checkOverflow(parent: any, children: any) {
        const overflowX = children.scrollWidth - parent.clientWidth;
        const overflowY = children.clientHeight - parent.clientHeight;
        return (overflowX > 1 || overflowY > 1);
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
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
    onInputEvents() {
        this.done = false;
        if (this.activateOnInputEvents && this.fittext) {
            this.setFontSize(this.getStartFontSizeFromHeight());
            this.ngAfterViewInit();
        }
    }

    ngOnInit() {
        this.done = false;
        if (this.useMaxFontSize) {
            const fontSize = this.getComputetStyle().fontSize;
            if (fontSize) {
                this.maxFontSize = parseInt(fontSize, undefined);
            }
        }

        if (this.fittext) {
            this.setFontSize(this.maxFontSize);
        }

        this.el.nativeElement.style.setProperty('will-change', 'content');
        this.ngAfterViewInit();
    }

    ngAfterViewInit() {
        if (this.isVisible() && !this.done) {
            if (this.fittext) {
                const overflow = this.container ? this.checkOverflow(this.container, this.el.nativeElement)
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
                            const fontSize = this.getComputetStyle().fontSize;
                            if (fontSize) {
                                this.maxFontSize = parseInt(fontSize, undefined);
                                this.setFontSize(this.maxFontSize);
                            }
                        }
                    }
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

    private getComputetStyle(): CSSStyleDeclaration {
        return window.getComputedStyle(this.container ? this.container : this.el.nativeElement.parentElement);
    }

    private getStartFontSizeFromHeight(): number {
        return this.container ? this.container.clientHeight : this.el.nativeElement.parentElement.clientHeight;
    }

    private getStartFontSizeFromWeight(): number {
        return this.container ? this.container.clientWidth : this.el.nativeElement.parentElement.clientWidth;
    }

    private isVisible(): boolean {
        return this.getStartFontSizeFromHeight() > 0;
    }
}
