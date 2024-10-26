import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private _authService: AuthService, private router: Router) {}

  signup() {
    console.log(this.username, this.email, this.password);
    this._authService.signup(this.username, this.email, this.password).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        // Navigate to a different page, e.g., dashboard
        this.router.navigate(['/profiles']);
      },
      error: (error: any) => {
        console.error('Login failed:', error);
      }
    });
  }
}