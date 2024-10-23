import { Component } from '@angular/core';
import { Profiles } from '../types';
import { DataService } from '../data.service';

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.css'
})
export class ProfilesComponent {
  profiles: any
  constructor(private _dataservice: DataService) {}

  ngOnInit() {
    this._dataservice.getProfiles().subscribe((res: Array<Profiles>) => {
      this.profiles = res;
      console.log(this.profiles);
    });
  }
}
