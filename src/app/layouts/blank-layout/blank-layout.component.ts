import { Component } from '@angular/core';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss']
})
export class BlankLayoutComponent {

 
  

  goToUp():void{
    window.scrollTo(0,0)
  }

  
  
}
