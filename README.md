# ng2-fittext

An Angular2 directive written in pure typescript (and without jquery!), for autoscale the font size of an element to fit an upper level container.

How many times your font doesn't scale automatically to fit the size of the container? Always, if you don't say it to do that!
How you can say it? ng2-fittext!

### Demo

http://plnkr.co/edit/v0TQaYepV4E2Heur02j5?p=preview

### Installation

Install the library
```sh
$ npm install --save ng2-fittext
```

### Usage

Import it in your Angular2 project like a module

1) Declare it in your module
    ```sh
    import {Ng2FittextModule} from "ng2-fittext";
    @NgModule({
      imports: [
        Ng2FittextModule
      ]
    })

    ```

2) Use it in your components

    Fit with specified container (can be the parent or a deeper ancestor)
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


    Fit with the parent element (this works if you have a variable number of element between element and parent)
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

  | Parameter | Description | Values |
  | --- | --- | --- |
  | fittext | is the selector of the directive | true/false
  | container | the container to fit (if not present it fit default to parent container)| ElementRef
  | activateOnResize | enable/disable the autofit in case of window resize | true or false (default false)
  | activateOnInputEvents | enbale/disable the autofit in case of input box events (keydown, keyup etc..) | true or false (default false)
  | maxFontSize | maximal font size | number, default is 1000
  | **!deprecated!** useMaxFontSize | use max font size if is true | deprecated!
  | minFontSize | minimal font size | number, default is 7
  | modelToWatch | pass model to watch, when this model changes -> font size is automatically recalculated | any type of model


fontSizeChanged

   Output Parameters:

  | Parameter | Description | Values |
  | --- | --- | --- |
  | fontSizeChanged | current font size | string
  
### Development

Want to contribute? Great!
Simply, clone the repository!

I created this library because I always spended too much time for solve this problem and because i didn't find nothing on the web (13/03/2017) that do this without jquery and easily integrable in angular2.
For sure is not a good implementation, maybe is not the best way to do it, but, it do the job.

### Todos

 - Write tests
 - Find a better algorithm to find the font-size who fits better the container

License
----

MIT


**Lorenzo I.**

