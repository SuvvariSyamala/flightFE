import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient ,HttpClientModule,HttpHeaders} from '@angular/common/http';
import { User } from '../../../models/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  users:User;
  constructor(private router:Router,private http:HttpClient){
    this.users=new User();
  }
  onSubmit(): void {
    console.log(JSON.stringify(this.users));
    console.log(this.users);
    this.users.role="User";
    this.http.post('http://localhost:5005/api/User/Register',this.users)
    .subscribe((response)=>{
      console.log(response);
      this.router.navigateByUrl('login');
      
    })
    
  }
  onReset(form: NgForm): void {
    form.reset();
  }
  redirectToLogin() {
    this.router.navigateByUrl('login');
  }
  

}
