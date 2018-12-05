import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-institute-kyc-details',
  templateUrl: './institute-kyc-details.component.html',
  styleUrls: ['./institute-kyc-details.component.css']
})
export class InstituteKycDetailsComponent implements OnInit {
  private instituteData: any;

  constructor() { }

  ngOnInit() {
    this.instituteData = {
      type: 'University',
      id: '1',
      name: 'Snapper',
      requester: 'Sushmita',
      kycAgent: 'ABC',
      status: 'New'
    }
  }

}
