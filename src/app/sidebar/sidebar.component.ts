import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // $("#menu-toggle").click(function(e) {
  //     e.preventDefault();
  //     $("#wrapper").toggleClass("active");
  // });

  sidebarToggle(e) {
    console.log(e)
  }

}
