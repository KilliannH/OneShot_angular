import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private _authService: AuthService, private router: Router) {}

  login() {
    console.log(this.email, this.password);
    this._authService.login(this.email, this.password).subscribe({
      next: (response) => {
        // Handle successful login here (e.g., save token, redirect)
        console.log('Login successful:', response);
        // Navigate to a different page, e.g., dashboard
        this.router.navigate(['/profiles']);
      },
      error: (error) => {
        // Handle error (e.g., display a message)
        console.error('Login failed:', error);
      },
    });
  }
}
