import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { Role } from '../model/role.model';
import {AuthService} from "../services/auth.service";
import {BusService} from "../services/bus.service";




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  users? : User[];
  roles?: Role[];
  constructor(public authService: AuthService, private busService: BusService) {}

  ngOnInit(): void {
    this.chargerUsers();
  }

  chargerUsers(){
    this.busService.listeUser().subscribe(us => {
      this.users = us;
    });
  }
  supprimerUser(u: User) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
      this.busService.supprimerUser(u.user_id!).subscribe(() => {
        console.log("Deleted User");
        this.chargerUsers();
      });
  }

}