import { Component, inject, TemplateRef } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapPencilFill, bootstrapTrashFill, bootstrapPlusLg, bootstrapCalendar3 } from '@ng-icons/bootstrap-icons';
import { ModalDismissReasons, NgbDate, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIconComponent, NgbDatepickerModule],
  providers: [provideIcons({ bootstrapPencilFill, bootstrapTrashFill, bootstrapPlusLg, bootstrapCalendar3 })],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: Array<any> = []
  private modalService = inject(NgbModal);
  selectedUser: any;

  constructor(private _dataservice: DataService, private _toastr: ToastrService) {}

  ngOnInit() {
    this._dataservice.getUsers().subscribe((res: Array<any>) => {
      this.users = res;
      console.log(this.users);
    });
  }

  openEditUserModal(content: TemplateRef<any>, user: any) {
    this.selectedUser = user;
		this.modalService.open(content, { ariaLabelledBy: 'edit-modal' }).result.then(
			(result) => {
        console.log(this.users)
				const dbUser = {
          id: this.selectedUser.id,
          username: this.selectedUser.username,
          email: this.selectedUser.email,
          password: this.selectedUser.password
        }

        // save it to be
        this._dataservice.saveUserById(dbUser).subscribe({
          next: (response: any) => {
            console.log("Saved successfully", response);
            // show it
            this._toastr.success("successfully", "Saved");
          }, error: (error: any) => {
            this._toastr.error("Failed to save", error);
          }
        });
			},
			(reason) => {
				console.log(`Dismissed ${this.getDismissReason(reason)}`);
			},
		);
	}

  openDeleteUserModal(content: TemplateRef<any>, user: any) {
    this.modalService.open(content, { ariaLabelledBy: 'delete-modal' }).result.then(
			(result) => {
        console.log(this.selectedUser)

        // save it to be
        this._dataservice.removeUser(user.id).subscribe({
          next: (response: any) => {
            console.log("Removed successfully");

            this._toastr.success("successfully", "Deleted");

            const deletedUserIndex = this.users.indexOf(user);
            this.users.splice(deletedUserIndex, 1);

          }, error: (error: any) => {
            this._toastr.error("Failed to delete");
          }
        });
			},
			(reason) => {
				console.log(`Dismissed ${this.getDismissReason(reason)}`);
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}
}
