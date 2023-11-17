import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, Auth } from 'firebase/auth';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
goToAddRecipe() {
  console.log('Navigating to Add Recipe page');
}
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoggedIn: boolean = false; 

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const auth: Auth = getAuth();

    signInWithEmailAndPassword(auth, this.username, this.password)
      .then((userCredential) => {
        console.log('Login successful');
        this.isLoggedIn =true
        this.router.navigate(['/dish']);
      })
      .catch((error) => {
        console.error('Login error:', error);
        this.errorMessage = 'Login failed. Please check your credentials and try again.';
      });
  }
}
