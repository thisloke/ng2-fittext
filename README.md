# ng2-fittext

An Angular2 directive written in pure typescript (and without jquery!), to autoscale the font size of an element so that it fits an upper level container.

### Demo

http://plnkr.co/edit/v0TQaYepV4E2Heur02j5?p=preview

### Installation

Install the library

```sh
$ npm install --save ng2-fittext
```

### Usage

1. Declare it in your module
   ```sh
   import {Ng2FittextModule} from "ng2-fittext";
   @NgModule({
     imports: [
       Ng2FittextModule
     ]
   })
   ```
2. Use it in your components
   ```sh
   import {Component} from '@angular/core';
   @Component({
     selector: 'label',
     template: `<div #container>
                   <div [fittext]="true" [activateOnResize]="true" [container]="container">Bla bla bla...</div>
               </div>`
   })
   export class LabelComponent {}
   ```

### Examples

Fit to the parent element (this works if you have a variable number of elements between your element and its parent)

```sh
import {Component} from '@angular/core';
@Component({
  selector: 'label',
  template: `<div>
                <div [fittext]="true" [activateOnResize]="true">Bla bla bla...</div>
            </div>`
})
export class LabelComponent {}
```

**NEW! Support for autoresize input box!**

```sh
import {Component} from '@angular/core';
@Component({
  selector: 'inputbox',
  template: `<div #container>
                <input [fittext]="true" [activateOnResize]="true" [container]="container" [activateOnInputEvents]="true">`,
            </div>`
})

export class InputBoxComponent {}
```

**NEW! Support for maxFontSize!**

```sh
import {Component} from '@angular/core';
@Component({
  selector: 'inputbox',
  template: `<div>
                <input [fittext]="true" [activateOnResize]="true" [activateOnInputEvents]="true" [minFontSize]="40" [maxFontSize]="100">`,
            </div>`
})
export class InputBoxComponent {}
```

Input Parameters:

| Parameter                       | Description                                                                             | Values                        |
| ------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------- |
| fittext                         | the directive selector                                                                  | true/false                    |
| container                       | the container to fit (if not present it fits to the parent container by default)        | ElementRef                    |
| activateOnResize                | enable/disable the autofit in case of window resize                                     | true or false (default false) |
| activateOnInputEvents           | enable/disable the autofit in case of input box events (keydown, keyup etc..)           | true or false (default false) |
| maxFontSize                     | maximum font size                                                                       | number, default is 1000       |
| **!deprecated!** useMaxFontSize | use max font size if is true                                                            | deprecated!                   |
| minFontSize                     | minimum font size                                                                       | number, default is 7          |
| modelToWatch                    | pass model to watch, when this model changes -> font size is automatically recalculated | any type of model             |

Output Parameters:

| Parameter       | Description       | Values |
| --------------- | ----------------- | ------ |
| fontSizeChanged | current font size | string |

### Development

Want to contribute? Great!
Simply, clone the repository!

I created this library because I always spent too much time to solve this problem and didn't find anything on the web (13/03/2017) that does this without jquery and that is also easily integrable in angular2.
For sure it is not the best implementation, maybe is not the best way to do it, but, it gets the job done.

### Todos

- Write tests
- Find a better algorithm to find the font-size who fits better the container

## License

MIT

**Lorenzo I.**
