import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   title = 'sdf fsd fsd fsdfsdfsdfsdfsfdf sdfsdf sdfs df fsdfsdfsdfsdfsfdf fsdfsdfsdfsdfsfdf fsdfsdfsdfsdfsfdf ' +
     'fsdfsdfsdfsdfsfdf fsdfsdfsdfsdfsfdf';

  click(par: string) {
    this.title = par === 'add' ? (this.title  + this.title) : (this.title.substring(0, this.title.length / 2 + 10));
  }
}
