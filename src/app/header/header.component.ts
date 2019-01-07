import { Component, OnInit } from '@angular/core';
// import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	sidebar:  boolean;
	constructor() { }

	ngOnInit() {
	}

	toggleSidebar() {
		if(this.sidebar == false)
        {
               this.sidebar = true;
        }
        else{
               this.sidebar = false;
        } 
	}

}
