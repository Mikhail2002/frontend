import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(role){
    localStorage.setItem("role", JSON.stringify(role));
  }
  
  public getRoles(){
    return JSON.parse(localStorage.getItem("role"));
  }

  public setToken(token:string){
    localStorage.setItem("token", token);
  }


  public getToken() :string{
    return localStorage.getItem('token')
  }

  public setId(id){
    localStorage.setItem("id", JSON.stringify(id));
  }

  public getId(){
    return JSON.parse(localStorage.getItem("id"));
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(){
    return this.getToken() !== null;
  }

  public isAdmin(){
    const role = this.getRoles();
    if(role === 'ADMIN'){
      return true;
    }
    return false;
  }

}
