import { Component } from '@angular/core';
import { Profiles } from '../types';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapPencilFill, bootstrapTrashFill, bootstrapPlusLg } from '@ng-icons/bootstrap-icons';


@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ bootstrapPencilFill, bootstrapTrashFill, bootstrapPlusLg })],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.css'
})
export class ProfilesComponent {
  profiles: any
  constructor(private _dataservice: DataService) {}

  ngOnInit() {
    this._dataservice.getProfiles().subscribe((res: Array<Profiles>) => {
      this.profiles = res;
      this.getAges(this.profiles);
      console.log(this.profiles);
    });
  }

  getAges(profiles: Array<Profiles>) {
    for(let profile of profiles) {
      const year = new Date(profile.birthday).getFullYear();
      const todayYear = new Date().getFullYear();
      profile.birthday = todayYear - year;
    }
  }
}
