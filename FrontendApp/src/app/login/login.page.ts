import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';      // Propriété pour l'email
  password: string = '';   // Propriété pour le mot de passe

  constructor() { }

  ngOnInit() {
  }

  // Méthode pour gérer la soumission du formulaire
  onLogin() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    // Ajoutez ici la logique d'authentification si nécessaire
  }
}
