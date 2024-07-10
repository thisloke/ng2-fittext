import { Ng2FittextDirective } from './ng2-fittext.directive';
import { Renderer2, ElementRef } from '@angular/core';

describe('Class: Ng2FittextDirective', () => {
  let ng2FittextDirective: Ng2FittextDirective;
  let elMock: ElementRef;

  beforeEach(() => {
    elMock = {} as ElementRef;
    ng2FittextDirective = new Ng2FittextDirective(elMock);
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
      expect(ng2FittextDirective.fontSizeChanged.emit).toHaveBeenCalledWith(
        newFontSize
      );
    });

    it('Should update the nativeElement with the new font size', () => {
      newFontSize = 500;
      spyOn(ng2FittextDirective.el.nativeElement.style, 'setProperty');
      ng2FittextDirective.setFontSize(newFontSize);
      expect(
        ng2FittextDirective.el.nativeElement.style.setProperty
      ).toHaveBeenCalledWith('font-size', `${newFontSize}px`);
    });
  });

  describe('Method: getFontSize', () => {
    it('Should return the current font size', () => {
      expect(ng2FittextDirective.getFontSize()).toEqual(1000);
    });
  });

  describe('Method: calculateFontSize', () => {
    it('Should return the font size rounded down', () => {
      expect(ng2FittextDirective.calculateFontSize(10, 3)).toEqual(3);
      expect(ng2FittextDirective.calculateFontSize(9, 3)).toEqual(3);
      expect(ng2FittextDirective.calculateFontSize(8, 3)).toEqual(2);
    });
  });

  describe('Method: checkOverflow', () => {
    let parentElementMock: HTMLElement;
    let childrenElementMock: HTMLElement;
    let hasXAxisOverflowSpy: jasmine.Spy;
    let hasYAxisOverflowSpy: jasmine.Spy;

    beforeEach(() => {
      parentElementMock = {} as HTMLElement;
      childrenElementMock = {} as HTMLElement;
      hasXAxisOverflowSpy = spyOn(
        ng2FittextDirective,
        'hasXAxisOverflow'
      ).and.returnValue(false);
      hasYAxisOverflowSpy = spyOn(
        ng2FittextDirective,
        'hasYAxisOverflow'
      ).and.returnValue(false);
    });

    it('Should return false if no overflow is present', () => {
      expect(
        ng2FittextDirective.checkOverflow(
          parentElementMock,
          childrenElementMock
        )
      ).toBe(false);
    });

    it('Should return true if x axis has overflow', () => {
      hasXAxisOverflowSpy.and.returnValue(true);
      expect(
        ng2FittextDirective.checkOverflow(
          parentElementMock,
          childrenElementMock
        )
      ).toBe(true);
    });

    it('Should return true if y axis has overflow', () => {
      hasYAxisOverflowSpy.and.returnValue(true);
      expect(
        ng2FittextDirective.checkOverflow(
          parentElementMock,
          childrenElementMock
        )
      ).toBe(true);
    });
  });

  describe('Method: getStartFontSizeFromHeight', () => {
    it('Should return the container clientHeight value if the container is present', () => {
      const containerClientHeight = 10;
      ng2FittextDirective.container = {
        clientHeight: containerClientHeight,
      } as HTMLElement;
      expect(ng2FittextDirective.getStartFontSizeFromHeight()).toEqual(
        containerClientHeight
      );
    });

    it('Should return the parentElement clientHeight value if no container is present', () => {
      const parentlientHeight = 11;
      elMock.nativeElement = {
        parentElement: {
          clientHeight: parentlientHeight,
        },
      } as HTMLElement;
      expect(ng2FittextDirective.getStartFontSizeFromHeight()).toEqual(
        parentlientHeight
      );
    });
  });

  describe('Method: isDone', () => {
    it('Should return the done property value', () => {
      const defaultDoneValue = false;
      expect(ng2FittextDirective.isDone()).toBe(defaultDoneValue);
    });
  });

  describe('Method: isVisible', () => {
    it('Should return the true if getStartFontSizeFromHeight() is greater than zero', () => {
      spyOn(ng2FittextDirective, 'getStartFontSizeFromHeight').and.returnValue(
        1
      );
      expect(ng2FittextDirective.isVisible()).toBe(true);
    });

    it('Should return the false if getStartFontSizeFromHeight() is smaller or equal to zero', () => {
      const spy = spyOn(
        ng2FittextDirective,
        'getStartFontSizeFromHeight'
      ).and.returnValue(0);
      expect(ng2FittextDirective.isVisible()).toBe(false);
      spy.and.returnValue(-1);
      expect(ng2FittextDirective.isVisible()).toBe(false);
    });
  });

  describe('Method: hasXAxisOverflow', () => {
    let parentElementMock: HTMLElement;
    let childrenElementMock: HTMLElement;

    beforeEach(() => {
      parentElementMock = {
        clientWidth: 0,
      } as HTMLElement;
      childrenElementMock = {
        scrollWidth: 0,
      } as HTMLElement;
    });

    it('Should return false if no overflow is present on the x axis', () => {
      expect(
        ng2FittextDirective.hasXAxisOverflow(
          parentElementMock,
          childrenElementMock
        )
      ).toBe(false);
    });

    it('Should return true if overflow is present on the x axis', () => {
      childrenElementMock = {
        scrollWidth: 2,
      } as HTMLElement;
      expect(
        ng2FittextDirective.hasXAxisOverflow(
          parentElementMock,
          childrenElementMock
        )
      ).toBe(true);
    });
  });

  describe('Method: hasYAxisOverflow', () => {
    let parentElementMock: HTMLElement;
    let childrenElementMock: HTMLElement;

    beforeEach(() => {
      parentElementMock = {
        clientHeight: 0,
      } as HTMLElement;
      childrenElementMock = {
        clientHeight: 0,
      } as HTMLElement;
    });

    it('Should return false if no overflow is present on the x axis', () => {
      expect(
        ng2FittextDirective.hasYAxisOverflow(
          parentElementMock,
          childrenElementMock
        )
      ).toBe(false);
    });

    it('Should return true if overflow is present on the x axis', () => {
      childrenElementMock = {
        clientHeight: 2,
      } as HTMLElement;
      expect(
        ng2FittextDirective.hasYAxisOverflow(
          parentElementMock,
          childrenElementMock
        )
      ).toBe(true);
    });
  });

  describe('Method: hasOverflow', () => {
    let containerMock: any;
    let parentElementMock: any;

    beforeEach(() => {
      containerMock = {
        isContainer: true,
      };
      parentElementMock = {
        isParentElement: true,
      };
      ng2FittextDirective.container = { ...containerMock };
      ng2FittextDirective.el.nativeElement = {
        parentElement: { ...parentElementMock },
      } as HTMLElement;
    });

    it('Should calculate the overflow using the container if is present', () => {
      spyOn(ng2FittextDirective, 'checkOverflow').and.callFake(
        (parentElement: any, childrenElement: any) => {
          expect(parentElement).toEqual(containerMock);
          return true;
        }
      );
      expect(ng2FittextDirective.hasOverflow()).toBe(true);
    });

    it('Should calculate the overflow using the parent element if the container is not present', () => {
      if(ng2FittextDirective) {
        delete (ng2FittextDirective as any).container;
      }
      spyOn(ng2FittextDirective, 'checkOverflow').and.callFake(
        (parentElement: any, childrenElement: any) => {
          expect(parentElement).toEqual(parentElementMock);
          return true;
        }
      );
      expect(ng2FittextDirective.hasOverflow()).toBe(true);
    });
  });
});
