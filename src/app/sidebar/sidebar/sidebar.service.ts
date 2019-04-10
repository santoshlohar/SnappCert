import { Injectable } from '@angular/core';
import { MatSidenav, MatDrawer } from '@angular/material';
import { SidebarComponent } from './sidebar.component';

@Injectable({
	providedIn: 'root'
})
export class SidebarService {

	private matDrawer: MatDrawer;

    setDrawer(drawer: MatDrawer) {
		console.log("set sidebar")
		this.matDrawer = drawer;
		console.log(drawer)
    }

    toggle() {
		console.log("toggle sidebar")
         this.matDrawer.toggle();
    }
	// public open() {
	// 	console.log(this.sidenav)
	// 	return this.sidenav.open();
	// }
 
	// public toggle(): void {
	// 	console.log("Sidebar service");
	// 	this.sidenav.toggle();
	// }
}
