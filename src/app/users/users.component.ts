import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from './../user.service';
import { Utilisateur } from './users.module';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users: Utilisateur[] = []
  public edit = false;
  public panelOpenState = false;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      console.log(data)
    })
  }

  deleteUser(id: number) {
      this.userService.deleteUser(id).subscribe(() => {
      const updatedUsers = this.users.filter(user => user.id !== id)
      this.users = updatedUsers;
    }
    )
  }
    addUser(form: NgForm) {
    if (form.invalid) {
      return
    }
    const user: Utilisateur = {
      id:Math.random(),
      name: form.value.name,
      username: form.value.username,
      email: form.value.email
    }
      this.userService.addUser(user).subscribe(
        user => {
          this.users.push(user)
          form.resetForm();
        }
      )

    }
  public ind = 0;
  showTem(id: number) {
    this.ind = id;
    this.edit = true;
    console.log(this.ind)
  }

  editUser(form:NgForm,id:number) {
   if (form.invalid) {
      return
    }
    const user: Utilisateur = {
      id,
      name: form.value.name,
      username: form.value.username,
      email: form.value.email
    }
      this.userService.updateUser(user).subscribe(
        user => {
          this.users[user.id] = user;
          this.edit = false;

      this.userService.getUsers().subscribe(data => {
      this.users = data;
      console.log(data)
    })
        }
      )
  }
  onHide() {
    this.edit = false;
  }

}
