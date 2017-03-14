# ng2-fittext

An Angular2 directive written in pure typescript (and without jquery!), inspired from http://fittextjs.com/, for autoscale the font size of an element to fit an upper level container.

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
                    <div [fittext]="true" [onResize]="true" [container]="container">Bla bla bla...</div>
                </div>`
    })
    
    export class LabelComponent {}

    ```

   Parameters:
    
  | Parameter | Description | Values |
  | --- | --- | --- |
  | fittext | is the selector of the directive | true/false
  | container | the container to fit | ElementRef
  | onResize | enable/disable the autofit in case of window resize | true or false (default false)



### Development

Want to contribute? Great!
Simply, clone the repository!

I created this library because I always spended too much time for solve this problem and because i didn't find nothing on the web (13/03/2017) that do this without jquery and easily integrable in angular2.
For sure is not a good implementation, maybe is not the best way to do it, but, it do the job.

### Todos

 - Write tests
 - Find a better algorithm to find the font-size who fits better the container.

License
----

ISC


**Lorenzo I.**
  
