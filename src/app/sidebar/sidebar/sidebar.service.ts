import { Injectable } from '@angular/core';
import { MatSidenav, MatDrawer } from '@angular/material';
import { SidebarComponent } from './sidebar.component';

@Injectable({
	providedIn: 'root'
})
export class SidebarService {

	public matDrawer: MatDrawer;
	public matSidenav: MatSidenav;

    setDrawer(drawer: MatDrawer) {
		console.log("set sidebar")
		this.matDrawer = drawer;
		console.log(drawer)
	}
	
	public setSidenav(sidenav: MatSidenav) {
		this.matSidenav = sidenav;
		console.log(this.matSidenav);
	}

    // toggle() {
	// 	this.matDrawer.toggle();
	// }
	
	public toggle(): void {
		console.log(this.matSidenav)
		this.matSidenav.toggle();
    }
	//  public open() {
	// 	console.log(this.sidenav)
	// 	return this.sidenav.open();
	// }
 
	// public toggle(): void {
	// 	console.log("Sidebar service");
	// 	this.sidenav.toggle();
	// }
}
