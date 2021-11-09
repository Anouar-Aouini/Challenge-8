import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from './../user.service';
import { Utilisateur } from './../users/users.module';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() public user?: Utilisateur;
  @Input() public users: Utilisateur[]=[];

  public panelOpenState = false;
  public edit = false;
  constructor(public userService:UserService) { }

  ngOnInit(): void {

  }
  @Output() public deleteEvent = new EventEmitter();
  @Output() public updateEvent = new EventEmitter();
  deleteUser(id: number) {
      this.deleteEvent.emit(id)
      // this.userService.deleteUser(id).subscribe(() => {
      // const updatedUsers = this.users?.filter(user => user.id !== id)
      //   this.users = updatedUsers;
     // }
    //  )
  }

  showTem() {
    this.edit = true;
  }
  onHide(){
    this.edit = false;
  }

  editUser(form: NgForm, id: number) {
    this.updateEvent.emit({ form, id })
    this.edit = false;
  }

}
