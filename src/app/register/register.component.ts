import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { HttpClientService } from '../_services/http-client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(
    private userService: UserService, 
    private userAuthService:UserAuthService,
    private router: Router,
    private httpClientService: HttpClientService
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'name': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    ])
    })
  }

  isEmailTaken = false;
  email = ""
  register(registerForm:NgForm){
    
    this.httpClientService.getUserByEmail(registerForm.value.email).subscribe((response) => {
      this.email = registerForm.value.email;
      if(response.length == 0){
        
        this.userService.register(registerForm.value).subscribe(
          (response:any)=>{
            console.log(response)
            this.router.navigate(['login'])
        }, 
        (error)=>{console.log(error)});
        return this.isEmailTaken = false;
      } else{
        return this.isEmailTaken = true;
      }
    })
    
  }
  
  
}


