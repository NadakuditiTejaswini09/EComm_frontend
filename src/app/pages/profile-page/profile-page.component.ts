import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from './User-model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-page',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit{
  user:User=new User();
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser(1).subscribe(data => {
      this.user = data;
    });
  }
 
  onSubmit(): void {
    this.userService.updateUser(this.user).subscribe(data => {
      console.log('User updated successfully!', data);
    });
  }
}
