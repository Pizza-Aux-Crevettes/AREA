import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name: string = '';
  surname: string = '';
  username: string = '';
  email: string = '';
  password: string = '';

  constructor() { }

  ngOnInit() {
  }

  onRegister() {
    console.log('Name:', this.name);
    console.log('Surname:', this.surname);
    console.log('Username:', this.username);
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }

}
