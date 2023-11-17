import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  fullName: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService,private router: Router) {
    console.log('SignupComponent constructor called');
    // this.auth = getAuth();
  }

  signup() {
    this.authService.signUp(this.fullName,this.email, this.password)
       .then((result:any) => {
        this.router.navigate(['/dish']);
      })

  }
  //   if (!this.fullName || !this.email || !this.password) {
  //     console.error('Please provide full name, email, and password.');
  //     return;
  //   }

  //   // Call the signup method from the AuthService
  //   this.authService.signUp(this.fullName,this.email, this.password)
  //     .then((result:any) => {
  //       console.log('Sign-up successful!', result);
  
  //     })
  //     .catch((error:any) => {
  //       console.error('Sign-up error:', error);
  
  //     });
  // }
  //   createUserWithEmailAndPassword(this.auth, this.email, this.password)
  //     .then((userCredential) => {
  //       // Signup successful
  //       console.log('Signup successful', userCredential);
 
  //     })
  //     .catch((error) => {
  //       // Handle signup errors
  //       console.error('Signup error:', error);
  //       // Additional actions on signup error
  //     });
  // }
}
