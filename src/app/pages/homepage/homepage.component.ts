import { Component ,OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone:true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{
  email!: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
   var token= this.authService.getDecodedToken();
   //console.log(token);
   if(token!=null)
   {
    this.email=token.email;
   }
    }
  navigateToProducts() {
    this.router.navigate(['/products']);
  }

}
