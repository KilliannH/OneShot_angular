import { Component, inject, TemplateRef } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapPencilFill, bootstrapTrashFill, bootstrapPlusLg, bootstrapCalendar3 } from '@ng-icons/bootstrap-icons';
import { ModalDismissReasons, NgbDate, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

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
	closeResult = '';
  selectedProfile: any;

  constructor(private _dataservice: DataService) {}

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
        profile.birthdayDate = new NgbDate(birthdayDate.getFullYear(), birthdayDate.getMonth() + 1, birthdayDate.getDate());
    }
  }

  openEditProfileModal(content: TemplateRef<any>, profile: any) {
    this.selectedProfile = profile;
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
