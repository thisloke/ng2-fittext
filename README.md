<h1 align="center">
  <img src="logo.svg" alt="" width="200" /><br />
  Angular FitText
</h1>

<p align="center">An Angular 2+ directive, written in pure TypeScript (without jQuery!), to automatically scale the font size of an element so that it fits within its parent container.</p>

[![Download via NPM](https://img.shields.io/npm/v/ng2-fittext.svg)](https://www.npmjs.com/package/ng2-fittext)
![Angular](https://img.shields.io/badge/Angular-17-green.svg)
![Build Status](https://github.com/thisloke/ng2-fittext/actions/workflows/tests.yml/badge.svg)
![Contributions welcome](https://img.shields.io/badge/contributions-welcome-green.svg)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Demo
Check out the live demo: [ng2-fittext Demo](https://stackblitz.com/edit/stackblitz-starters-7ghzat?file=src%2Fmain.ts)
<p align="center">
  <img src="ng2-fittext-example.gif" alt="ng2 fittext example" border="0" />
</p>

## Installation

Install the library using npm:

```
$ npm install --save ng2-fittext
```

### Usage

1. Import the module in your Angular application:
```
import { Ng2FittextModule } from "ng2-fittext";

@NgModule({
  imports: [Ng2FittextModule]
})
```

2. Use the directive in your components:
```
import { Component } from '@angular/core';

@Component({
  selector: 'label',
  template: `
    <div #container>
      <div [fittext]="true" [activateOnResize]="true" [container]="container">Bla bla bla...</div>
    </div>
  `
})
export class LabelComponent {}
```

### Examples

Fit to the parent element (works if you have a variable number of elements between your element and its parent):

```
import { Component } from '@angular/core';

@Component({
  selector: 'label',
  template: `
    <div>
      <div [fittext]="true" [activateOnResize]="true">Bla bla bla...</div>
    </div>
  `
})
export class LabelComponent {}
```

**NEW! Support for auto-resize input box:**

```
import { Component } from '@angular/core';

@Component({
  selector: 'inputbox',
  template: `
    <div #container>
      <input [fittext]="true" [activateOnResize]="true" [container]="container" [activateOnInputEvents]="true">
    </div>
  `
})
export class InputBoxComponent {}
```

**NEW! Support for maxFontSize:**

```
import { Component } from '@angular/core';

@Component({
  selector: 'inputbox',
  template: `
    <div>
      <input [fittext]="true" [activateOnResize]="true" [activateOnInputEvents]="true" [minFontSize]="40" [maxFontSize]="100">
    </div>
  `
})
export class InputBoxComponent {}
```

Input Parameters:

| Parameter                       | Description                                                                             | Values                        |
| ------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------- |
| fittext                         | Directive selector                                                                      | true/false                    |
| container                       | The container to fit (if not present it fits to the parent container by default)        | ElementRef                    |
| activateOnResize                | Enable/disable the autofit on window resize                                             | true or false (default false) |
| activateOnInputEvents           | Enable/disable the auto-fit in case of input box events (keydown, keyup etc..)          | true or false (default false) |
| maxFontSize                     | Maximum font size                                                                       | Number (default is 1000)      |
| **!deprecated!** useMaxFontSize | Use max font size if is true                                                            | Deprecated!                   |
| minFontSize                     | Minimum font size                                                                       | Number (default is 7)         |
| modelToWatch                    | Pass model to watch; when this model changes, font size is automatically recalculated   | Any type of model             |

Output Parameters:

| Parameter       | Description       | Values |
| --------------- | ----------------- | ------ |
| fontSizeChanged | Current font size | string |

### Development

Want to contribute? Great!
Simply, clone the repository!

I created this library because I always spent too much time solving this problem and didn't find anything on the web (as of 13/03/2017) that does this without jQuery and is easily integrable in Angular 2+.
While it might not be the best implementation, it gets the job done.

### Todos

- Write tests
- Find a performant algorithm to find the font size that fits the container better

## License

MIT

**Lorenzo I.**
