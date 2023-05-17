import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-carrental',
  templateUrl: './carrental.component.html',
  styleUrls: ['./carrental.component.css']
})
export class CarrentalComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  Signout(){
   
    this.router.navigate(['/Login']);
  }

}
