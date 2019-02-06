import { Injectable } from '@angular/core';
import { ValidatorService } from 'angular4-material-table';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CertificateValidatorService implements ValidatorService {

  constructor() { }

  getRowValidator(): FormGroup {
    return new FormGroup({
      'name': new FormControl(null, Validators.required)
      });
  }
}
