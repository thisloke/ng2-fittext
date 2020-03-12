import { Ng2FittextDirective } from '../ng2-fittext.directive';
import { Renderer2, ElementRef } from '@angular/core';

describe('Class: Ng2FittextDirective', () => {
  let ng2FittextDirective: Ng2FittextDirective;
  let elMock: ElementRef;
  let rendererMock: Renderer2;

  beforeEach(() => {
    elMock = {} as ElementRef;
    rendererMock = {} as Renderer2;
    ng2FittextDirective = new Ng2FittextDirective(elMock, rendererMock);
  });

  describe('Method: setFontSize', () => {
    let newFontSize: number;
    let isVisibleSpy: jasmine.Spy;
    let isDoneSpy: jasmine.Spy;

    beforeEach(() => {
      newFontSize = 100;
      isVisibleSpy = spyOn(ng2FittextDirective, 'isVisible').and.returnValue(
        true
      );
      isDoneSpy = spyOn(ng2FittextDirective, 'isDone').and.returnValue(false);
      elMock.nativeElement = {
        style: {
          setProperty: () => {},
        },
      };
    });

    it('Should not change the font size if the element is not visible', () => {
      isVisibleSpy.and.returnValue(false);
      const previousFontSize: number = ng2FittextDirective.getFontSize();
      ng2FittextDirective.setFontSize(newFontSize);
      expect(ng2FittextDirective.getFontSize()).toEqual(previousFontSize);
    });

    it('Should not change the font size if the fitting operation is done', () => {
      isDoneSpy.and.returnValue(true);
      const previousFontSize: number = ng2FittextDirective.getFontSize();
      ng2FittextDirective.setFontSize(newFontSize);
      expect(ng2FittextDirective.getFontSize()).toEqual(previousFontSize);
    });

    it('Should use the minFontSize property value if the specified font size is smaller', () => {
      const minFontSize: number = ng2FittextDirective.minFontSize;
      newFontSize = 5;
      ng2FittextDirective.setFontSize(newFontSize);
      const currentFontSize: number = ng2FittextDirective.getFontSize();
      expect(currentFontSize).toEqual(minFontSize);
    });

    it('Should use the maxFontSize property value if the specified font size is bigger', () => {
      const maxFontSize: number = ng2FittextDirective.maxFontSize;
      newFontSize = 1001;
      ng2FittextDirective.setFontSize(newFontSize);
      const currentFontSize: number = ng2FittextDirective.getFontSize();
      expect(currentFontSize).toEqual(maxFontSize);
    });

    it('Should set a new fontSize value', () => {
      newFontSize = 500;
      ng2FittextDirective.setFontSize(newFontSize);
      const currentFontSize: number = ng2FittextDirective.getFontSize();
      expect(currentFontSize).toEqual(newFontSize);
    });

    it('Should emit the font size change', () => {
      newFontSize = 500;
      spyOn(ng2FittextDirective.fontSizeChanged, 'emit');
      ng2FittextDirective.setFontSize(newFontSize);
      const currentFontSize: number = ng2FittextDirective.getFontSize();
      expect(ng2FittextDirective.fontSizeChanged.emit).toHaveBeenCalledWith(
        newFontSize
      );
    });

    it('Should update the nativeElement with the new font size', () => {
      newFontSize = 500;
      spyOn(ng2FittextDirective.el.nativeElement.style, 'setProperty');
      ng2FittextDirective.setFontSize(newFontSize);
      const currentFontSize: number = ng2FittextDirective.getFontSize();
      expect(
        ng2FittextDirective.el.nativeElement.style.setProperty
      ).toHaveBeenCalledWith('font-size', `${newFontSize}px`);
    });
  });
});
