import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'

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
    this._authService.login(this.email, this.password).subscribe((response: any) => {
        if(response.token) {
          console.log('Login successful:', response);
          // Navigate to a different page, e.g., dashboard
          this.router.navigate(['/profiles']);
        }
    });
  }
}
