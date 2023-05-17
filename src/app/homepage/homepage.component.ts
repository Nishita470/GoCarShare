import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  isSidebarOpen=true;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  Signout(){
   
    this.router.navigate(['/Login']);
  }

}
