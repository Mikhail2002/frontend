import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(
    private userService: UserService, 
    private userAuthSrvice:UserAuthService,
    private router: Router
    ) { }
  
  ngOnInit(): void {
    
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    })

    if (this.userAuthSrvice.isLoggedIn()){
      this.router.navigate([''])
    }
  }

  
  wrongPass = false;
  login(loginForm:NgForm){
    
    this.userService.login(loginForm.value).subscribe(
    (response:any)=>{
      this.userAuthSrvice.setRoles(response.user.role);
      this.userAuthSrvice.setToken(response.token);
      this.userAuthSrvice.setId(response.user.id)
      const role = response.user.role;
      
      if(role === "ADMIN"){
          this.router.navigate(['admin/users']);
      } else{
        this.router.navigate(['shop']);
      }
      
    },
    (error)=>{
      if (error.status === 403){
        this.wrongPass = true;
        return this.wrongPass;
      }
      
      
    }
    )
    
    
  }
  
}
