import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable({
	providedIn: 'root'
})
export class SidebarService {

	public sidenav: MatSidenav;

	constructor() {}

	public setSidenav(sidenav: MatSidenav) {
		this.sidenav = sidenav;
	}

	public toggle(): void {
		console.log(this.sidenav);
		this.sidenav.toggle();
		//this.setSidenav.;
		//this.sidenav.toggle();
	}
}
