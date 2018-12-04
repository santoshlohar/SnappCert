import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  public data : any;
  constructor() { }

  ngOnInit() {
    this.data = [
      { 'type': 'University', 'id' : '1', 'name': 'Snapper', 'requester': 'Sushmita', 'kycAgent': 'ABC', 'status': 'New'}
    ]
  }

}
