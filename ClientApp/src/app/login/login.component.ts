import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TopisimoService } from '../service/topisimo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  
  constructor(
    private _formBuilder: FormBuilder,
    private topisimoService: TopisimoService
  ) { 
    this._createForm();
  }

  ngOnInit() {
  }

  private _createForm(): void {
    this.loginForm = this._formBuilder.group({
      login: [''],
      password: [''],
    });
  }

  login() {
    if (this.loginForm.controls['login'].value === 'Topisimo' && this.loginForm.controls['password'].value === 'A$d951357') {
      this.topisimoService.admin.next(true);
    }
  }

}
