import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';
import { User } from 'src/app/model/User ';
import { HttpClientService } from 'src/app/_services/http-client.service';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/_services/user-auth.service'


@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {

  @Input()
  user: User

  @Output()
  userDeletedEvent = new EventEmitter();

  constructor(private httpClientService: HttpClientService,
    private router: Router,
    private userAuthSrvice: UserAuthService) { }

  ngOnInit() {
  }

  deleteUser() {
    this.httpClientService.deleteUser(this.user.id).subscribe(
      (user) => {
        this.userDeletedEvent.emit();
        this.router.navigate(['admin', 'users']);
      }
    );
  }

  idMatch(userId){
    const id = this.userAuthSrvice.getId();

    if (id === userId){
      return true;
    }
    return false;
  }

  isAdmin(role){
    if (role == "ADMIN"){
      return true;
    }
    return false;
  }
}
