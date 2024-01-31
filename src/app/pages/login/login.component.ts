import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private authService:AuthService,
    private router:Router
  ){

  }
  ngOnInit(){
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/dashboard']);
    }
  }

  login(){
    const data:any=[]
    this.authService.login(data)
    this.router.navigate(['/dashboard']);
  }
}
