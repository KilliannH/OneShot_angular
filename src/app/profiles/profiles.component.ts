import { Component, inject, TemplateRef } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapPencilFill, bootstrapTrashFill, bootstrapPlusLg, bootstrapCalendar3 } from '@ng-icons/bootstrap-icons';
import { ModalDismissReasons, NgbDate, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIconComponent, NgbDatepickerModule],
  providers: [provideIcons({ bootstrapPencilFill, bootstrapTrashFill, bootstrapPlusLg, bootstrapCalendar3 })],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.css'
})
export class ProfilesComponent {
  profiles: Array<any> = []
  private modalService = inject(NgbModal);
  selectedProfile: any;

  constructor(private _dataservice: DataService, private _toastr: ToastrService) {}

  ngOnInit() {
    this._dataservice.getProfiles().subscribe((res: Array<any>) => {
      this.profiles = res;
      this.toNgbDate(this.profiles);
      console.log(this.profiles);
    });
  }

  toNgbDate(profiles: Array<any>) {
    for(let profile of profiles) {
      const birthdayDate = new Date(profile.birthday);
        profile.birthday = new NgbDate(birthdayDate.getFullYear(), birthdayDate.getMonth() + 1, birthdayDate.getDate());
    }
  }

  openEditProfileModal(content: TemplateRef<any>, profile: any) {
    this.selectedProfile = profile;
		this.modalService.open(content, { ariaLabelledBy: 'edit-modal' }).result.then(
			(result) => {
        console.log(this.profiles)
				const dbProfile = {
          id: this.selectedProfile.id,
          displayName: this.selectedProfile.displayName,
          gender: this.selectedProfile.gender,
          userId: this.selectedProfile.userId,

          // retake the good date format
          birthday: new Date(this.selectedProfile.birthday.year, this.selectedProfile.birthday.month -1, this.selectedProfile.birthday.day).getTime(),
          
          job: this.selectedProfile.job,
          bio: this.selectedProfile.bio
        }

        // save it to be
        this._dataservice.saveProfileById(dbProfile).subscribe({
          next: (response: any) => {
            console.log("Saved successfully", response);
            // show it
            this._toastr.success('successfully', 'Saved');
          }, error: (error: any) => {
            this._toastr.error("Failed to save");
            // console.log("Failed to save", error);
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
