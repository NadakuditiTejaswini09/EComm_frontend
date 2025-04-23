import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule , NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterModule , Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [AuthService],
  imports: [FormsModule,CommonModule,RouterModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  emailError: string = '';
  passwordError: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.login({ email: this.email, password: this.password }).subscribe(
        response => {
          this.authService.saveToken(response.token);
          console.log('Login successful', response);
          this.errorMessage = '';
          this.router.navigate(['/']);
        },
        error => {
          console.error('Login failed', error);
          this.errorMessage = 'Invalid email or password';
        }
      );
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

}
