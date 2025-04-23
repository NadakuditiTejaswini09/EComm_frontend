import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule , Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './header.component.html',  
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  searchQuery: string="";

  constructor(private authService: AuthService, 
    private router: Router) {}

  ngOnInit() {
    this.authService.getAuthState().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  signIn() {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
    } else {
      alert('You are already signed in.');
      this.router.navigate(['/']);
    }
  }

  signOut() {
    if (this.isAuthenticated) {
      this.authService.logout().subscribe(()=>{
        this.isAuthenticated = false;
        this.router.navigate(['/login']);
      });
    } else {
      alert('You are not signed in.');
    }
  }
  searchProducts() {
    this.router.navigate(['/products'], { queryParams: { search: this.searchQuery } });
  }
}
