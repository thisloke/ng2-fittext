# ng2-fittext

An Angular2 directive written in pure typescript (and without jquery!), inspired from http://fittextjs.com/, for autoscale the font size of an element to fit an upper level container.

### Installation

Install the library
```sh
$ npm install --save ng2-fittext
```

### Usage

Import it in your Angular2 project like a directive

1) Declare it in your module
    ```sh
    import {FittextDirective} from "ng2-fittext/ng2-fittext";
    @NgModule({
      imports: [
        ...
      ],
      declarations: [
        FittextDirective
      ]
    })
    
    ```
    
1) Use it in your components
    ```sh
   import {Component} from '@angular/core';
   
    @Component({
      selector: 'label',
      template: `<div #container>
                    <div fittext [onResize]="true" [container]="#container">Bla bla bla...</div>
                </div>`
    })
    
    export class LabelComponent {}

    ```

   Parameters:
    
  | Parameter | Description | Values |
  | --- | --- | --- |
    | fittext | is the selector of the directive | true/false (if is setted is true by default)
    | container | the container to fit | ElementRef
    | onResize | enable/disable the autofit in case of window resize | true or false (default false)



### Development

Want to contribute? Great!
Simply, clone the repository and start to improve the code.

### Todos

 - Write tests
 - Find a better algorithm to find the font-size who fits better the container.

License
----

ISC


**Lorenzo I.**
  
