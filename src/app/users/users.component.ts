import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from './../user.service';
import { Utilisateur } from './users.module';
import { UserComponent } from './../user/user.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  @ViewChild(UserComponent, {static: false}) usersall?: UserComponent;
  public users: Utilisateur[] = []
  public edit = false;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    })
  }
  deleteUser(id:number) {
      this.userService.deleteUser(id).subscribe(() => {
      const updatedUsers = this.users?.filter(user => user.id !== id)
      this.users = updatedUsers;
     }
     )
  }
  updateUser(data: { form: NgForm, id: number }) {
    if (data.form.invalid) {
      return
    }
    const user: Utilisateur = {
      id:data.id,
      name: data.form.value.name,
      username: data.form.value.username,
      email: data.form.value.email
    }
      this.userService.updateUser(user).subscribe(
        user => {
          this.users[user.id] = user;
        }
      )
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      console.log(data)
    })
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


}
