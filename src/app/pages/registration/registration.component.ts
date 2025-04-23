import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService , User} from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = ''; 
  constructor(private authService: AuthService,private router:Router) {}

  onSubmit() {
    const user:User ={
      UserName :this.name,
      Email: this.email,
      Password :this.password,
      Role: this.role
    };
    this.authService.register(user).subscribe(
      response=>{
        console.log("Registration successful",response);
        this.router.navigate(['/login']);
      },
      error=>{
        console.error("Registration failed",error);
      }
    );
  }

}
